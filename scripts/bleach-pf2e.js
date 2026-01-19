/**
 * PF2E Bleach module bootstrap.
 * Keep this file tiny: register settings, and (later) hook small QoL helpers.
 */

Hooks.once("init", () => {
  console.log("[pf2e-bleach] Initializing PF2E Bleach module");

  game.settings.register("pf2e-bleach", "enableReiatsuUI", {
    name: "PF2E Bleach: Enable Reiatsu UI helpers",
    hint: "Enables small UI helpers used by the module (safe to disable).",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

/**
 * Seed world compendiums with the module's JSON data.
 *
 * Foundry module compendiums require a DB file built by Foundry tooling.
 * To keep this project lightweight and PF2E-version-friendly, we ship JSON
 * and import it into world compendiums on first run.
 */
Hooks.once("ready", async () => {
  if (!game.user?.isGM) return;

  const seeds = [
    {
      packName: "bleach-feats",
      label: "Bleach: Feats (Techniques)",
      type: "Item",
      system: "pf2e",
      src: "modules/pf2e-bleach/data/bleach-feats.json",
    },
    {
      packName: "bleach-items",
      label: "Bleach: Zanpakutō, Transformations & Conditions",
      type: "Item",
      system: "pf2e",
      src: "modules/pf2e-bleach/data/bleach-items.json",
    },
    {
      packName: "bleach-macros",
      label: "Bleach: Macros",
      type: "Macro",
      system: "pf2e",
      src: "modules/pf2e-bleach/data/bleach-macros.json",
    },
  ];

  for (const seed of seeds) {
    const existing = game.packs.get(`world.${seed.packName}`);
    const pack = existing ?? (await CompendiumCollection.createCompendium({
      name: seed.packName,
      label: seed.label,
      type: seed.type,
      system: seed.system,
    }));

    try {
      const resp = await fetch(seed.src);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} while fetching ${seed.src}`);
      const docs = await resp.json();

      // Idempotent import: create only missing documents (match by type+name).
      await pack.getIndex();
      const existingKeys = new Set(
        (pack.index ?? []).map((e) => `${e.type ?? seed.type}::${(e.name ?? "").trim()}`)
      );

      const toCreate = docs.filter((d) => {
        const key = `${(d.type ?? seed.type)}::${(d.name ?? "").trim()}`;
        return !existingKeys.has(key);
      });

      if (!toCreate.length) continue;

      await pack.documentClass.createDocuments(toCreate, { pack: pack.collection });
      console.log(`[pf2e-bleach] Imported ${toCreate.length} new document(s) into world.${seed.packName}.`);
    } catch (err) {
      console.error(`[pf2e-bleach] Failed seeding ${seed.packName}:`, err);
      ui.notifications?.error(`PF2E Bleach: échec de création du compendium ${seed.label}. Voir la console.`);
    }
  }
});
