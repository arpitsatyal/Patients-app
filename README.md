
## Patient profile manegement application.

https://patients-app-arpit.netlify.app/

To run the project locally, go through the following steps:


### Environment Variables

Add the following keys to your .env file in server folder.

`PORT`, the port of your application.

`JWT_SECRET`, secret key for json web token.

`JWT_REFRESH`, refresh key for json web token.

`DATABASE_URL`, Database URL of postgresql.

#### cloudinary configuration keys.

`cloud_name`, name of your cloudinary account.

`api_key`, api key for cloudinary.

`api_secret`, secret key for cloudinary.


### Installation

Install with npm

#### backend setup
```bash
  cd server
  npm i -g nodemon
  npm i -g ts-node
  npm install
  npx prisma migrate dev --name init
  npm run serve
```

#### frontend setup
```bash
  cd client
  npm i
  npm run serve
```
