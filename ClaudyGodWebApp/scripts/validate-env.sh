#!/bin/bash
# Validate .env file syntax and required variables

set -e

ENV_FILE="${1:-.env.local}"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: $ENV_FILE not found"
  exit 1
fi

echo "🔍 Validating $ENV_FILE..."
echo ""

# Check for syntax errors (lines that aren't KEY=VALUE or comments)
ERRORS=0
LINE_NUM=0

while IFS= read -r line || [ -n "$line" ]; do
  ((LINE_NUM++))

  # Skip empty lines and comments
  if [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]]; then
    continue
  fi

  # Skip lines that are just whitespace
  if [[ -z "${line//[[:space:]]/}" ]]; then
    continue
  fi

  # Check if line matches KEY=VALUE format
  if ! [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
    echo "❌ Line $LINE_NUM: Invalid format (should be KEY=VALUE)"
    echo "   Got: $line"
    ((ERRORS++))
  fi
done < "$ENV_FILE"

echo ""

# Check required variables
REQUIRED_VARS=(
  "NODE_ENV"
  "NEXT_PUBLIC_SITE_URL"
  "NEXT_PUBLIC_API_URL"
)

for var in "${REQUIRED_VARS[@]}"; do
  if grep -q "^${var}=" "$ENV_FILE"; then
    VALUE=$(grep "^${var}=" "$ENV_FILE" | cut -d= -f2-)
    if [ -z "$VALUE" ]; then
      echo "⚠️  Warning: $var is empty"
    else
      echo "✓ $var is set"
    fi
  else
    echo "❌ Error: Required variable $var is missing"
    ((ERRORS++))
  fi
done

echo ""

if [ $ERRORS -eq 0 ]; then
  echo "✅ Environment file validation passed!"
  exit 0
else
  echo "❌ Found $ERRORS validation error(s)"
  exit 1
fi
