const { execSync } = require('child_process');
const os = require('os');
const path = require('path');

const fs = require('fs-extra');

async function publishWithoutDevDeps () {
  const srcDir = process.cwd();
  const tempDir = path.join(os.tmpdir(), `syncify-publish-${Date.now()}`);
  const args = process.argv.slice(2).join(' '); // Capture CLI arguments (e.g., --tag latest)

  try {
    // Read package.json
    const packageJson = await fs.readJson(path.join(srcDir, 'package.json'));

    // Create temporary directory
    await fs.ensureDir(tempDir);

    // Copy files specified in the 'files' field
    const filesToCopy = packageJson.files || [
      'dist',
      'scripts/postinstall.js',
      'scripts/postuninstall.js',
      'scripts/postversion.js',
      'hot.js.liquid',
      'LICENCE',
      'package.json',
      'readme.md'
    ];
    for (const file of filesToCopy) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(tempDir, file);
      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath, { recursive: true });
      }
    }

    // Ensure package.json is copied
    await fs.copy(path.join(srcDir, 'package.json'), path.join(tempDir, 'package.json'));

    // Remove devDependencies from temporary package.json
    const tempPackageJson = await fs.readJson(path.join(tempDir, 'package.json'));
    delete tempPackageJson.devDependencies;
    await fs.writeJson(path.join(tempDir, 'package.json'), tempPackageJson, { spaces: 2 });

    // Copy icon.png for prepublishOnly
    await fs.copy(path.join(srcDir, 'assets', 'icon.png'), path.join(tempDir, 'icon.png'));

    // Publish from temporary directory
    console.log('Publishing from temporary directory...');
    execSync(`pnpm publish --access public ${args} --dry-run`, { cwd: tempDir, stdio: 'inherit' });

    console.log('Published successfully!');
  } catch (err) {
    console.error('Error during publish:', err);
    process.exit(1);
  } finally {
    // Clean up temporary directory
    await fs.remove(tempDir);
  }
}

publishWithoutDevDeps();
