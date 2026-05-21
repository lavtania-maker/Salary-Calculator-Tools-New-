#!/usr/bin/env node
/**
 * Startup script that:
 * 1. Kills the existing v0-port-proxy if it's using the wrong TARGET_PORT
 * 2. Restarts it with TARGET_PORT=3001
 * 3. Starts the dev server
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('[v0] Starting proxy with TARGET_PORT=3001...');

  // Kill existing port proxy
  try {
    execSync('pkill -f "v0-port-proxy"', { stdio: 'ignore' });
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (e) {
    // OK if no process was found
  }

  // Start proxy with correct TARGET_PORT
  const proxyProcess = spawn('node', ['/vercel/share/v0-port-proxy.js'], {
    env: { ...process.env, TARGET_PORT: '3001' },
    stdio: 'inherit',
    detached: true,
  });

  proxyProcess.unref();
  console.log('[v0] Port proxy started with TARGET_PORT=3001');

  // Start dev server in this process
  console.log('[v0] Starting dev server on port 3001...');
  require('./server.ts');
}

main().catch(err => {
  console.error('[v0] Error:', err);
  process.exit(1);
});
