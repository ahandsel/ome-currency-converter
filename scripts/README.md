# Scripts

Shell and Node.js scripts that support repository tooling. Most are also exposed as `pnpm` scripts in `package.json`. Run [index.sh][] to list the available `pnpm` scripts.


## Content tools

| Script                    | pnpm command       | Description                                                                                           | Last updated (UTC) |
| ------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------- | ------------------ |
| [cleanup-temp-files.sh][] | `pnpm run cleanup` | Find and list temporary files, delete empty ones, then optionally delete the rest after confirmation. | 2026-04-08 08:15   |
| [index.sh][]              | `pnpm run index`   | List all `pnpm` scripts defined in `package.json`.                                                    | 2026-05-28 05:59   |
| [trim-png.mjs][]          | -                  | Trim the transparent or solid-white border around a PNG so the canvas is tight to the visible art.    | 2026-06-22 00:00   |

[cleanup-temp-files.sh]: cleanup-temp-files.sh
[index.sh]: index.sh
[trim-png.mjs]: trim-png.mjs
