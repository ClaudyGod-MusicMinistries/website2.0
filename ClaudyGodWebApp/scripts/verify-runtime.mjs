const [major, minor] = process.versions.node.split('.').map(Number);
const supported = (major === 20 && minor >= 9) || major === 22 || major === 24;

if (!supported) {
  console.error(
    `Unsupported Node.js ${process.versions.node}. Use Node 20.9+, 22, or 24 (run \`nvm use\`).`
  );
  process.exit(1);
}

console.log(`Node.js ${process.versions.node} is supported.`);
