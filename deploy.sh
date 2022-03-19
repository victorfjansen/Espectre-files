#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add .
git commit -m 'First Commit'
git push -f git@github.com:victorfjansen/Espectre.git master:gh-pages

cd -