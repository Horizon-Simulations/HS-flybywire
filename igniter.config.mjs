import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import { getInstrumentsIgniterTasks } from "./fbw-a21n/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    // A21N Task
    new TaskOfTasks("a21n", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks("preparation", [
            new ExecTask("copy-base-files", "npm run build-a21n:copy-base-files"),
            new ExecTask("efb-translation", "npm run build-a21n:efb-translation")
        ], true),

        // Group all typescript and react build tasks together.
        new TaskOfTasks("build", [
            new ExecTask("model",
                "npm run build-a21n:model",
                [
                    "fbw-a21n/src/model",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/SimObjects/AirPlanes/A321neoLEAP/model",
                ]),
            new ExecTask("behavior",
                "npm run build-a21n:behavior",
                [
                    "fbw-a21n/src/behavior",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/ModelBehaviorDefs/a21n/generated"
                ]),

            new ExecTask("atsu",
                "npm run build-a21n:atsu",
                [
                    "fbw-a21n/src/systems/atsu",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/atsu"
                ]),
            new ExecTask("failures",
                "npm run build-a21n:failures",
                [
                    "fbw-a21n/src/systems/failures",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/failures/failures.js"
                ]),
            new ExecTask("fmgc",
                "npm run build-a21n:fmgc",
                [
                    "fbw-a21n/src/systems/fmgc",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/fmgc"
                ]),
            new ExecTask("sentry-client",
                "npm run build-a21n:sentry-client",
                [
                    "fbw-a21n/src/systems/sentry-client",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/sentry-client"
                ]),
            new ExecTask("simbridge-client",
                "npm run build-a21n:simbridge-client",
                [
                    "fbw-a21n/src/systems/simbridge-client",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/simbridge-client"
                ]),
            new ExecTask("tcas",
                "npm run build-a21n:tcas",
                [
                    "fbw-a21n/src/systems/tcas",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/tcas"
                ]),

            new TaskOfTasks("instruments", getInstrumentsIgniterTasks(), true),
        ], true),

        // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
        new TaskOfTasks("wasm", [
            new ExecTask("systems",
                "npm run build-a21n:systems",
                [
                    "fbw-a21n/src/wasm/systems",
                    "fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/SimObjects/AirPlanes/A321neoLEAP/panel/systems.wasm",
                ]),
            new ExecTask("systems-fadec",
                "npm run build-a21n:fadec",
                [
                    "fbw-a21n/src/wasm/fadec_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/SimObjects/AirPlanes/A321neoLEAP/panel/fadec.wasm"
                ]),
            new ExecTask("systems-fbw",
                "npm run build-a21n:fbw",
                [
                    "fbw-a21n/src/wasm/fbw_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/SimObjects/AirPlanes/A321neoLEAP/panel/fbw.wasm"
                ]),
            new ExecTask("flypad-backend",
                "npm run build-a21n:flypad-backend",
                [
                    "fbw-a21n/src/wasm/flypad-backend",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/SimObjects/AirPlanes/A321neoLEAP/panel/flypad-backend.wasm"
                ])
        ], true),

        // Create final package meta files.
        new TaskOfTasks("dist", [
            new ExecTask("metadata", "npm run build-a21n:metadata"),
            new ExecTask("manifests", "npm run build-a21n:manifest")
        ])
    ]),

    // A318 Task
    new TaskOfTasks("a318", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks("preparation", [
            new ExecTask("copy-base-files", "npm run build-a318:copy-base-files"),
            new ExecTask("efb-translation", "npm run build-a318:efb-translation")
        ], true),

        // Group all typescript and react build tasks together.
        new TaskOfTasks("build", [
            new ExecTask("model",
                "npm run build-a318:model",
                [
                    "fbw-a318/src/model",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/SimObjects/AirPlanes/A318ceoCFM/model"
                ]),
            new ExecTask("behavior",
                "npm run build-a318:behavior",
                [
                    "fbw-a318/src/behavior",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/ModelBehaviorDefs/a318/generated"
                ]),

            new ExecTask("atsu",
                "npm run build-a318:atsu",
                [
                    "fbw-a318/src/systems/atsu",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/html_ui/JS/atsu"
                ]),
            new ExecTask("failures",
                "npm run build-a318:failures",
                [
                    "fbw-a318/src/systems/failures",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/html_ui/JS/failures/failures.js"
                ]),
            new ExecTask("fmgc",
                "npm run build-a318:fmgc",
                [
                    "fbw-a318/src/systems/fmgc",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/html_ui/JS/fmgc"
                ]),
            new ExecTask("sentry-client",
                "npm run build-a318:sentry-client",
                [
                    "fbw-a318/src/systems/sentry-client",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/html_ui/JS/sentry-client"
                ]),
            new ExecTask("simbridge-client",
                "npm run build-a318:simbridge-client",
                [
                    "fbw-a318/src/systems/simbridge-client",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/html_ui/JS/simbridge-client"
                ]),
            new ExecTask("tcas",
                "npm run build-a318:tcas",
                [
                    "fbw-a318/src/systems/tcas",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/html_ui/JS/tcas"
                ]),

            new TaskOfTasks("instruments", getInstrumentsIgniterTasks(), true),
        ], true),

        // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
        new TaskOfTasks("wasm", [
            new ExecTask("systems",
                "npm run build-a318:systems",
                [
                    "fbw-a318/src/wasm/systems",
                    "fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/SimObjects/AirPlanes/A318ceoCFM/panel/systems.wasm"
                ]),
            new ExecTask("systems-fadec",
                "npm run build-a318:fadec",
                [
                    "fbw-a318/src/wasm/fadec_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/SimObjects/AirPlanes/A318ceoCFM/panel/fadec.wasm"
                ]),
            new ExecTask("systems-fbw",
                "npm run build-a318:fbw",
                [
                    "fbw-a318/src/wasm/fbw_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/SimObjects/AirPlanes/A318ceoCFM/panel/fbw.wasm"
                ]),
            new ExecTask("flypad-backend",
                "npm run build-a318:flypad-backend",
                [
                    "fbw-a318/src/wasm/flypad-backend",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-a318/out/lvfr-horizonsim-a318-fbw/SimObjects/AirPlanes/A318ceoCFM/panel/flypad-backend.wasm"
                ])
        ], true),

        // Create final package meta files.
        new TaskOfTasks("dist", [
            new ExecTask("metadata", "npm run build-a318:metadata"),
            new ExecTask("manifests", "npm run build-a318:manifest")
        ])
    ]),

    // A319 Task
    new TaskOfTasks("a319", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks("preparation", [
            new ExecTask("copy-base-files", "npm run build-a319:copy-base-files"),
            new ExecTask("efb-translation", "npm run build-a319:efb-translation")
        ], true),

        // Group all typescript and react build tasks together.
        new TaskOfTasks("build", [
            new ExecTask("model",
                "npm run build-a319:model",
                [
                    "fbw-a319/src/model",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/SimObjects/AirPlanes/FlyByWire_A320_NEO/model"
                ]),
            new ExecTask("behavior",
                "npm run build-a319:behavior",
                [
                    "fbw-a319/src/behavior",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/ModelBehaviorDefs/a319/generated"
                ]),

            new ExecTask("atsu",
                "npm run build-a319:atsu",
                [
                    "fbw-a319/src/systems/atsu",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/html_ui/JS/atsu"
                ]),
            new ExecTask("failures",
                "npm run build-a319:failures",
                [
                    "fbw-a319/src/systems/failures",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/html_ui/JS/failures/failures.js"
                ]),
            new ExecTask("fmgc",
                "npm run build-a319:fmgc",
                [
                    "fbw-a319/src/systems/fmgc",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/html_ui/JS/fmgc"
                ]),
            new ExecTask("sentry-client",
                "npm run build-a319:sentry-client",
                [
                    "fbw-a319/src/systems/sentry-client",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/html_ui/JS/sentry-client"
                ]),
            new ExecTask("simbridge-client",
                "npm run build-a319:simbridge-client",
                [
                    "fbw-a319/src/systems/simbridge-client",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/html_ui/JS/simbridge-client"
                ]),
            new ExecTask("tcas",
                "npm run build-a319:tcas",
                [
                    "fbw-a319/src/systems/tcas",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/html_ui/JS/tcas"
                ]),

            new TaskOfTasks("instruments", getInstrumentsIgniterTasks(), true),
        ], true),

        // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
        new TaskOfTasks("wasm", [
            new ExecTask("systems",
                "npm run build-a319:systems",
                [
                    "fbw-a319/src/wasm/systems",
                    "fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/SimObjects/AirPlanes/FlyByWire_A320_NEO/panel/systems.wasm"
                ]),
            new ExecTask("systems-fadec",
                "npm run build-a319:fadec",
                [
                    "fbw-a319/src/wasm/fadec_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/SimObjects/AirPlanes/FlyByWire_A320_NEO/panel/fadec.wasm"
                ]),
            new ExecTask("systems-fbw",
                "npm run build-a319:fbw",
                [
                    "fbw-a319/src/wasm/fbw_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/SimObjects/AirPlanes/FlyByWire_A320_NEO/panel/fbw.wasm"
                ]),
            new ExecTask("flypad-backend",
                "npm run build-a319:flypad-backend",
                [
                    "fbw-a319/src/wasm/flypad-backend",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-a319/out/lvfr-horizonsim-a319-fbw/SimObjects/AirPlanes/FlyByWire_A320_NEO/panel/flypad-backend.wasm"
                ])
        ], true),

        // Create final package meta files.
        new TaskOfTasks("dist", [
            new ExecTask("metadata", "npm run build-a319:metadata"),
            new ExecTask("manifests", "npm run build-a319:manifest")
        ])
    ]),

    // InGamePanels Checklist Fix Tasks
    new TaskOfTasks("ingamepanels-checklist-fix", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks("preparation", [
            new ExecTask("copy-base-files", "npm run build-ingamepanels-checklist-fix:copy-base-files")
        ], true),
        new TaskOfTasks("dist", [
            new ExecTask("manifests", "npm run build-ingamepanels-checklist-fix:manifest")
        ])
    ])
]);