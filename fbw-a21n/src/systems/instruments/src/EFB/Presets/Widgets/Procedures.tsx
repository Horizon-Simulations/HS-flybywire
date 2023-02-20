// Copyright (c) 2022 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

// These are defined in the presets' wasm C++ code and can be
// printed to the console by compiling the c++ with --debug
// The console output can then be easily pasted here and transformed to
// the correct syntax.
// WASM: src/flypad-backend/src/Aircraft/AircraftProcedures.h
export const StepDescription = new Map([
    [0, ''],
    [1035, 'APU Fire Test On'],
    [1010, 'BAT1 On'],
    [1020, 'BAT2 On'],
    [1030, 'EXT PWR On'],
    [1035, 'APU Fire Test On'],
    [1036, 'APU Fire Test Off'],
    [1036, 'APU Fire Test Off'],
    [1037, 'APU Fire Test Reset'],
    [1040, 'APU Master On'],
    [1041, 'APU Master On'],
    [1050, 'APU Start On'],
    [1051, 'APU Start On'],
    [1060, 'Waiting on AC BUS Availability'],
    [1065, 'Waiting on FWC Initialization'],
    [1066, 'FWC Init Reset'],
    [1070, 'Nav & Logo Lt On'],
    [1080, 'ADIRS 1 Nav'],
    [1090, 'ADIRS 2 Nav'],
    [1100, 'ADIRS 3 Nav'],
    [1110, 'GND CTL On'],
    [1115, 'CVR Test On'],
    [1116, 'CVR Test Off'],
    [1117, 'CVR Test Reset'],
    [1120, 'Crew Oxy On'],
    [1130, 'NO SMOKING Auto'],
    [1140, 'EMER EXT Lt Arm'],
    [1150, 'Waiting on APU Availability'],
    [1160, 'APU Bleed On'],
    [1170, 'NO SMOKING Off'],
    [1180, 'EMER EXT Lt Off'],
    [1190, 'Crew Oxy Off'],
    [1200, 'GND CTL Off'],
    [1210, 'ADIRS 3 Off'],
    [1220, 'ADIRS 2 Off'],
    [1230, 'ADIRS 1 Off'],
    [1240, 'Nav & Logo Lt Off'],
    [1250, 'APU Bleed Off'],
    [1260, 'APU Master Off'],
    [1270, 'EXT PWR Off'],
    [1280, 'BAT2 Off'],
    [1290, 'BAT1 Off'],
    [1300, 'AC BUS Off Check'],
    [2000, 'EXT PWR Off'],
    [2002, 'ENG 1 Fire Test On'],
    [2003, 'ENG 1 Fire Test Off'],
    [2004, 'ENG 2 Fire Test On'],
    [2005, 'ENG 2 Fire Test Off'],
    [2006, 'ENG 1 Fire Test Reset'],
    [2007, 'ENG 2 Fire Test Reset'],
    [2010, 'FUEL PUMP 2 On'],
    [2020, 'FUEL PUMP 5 On'],
    [2030, 'FUEL PUMP 1 On'],
    [2040, 'FUEL PUMP 4 On'],
    [2050, 'FUEL PUMP 3 On'],
    [2060, 'FUEL PUMP 6 On'],
    [2070, 'PWS Auto'],
    [2080, 'Transponder On'],
    [2090, 'ATC ALT RPTG On'],
    [2100, 'TCAS TRAFFIC ABV'],
    [2110, 'COCKPIT DOOR LCK'],
    [2120, 'Strobe Auto'],
    [2120, 'Strobe On'],
    [2125, 'Cabin Ready'],
    [2130, 'Beacon On'],
    [2140, 'SEAT BELTS On'],
    [2150, 'Await ADIRS 1 Alignment'],
    [2160, 'Await ADIRS 2 Alignment'],
    [2170, 'Await ADIRS 3 Alignment'],
    [2180, 'Strobe Auto'],
    [2180, 'Strobe Off'],
    [2190, 'Beacon Off'],
    [2200, 'SEAT BELTS Off'],
    [2210, 'PWS Off'],
    [2220, 'Transponder Off'],
    [2230, 'ATC ALT RPTG Off'],
    [2240, 'TCAS TRAFFIC ABV'],
    [2250, 'COCKPIT DOOR OP'],
    [2260, 'FUEL PUMP 2 Off'],
    [2270, 'FUEL PUMP 5 Off'],
    [2280, 'FUEL PUMP 1 Off'],
    [2290, 'FUEL PUMP 4 Off'],
    [2300, 'FUEL PUMP 3 Off'],
    [2310, 'FUEL PUMP 6 Off'],
    [3000, 'ENG MODE SEL START'],
    [3010, 'ENG 2 ON'],
    [3020, 'Await ENG 2 AVAIL'],
    [3030, 'ENG 1 ON'],
    [3040, 'Await ENG 1 AVAIL'],
    [3050, 'ENG MODE SEL NORM'],
    [3060, 'APU Bleed Off'],
    [3070, 'APU Master Off'],
    [3080, 'Autobrake Max'],
    [3080, 'TERR ON ND Capt. Off'],
    [3080, 'TERR ON ND Capt. On'],
    [3085, 'T.O. Config'],
    [3090, 'Spoiler Arm'],
    [3100, 'Rudder Trim Reset'],
    [3110, 'Flaps 1'],
    [3120, 'NOSE Lt Taxi'],
    [3130, 'RWY TURN OFF Lt L On'],
    [3140, 'RWY TURN OFF Lt R On'],
    [3150, 'NOSE Lt Taxi'],
    [3160, 'RWY TURN OFF Lt L Off'],
    [3170, 'RWY TURN OFF Lt R Off'],
    [3180, 'Autobrake Off'],
    [3190, 'Spoiler Disarm'],
    [3200, 'Rudder Trim Reset'],
    [3210, 'Flaps 0'],
    [3220, 'ENG 1 Off'],
    [3230, 'ENG 2 Off'],
    [3240, 'ENG 1 N1 <3'],
    [3250, 'ENG 2 N1 <3'],
    [4000, 'WX Radar On'],
    [4010, 'WX Radar Mode'],
    [4020, 'TCAS Switch TA/RA'],
    [4030, 'NOSE Lt Takeoff'],
    [4040, 'LL Lt L On'],
    [4050, 'LL Lt R On'],
    [4060, 'LL Lt L Off'],
    [4070, 'LL Lt R Off'],
    [4080, 'NOSE Lt Takeoff'],
    [4090, 'TCAS Switch TA/RA'],
    [4100, 'WX Radar Off'],
    [4110, 'WX Radar Mode'],
    [9999, 'Waiting...'],
]);
