const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const singleton = Symbol()
const singletonEnforcer = Symbol()

const options = {
  host: process.env.SESSION_DB_ADDRESS,
  port: process.env.SESSION_DB_PORT,
  user: process.env.SESSION_DB_USER,
  password: process.env.SESSION_DB_PASSWORD,
  database: process.env.SESSION_DB_DATABASE,
}

const sessionStore = new MySQLStore(options)


class GoogleAuth {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new GoogleAuth(singletonEnforcer)
    }
    return this[singleton]
  }

  initializeGoogleSetting(app) {
    app.use(
      session({
        secret: process.env.SESSION_SECRET_KEY,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
      })
    )

    app.use(passport.initialize())
    app.use(passport.session())

    // 로그인이 최초로 성공했을 때 호출 됨
    // done(null, user.id) 로 세션을 초기화 한다
    passport.serializeUser(function (user, done) {
      console.log('passport.serializeUser')
      done(null, user.id)
    })

    // 사용자가 페이지를 방문할 때마다 호출되는 함수
    // done(null, id)로 사용자의 정보를 각 request 의 user 변수에 넣어준다.
    passport.deserializeUser(function (id, done) {
      done(null, id)
    })

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
          passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
          console.log('profile', profile)
          console.log('accessToken', accessToken)

          return done(null, profile)
        }
      )
    )

    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/card-management',
      failureRedirect: '/error',
    }))
  }
}


function authChecker(req, res, next) {
  if (req.headers.authorization) {
  } else {
    req.uuid = 1  // temp code
    next()
    // res.status(401).json({ error: 'Unauthorized' })
  }
}

module.exports = {
  authChecker, GoogleAuth
}
