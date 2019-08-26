#!/usr/bin/env sh

set -e
echo "version"
read version
read -p "releaseing $version - are you sure" -n 1 -r
echo # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "$version"

    #commit
    git add -A
    git commit -m "[build $version]"
    npm version $version --message "[release] $version"
    git push origin master:axios_publish

    # publish
    npm publish
fi