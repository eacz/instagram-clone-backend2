<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

# Backend for my instagram clone

## To run locally

1. Install dependencies
```
yarn install
```
or 
```
npm install
```
2. Create a .env file at root and fill it up following the .env.example file 
```
docker compose up -d
```
3. Run docker container with postgres image for database
```
docker compose up -d
```
4. Run dev server
```
yarn start:dev
```
or  
```
npm run start:dev
```

5. To get example data in development, execute the seed
```
GET {{url}}/api/seed/all_seeds
```