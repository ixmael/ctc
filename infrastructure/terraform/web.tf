resource "docker_container" "web" {
  image    = docker_image.web.name
  name     = "${local.project_name}-web-${var.environment}"
  hostname = "web"

  attach   = false
  must_run = true
  logs     = true

  env = [
    "ENVIRONMENT=${var.environment}",
  ]

  ports {
    external = 3000
    internal = 3000
  }

  networks_advanced {
    name = docker_network.ctc.name
    aliases = [
      "web"
    ]
  }
}

resource "docker_image" "web" {
  name = "${local.project_name}/web"

  build {
    path       = abspath(path.cwd)
    dockerfile = "./infrastructure/docker/react.dockerfile"

    tag = [
      "${var.environment}"
    ]

    label = {
      author : "ixmael"
    }
  }
}
