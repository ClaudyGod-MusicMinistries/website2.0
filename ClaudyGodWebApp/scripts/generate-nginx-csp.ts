/**
 * Regenerates nginx.conf's Content-Security-Policy header from the single
 * source of truth in lib/config/csp.ts, so nginx and middleware.ts can
 * never hand-drift apart again. Run via `npm run generate:nginx-csp`
 * (wired into CI before the Docker build step).
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { buildCsp } from '../lib/config/csp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nginxConfPath = path.join(__dirname, '..', 'nginx.conf');

const csp = buildCsp();
const conf = readFileSync(nginxConfPath, 'utf8');

const cspBlockPattern = /add_header Content-Security-Policy\n( *)"[^"]*"\n *always;/;

if (!cspBlockPattern.test(conf)) {
  console.error('[generate-nginx-csp] Could not find the Content-Security-Policy add_header block in nginx.conf — aborting so nothing gets corrupted.');
  process.exit(1);
}

const indent = conf.match(cspBlockPattern)![1];
const updated = conf.replace(
  cspBlockPattern,
  `add_header Content-Security-Policy\n${indent}"${csp}"\n${indent}always;`,
);

writeFileSync(nginxConfPath, updated);
console.log('[generate-nginx-csp] nginx.conf CSP header regenerated from lib/config/csp.ts');
