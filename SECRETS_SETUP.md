# GitHub Secrets Configuration Guide

## Required Secrets for CI/CD

To complete the repository setup, you need to configure the following secrets in your GitHub repository settings:

### 1. NPM_TOKEN (Optional - for publishing to npm)
- Go to https://github.com/KratosWolf/MyFirstBA/settings/secrets/actions
- Click "New repository secret"
- Name: `NPM_TOKEN`
- Value: Your npm authentication token (get from https://www.npmjs.com/settings/tokens)

### 2. VERCEL_TOKEN (Required for deployment)
- Go to https://vercel.com/account/tokens
- Create a new token
- Add to GitHub secrets as `VERCEL_TOKEN`

### 3. VERCEL_ORG_ID (Required for deployment)
- Run `vercel link` in your project directory
- Copy the org ID from `.vercel/project.json`
- Add to GitHub secrets as `VERCEL_ORG_ID`

### 4. VERCEL_PROJECT_ID (Required for deployment)
- Copy the project ID from `.vercel/project.json`
- Add to GitHub secrets as `VERCEL_PROJECT_ID`

## Environment Variables

The following environment variables may be needed based on your project:

```bash
# Development
NODE_ENV=development
DEBUG=true

# Production  
NODE_ENV=production
DEBUG=false
```

## Next Steps

1. Visit: https://github.com/KratosWolf/MyFirstBA/settings/secrets/actions
2. Add the required secrets listed above
3. Configure Vercel project linking
4. Test the deployment pipeline

## Automatic Configuration

Some secrets are automatically available:
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
- Repository access tokens are handled automatically

## Security Notes

- Never commit secrets to your repository
- Use environment-specific secrets for staging/production
- Regularly rotate your tokens
- Monitor secret usage in GitHub Actions logs