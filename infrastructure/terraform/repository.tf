resource "docker_container" "repository" {
  image    = "postgres:15.4-alpine3.18"
  name     = "ctc-repository"
  hostname = "repository"

  restart = "unless-stopped"

  env = [
    "PGDATA=/data",
    "POSTGRES_DB=${var.repository_database}",
    "POSTGRES_USER=${var.repository_user}",
    "POSTGRES_PASSWORD=${var.repository_user_password}"
  ]

  volumes {
    container_path = "/data"
    volume_name    = docker_volume.repository.name
  }

  ports {
    internal = 5432
    external = 5432
  }

  networks_advanced {
    name = docker_network.ctc.name
    aliases = [
      "repository"
    ]
  }
}
