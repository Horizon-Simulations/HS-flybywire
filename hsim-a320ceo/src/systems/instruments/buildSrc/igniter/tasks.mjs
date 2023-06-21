import fs from 'fs';
import { join } from 'path';
import { ExecTask } from '@flybywiresim/igniter';
import { Directories } from '../directories.mjs';

export function getInstrumentsIgniterTasks() {
    const baseInstruments = fs.readdirSync(join(Directories.instruments, 'src'), { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(join(Directories.instruments, 'src', d.name, 'config.json')));

    return baseInstruments.map(({ name }) => new ExecTask(
        name,
        `cd build-a320ceo && mach build -f ${name}`,
        [
            join('build-a320ceo/src/systems/instruments/src', name),
            'build-a320ceo/src/systems/instruments/src/Common',
            join('build-a320ceo/out/horizonsim-lvfr-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/A320HS', name),
        ],
    ));
}