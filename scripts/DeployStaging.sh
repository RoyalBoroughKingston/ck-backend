#!/usr/bin/env bash

# Create AWS dir for credentials and config.
echo "Creating AWS config directory..."
mkdir ~/.aws

# Set AWS CLI credentials.
echo "Setting AWS credentials..."
touch ~/.aws/credentials
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = $STAGING_AWS_ACCESS_KEY_ID
aws_secret_access_key = $STAGING_AWS_SECRET_ACCESS_KEY
EOF

# Set AWS CLI config.
echo "Setting AWS config..."
touch ~/.aws/config
cat > ~/.aws/config << EOF
[default]
region = $STAGING_AWS_REGION
output = json
EOF

# Set environment variables.
echo "Creating .env file..."
cat > .env.staging << EOF
VUE_APP_ENV=staging
VUE_APP_URI=$STAGING_APP_URI
VUE_APP_API_URI=$STAGING_API_URI
VUE_APP_API_OAUTH_AUTHORIZE_URI=$STAGING_API_OAUTH_AUTHORIZE_URI
VUE_APP_API_CLIENT_ID=$STAGING_API_CLIENT_ID
VUE_APP_GOOGLE_API_KEY=$STAGING_GOOGLE_API_KEY
VUE_APP_SESSION_TIMEOUT=$STAGING_SESSION_TIMEOUT
VUE_APP_BUGSNAG_API_KEY=$STAGING_BUGSNAG_API_KEY

VUE_APP_S3D_BUCKET=$STAGING_S3_DEPLOYMENT_BUCKET
VUE_APP_S3D_ENABLE_CLOUDFRONT=true
VUE_APP_S3D_CLOUDFRONT_ID=$STAGING_S3D_CLOUDFRONT_ID
EOF

# Build.
echo "Building..."
node_modules/.bin/vue-cli-service build --mode staging

# Deploy to S3.
echo "Deploying..."
node_modules/.bin/vue-cli-service s3-deploy --mode staging
