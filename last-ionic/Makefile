# Makefile for Ionic React with TypeScript

# Phony targets: Declare non-file targets
.PHONY: all install dev build preview test lint clean help

env := development

up:  ## Start the project in development mode
	make docker-up

start:  ## Install dependencies and start the project
	npm run dev

config:  ## Check if your environment is properly configured
	@docker-compose config

docker:  ## Start Docker with the specified environment configuration
	make clean-docker
	docker-compose build --no-cache
	make docker-up

docker-up:  ## Start Docker with production environment configuration
	@docker-compose up

down:  ## Shut down Docker, removing images, volumes, and orphan containers
	@docker-compose down --rmi all --volumes --remove-orphans

install:  ## Install project dependencies using npm
	@echo "Installing dependencies..."
	npm install

outdated:  ## Check for outdated dependencies
	@echo "Checking for outdated dependencies..."
	npm outdated

dev:  ## Run development server with Vite
	@echo "Starting development server..."
	nvm use 22
	vite

build-ts:  ## Compile TypeScript files
	@echo "Building TypeScript files..."
	npx tsc	

build:  ## Build the project: Compile TypeScript and build with Vite
	@echo "Building the project..."
	make build-files
	npm run build-ts && npx vite build

ionic-build:  ## Build the project with Ionic
	npm run ionic:build

build2:  ## Build the project using Webpack
	npm run build2

electron:  ## Build the project for Electron
	npm run electron

electron-build:  ## Build the project for Electron and run Electron Builder
	npm run electron-build

test:  ## Run unit and e2e tests
	make test-all

test-all:  ## Run all tests
	make test.e2e
	make test.unit

test.e2e:  ## Run end-to-end tests
	npm run test.e2e

test.unit:  ## Run unit tests
	npm run test.unit

lint:  ## Lint the project using ESLint
	npm run lint

format:  ## Format the code using Prettier
	npm run format

precommit:  ## Run Prettier formatting and lint-staged before commit
	npm run precommit

prepare:  ## Prepare Husky hooks for Git
	npm run prepare

# Clean up build artifacts
clean:  ## Clean up build artifacts (dist, cache, coverage)
	@echo "Cleaning up..."
	rm -rf dist
	rm -rf .cache
	rm -rf coverage

clean-docker:  ## Clean up Docker artifacts
	@docker stop $(docker ps -q) || true
	@docker rm $(docker ps -a -q) || true
	@docker rmi $(docker images -q) || true
	@docker volume rm $(docker volume ls -q) || true
	@docker network rm $(docker network ls -q) || true
	@docker system prune --all --volumes -f || true

zip:  ## Compress the app excluding node_modules
	@zip -r ../app.zip . -x "node_modules/*"	

refresh-all:  ## Refresh the local environment and rebuild Docker
	rm -rf node_modules package-lock.json
	docker-compose build --no-cache
	npm install
	make clean-docker
	docker-compose up

# Help target to dynamically generate the help output based on descriptions
help:  ## Display this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
