import AdmZip from 'adm-zip';
import { promises as fs } from 'fs';
import path from 'path';

async function createZip() {
  const zip = new AdmZip();
  const outputFile = "extension.zip";
  const distPath = path.join(process.cwd(), 'dist');

  try {
    const files = await fs.readdir(distPath);
    for (const file of files) {
      const filePath = path.join(distPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isFile()) {
        zip.addLocalFile(filePath);
      } else if (stats.isDirectory()) {
        zip.addLocalFolder(filePath, file);
      }
    }
    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
  } catch (err) {
    console.error('Error creating zip file:', err);
  }
}

createZip();