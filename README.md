# autotests
web app e2e autotest framework (playwright + ts)

## Run tests
> npm test

## Setting environment
If you want to run tests with special environment you can use NODE_ENV parameter.

Example for Windows Powershell:
> $env:NODE_ENV="development"
> npm test

## Setting env parameters
> $env:BASE_URL="https://example.com"
> npm test

## Add your env file
Create .env file. Set parameters with your values. Use the .env.example from this repo.
