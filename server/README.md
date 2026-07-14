# server

Nitro server code. Route files under `server/api/` become API endpoints with the same path.


## Contents

* [api/rates/\[base\].get.js](api/rates/%5Bbase%5D.get.js) - cached proxy for the Frankfurter exchange rate API. It answers `GET /api/rates/<base>` with `{ base, date, rates }`, rejects base codes that are not in the shared currency list with a 400 error, and caches each response for an hour with stale-while-revalidate.

See the data layer section of [docs/technical-plan.md](../docs/technical-plan.md) for the design, including the client fallback used on static hosts where this route does not exist.
