#!/bin/bash
tsc --module commonjs
ts-node node_modules/jasmine-node/bin/jasmine-node js/spec
# JASMINE_CONFIG_PATH=jasmine.json
# jasmine-node js/spec