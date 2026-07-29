#!/usr/bin/env bash
set -euo pipefail

if ! repo_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  echo "Skipping Git hooks: this installation is not inside a Git checkout."
  exit 0
fi

app_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
hooks_path="$(realpath "$app_root/.githooks")"

git -C "$repo_root" config core.hooksPath "$hooks_path"
chmod +x "$hooks_path/pre-commit" "$hooks_path/pre-push" "$hooks_path/commit-msg"

configured="$(git -C "$repo_root" config --get core.hooksPath)"
[[ "$configured" == "$hooks_path" ]] || {
  echo "✗ Git hook activation verification failed." >&2
  exit 1
}

echo "✓ Frontend Git hooks installed from $hooks_path"
