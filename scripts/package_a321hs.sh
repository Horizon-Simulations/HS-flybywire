#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/. ./hsim-a321neo/src/project/PackageSources

cd /external/hsim-a321neo/src/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete
