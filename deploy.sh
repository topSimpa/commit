#!/usr/bin/env bash
git add dist -f && git commit -m "Deployment commit"
gh-pages -d dist
git checkout main