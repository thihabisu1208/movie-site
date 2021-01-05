# movie-site

## 作業フロー
まずは git を cloneする (https://github.com/thihabisu1208/movie-site.git)
クローンしたら、npm install する
```
npm run install / yarn install
```
これで、環境ができあがり、pug, css, js フォルダーでコード書いたら
```
npm run build
git add .
git commit -m "作業内容を書く"
```
ここで、push するか github pages に deploy する
```
git push --all (すべてを git main branch にプッシュ)
npm run deploy (github pages にて公開する)
```
