const fs = require('fs');
const path = require('path');

function resolveDir(arg) {
  if (arg) return path.resolve(arg);
  // Check common Spec directories
  for (const d of ['specs', 'spec', 'Specs', 'Spec']) {
    if (fs.existsSync(d)) return path.resolve(d);
  }
  return process.cwd();
}

function findSpec(dir, num) {
  const prefix = String(num).padStart(2,'0');
  const files = fs.readdirSync(dir).filter(f => f.startsWith(prefix) && f.endsWith('.md'));
  return files[0] ? path.join(dir, files[0]) : null;
}

function readSpec(dir, num) {
  const f = findSpec(dir, num);
  return f ? fs.readFileSync(f, 'utf-8') : null;
}

function specExists(dir, num) {
  const content = readSpec(dir, num);
  return !!(content && content.replace(/#.*\n?/g,'').replace(/>.*\n?/g,'').trim().length > 50);
}

module.exports = { resolveDir, findSpec, readSpec, specExists };
