#!/bin/bash
export PATH="/Users/michal/.nvm/versions/node/v20.20.2/bin:$PATH"
export NODE="/Users/michal/.nvm/versions/node/v20.20.2/bin/node"
cd "/Users/michal/Documents/booking agency"
exec /Users/michal/.nvm/versions/node/v20.20.2/bin/node node_modules/.bin/next dev
