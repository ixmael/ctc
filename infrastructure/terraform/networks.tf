resource "docker_network" "ctc" {
  name  = "${local.project_name}-ctc-${var.environment}"
  driver = "bridge"
}
