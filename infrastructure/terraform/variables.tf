variable "environment" {
  type        = string
  description = "The environment to deploy"
  default     = "production"
}

variable "repository_data_path" {
  type        = string
  description = "The path of the data to persist the database"
}

variable "repository_database" {
  type        = string
  description = "The name of the default database"
}

variable "repository_user" {
  type        = string
  description = "The name of the default user database"
}

variable "repository_user_password" {
  type        = string
  description = "The password of the default user database"
}
