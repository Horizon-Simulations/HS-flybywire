#!/bin/bash

set -ex

cp -rva ./qbt-a321ec/src/project/PackageSources/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/. ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/
rm -rvf ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/fadec.wasm
rm -rvf ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/fbw.wasm
rm -rvf ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/flypad-backend.wasm
rm -rvf ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/systems.wasm
rm -rvf ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/terronnd.wasm
