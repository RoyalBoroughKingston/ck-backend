#!/usr/bin/env bash

# Set AWS CLI credentials.
echo "Setting AWS credentials..."
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = $STAGING_AWS_ACCESS_KEY_ID
aws_secret_access_key = $STAGING_AWS_SECRET_ACCESS_KEY
EOF

# Set AWS CLI config.
echo "Setting AWS config..."
cat > ~/.aws/config << EOF
[default]
region = $STAGING_AWS_REGION
output = json
EOF

# Set environment variables.
echo "Creating .env file..."
cat > .env.staging << EOF
VUE_APP_URI=$STAGING_APP_URI
VUE_APP_API_URI=$STAGING_API_URI
VUE_APP_API_OAUTH_AUTHORIZE_URI=$STAGING_API_OAUTH_AUTHORIZE_URI
VUE_APP_API_CLIENT_ID=$STAGING_API_CLIENT_ID
VUE_APP_GOOGLE_API_KEY=$STAGING_GOOGLE_API_KEY

VUE_APP_S3D_BUCKET=$STAGING_S3_DEPLOYMENT_BUCKET
EOF

# Build.
echo "Building..."
node_modules/.bin/vue-cli-service build --mode staging

# Deploy to S3.
echo "Deploying..."
node_modules/.bin/vue-cli-service s3-deploy --mode staging
