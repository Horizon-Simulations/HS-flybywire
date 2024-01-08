import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import { getInstrumentsIgniterTasks } from "./build-a319ceo/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    new TaskOfTasks("A319HS", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks(
            "preparation",
            [
                //new ExecTask("copy-base-files", "npm run build-a319ceo:copy-base-files"),
                new ExecTask(
                    "copy-cargo-config",
                    "npm run build-a319ceo:copy-cargo-config"
                ),
                new TaskOfTasks(
                    "localization",
                    [
                        new ExecTask(
                            "efb-translation",
                            "npm run build-a319ceo:efb-translation"
                        ),
                        new ExecTask(
                            "locPak-translation",
                            "npm run build-a319ceo:locPak-translation"
                        ),
                    ],
                    true
                ),
            ],
            false
        ),

        // Group all typescript and react build tasks together.
        new TaskOfTasks(
            "build",
            [
                new ExecTask("model", "npm run build-a319ceo:model", [
                    "build-a319ceo/src/model",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/AirPlanes/A319ceoCFM/model",
                ]),
                new ExecTask("behavior", "npm run build-a319ceo:behavior", [
                    "build-a319ceo/src/behavior",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/ModelBehaviorDefs/A319HS/generated",
                ]),

                new TaskOfTasks("atsu", [
                    new ExecTask(
                        "common",
                        "npm run build-a319ceo:atsu-common",
                        [
                            "build-a319ceo/src/systems/atsu/common",
                            "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/JS/A319HS/atsu/common.js",
                        ]
                    ),
                    new ExecTask(
                        "fmsclient",
                        "npm run build-a319ceo:atsu-fms-client",
                        [
                            "build-a319ceo/src/systems/atsu/common",
                            "build-a319ceo/src/systems/atsu/fmsclient",
                            "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/JS/A319HS/atsu/fmsclient.js",
                        ]
                    ),
                ]),
                new ExecTask(
                    "extras-host",
                    "npm run build-a319ceo:extras-host",
                    [
                        "build-a319ceo/src/systems/extras-host",
                        "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VCockpit/Instruments/A319HS/ExtrasHost",
                    ]
                ),
                new ExecTask("failures", "npm run build-a319ceo:failures", [
                    "build-a319ceo/src/systems/failures",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/A319HS/failures/failures.js",
                ]),
                new ExecTask("fmgc", "npm run build-a319ceo:fmgc", [
                    "build-a319ceo/src/systems/fmgc",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/A319HS/fmgc",
                ]),
                new ExecTask("fmgcIAE", "npm run build-a319ceo:fmgcIAE", [
                    "build-a319ceo/src/systems/fmgcIAE",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/A319HS/fmgc",
                ]),
                new ExecTask("fmgcSL", "npm run build-a319ceo:fmgcSL", [
                    "build-a319ceo/src/systems/fmgcSL",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/A319HS/fmgc",
                ]),
                new ExecTask(
                    "sentry-client",
                    "npm run build-a319ceo:sentry-client",
                    [
                        "build-a319ceo/src/systems/sentry-client",
                        "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/A319HS/sentry-client",
                    ]
                ),
                new ExecTask(
                    "simbridge-client",
                    "npm run build-a319ceo:simbridge-client",
                    [
                        "build-a319ceo/src/systems/simbridge-client",
                        "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/A319HS/simbridge-client",
                    ]
                ),
                new ExecTask(
                    "systems-host",
                    "npm run build-a319ceo:systems-host",
                    [
                        "build-a319ceo/src/systems/systems-host",
                        "fbw-common/src/systems/datalink",
                        "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/Pages/VCockpit/Instruments/A319HS/SystemsHost",
                    ]
                ),
                new ExecTask("tcas", "npm run build-a319ceo:tcas", [
                    "build-a319ceo/src/systems/tcas",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/A319HS/tcas",
                ]),

                new TaskOfTasks(
                    "instruments",
                    getInstrumentsIgniterTasks(),
                    true
                ),
            ],
            true
        ),

        // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
        new TaskOfTasks(
            "wasm",
            [
                new ExecTask("fadec-cfm", "npm run build-a319ceo:fadec-cfm", [
                    "build-a319ceo/src/wasm/fadec_a319cfm",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/Airplanes/A319ceoCFM/panel/fadec.wasm",
                ]),
                new ExecTask("fadec-iae", "npm run build-a319ceo:fadec-iae", [
                    "build-a319ceo/src/wasm/fadec_a319iae",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/Airplanes/A319ceoIAE/panel/fadec.wasm",
                ]),
                new ExecTask("fbw", "npm run build-a319ceo:fbw", [
                    "build-a319ceo/src/wasm/fbw_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/Airplanes/A319ceoCFM/panel/fbw.wasm",
                ]),
                new ExecTask(
                    "systems-terronnd",
                    [
                        "npm run build-a319ceo:terronnd",
                    ],
                    [
                        "fbw-common/src/wasm/terronnd",
                        "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/Airplanes/A319ceoCFM/panel/terronnd.wasm",
                        "fbw-common/src/wasm/terronnd/out/terronnd.wasm",
                    ]
                ),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a319ceo:extra-backend-a32nx",
                    [
                        'fbw-common/src/wasm/cpp-msfs-framework',
                        'fbw-common/src/wasm/extra-backend',
                        "build-a319ceo/src/wasm/extra-backend-a32nx",
                        "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/Airplanes/A319ceoCFM/panel/extra-backend-a32nx.wasm",
                    ]
                ),
                new ExecTask("systems",
                "npm run build-a319ceo:systems",
                [
                    "build-a319ceo/src/wasm/systems",
                    "fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/Airplanes/A319ceoCFM/panel/systems.wasm"
                ]),
            ],
            true
        ),
        // Copy generated wasm to variants (as for now)
        new TaskOfTasks(
            "copy",
            [
                new ExecTask("model", "npm run build-a319ceo:copy-model"),
                new ExecTask("fadec-cfm", "npm run build-a319ceo:copy-fadec-cfm"),
                new ExecTask("fadec-iae", "npm run build-a319ceo:copy-fadec-iae"),
                new ExecTask("fbw", "npm run build-a319ceo:copy-fbw"),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a319ceo:copy-extra-backend-a32nx"
                ),
                new ExecTask("systems", "npm run build-a319ceo:copy-systems"),
                new ExecTask("terronnd", "npm run build-a319ceo:copy-terronnd"),
            ],
            true
        ),

        // Create final package meta files.
        new TaskOfTasks(
            "dist",
            [
                new ExecTask("metadata", "npm run build-a319ceo:metadata"),
                new ExecTask("manifests", "npm run build-a319ceo:manifest"),
            ],
            true
        ),
    ]),
]);
