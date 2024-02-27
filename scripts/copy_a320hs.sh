#!/bin/bash

set -ex

#remove directory if it exist
rm -rf ./fbw-common

# copy from FBW COMMON source and HDW COMMON into one src
cp -ra ./flybywire/fbw-common/. ./fbw-common
cp -ra ./hsim-a320-common/. ./fbw-common
cp -ra ./hsim-common/. ./fbw-common

#remove directory if it exist
rm -rf ./build-a320ceo

# create directory
mkdir -p ./build-a320ceo/src
mkdir -p ./build-a320ceo/out

# copy from FBW A32NX source and A320HS into one src
cp -ra ./flybywire/fbw-a32nx/src/behavior/. ./build-a320ceo/src/behavior
cp -ra ./flybywire/fbw-a32nx/src/fonts/. ./build-a320ceo/src/fonts
cp -ra ./flybywire/fbw-a32nx/src/localization/. ./build-a320ceo/src/localization
cp -ra ./flybywire/fbw-a32nx/src/systems/. ./build-a320ceo/src/systems
cp -ra ./flybywire/fbw-a32nx/src/wasm/. ./build-a320ceo/src/wasm

# copy EWD
cp -ra ./flybywire/fbw-a32nx/src/systems/instruments/src/EWD/. ./build-a320ceo/src/systems/instruments/src/EWDcfm
cp -ra ./flybywire/fbw-a32nx/src/systems/instruments/src/EWD/. ./build-a320ceo/src/systems/instruments/src/EWDiae

# copy FMGC
cp -ra ./flybywire/fbw-a32nx/src/systems/fmgc/. ./build-a320ceo/src/systems/fmgcCFMSL
cp -ra ./flybywire/fbw-a32nx/src/systems/fmgc/. ./build-a320ceo/src/systems/fmgcIAE
cp -ra ./flybywire/fbw-a32nx/src/systems/fmgc/. ./build-a320ceo/src/systems/fmgcIAESL

cp -ra ./hsim-a320ceo/.env ./build-a320ceo/.env
cp -ra ./hsim-a320ceo/mach.config.js ./build-a320ceo/mach.config.js

cp -ra ./hsim-a320ceo/src/behavior/. ./build-a320ceo/src/behavior
cp -ra ./hsim-a320ceo/src/localization/. ./build-a320ceo/src/localization
cp -ra ./hsim-a320ceo/src/model/. ./build-a320ceo/src/model
cp -ra ./hsim-a320ceo/src/systems/. ./build-a320ceo/src/systems
cp -ra ./hsim-a320ceo/src/wasm/. ./build-a320ceo/src/wasm

mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo-lock-highlight

mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/CSS
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Fonts
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Images
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/JS
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/Airliners
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/FlightElements
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/NavSystems
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VLivery/Liveries/A320HS_Printer
mkdir -p ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VLivery/Liveries/A320HS_Registration

#cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/CSS/A320HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Fonts/A320HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Images/A320HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/JS/A320HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/A320HS_Core
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/A320HS_Utils
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/FlightElements/A320HS
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Ceo
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VLivery/Liveries/A320HS_Registration
cp -ra ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Printer/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/Pages/VLivery/Liveries/A320HS_Printer

# copy base of A320HS to out
cp -ra ./hsim-a320ceo/src/base/lvfr-horizonsim-airbus-a320-ceo/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo
cp -ra ./hsim-a320ceo/src/base/lvfr-horizonsim-airbus-a320-ceo-lock-highlight/. ./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo-lock-highlight

rm -rf ./build-a320ceo/src/systems/instruments/src/EWD

chmod +x ./build-a320ceo/src/wasm/fbw_a320/build.sh
chmod +x ./build-a320ceo/src/wasm/fadec_a320/build.sh
