const spawn = require('child_process').spawnSync;
const path = require('path');

const s = `\\${path.sep}`;
const pattern = process.argv[2] === 'e2e'
  ? `test${s}e2e${s}.+\\.spec\\.tsx?`
  : `test${s}(?!e2e${s})[^${s}]+${s}.+\\.spec\\.tsx?$`;

const result = spawn(path.normalize('./node_modules/.bin/jest'), [pattern], { stdio: 'inherit' });

process.exit(result.status);
