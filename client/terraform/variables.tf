
variable "client-cloud-module-cyf-terraform" {
  type        = string
  description = "The name of the S3 bucket to create"
  default     = "my-unique-bucket"
}

variable "provider_region" {
  type        = string
  description = "The AWS region to deploy the resources in"
  default     = "eu-west-1"
}

variable "bucket_name" {
  type        = string
  description = "The name of the S3 bucket to create"
  default     = "client-cloud-module-cyf-terraform"
}