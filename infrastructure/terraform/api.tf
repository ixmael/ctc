resource "docker_container" "api" {
  image    = docker_image.api.name
  name     = "${local.project_name}-api-${var.environment}"
  hostname = "api"

  attach   = false
  must_run = true
  logs     = true

  env = [
    "ENVIRONMENT=${var.environment}",
  ]

  ports {
    external = 9000
    internal = 9000
  }

  networks_advanced {
    name = docker_network.ctc.name
    aliases = [
      "api"
    ]
  }
}

resource "docker_image" "api" {
  name = "${local.project_name}/api"

  build {
    path       = abspath(path.cwd)
    dockerfile = "./infrastructure/docker/laravel.simple.dockerfile"

    tag = [
      "${var.environment}"
    ]

    label = {
      author : "ixmael"
    }
  }
}
