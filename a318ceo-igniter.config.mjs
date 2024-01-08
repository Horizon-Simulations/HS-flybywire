import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import { getInstrumentsIgniterTasks } from "./build-a318ceo/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    new TaskOfTasks("A318HS", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks(
            "preparation",
            [
                //new ExecTask("copy-base-files", "npm run build-a318ceo:copy-base-files"),
                new ExecTask(
                    "copy-cargo-config",
                    "npm run build-a318ceo:copy-cargo-config"
                ),
                new TaskOfTasks(
                    "localization",
                    [
                        new ExecTask(
                            "efb-translation",
                            "npm run build-a318ceo:efb-translation"
                        ),
                        new ExecTask(
                            "locPak-translation",
                            "npm run build-a318ceo:locPak-translation"
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
                new ExecTask("model", "npm run build-a318ceo:model", [
                    "build-a318ceo/src/model",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/SimObjects/AirPlanes/A318ceoCFM/model",
                ]),
                new ExecTask("behavior", "npm run build-a318ceo:behavior", [
                    "build-a318ceo/src/behavior",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/ModelBehaviorDefs/A318HS/generated",
                ]),

                new TaskOfTasks("atsu", [
                    new ExecTask(
                        "common",
                        "npm run build-a318ceo:atsu-common",
                        [
                            "build-a318ceo/src/systems/atsu/common",
                            "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/atsu/common.js",
                        ]
                    ),
                    new ExecTask(
                        "fmsclient",
                        "npm run build-a318ceo:atsu-fms-client",
                        [
                            "build-a318ceo/src/systems/atsu/common",
                            "build-a318ceo/src/systems/atsu/fmsclient",
                            "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/atsu/fmsclient.js",
                        ]
                    ),
                ]),
                new ExecTask(
                    "extras-host",
                    "npm run build-a318ceo:extras-host",
                    [
                        "build-a318ceo/src/systems/extras-host",
                        "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/Pages/VCockpit/Instruments/A318HS/ExtrasHost",
                    ]
                ),
                new ExecTask("failures", "npm run build-a318ceo:failures", [
                    "build-a318ceo/src/systems/failures",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/failures/failures.js",
                ]),
                new ExecTask("fmgc", "npm run build-a318ceo:fmgc", [
                    "build-a318ceo/src/systems/fmgc",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/fmgc",
                ]),
                new ExecTask(
                    "sentry-client",
                    "npm run build-a318ceo:sentry-client",
                    [
                        "build-a318ceo/src/systems/sentry-client",
                        "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/sentry-client",
                    ]
                ),
                new ExecTask(
                    "simbridge-client",
                    "npm run build-a318ceo:simbridge-client",
                    [
                        "build-a318ceo/src/systems/simbridge-client",
                        "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/simbridge-client",
                    ]
                ),
                new ExecTask(
                    "systems-host",
                    "npm run build-a318ceo:systems-host",
                    [
                        "build-a318ceo/src/systems/systems-host",
                        "fbw-common/src/systems/datalink",
                        "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/Pages/VCockpit/Instruments/A318HS/SystemsHost",
                    ]
                ),
                new ExecTask("tcas", "npm run build-a318ceo:tcas", [
                    "build-a318ceo/src/systems/tcas",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/tcas",
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
                new ExecTask("fadec", "npm run build-a318ceo:fadec", [
                    "build-a318ceo/src/wasm/fadec_a318cfm",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/A318ceoCFM/panel/fadec.wasm",
                ]),
                new ExecTask("fbw", "npm run build-a318ceo:fbw", [
                    "build-a318ceo/src/wasm/fbw_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/A318ceoCFM/panel/fbw.wasm",
                ]),
                new ExecTask(
                    "systems-terronnd",
                    [
                        "npm run build-a318ceo:terronnd",
                    ],
                    [
                        "fbw-common/src/wasm/terronnd",
                        "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/A318ceoCFM/panel/terronnd.wasm",
                        "fbw-common/src/wasm/terronnd/out/terronnd.wasm",
                    ]
                ),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a318ceo:extra-backend-a32nx",
                    [
                        'fbw-common/src/wasm/cpp-msfs-framework',
                        'fbw-common/src/wasm/extra-backend',
                        "build-a318ceo/src/wasm/extra-backend-a32nx",
                        "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/A318ceoCFM/panel/extra-backend-a32nx.wasm",
                    ]
                ),
                new ExecTask("systems",
                "npm run build-a318ceo:systems",
                [
                    "build-a318ceo/src/wasm/systems",
                    "fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/A318ceoCFM/panel/systems.wasm"
             ]),
            ],
            true
        ),
        // Copy generated wasm to variants (as for now)
        new TaskOfTasks(
            "copy",
            [
                new ExecTask("model", "npm run build-a318ceo:copy-model"),
                new ExecTask("fadec", "npm run build-a318ceo:copy-fadec"),
                new ExecTask("fbw", "npm run build-a318ceo:copy-fbw"),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a318ceo:copy-extra-backend-a32nx"
                ),
                new ExecTask("systems", "npm run build-a318ceo:copy-systems"),
                new ExecTask("terronnd", "npm run build-a318ceo:copy-terronnd"),
            ],
            true
        ),

        // Create final package meta files.
        new TaskOfTasks(
            "dist",
            [
                new ExecTask("metadata", "npm run build-a318ceo:metadata"),
                new ExecTask("manifests", "npm run build-a318ceo:manifest"),
            ],
            true
        ),
    ]),
]);
