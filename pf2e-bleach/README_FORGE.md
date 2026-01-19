# PF2E Bleach Module (Forge-ready)

This bundle is prepared for **The Forge**. The Forge can only install modules
from a **public manifest URL** (and it needs a **download URL** to a zip).

## 1) Create a GitHub repo
1. Create a repository (public recommended).
2. Upload the **folder** `pf2e-bleach` (the one that contains `module.json`) to the repo root.

Your repo should look like:
```
module.json
scripts/
styles/
lang/
data/
LICENSE
```

## 2) Create a Release zip
1. In this bundle there is a zip named: `pf2e-bleach-module-0.1.2.zip`.
2. On GitHub: **Releases** -> **Draft a new release**.
3. Tag: `v0.1.2`
4. Upload `pf2e-bleach-module-0.1.2.zip` as a release asset.
5. Publish the release.

## 3) Patch `module.json`
Open `module.json` and replace:
- `<GITHUB_USER>` with your GitHub user/org
- `<REPO>` with your repo name

You should end up with:
- `manifest`: `https://raw.githubusercontent.com/<you>/<repo>/main/module.json`
- `download`: `https://github.com/<you>/<repo>/releases/download/v0.1.2/pf2e-bleach-module-0.1.2.zip`

Commit the change.

## 4) Install on The Forge
On The Forge:
- **Bazaar** -> **Install Module** -> **Manifest URL**
- Paste the `manifest` URL from above

That's it.

## Notes
- This module requires the **PF2E system**.
- The first time a GM loads the world with this module enabled, it seeds Bleach compendiums into the world.
