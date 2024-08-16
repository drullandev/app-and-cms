# Makefile for Ionic React with TypeScript

# Define variables
PROJECT_NAME := my-ionic-app
NODE_MODULES := node_modules

# Define commands
NPM := npm
YARN := yarn
TS := tsc
VITE := vite
E2E_TEST := cypress run
UNIT_TEST := vitest
LINT := eslint

# Phony targets
.PHONY: all install dev build preview test lint clean

# Default target
all: dev

# Install dependencies
install:
	@echo "Installing dependencies..."
	$(NPM) install

# Run development server
dev:
	@echo "Starting development server..."
	$(VITE)

# Build the project
build:
	node ./src/components/_Ionic/generateComponents.cjs
	@echo "Building the project..."
	$(TS) && $(VITE) build

# Preview the build
preview:
	@echo "Previewing the build..."
	$(VITE) preview

# Run end-to-end tests
test.e2e:
	@echo "Running end-to-end tests..."
	$(E2E_TEST)

# Run unit tests
test.unit:
	@echo "Running unit tests..."
	$(UNIT_TEST)

# Lint the project
lint:
	@echo "Linting the project..."
	$(LINT)

# Clean up build artifacts
clean:
	@echo "Cleaning up..."
	rm -rf dist
	rm -rf .cache
	rm -rf coverage

# Help command
help:
	@echo "Available commands:"
	@echo "  make install         Install dependencies"
	@echo "  make dev             Start development server"
	@echo "  make build           Build the project"
	@echo "  make preview         Preview the build"
	@echo "  make test.e2e        Run end-to-end tests"
	@echo "  make test.unit       Run unit tests"
	@echo "  make lint            Lint the project"
	@echo "  make clean           Clean up build artifacts"
	@echo "  make help            Display this help message"
