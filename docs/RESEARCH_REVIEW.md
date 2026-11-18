# Research Review & Dataset Strategy

## Distinguish the tasks
- Fingerspelling/alphabet recognition ≠ isolated word recognition.
- Isolated sign recognition ≠ continuous sign-language translation.
- Text-to-gloss ≠ sign generation/avatar animation.

## BdSLW401 — primary word-level candidate
Rubaiyeat et al., Scientific Reports (3 June 2026): 401 word signs, 102,176 video samples, 18 signers, front and lateral views; landmark-based representations and Relative Quantization Encoding (RQE).
Paper: https://www.nature.com/articles/s41598-026-53835-3
Dataset: https://www.kaggle.com/datasets/hasanssl/bdslw401
Code: https://github.com/hasanssl/RQE
Use a subset of 15–30 classes only after verifying download access, schema, label mapping, licence/terms and signer IDs. Published paper metrics are NOT this project's metrics.

## RSBdSL38
Mendeley Data: https://data.mendeley.com/datasets/tgvmb2jsdb/2
10,874 expert-validated images, 38 canonical hand signs representing 51 Bangla alphabet letters, 36 signers, three special-needs schools; dataset page lists CC BY 4.0. Suitable for a separate alphabet/handshape module, not word-level translation.

## BdSL47
Dryad: https://datadryad.org/dataset/doi:10.5061/dryad.1vhhmgqwk
47 alphabet/digit classes, 47,000 RGB images, 10 users, MediaPipe-derived 21 hand keypoints/63 coordinates. Also an alphabet/digit resource, not word-level vocabulary.

## BdSL-NMM (BRAC University, 2026)
Repository: https://dspace.bracu.ac.bd/items/7cb38354-439f-45fd-948d-808331efcb3a
Abstract describes 4,170 recordings, 62 sign classes, five non-manual expression categories, seven native signers and a multi-stream Transformer. Important motivation: facial/head cues carry linguistic information. Confirm access and permissions before using its data.

## Research gap (defensible)
Opportunity exists for a locally usable, Bangla-first, two-way BdSL assistance workflow combining bounded recognition, verified reverse-direction clips, transparent uncertainty and user-centred evaluation. Do not claim no prior BdSL datasets or research exist.

## Evaluation protocol
Split by signer before training: e.g. 12–14 train, 2 validation, 2–4 test signers depending on actual data. IDs must be disjoint. Compare majority baseline, Random Forest/SVM on pooled features, compact GRU/1D-CNN and optional RQE-inspired normalization. Report macro-F1, per-class precision/recall, confusion matrix, top-1, latency and abstention. Never randomly split frames from the same signer and call it signer-independent.

## References
BdSLW401 (2026): https://www.nature.com/articles/s41598-026-53835-3
RSBdSL38 (2026): https://arxiv.org/abs/2608.06252
BdSL47 (2022): https://datadryad.org/dataset/doi:10.5061/dryad.1vhhmgqwk
Deaf-centric avatar design (2025): https://doi.org/10.1145/3710953
