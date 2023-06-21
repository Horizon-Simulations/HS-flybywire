#!/bin/bash

set -ex

cp -rva ./hsim-a318ceo/src/project/PackageSources/SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel/. ./qbt-a321ec/src/base/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel/
rm -rvf ./hsim-a318ceo/src/base/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel/fadec.wasm
rm -rvf ./hsim-a318ceo/src/base/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel/fbw.wasm
rm -rvf ./hsim-a318ceo/src/base/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel/flypad-backend.wasm
rm -rvf ./hsim-a318ceo/src/base/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel/systems.wasm
rm -rvf ./hsim-a318ceo/src/base/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel/terronnd.wasm
