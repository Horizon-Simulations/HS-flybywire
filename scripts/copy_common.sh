#!/bin/bash

set -ex

#remove directory if it exist
rm -rvf ./fbw-common

# copy from FBW COMMON source and HDW COMMON into one src
cp -rva ./flybywire/fbw-common/. ./fbw-common
cp -rva ./hs-common/. ./fbw-common