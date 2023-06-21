#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./build-a321EC/out/qbitsim-aircraft-a321-251/. ./qbt-a321ec/src/project/PackageSources

cd /external/qbt-a321ec/src/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete
