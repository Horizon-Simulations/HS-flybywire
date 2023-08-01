#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/. ./hsim-a320ceo/src/project/PackageSources

cd /external/hsim-a320ceo/src/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete
