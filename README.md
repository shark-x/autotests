# autotests
web app e2e autotest framework (playwright + ts)

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

## Projects scripts 
- Run tests.
> npm test
- Check and fix style code errors.
> npm run lint 
- Print eslint's rules. Check result in result.json.
> npm run print_rules

## ESLINT
For checking "dummy" rules set system var TIMING=1 and run linter.
> $env:TIMING=1

> npm run lint
