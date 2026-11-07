# HW40 draft notes

Prepared November 1, 2026. The article remains `draft: true`.

## Evidence and open items

- Chronograph: Garmin C1 (user-confirmed naming). Summary: 25 shots, Meisterkugeln 7 gr nominal, mean 426.5 fps, min 423.0, max 430.3, ES 7.3, app SD 2.0 fps. Energy computed from nominal weight and mean velocity: 2.83 ft-lb / 3.83 J.
- Missing: full numerical string, chronograph setup, temperature, test date, cadence/warmups, SD convention, accuracy targets and setup, ownership/modification history, and detailed trigger impressions and pellet-loading notes.
- New user observations: very accurate in use; solid construction despite the plastic frame; low weight reduces fatigue. Dislikes: visual design could be more refined, high barrel position, and greater sensitivity to body movement. The suggestion that chronograph results establish the most accurate HW pistol was qualified: velocity consistency cannot rank target accuracy.
- Existing personal comparisons were checked against `hw45_intro.md` and `hw75_intro.md`; other owners' views remain attributed.

## Research reviewed

- [Weihrauch HW40 product page](https://www.weihrauch-sport.de/air-pistols/hw-40-pca?lang=en): current published specifications and features.
- [Weihrauch HW40 manual](https://www.weihrauch-sport.de/wp-content/uploads/2016/01/HW-40-de-fr.engl_..pdf): operating sequence, safety, trigger guidance.
- [Airgun Forums owner thread](https://airgunforums.co.uk/threads/weihrauch-hw40-pistol-review.650/): 2022 review and comments through September 2025, including trigger praise, closing effort/pinching, differing pellet results, and individual P17 comparisons. Full text was available in search results; direct opening returned a human-verification page.
- [Reddit HW40 discussion](https://www.reddit.com/r/Springers/comments/1qlxf1g/best_bang_for_the_buck_weihrauch_hw40_from_28m/): value/P17 discussion. Much of the trigger/cocking commentary concerns the P17, so it was not treated as HW40 evidence. No unverified price comparison included.
- [Gun Mart HW40 review](https://www.gunmart.net/gun-reviews/airguns/air-pistols/weihrauch-hw40-pca): external target results considered as background, not reused as personal test data.

## Additional handling notes

- Final closing stroke feels heavy for the power and weight, and noticeably stiffer than the HW75; no force measurement.
- Fiber optics aid quick sight pickup, but the red front dot appears offset to the right of the blade in the author's view during 10-meter-style aiming. Cause unknown; framed as a personal sight-picture limitation, not a universal defect or competition rule.
- Automatic safety engagement on every cocking feels repetitive to the author; others may value it.
- Manual page 25 confirms screw (a) adjusts let-off travel: left/counterclockwise shorter, right/clockwise longer. Factory-setting/gunsmith guidance retained.

## HW75 comparison added

- Full sessions compared: HW40 25 shots, 426.5 fps mean / 7.3 fps ES / app SD 2.0; HW75 25 shots, 430.1 fps mean / 12.9 fps ES / population SD 3.50. HW75 min/max 421.8/434.7 fps visually checked against the existing chronograph photo. Its large 433.6 fps number is the latest shot, not the mean.
- User confirmed both sessions used Meisterkugeln 7-grain pellets; the missing pellet detail was also added to the HW75 review. Separate sessions, unmatched conditions, and SD conventions are disclosed. Its later shots 8–25 are described separately, not substituted for the full string.
- New personal grip concern: HW40 grip is plain and thin, potentially limiting support for competition. Rubber sleeve or putty presented as possibilities without claiming tested benefits.
- Newly reused images inspected at full resolution: `hw75_vs_hw40.jpg`, `hw75_trigger_undercut.jpg`, `hw40_trigger_undercut.jpg`, and `hw75_chronograph_results.jpg`, all under `src/assets/hw75_intro/`. Enlarged overview markings checked; its existing serial/code masks remain intact. No additional redaction required. `hw75_velocity_graph.png` was inspected as numerical background but not newly embedded.

## Image inventory and privacy

All 17 photos and both chronograph screenshots were viewed individually before and after optimization. Small model/caliber, address, and underside markings were also enlarged from the originals. No visible serial numbers or machine-readable codes were found; no redactions were required. Model, caliber, manufacturer markings, and all measurements were preserved.

Raw originals were renamed in `tmp/raw_images/hw40/` and retained byte-for-byte (SHA-256 verified). Copies in `src/assets/hw40/` use auto-orientation, sRGB, metadata stripping, maximum 2040-pixel JPEG dimensions, and JPEG quality 82. PNG screenshots retain their original dimensions for text readability. The global compression script was not run because it deletes raw inputs and processes unrelated folders.

November 5 cleanup: removed six unused assets from `src/assets/hw40/`: `hw40_left_profile.jpg`, `hw40_top_sights.jpg`, `hw40_open_action_top.jpg`, `hw40_piston_linkage_detail.jpg`, `hw40_barrel_breech.jpg`, and `hw40_action_latch.jpg`. None had site references. The table below records the original import inventory.

| Original filename | Renamed raw file / asset filename | Asset bytes |
| --- | --- | ---: |
| `PXL_20261031_224008287.jpg` | `hw40_left_profile.jpg` | 924,871 |
| `PXL_20261031_224014605.jpg` | `hw40_hero.jpg` | 846,597 |
| `PXL_20261031_224034883.jpg` | `hw40_right_profile.jpg` | 847,234 |
| `PXL_20261031_224047616.jpg` | `hw40_top_sights.jpg` | 544,591 |
| `PXL_20261031_224114666.jpg` | `hw40_open_action.jpg` | 920,296 |
| `PXL_20261031_224129228.jpg` | `hw40_trigger_safety.jpg` | 613,628 |
| `PXL_20261031_224145907.jpg` | `hw40_loading_port.jpg` | 434,333 |
| `PXL_20261031_224155007.MACRO_FOCUS.jpg` | `hw40_transfer_port_seal.jpg` | 387,266 |
| `PXL_20261031_224208831.jpg` | `hw40_safety_off.jpg` | 700,758 |
| `PXL_20261031_224255632.jpg` | `hw40_grip_in_hand.jpg` | 138,937 |
| `PXL_20261031_224313558.jpg` | `hw40_sight_picture.jpg` | 333,452 |
| `PXL_20261031_224456028.jpg` | `hw40_front_sight.jpg` | 260,128 |
| `PXL_20261031_224547094.jpg` | `hw40_open_action_top.jpg` | 827,238 |
| `PXL_20261031_224602052.jpg` | `hw40_piston_linkage.jpg` | 552,914 |
| `PXL_20261031_224611931.MACRO_FOCUS.jpg` | `hw40_piston_linkage_detail.jpg` | 381,960 |
| `PXL_20261031_224617759.jpg` | `hw40_barrel_breech.jpg` | 598,704 |
| `PXL_20261031_224641005.jpg` | `hw40_action_latch.jpg` | 391,798 |
| `Screenshot_20261101-134412.png` | `hw40_chronograph_summary.png` | 150,906 |
| `Screenshot_20261101-134421.png` | `hw40_chronograph_string.png` | 128,624 |
