# generator-node-utils [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

>

## Prerequisites

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node with npm](https://github.com/creationix/nvm#install-script)
- [Yeoman](https://yeoman.io)
  - Install `npm install -g yo`

## Getting Started

1. Install `npm install -g generator-node-utils`
2. Run `yo node-utils`
3. Pick your options

## Running Local

1. Clone this repository
2. Move to root folder and run `npm link`
3. Run `yo node-utils`

(Note: Any local changes are automatically refreshed)

## Add new tool

1. Check the [JSON schema file](test/utils/schemas/tool_schema.json)
2. You have to modify [tools file](generators/app/tools.json) and add a new key with the new tool information
3. Add the templates files in [this](generators/app/templates) folder
4. Run `npm test` for check that all is working (not need of add a new test with each tool, it's generated from tools file)


## License

**generator-node-utils** is available under the MIT [license](LICENSE.md).
