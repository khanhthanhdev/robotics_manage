# Main / Master
```
git branch develop

git checkout develop
```

# Develop

```
git push -u origin develop


git checkout -b feature/[number-feature des]
```

# feature/[number-feature des]

```
git add .
git commit -m "#1 - "  
git push --set-upstream origin feature/[number-feature des]

git checkout develop
```

:::info
#1 is tag in Issue tab in github -> when use # tag, it will have commit in the comment of issue -> easy to follow
:::


# develop
```
git checkout -b realease-1.0.0 develop

git tag 'v1.0.0'
git push --tags
git merge develop
git push --set-upstream origin release-1.0.0

git checkout main
```


# Main
```
git pull
git tag "v1.0.0"
git push --tags

git branch -d release-1.0.0
git push origin -d release-1.0.0
```







