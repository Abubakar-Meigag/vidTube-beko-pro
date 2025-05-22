
provider "aws" {
  region = var.provider_region
}

resource "aws_s3_bucket" "client-cloud-module-cyf-terraform" {
  bucket = var.bucket_name
  force_destroy = true
  }
  
  resource "aws_s3_bucket_versioning" "client-cloud-module-cyf-terraform" {
    bucket = aws_s3_bucket.client-cloud-module-cyf-terraform.id
  
    versioning_configuration {
      status     = "Suspended"
    }
}

resource "aws_s3_bucket_policy" "client-cloud-module-cyf-terraform" {
  bucket = aws_s3_bucket.client-cloud-module-cyf-terraform.bucket

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid = "Statement1",
        Effect = "Allow",
        Principal = "*",
        Action = "s3:GetObject",
        Resource = "arn:aws:s3:::${aws_s3_bucket.client-cloud-module-cyf-terraform.bucket}/*"
      }
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.beko-videos_public_access_block]
}

resource "aws_s3_bucket_public_access_block" "beko-videos_public_access_block" {
  bucket = aws_s3_bucket.client-cloud-module-cyf-terraform.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "client-cloud-module-cyf-terraform" {
  bucket = aws_s3_bucket.client-cloud-module-cyf-terraform.bucket

  index_document {
    suffix = "index.html"
  }
}
