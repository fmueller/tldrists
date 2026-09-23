#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
checker="$script_dir/check-commit-msg.sh"
tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

assert_accepts() {
  local name="$1"
  local message="$2"
  local message_file="$tmp_dir/$name"
  local output

  printf '%s\n' "$message" >"$message_file"
  if ! output="$("$checker" "$message_file" 2>&1)"; then
    fail "$name was rejected: $output"
  fi
}

assert_accepts_file() {
  local name="$1"
  local message_file="$2"
  local output

  if ! output="$("$checker" "$message_file" 2>&1)"; then
    fail "$name was rejected: $output"
  fi
}

assert_rejects_file() {
  local name="$1"
  local message_file="$2"
  local expected="$3"
  local output

  if output="$($checker "$message_file" 2>&1)"; then
    fail "$name was accepted"
  fi
  if [[ "$output" != *"$expected"* ]]; then
    fail "$name did not report '$expected': $output"
  fi
}

assert_rejects() {
  local name="$1"
  local message="$2"
  local expected="$3"
  local message_file="$tmp_dir/$name"
  local output

  printf '%s\n' "$message" >"$message_file"
  if output="$("$checker" "$message_file" 2>&1)"; then
    fail "$name was accepted"
  fi
  if [[ "$output" != *"$expected"* ]]; then
    fail "$name did not report '$expected': $output"
  fi
}

body_72="$(printf '%072d' 0)"
body_73="$(printf '%073d' 0)"
body_72_file="$tmp_dir/body-at-72"
body_73_file="$tmp_dir/body-over-72"
printf 'test: accept bounded body lines\n\n%s\n' "$body_72" >"$body_72_file"
printf 'test: reject long body lines\n\n%s\n' "$body_73" >"$body_73_file"

assert_accepts conventional $'docs: clarify contributor workflow\n\nExplain why contributors need the clarified path.'
assert_accepts build-type $'build: configure tooling\n\nPin tools used by local development and CI.'
assert_accepts generated-merge "Merge branch 'feature'"
assert_accepts generated-revert 'Revert "feat: add scope"'
assert_accepts_file body-at-72 "$body_72_file"

assert_rejects missing-body 'docs: reject missing body' 'descriptive body'
assert_rejects unseparated-body $'docs: reject body\nExplain why.' 'descriptive body'
assert_rejects_file body-over-72 "$body_73_file" '72 characters'
assert_rejects invalid-conventional $'add scope\n\nExplain the change.' 'Conventional Commit'
assert_rejects attribution $'feat: add scope\n\nExplain it.\n\nCo-Authored-By: Bot <bot@example.com>' 'automated-attribution'
assert_rejects agent-session-trailer $'feat: add scope\n\nExplain it.\n\nClaude-Session: https://claude.ai/code/session_01' 'automated-attribution'
assert_rejects wrapped-session-link $'feat: add scope\n\nExplain it.\n\nClaude-Session:\nhttps://claude.ai/code/session_01' 'automated-attribution'
assert_rejects thread-trailer $'feat: add scope\n\nExplain it.\n\nAmp-Thread: https://ampcode.com/threads/T-1' 'automated-attribution'
assert_rejects lowercase-coauthor $'feat: add scope\n\nExplain it.\n\nCo-authored-by: Someone <a@b.c>' 'automated-attribution'
assert_accepts generated-in-prose $'docs: describe the generated fixtures\n\nThe fixtures are generated with the recorded payloads.'

printf 'commit message checks passed\n'
