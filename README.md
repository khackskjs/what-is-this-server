# what-is-this-server

## Development Environment

### Setting

Make `.env.local` file with reference to `.env` file and then execute command `npm start`

#### Database

prisma ORM 을 사용했습니다.

[REST API Example](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express#3-using-the-rest-api)에 따라서 세팅을 하면 됩니다.

Prisma 의 사용법은 다음과 같습니다.

1. `npm install -D prisma`
1. scheme.prisma 파일 작성 (이름 변경 시 package.json 에 지정 `prisma.schema: "./src/db/config/schema.prisma"`)
1. prisma scheme 실행 시켜서 DB, Table 등 생성(migrate). npm script `npm run setting:migrate-db`
1. `@prisma/client` 모듈을 통해 개발한다. (`./src/db/index.js` 참고)
