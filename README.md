# Cuida Tu Comunidad
*Cuida Tu Comunidad* (CTC) is a platform to incetivate the citizen participation in the comunitary tasks. This is the implementation of the platform for my technical test.

## Services
### API
I implemented the *RestAPI* in the directory **laravel**. It was implemented with *Laravel 10*, *PHP 8.1*, using *SQLite*. You can get more details reading the [CTC RestAPI README](laravel/README.md).

### Web
I implemented the *Web* that consumes the *RestAPI* is in the **react** directory. This was implemented with *React* and the *NextJS* framework. You have the details in the [CTC Web README](react/README.md).

## Start services
We use **docker** containers to provide the CTC's services. Previous to start the services, you have to setup the services:
- Configure the database creating a *.env* file in this path with the parameters for the *PostgreSQL* service. In the file *.env.example* you have the parameters required.
- Configure the database to the *laravel/.env* with the parameters of the database.
- Set the *RestAPI* URL in the *react/.env*. In the current configuration services provide the *RestAPI* in [http://localhost:9000/api/v1](http://localhost:9000/api/v1) and the *RestAPI* documentation in [RestAPI documentation](http://localhost:9000/api/documentation).

### Run the services
```sh
# Build the images
docker compose build
```

```sh
# Run the containers
docker compose up -d
```

You can visit [http://localhost:3000](http://localhost:3000) to list the comunitary tasks.

## Deploy
This project deploys with **Terraform**. This create the containers (networks, volumes) and executes them. This approach is to upload the *docker* containers to the cloud.

```sh
# Start the project
terraform -chdir=./infrastructure/terraform init

# Prepare cantainers
terraform -chdir=./infrastructure/terraform plan

# Run the containers
terraform -chdir=./infrastructure/terraform apply

# Destroy the containers
terraform -chdir=./infrastructure/terraform destroy
```