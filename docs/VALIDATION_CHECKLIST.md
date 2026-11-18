# Validation & Release Checklist

## Data
- [ ] Source and current terms verified.
- [ ] Label/gloss mapping checked.
- [ ] Signer IDs and counts documented.
- [ ] Train/validation/test signer IDs disjoint.
- [ ] No duplicate leakage; preprocessing reproducible.

## Model
- [ ] Baseline and temporal model compared where feasible.
- [ ] Macro-F1, per-class metrics and confusion matrix reported.
- [ ] Threshold selected on validation data.
- [ ] Unknown state tested.
- [ ] End-to-end latency measured.
- [ ] Model card complete.

## Clips
- [ ] Clips are BdSL, not another language.
- [ ] Signer consent covers demo/publication.
- [ ] Meaning and movement reviewed.
- [ ] Captions and attribution checked.
- [ ] Unknown phrase returns no match.

## Product
- [ ] Explicit camera/mic permission.
- [ ] Camera can be stopped.
- [ ] Backend errors handled.
- [ ] Typed fallback works.
- [ ] Bengali TTS tested; omit if unavailable.
- [ ] Captions, keyboard and responsive UI.
- [ ] Privacy notice; no raw video retention by default.

## Impact
- [ ] Deaf/BdSL review invited.
- [ ] Consent and accessibility arrangements.
- [ ] Feedback not overstated as representative.
- [ ] Pilot KPIs and limitations published.

## Competition
- [ ] Summary matches actual build.
- [ ] 3-minute video contains real demo.
- [ ] No fabricated metrics or simulated AI inference.
- [ ] Dataset/model sources cited.
- [ ] AI tools and external contributions disclosed.
- [ ] Q&A rehearsed; stable live and local backup.
