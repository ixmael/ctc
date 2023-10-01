resource "docker_volume" "repository" {
  name = "${local.project_name}-repository-${var.environment}"
  driver_opts = {
    type   = "none"
    device = var.repository_data_path
    o      = "bind"
  }
}
