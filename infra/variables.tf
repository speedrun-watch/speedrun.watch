variable "acm_certificate_arn" {
  description = "ACM certificate ARN for speedrun.watch (us-east-1)"
  type        = string
}

variable "cloudfront_block_direct_access_function_name" {
  description = "Name of the CloudFront function that blocks direct S3 access"
  type        = string
  default     = "BlockDirectAccess"
}
