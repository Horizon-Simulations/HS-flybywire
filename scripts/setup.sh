#!/bin/bash

set -ex

git config --global --add safe.directory "*"

# initialize submodule (flybywire)
git submodule update --init --recursive flybywire

cd /external
rm -rf node_modules
npm ci