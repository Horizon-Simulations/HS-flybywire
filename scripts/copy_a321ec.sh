#!/bin/bash

set -ex

#remove directory if it exist
rm -rvf ./build-common

# copy from FBW COMMON source and HDW COMMON into one src
cp -rva ./flybywire/fbw-common/. ./build-common
cp -rva ./hdw-common/. ./build-common

#remove directory if it exist
rm -rvf ./build-a321EC

# create directory
mkdir -p ./build-a321EC/src
mkdir -p ./build-a321EC/out

# copy from FBW A32NX source and A321EC into one src
cp -rva ./flybywire/fbw-a32nx/src/behavior/. ./build-a321EC/src/behavior
cp -rva ./flybywire/fbw-a32nx/src/fonts/. ./build-a321EC/src/fonts
cp -rva ./flybywire/fbw-a32nx/src/localization/. ./build-a321EC/src/localization
cp -rva ./flybywire/fbw-a32nx/src/systems/. ./build-a321EC/src/systems
cp -rva ./flybywire/fbw-a32nx/src/wasm/. ./build-a321EC/src/wasm

cp -rva ./qbt-a321ec/.env ./build-a321EC/.env
cp -rva ./qbt-a321ec/mach.config.js ./build-a321EC/mach.config.js

cp -rva ./qbt-a321ec/src/behavior/. ./build-a321EC/src/behavior
cp -rva ./qbt-a321ec/src/localization/. ./build-a321EC/src/localization
cp -rva ./qbt-a321ec/src/model/. ./build-a321EC/src/model
cp -rva ./qbt-a321ec/src/systems/. ./build-a321EC/src/systems
cp -rva ./qbt-a321ec/src/wasm/. ./build-a321EC/src/wasm

mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251-lock-highlight

mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/CSS
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Fonts
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Images
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/JS
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/Airliners
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/FlightElements
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/NavSystems
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VLivery/Liveries/Printer
mkdir -p ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VLivery/Liveries/Registration

cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/CSS/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Fonts/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Images/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/JS/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/A321EC_Core
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/A321EC_Utils
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/Airliners/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/FlightElements/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/NavSystems/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VLivery/Liveries/Registration/A321EC
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Printer ./build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VLivery/Liveries/Printer/A321EC

# copy base of A321EC to out
cp -rva ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251/. ./build-a321EC/out/qbitsim-aircraft-a321-251
cp -rva ./qbt-a321ec/src/base/qbitsim-aircraft-a321-251-lock-highlight/. ./build-a321EC/out/qbitsim-aircraft-a321-251-lock-highlight

chmod +x ./build-a321EC/src/wasm/fbw_a320/build.sh
chmod +x ./build-a321EC/src/wasm/fadec_a320/build.sh
chmod +x ./build-a321EC/src/wasm/flypad-backend/build.sh
