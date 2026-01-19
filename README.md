# PF2E Bleach (FoundryVTT Module)

A Bleach-inspired total conversion module built **on top of the PF2E system**.

## What this module will contain (planned)
- Pseudo-classes: **Shinigami**, **Quincy**, **Hollow/Arrancar**, **Fullbringer**
- Zanpakuto templates: **Sealed / Shikai / Bankai**
- Techniques as PF2E Items (feats) using **Rule Elements**
- Effects (Reiatsu pressure, Shunpo, Resurreccion, etc.)

## Install (manual)
1. Put this folder in `{Foundry Data}/Data/modules/pf2e-bleach`
2. Launch Foundry, enable the module in your world running **PF2E**

## Dev notes
- Keep automation primarily in PF2E Rule Elements.
- Only add JS when Rule Elements cannot express the behavior.


## Kidō & skills

PF2E skills are not replaced at the system level (that would require a system fork). For Bleach terminology we use a mapping:

- Arcana → Hadō
- Occultism → Bakudō
- Religion → Kaidō / Barriers

See `docs/kido-skill-mapping.md`.
