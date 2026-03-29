// Node.js wrapper: sets PATH so Turbopack child processes can find `node`,
// then spawns `next dev` inheriting all env vars (including PORT from autoPort).
const { spawn } = require('child_process');
const path = require('path');

const NODE_BIN = '/Users/michal/.nvm/versions/node/v20.20.2/bin';
const env = Object.assign({}, process.env, {
  PATH: `${NODE_BIN}:${process.env.PATH || ''}`,
});

const child = spawn(
  path.join(NODE_BIN, 'node'),
  [path.join(__dirname, 'node_modules/next/dist/bin/next'), 'dev'],
  { cwd: __dirname, stdio: 'inherit', env }
);

child.on('error', (err) => { console.error(err); process.exit(1); });
child.on('close', (code) => process.exit(code ?? 0));
process.on('SIGINT',  () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
