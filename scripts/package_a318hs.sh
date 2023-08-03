#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/. ./hsim-a318ceo/project/PackageSources

cd /external/hsim-a318ceo/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete
