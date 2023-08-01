#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/. ./hsim-a319ceo/src/project/PackageSources

cd /external/hsim-a319ceo/src/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete
