# CTC RestAPI

## Setup
You have to create a *.env* file in the current path to load the environment variables used by the project.

```sh
composer install
```

```sh
php artisan migrate
```

## Develop
```sh
#
php artisan serve
```

The *RestAPI* run in [RestAPI server](http://localhost:8000) and the the *RestAPI* docs in the [RestAPI documentation](http://localhost:8000/api/documentation).

You can use [the CTC postman collection](ctc.postman_collection.json) to consume the *RestAPI* in the localhost from *postman*.

## Production
Install the dependencies for the project:
```sh
composer install --optimize-autoloader --no-dev
```

Run the migrations:
```sh
php artisan migrate
```

Prepare the project to run in production:
```sh
php artisan optimize
```

Now, put this directory in the server to execute the *RestAPI*.
