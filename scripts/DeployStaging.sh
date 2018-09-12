#!/usr/bin/env bash

# Set AWS CLI credentials.
cat > ~/.aws/config << 'EOF'
[default]
aws_access_key_id=$AWS_ACCESS_KEY_ID
aws_secret_access_key=$AWS_SECRET_ACCESS_KEY
region=$AWS_REGION
EOF

# Set environment variables.
cat > .env.staging << 'EOF'
VUE_APP_URI=$APP_URI
VUE_APP_API_URI=$API_URI
VUE_APP_API_OAUTH_AUTHORIZE_URI=$API_OAUTH_AUTHORIZE_URI
VUE_APP_API_CLIENT_ID=$API_CLIENT_ID
VUE_APP_GOOGLE_API_KEY=$GOOGLE_API_KEY

VUE_APP_S3D_BUCKET=$S3_DEPLOYMENT_BUCKET
EOF

# Build.
node_modules/.bin/vue-cli-service build --mode staging

# Deploy to S3.
node_modules/.bin/vue-cli-service s3-deploy --mode staging
