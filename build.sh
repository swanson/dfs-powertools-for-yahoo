#!/bin/bash

version=$1

echo "Zipping up dfs-powertools-for-yahoo-$version..." 

zip -r releases/dfs-powertools-for-yahoo-"$version".zip -X src

echo "Done!"