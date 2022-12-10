import fse from "fs-extra";

const srcDir = `src/templates`;
const destDir = `dist/templates`;
                                 
// To copy a folder or file, select overwrite accordingly
try {
  fse.copySync(srcDir, destDir, { overwrite: true })
  console.log('success!')
} catch (err) {
  console.error(err)
}