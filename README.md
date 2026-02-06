# wavebinder-robot-example

This repository is a **basic example project** showing how to use the **Wavebinder™ library** in a simple frontend application. It is *not* a full production app, but a reference to understand how Wavebinder integrates with a UI project.

## What this is

`wavebinder-robot-example` is an Angular application scaffolded with the Angular CLI. It demonstrates how to include and initialize the **wavebinder** library and run a minimal example setup.

It’s intended as a quick starting point for developers who want to explore Wavebinder in a real application context without the overhead of a full custom project.

## Why it exists

Wavebinder is designed to simplify complex data relationships in reactive applications by modeling data as graph nodes and handling dependencies via RxJS.

This example shows:

* a minimal Angular project that imports and uses Wavebinder
* basic structure of components and services interacting via Wavebinder
* how to run the app locally

## Features (example only)

* Angular-based frontend scaffold
* Wavebinder integrated in the app setup
* Demonstrates basic project structure and usage
* Serves as a template/reference for custom integrations

## Quick start

### Requirements

* Node.js (LTS recommended)
* npm or yarn
* Angular CLI (optional)

### Install

```bash
git clone https://github.com/wavebinder/wavebinder-robot-example.git
cd wavebinder-robot-example
npm install
```

### Run locally

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser.

## Project structure

```text
src/                # Angular app source
  app/              # Angular components and services
  assets/           # Static assets
angular.json        # Angular CLI configuration
package.json        # Dependencies and scripts
```

The project follows standard Angular CLI conventions.

## Notes

* This repository contains **example code only**.
* It is intentionally simple and not production-hardened.
* No specific Wavebinder architecture is enforced; adapt it freely to your needs.

## References

* Wavebinder™ official site: [https://wavebinder.it](https://wavebinder.it)
