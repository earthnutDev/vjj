#!/bin/bash

npm ci

npm run build

VERSION=$(node -p "require('./package.json').version")
echo "获取全称 npm version : $VERSION"
if [[ $VERSION =~ -([a-zA-Z0-9]+)(\.|$) ]]; then
  TAG=${BASH_REMATCH[1]}
  echo "捕获到 npm tag : $TAG"
else
  TAG="latest"
  echo "未捕获到 npm tag 设置了默认 : $TAG"
fi
cd dist
npm publish --provenance --access public --tag ${TAG}