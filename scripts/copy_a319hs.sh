#!/bin/bash

set -ex

#remove directory if it exist
rm -rf ./fbw-common

# copy from FBW COMMON source and HDW COMMON into one src
cp -ra ./flybywire/fbw-common/. ./fbw-common
cp -ra ./hsim-a319-common/. ./fbw-common

#remove directory if it exist
rm -rf ./build-a319ceo

# create directory
mkdir -p ./build-a319ceo/src
mkdir -p ./build-a319ceo/out

# copy from FBW A32NX source and A319HS into one src
cp -ra ./flybywire/fbw-a32nx/src/behavior/. ./build-a319ceo/src/behavior
cp -ra ./flybywire/fbw-a32nx/src/fonts/. ./build-a319ceo/src/fonts
cp -ra ./flybywire/fbw-a32nx/src/localization/. ./build-a319ceo/src/localization
cp -ra ./flybywire/fbw-a32nx/src/systems/. ./build-a319ceo/src/systems
cp -ra ./flybywire/fbw-a32nx/src/wasm/. ./build-a319ceo/src/wasm

# copy EWD
cp -ra ./flybywire/fbw-a32nx/src/systems/instruments/src/EWD/. ./build-a319ceo/src/systems/instruments/src/EWDcfm
cp -ra ./flybywire/fbw-a32nx/src/systems/instruments/src/EWD/. ./build-a319ceo/src/systems/instruments/src/EWDiae

# copy FMGC
cp -ra ./flybywire/fbw-a32nx/src/systems/fmgc/. ./build-a319ceo/src/systems/fmgcIAE
cp -ra ./flybywire/fbw-a32nx/src/systems/fmgc/. ./build-a319ceo/src/systems/fmgcSL

cp -ra ./hsim-a319ceo/.env ./build-a319ceo/.env
cp -ra ./hsim-a319ceo/mach.config.js ./build-a319ceo/mach.config.js

cp -ra ./hsim-a319ceo/src/behavior/. ./build-a319ceo/src/behavior
cp -ra ./hsim-a319ceo/src/localization/. ./build-a319ceo/src/localization
cp -ra ./hsim-a319ceo/src/model/. ./build-a319ceo/src/model
cp -ra ./hsim-a319ceo/src/systems/. ./build-a319ceo/src/systems
cp -ra ./hsim-a319ceo/src/wasm/. ./build-a319ceo/src/wasm

# copy common modules into A319HS build
cp -ra ./hsim-common/src/systems/. ./build-a319ceo/src/systems

mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo-lock-highlight

mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/CSS
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Fonts
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Images
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/JS
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VCockpit/Instruments/Airliners
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VCockpit/Instruments/FlightElements
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VCockpit/Instruments/NavSystems
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VLivery/Liveries/A319HS_Printer
mkdir -p ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VLivery/Liveries/A319HS_Registration

#cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/CSS/A319HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Fonts/A319HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Images/A319HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/JS/A319HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/A319HS_Core
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/A319HS_Utils
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VCockpit/Instruments/FlightElements/A319HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VCockpit/Instruments/NavSystems/A319_Ceo
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VLivery/Liveries/A319HS_Registration
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Printer/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VLivery/Liveries/A319HS_Printer

# copy base of A319HS to out
cp -ra ./hsim-a319ceo/src/base/lvfr-horizonsim-airbus-a319-ceo/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo
cp -ra ./hsim-a319ceo/src/base/lvfr-horizonsim-airbus-a319-ceo-lock-highlight/. ./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo-lock-highlight

rm -rf ./build-a319ceo/src/systems/instruments/src/EWD

chmod +x ./build-a319ceo/src/wasm/fbw_a320/build.sh
chmod +x ./build-a319ceo/src/wasm/fadec_a320/build.sh
