# Makefile for Ionic React with TypeScript and Docker

# Phony targets: Declare non-file targets
.PHONY: all install dev build preview test lint clean help

env := development

# Node related commands
install:  ## Install project dependencies using npm
	@echo "Installing dependencies..."
	npm install

outdated:  ## Check for outdated dependencies
	@echo "Checking for outdated dependencies..."
	npm outdated

dev:  ## Run development server with Vite
	@echo "Starting development server..."
	nvm use 22
	make install
	vite

build-ts:  ## Compile TypeScript files
	@echo "Building TypeScript files..."
	npx tsc

build:  ## Build the project: Compile TypeScript and build with Vite
	@echo "Building the project..."
	make build-ts
	npx vite build

ionic-build:  ## Build the project with Ionic
	npm run ionic:build

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
	@echo "Cleaning up node_modules and other build artifacts..."
	sudo rm -rf node_modules package-lock.json
	sudo rm -rf dist
	sudo rm -rf .cache
	sudo rm -rf coverage
	npm cache clean --force

zip:  ## Compress the app excluding node_modules
	@zip -r ../app.zip . -x "node_modules/*"

# Docker related commands
config:  ## Check if your environment is properly configured
	@docker-compose config

docker:  ## Start Docker with the specified environment configuration
	@docker-compose build --no-cache
	make docker-up

docker-up:  ## Start Docker with production environment configuration
	@docker-compose up

down:  ## Shut down Docker, removing images, volumes, and orphan containers
	@docker-compose down --rmi all --volumes --remove-orphans

clean-docker:  ## Clean up Docker artifacts
	@echo "Cleaning up Docker containers, images, volumes, and networks..."
	@docker stop $(docker ps -q) || true
	@docker rm $(docker ps -a -q) || true
	@docker rmi $(docker images -q) || true
	@docker volume rm $(docker volume ls -q) || true
	@docker network rm $(docker network ls -q) || true
	@docker system prune --all --volumes -f || true

refresh-all:  ## Refresh the local environment and rebuild Docker
	make down
	make clean
	make docker
	make install

# Help target to dynamically generate the help output based on descriptions
help:  ## Display this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
