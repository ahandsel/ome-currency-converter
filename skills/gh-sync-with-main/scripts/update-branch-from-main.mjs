#!/usr/bin/env node

// update-branch-from-main.mjs notes
// General notes:
// * Purpose: Bring the current git branch up to date with a base branch
//   (default `main`) using rebase by default, or merge when requested. Used by
//   the gh-sync-with-main skill.
// * Refuses to run while checked out on the base branch and refuses a dirty
//   working tree unless --allow-dirty is passed.
// * Fetches the base branch from the remote first, then rebases or merges onto
//   the remote-tracking ref (e.g. origin/main). Exits on the first git failure
//   and leaves the repository in git's native conflict state for manual
//   resolution.
// Usage:
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs --strategy merge
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs --base-branch main --remote origin
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs --allow-dirty
// Options:
//   --base-branch <name>  Base branch to sync from. Defaults to main.
//   --remote <name>       Remote to fetch from. Defaults to origin.
//   --strategy <mode>     Update strategy: rebase or merge. Defaults to rebase.
//   --allow-dirty         Allow updating even if the working tree has local changes.
//   --help, -h            Show this message.
// Output:
// * Prints the planned git commands, then runs them, then a final status line.
// * Status emojis: ✅ success, ⚠️ refusal/warning, ❌ git command failure.
// * Exit codes: 0 success, 1 refusal (on base branch, dirty tree, no branch),
//   2 invalid arguments, or the failing git command's exit code.
// Version history:
// * v1.0 - 2026-06-08 - Initial release. Port of update_branch_from_main.py to a Node.js ES module.

import { spawnSync } from 'node:child_process';

function printUsage() {
  console.log(`Usage: node update-branch-from-main.mjs [options]

Bring the current git branch up to date with a base branch. Rebases by default
for a clean linear history; use --strategy merge when history should not be
rewritten.

Options:
  --base-branch <name>  Base branch to sync from. Defaults to main.
  --remote <name>       Remote to fetch from. Defaults to origin.
  --strategy <mode>     Update strategy: rebase or merge. Defaults to rebase.
  --allow-dirty         Allow updating even if the working tree has local
                        changes.
  --help, -h            Show this message.

Exit codes:
  0  Success.
  1  Refusal (checked out on the base branch, dirty working tree, or the
     current branch could not be determined).
  2  Invalid arguments.
  *  The failing git command's exit code on a git error.
`);
}

function fail(code, message) {
  console.error(message);
  process.exit(code);
}

// Run git and capture its output. Used for read-only inspection commands.
function git(args) {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  if (result.error) {
    fail(1, `❌ Failed to run git: ${result.error.message}`);
  }
  return result;
}

function parseArgs(argv) {
  const options = {
    baseBranch: 'main',
    remote: 'origin',
    strategy: 'rebase',
    allowDirty: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
        break;
      case '--base-branch':
        options.baseBranch = argv[++i];
        if (!options.baseBranch) fail(2, '❌ --base-branch requires a value.');
        break;
      case '--remote':
        options.remote = argv[++i];
        if (!options.remote) fail(2, '❌ --remote requires a value.');
        break;
      case '--strategy':
        options.strategy = argv[++i];
        if (options.strategy !== 'rebase' && options.strategy !== 'merge') {
          fail(2, '❌ --strategy must be "rebase" or "merge".');
        }
        break;
      case '--allow-dirty':
        options.allowDirty = true;
        break;
      default:
        fail(2, `❌ Unknown argument: ${arg}. Run with --help for usage.`);
    }
  }

  return options;
}

function ensureGitRepo() {
  const result = git(['rev-parse', '--show-toplevel']);
  if (result.status !== 0) {
    fail(1, '❌ Not inside a git repository.');
  }
}

function currentBranch() {
  return git(['branch', '--show-current']).stdout.trim();
}

function isWorktreeClean() {
  return git(['status', '--short']).stdout.trim() === '';
}

function printPlan(commands) {
  console.log('Plan:');
  for (const command of commands) {
    console.log(`  ${command.join(' ')}`);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  ensureGitRepo();

  const branch = currentBranch();
  if (!branch) {
    fail(1, '⚠️ Could not determine the current branch.');
  }

  if (branch === options.baseBranch) {
    fail(
      1,
      `⚠️ Refusing to update while checked out on ${options.baseBranch}. Switch to a feature branch first.`,
    );
  }

  if (!options.allowDirty && !isWorktreeClean()) {
    fail(
      1,
      '⚠️ Working tree is not clean. Commit, stash, or rerun with --allow-dirty.',
    );
  }

  const baseRef = `${options.remote}/${options.baseBranch}`;
  const commands = [['git', 'fetch', options.remote, options.baseBranch]];
  if (options.strategy === 'rebase') {
    commands.push(['git', 'rebase', baseRef]);
  } else {
    commands.push(['git', 'merge', baseRef]);
  }

  printPlan(commands);

  for (const [, ...args] of commands) {
    const result = spawnSync('git', args, { stdio: 'inherit' });
    if (result.status !== 0) {
      const code = result.status === null ? 1 : result.status;
      fail(
        code,
        `❌ Command failed with exit code ${code}: git ${args.join(' ')}`,
      );
    }
  }

  console.log(
    `✅ Branch ${branch} is now updated from ${baseRef} using ${options.strategy}.`,
  );
}

main();
