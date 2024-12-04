# ------------------------------------------------------------
# basics - these are the input variables with common names
# typically used across multiple combos and modules
# desc: the prefix variable exists provides to prefix for all resource names
variable "prefix" {
  type    = string
  default = "ecs-demo-test"
}

# desc: the region variable defines which AWS region we are building these resources in.
variable "region" {
  type    = string
  default = "us-east-2"
}

# ------------------------------------------------------------
# ecsasg specific variables
variable "tags" {
  type    = map(string)
  default = {
    Project     = "ecs-demo"
    CostCode    = "ABC123"
    Environment = "DEV"
  }
}

variable "instancetype" {
  type    = string
  default = "c5.large"
}

variable "privatesubnets" {
  type  = list(string)
}

variable "asgmin" {
  type    = number
  default = 0
}

variable "asgdes" {
  type    = number
  default = 0
}

variable "asgmax" {
  type    = number
  default = 10
}

variable "ecssg" {
  type  = string
}

variable "ecscluster" {
  type  = string
}

# ------------------------------------------------------------
