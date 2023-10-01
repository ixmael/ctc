# CTC Web
This project implements a user web application to list, filter list, vote, and delete the comunitary tasks.

## Setup
You have to create a *.env* file that defines the *RestAPI* url where the web consume it. There is an example in the *.env.example* file. The environment variable required is **NEXT_PUBLIC_RESTAPI_URI**.

Example:
```text
NEXT_PUBLIC_RESTAPI_URI=http://localhost:8000/api/v1
```

## Develop
You can work with the development environtment:
```bash
npm run dev
# or
yarn run dev
```
This started a server of this project and visit in [http://localhost:3000](http://localhost:3000).

## Production
You have to create a *.env* file that defines the *RestAPI* url where the web consume it. There is an example in the *.env.example* file. The environment variable required is **NEXT_PUBLIC_RESTAPI_URI**.

Example:
```text
NEXT_PUBLIC_RESTAPI_URI=http://yourdomain.com/api/v1
```

### Build
```sh
npm run build
# or
yarn run build
```

### Run
You execute the service with:
```bash
npm run start
# or
yarn run start
```
