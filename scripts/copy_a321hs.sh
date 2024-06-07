#!/bin/bash

set -ex

#remove directory if it exist
rm -rf ./fbw-common

# copy from FBW COMMON source and HDW COMMON into one src
cp -ra ./flybywire/fbw-common/. ./fbw-common
cp -ra ./hsim-a21n-common/. ./fbw-common
cp -ra ./hsim-common/. ./fbw-common

#remove directory if it exist
rm -rf ./build-a321neo

# create directory
mkdir -p ./build-a321neo/src
mkdir -p ./build-a321neo/out

# copy from FBW A32NX source and A21NHS into one src
cp -ra ./flybywire/fbw-a32nx/src/behavior/. ./build-a321neo/src/behavior
cp -ra ./flybywire/fbw-a32nx/src/fonts/. ./build-a321neo/src/fonts
cp -ra ./flybywire/fbw-a32nx/src/localization/. ./build-a321neo/src/localization
cp -ra ./flybywire/fbw-a32nx/src/systems/. ./build-a321neo/src/systems
cp -ra ./flybywire/fbw-a32nx/src/wasm/. ./build-a321neo/src/wasm

#copy FMGC
cp -ra ./flybywire/fbw-a32nx/src/systems/fmgc/. ./build-a321neo/src/systems/fmgcPW

cp -ra ./hsim-a321neo/.env ./build-a321neo/.env
cp -ra ./hsim-a321neo/mach.config.js ./build-a321neo/mach.config.js

cp -ra ./hsim-a321neo/src/behavior/. ./build-a321neo/src/behavior
cp -ra ./hsim-a321neo/src/localization/. ./build-a321neo/src/localization
cp -ra ./hsim-a321neo/src/model/. ./build-a321neo/src/model
cp -ra ./hsim-a321neo/src/systems/. ./build-a321neo/src/systems
cp -ra ./hsim-a321neo/src/wasm/. ./build-a321neo/src/wasm

mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo-lock-highlight

mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/CSS
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Fonts
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Images
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/JS
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/Airliners
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/FlightElements
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/NavSystems
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VLivery/Liveries/A21NHS_Printer
mkdir -p ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VLivery/Liveries/A21NHS_Registration

#cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/CSS/A21NHS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Fonts/A21NHS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Images/A21NHS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/JS/A21NHS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/A21NHS_Core
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/A21NHS_Utils
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/FlightElements/A21NHS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A321_Neo
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VLivery/Liveries/A21NHS_Registration
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Printer/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/Pages/VLivery/Liveries/A21NHS_Printer

# copy base of A21NHS to out
cp -ra ./hsim-a321neo/src/base/lvfr-horizonsim-airbus-a321-neo/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo
cp -ra ./hsim-a321neo/src/base/lvfr-horizonsim-airbus-a321-neo-lock-highlight/. ./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo-lock-highlight

chmod +x ./build-a321neo/src/wasm/fbw_a320/build.sh
chmod +x ./build-a321neo/src/wasm/fadec_a320leap/build.sh
chmod +x ./build-a321neo/src/wasm/fadec_a320pw/build.sh
