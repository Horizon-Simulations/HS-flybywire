#!/bin/bash

set -ex

# store current file ownership
ORIGINAL_USER_ID=$(stat -c '%u' /external)
ORIGINAL_GROUP_ID=$(stat -c '%g' /external)

# set ownership to root to fix cargo/rust build (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R root:root /external
  rm -rf /external/flybywire
  rm -rf /external/hsim-a318ceo
  rm -rf /external/hsim-a320ceo
  rm -rf /external/hsim-a321neo
fi

# permission fix
git config --global --add safe.directory /external

# run build
time npx igniter -c a319ceo-igniter.config.mjs -r A319HS "$@"

if [ "${GITHUB_ACTIONS}" == "true" ]; then
  rm -rf /external/build-a319ceo/src
  rm -rf /external/hsim-a319ceo/src
fi

# restore ownership (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R ${ORIGINAL_USER_ID}:${ORIGINAL_GROUP_ID} /external
fi