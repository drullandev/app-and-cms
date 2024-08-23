# Makefile for Ionic React with TypeScript

# Define variables
PROJECT_NAME := my-ionic-app
NODE_MODULES := node_modules

# Define commands
NPM := npm
NPM_START := npm run dev
YARN := yarn
NODE := yarn
TS := tsc
TS_NODE := ts-node
VITE := vite
E2E_TEST := cypress run
UNIT_TEST := vitest
LINT := eslint

# Phony targets
.PHONY: all install dev build preview test lint clean

up:
start: 
	$(NPM_START)

# Default target
all: dev

# Install dependencies
install:
	@echo "Installing dependencies..."
#brew install openjdk@17
	$(NPM) install

outdated:
	@echo "Checking for outdated dependencies..."
	npm outdated

# Run development server
dev:
	@echo "Starting development server..."
	$(VITE)

build-translations:
	$(node) ./src/classes/scripts/TranslationsKeeper.cjs

build-files:
	node ./src/components/_Ionic/generateComponents.cjs
	
# Build the project
build:
	make build-files
	@echo "Building the project..."
	$(TS) && $(VITE) build

# Preview the build
preview:
	@echo "Previewing the build..."
	$(VITE) preview

test:
test-all:
	make test.e2e
	make test.unit

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
