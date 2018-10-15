#!/usr/bin/env bash

# Create AWS dir for credentials and config.
echo "Creating AWS config directory..."
mkdir ~/.aws

# Set AWS CLI credentials.
echo "Setting AWS credentials..."
touch ~/.aws/credentials
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = $PRODUCTION_AWS_ACCESS_KEY_ID
aws_secret_access_key = $PRODUCTION_AWS_SECRET_ACCESS_KEY
EOF

# Set AWS CLI config.
echo "Setting AWS config..."
touch ~/.aws/config
cat > ~/.aws/config << EOF
[default]
region = $PRODUCTION_AWS_REGION
output = json
EOF

# Set environment variables.
echo "Creating .env file..."
cat > .env.production << EOF
VUE_APP_URI=$PRODUCTION_APP_URI
VUE_APP_API_URI=$PRODUCTION_API_URI
VUE_APP_API_OAUTH_AUTHORIZE_URI=$PRODUCTION_API_OAUTH_AUTHORIZE_URI
VUE_APP_API_CLIENT_ID=$PRODUCTION_API_CLIENT_ID
VUE_APP_GOOGLE_API_KEY=$PRODUCTION_GOOGLE_API_KEY
VUE_APP_SESSION_TIMEOUT=$PRODUCTION_SESSION_TIMEOUT

VUE_APP_S3D_BUCKET=$PRODUCTION_S3_DEPLOYMENT_BUCKET
VUE_APP_S3D_ENABLE_CLOUDFRONT=true
VUE_APP_S3D_CLOUDFRONT_ID=$PRODUCTION_S3D_CLOUDFRONT_ID
EOF

# Build.
echo "Building..."
node_modules/.bin/vue-cli-service build --mode production

# Deploy to S3.
echo "Deploying..."
node_modules/.bin/vue-cli-service s3-deploy --mode production
