#!/bin/sh
rm -rf ./build && npx tsc
# shellcheck disable=SC2039
echo -e "\nBuild success!\n"