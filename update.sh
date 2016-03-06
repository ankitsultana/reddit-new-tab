rm -rf dist
mkdir dist
mkdir dist/images
cp -r images/icons dist/images/
cp -r includes dist/
cp options.html dist/
cp index.html dist/
cp manifest.json dist/
cp -r images dist/

zip -r dist.zip dist
