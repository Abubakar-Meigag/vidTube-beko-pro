#!/bin/bash

echo "➡️  Building frontend for production (Vite)..."
npm run build

echo "⬆️  Uploading to S3..."
aws s3 sync dist/ s3://client-cloud-module-cyf --region eu-west-1 --delete

echo "✅ Deployed to:"
echo "http://client-cloud-module-cyf.s3-website-eu-west-1.amazonaws.com/"
