const path = require('path');

process.chdir(__dirname);
const nextCli = path.resolve(__dirname, 'node_modules', 'next', 'dist', 'cli', 'next-build.js');

try {
  require(nextCli).nextBuild();
} catch (e) {
  console.error('Build failed:', e.message);
  process.exit(1);
}
