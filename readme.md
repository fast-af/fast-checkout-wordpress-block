# Fast.co Gutenberg Blocks Plugin

## Requirements

- WordPress 5.8+
- PHP 7.2 or later, [Composer](https://getcomposer.org) and [Node.js](https://nodejs.org) for dependency management.
- [Docker](https://docs.docker.com/install/) for a local development environment.

## WordPress plugin directory

The plugin is currently _not_ published in the WordPress plugin directory.

Follow the [detailed instructions](https://developer.wordpress.org/plugins/wordpress-org/) in order to publish and maintain it.

## Development

1. Clone the plugin repository.

2. Setup the development environment and tools using [Node.js](https://nodejs.org) and [Composer](https://getcomposer.org):

        npm install

    Note that both Node.js and PHP 7.2 or later are required on your computer for running the `npm` scripts. Use `npm run docker -- npm install` to run the installer inside a Docker container if you don't have the required version of PHP installed locally.

## Development Environment

This repository includes a WordPress development environment based on [Docker](https://docs.docker.com/install/) that can be run on your computer.

### Using Native Docker

To use the Docker based environment with the Docker engine running on your host, run:

    docker-compose up -d

which will make it available at [localhost](http://localhost). Ensure that no other Docker containers or services are using port 80 on your machine.

Use the included wrapper command for running scripts inside the Docker container:

    npm run docker -- npm run test:php

where `npm run test:php` is any of the scripts you would like to run.

Visit [localhost:8025](http://localhost:8025) to check all emails sent by WordPress.

### Scripts

We use `npm` as the canonical task runner for the project. Some of the PHP related scripts are defined in `composer.json`.

All of these commands can be run inside the Docker or Vagrant environments by prefixing the scripts with `npm run docker --` for Docker or with `npm run vagrant --` for Vagrant.

- `npm run build` to build the plugin JS and CSS assets. Use `npm run dev` to watch and re-build as you work.

- `npm run lint` to lint both PHP and JS files. Use `npm run lint:js` and `npm run lint:php` to lint JS and PHP seperately.
