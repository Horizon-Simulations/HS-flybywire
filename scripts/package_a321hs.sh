#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./build-a321nneo/out/lvfr-horizonsim-airbus-a321-neo/. ./hsim-a321nneo/src/project/PackageSources

cd /external/hsim-a321nneo/src/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete
