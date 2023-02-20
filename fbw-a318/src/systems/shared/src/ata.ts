// Copyright (c) 2022 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
export const AtaChaptersTitle = {
    0: 'General',
    1: 'Maintenance Policy',
    2: 'Operations',
    3: 'Support',
    4: 'Airworthiness Limitations',
    5: 'Time Limits/Maintenance Checks',
    6: 'Dimensions And Areas',
    7: 'Lifting And Shoring',
    8: 'Leveling And Weighing',
    9: 'Towing And Taxiing',
    10: 'Parking, Mooring, Storage And Return To Service',
    11: 'Placards And Markings',
    12: 'Servicing',
    13: 'Hardware And General Tools',
    15: 'Aircrew Information',
    16: 'Change Of Role',
    18: 'Vibration And Noise Analysis (Helicopter Only)',
    20: 'Standard Practices- Airframe',
    21: 'Air Conditioning',
    22: 'Auto Flight',
    23: 'Communication',
    24: 'Electrical Power',
    25: 'Equipment /Furnishings',
    26: 'Fire Protection',
    27: 'Flight Controls',
    28: 'Fuel',
    29: 'Hydraulic Power',
    30: 'Ice And Rain Protection',
    31: 'Indicating / Recording System',
    32: 'Landing Gear',
    33: 'Lights',
    34: 'Navigation',
    35: 'Oxygen',
    36: 'Pneumatic',
    37: 'Vacuum',
    38: 'Water / Waste',
    39: 'Electrical - Electronic Panels And Multipurpose Components',
    40: 'Multisystem',
    41: 'Water Ballast',
    42: 'Integrated Modular Avionics',
    44: 'Cabin Systems',
    45: 'Onboard Maintenance Systems (Oms)',
    46: 'Information Systems',
    47: 'Inert Gas System',
    48: 'In Flight Fuel Dispensing',
    49: 'Airborne Auxiliary Power',
    50: 'Cargo And Accessory Compartments',
    51: 'Standard Practices And Structures - General',
    52: 'Doors',
    53: 'Fuselage',
    54: 'Nacelles/Pylons',
    55: 'Stabilizers',
    56: 'Windows',
    57: 'Wings',
    60: 'Standard Practices - Prop./Rotor',
    61: 'Propellers/ Propulsors',
    62: 'Main Rotor(S)',
    63: 'Main Rotor Drive(S)',
    64: 'Tail Rotor',
    65: 'Tail Rotor Drive',
    66: 'Folding Blades/Pylon',
    67: 'Rotors Flight Control',
    71: 'Power Plant',
    72: 'Engine',
    73: 'Engine - Fuel And Control',
    74: 'Ignition',
    75: 'Bleed Air',
    76: 'Engine Controls',
    77: 'Engine Indicating',
    78: 'Exhaust',
    79: 'Oil',
    80: 'Starting',
    81: 'Turbines (Reciprocating Engines)',
    82: 'Water Injection',
    83: 'Accessory Gear Box (Engine Driven)',
    84: 'Propulsion Augmentation',
    91: 'Charts',
    92: 'Electrical Power Multiplexing',
    93: 'Surveillance',
    94: 'Weapon System',
    95: 'Crew Escape And Safety',
    96: 'Missiles, Drones And Telemetry',
    97: 'Wiring Reporting',
    98: 'Meteorological And Atmospheric Research',
    99: 'Electronic Warfare System',
    115: 'Flight Simulator Systems',
    116: 'Flight Simulator Cuing System',
};

export const AtaChaptersDescription = Object.freeze({
    22: 'The Autoflight systems are responsible for a multitude of functions, including but not limited to: Flight Guidance (AP, FD, A/THR), Flight Management, Flight Augmentation (yaw damper, etc.), and Flight Envelope (Speed scale, Alpha floor, etc.).',
    24: 'All things related to the electrical system. The electrical system supplies power from the engines, APU, batteries, or emergency generator to all cockpit instruments.',
    27: 'The flight controls contain the various systems used to control the aircraft in flight, such as control surfaces, but also flight control computers. Failure of these systems may lead to loss of control over the aircraft, and/or loss of information about the status of the flight controls.',
    29: 'The hydraulic system connects to the flight controls, flaps and landing gear to provide pressure to these surfaces. Failing these can cause loss of control over some flight surfaces.',
    31: 'The cockpit displays give critical flight information to the pilots. In a failure where displays are lost, the pilots must deal with a lack of flight data given to them.',
    32: 'The landing gear components are responsible for supporting and steering the aircraft on the ground, and make it possible to retract and store the landing gear in flight. Includes the functioning and maintenance aspects of the landing gear doors.',
    34: 'The navigation systems provide data about the position, speed, heading, and altitude of the aircraft. Failures in a system such as the ADIRS can cause a loss of data sent to instrumentation.',
});

export type AtaChapterNumber = keyof typeof AtaChaptersTitle;
