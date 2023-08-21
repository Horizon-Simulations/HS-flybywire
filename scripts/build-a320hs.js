// Copyright (c) 2022 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

'use strict';

const fs = require('fs');
const path = require('path');

function* readdir(d) {
    for (const dirent of fs.readdirSync(d, { withFileTypes: true })) {
        if (['layout.json', 'manifest.json'].includes(dirent.name)) {
            continue;
        }
        const resolved = path.join(d, dirent.name);
        if (dirent.isDirectory()) {
            yield* readdir(resolved);
        } else {
            yield resolved;
        }
    }
}

const buildInfo = require('./git_build_info').getGitBuildInfo();
const packageInfo = require('../package.json');

let titlePostfix;
if (packageInfo.edition === 'stable') {
    titlePostfix = 'Stable';
} else if (buildInfo?.branch === 'master') {
    titlePostfix = 'Development';
} else if (buildInfo?.branch === 'experimental') {
    titlePostfix = 'Experimental';
} else if (buildInfo?.isPullRequest) {
    titlePostfix = `PR #${buildInfo?.ref}`;
} else {
    titlePostfix = `branch ${buildInfo?.branch}`;
}

const titleSuffix = ` (${titlePostfix})`;

const MS_FILETIME_EPOCH = 116444736000000000n;

const A320HS_SRC = path.resolve(__dirname, '..', 'hsim-a320ceo/src');
const A320HS_OUT = path.resolve(__dirname, '..', 'build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo');

function copyDDSFiles(src_dds) {
    const TARGET_PATH_CFM = '/SimObjects/Airplanes/A320ceoCFM/TEXTURE/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF.dds';
    const TARGET_PATH_CFM_SL = '/SimObjects/Airplanes/A320ceoCFMsl/TEXTURE/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF.dds';
    const TARGET_PATH_IAE = '/SimObjects/Airplanes/A320ceoIAE/TEXTURE/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF.dds';
    const TARGET_PATH_IAE_SL = '/SimObjects/Airplanes/A320ceoIAEsl/TEXTURE/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF.dds';
    fs.copyFileSync(path.join(A320HS_SRC, src_dds), path.join(A320HS_OUT, TARGET_PATH_CFM));
    fs.copyFileSync(path.join(A320HS_SRC, src_dds), path.join(A320HS_OUT, TARGET_PATH_CFM_SL));
    fs.copyFileSync(path.join(A320HS_SRC, src_dds), path.join(A320HS_OUT, TARGET_PATH_IAE));
    fs.copyFileSync(path.join(A320HS_SRC, src_dds), path.join(A320HS_OUT, TARGET_PATH_IAE_SL));
}

if (packageInfo.edition === 'stable') {
    copyDDSFiles('/textures/decals 4k/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF-stable.dds');
} else if (buildInfo?.branch === 'master') {
    copyDDSFiles('/textures/decals 4k/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF-master.dds');
} else {
    copyDDSFiles('/textures/decals 4k/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF-exp.dds');
}

function createPackageFiles(baseDir, manifestBaseFilename) {
    const contentEntries = [];
    let totalPackageSize = 0;

    for (const filename of readdir(baseDir)) {
        const stat = fs.statSync(filename, { bigint: true });
        contentEntries.push({
            path: path.relative(baseDir, filename.replace(path.sep, '/')),
            size: Number(stat.size),
            date: Number((stat.mtimeNs / 100n) + MS_FILETIME_EPOCH),
        });
        totalPackageSize += Number(stat.size);
    }

    fs.writeFileSync(path.join(baseDir, 'layout.json'), JSON.stringify({
        content: contentEntries,
    }, null, 2));

    const manifestBase = require(path.join(A320HS_SRC, 'base', manifestBaseFilename));

    fs.writeFileSync(path.join(baseDir, 'manifest.json'), JSON.stringify({
        ...manifestBase,
        title: manifestBase.title + titleSuffix,
        package_version: packageInfo.version + `-${buildInfo?.commitHash}`,
        total_package_size: totalPackageSize.toString().padStart(20, '0'),
    }, null, 2));
}

createPackageFiles(A320HS_OUT, 'manifest-base.json');
createPackageFiles(A320HS_OUT + '-lock-highlight', 'manifest-base-lock-highlight.json');
