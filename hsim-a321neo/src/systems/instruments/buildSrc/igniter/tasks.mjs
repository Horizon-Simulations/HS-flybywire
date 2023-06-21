import fs from 'fs';
import { join } from 'path';
import { ExecTask } from '@flybywiresim/igniter';
import { Directories } from '../directories.mjs';

export function getInstrumentsIgniterTasks() {
    const baseInstruments = fs.readdirSync(join(Directories.instruments, 'src'), { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(join(Directories.instruments, 'src', d.name, 'config.json')));

    return baseInstruments.map(({ name }) => new ExecTask(
        name,
        `cd build-a321neo && mach build -f ${name}`,
        [
            join('build-a321neo/src/systems/instruments/src', name),
            'build-a321neo/src/systems/instruments/src/Common',
            join('build-a321neo/out/horizonsim-lvfr-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/A21NHS', name),
        ],
    ));
}