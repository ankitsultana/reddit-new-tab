rm -rf dist
mkdir dist
cp -r images dist/
cp -r includes dist/
cp options.html dist/
cp index.html dist/
cp manifest.json dist/
cp -r images dist/

zip -r dist.zip dist
