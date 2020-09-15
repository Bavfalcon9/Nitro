#!/bin/bash

file=./tests/Main.ts

function CheckDeno () {
    if ! command -v deno &> /dev/null
    then
        echo "Deno could not be found"
        echo "Installing deno..."
        curl -fsSL https://deno.land/x/install/install.sh | sudo DENO_INSTALL=/usr/local sh
        echo "Deno has successfully installed\nPlease run the start script again"
        exit
    else
        echo "Running main test file for Nitro..."
        deno run -A --unstable file
    fi
}

CheckDeno
