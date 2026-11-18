# AI/ML Design

## Task
Input: fixed-length temporal sequence of normalized landmarks from one isolated sign attempt. Output: one of K supported BdSL word-level glosses, top-k alternatives and confidence.

## Data
Primary candidate BdSLW401. Audit access, labels, licence, feature schema and signer IDs on Days 1–2. Start with 15–30 classes with adequate samples across signers. If unavailable, use smaller lawful word-level data or pivot to a clearly labelled alphabet-recognition demo using RSBdSL38/BdSL47. Never turn alphabet classes into word claims.

## Features and normalization
Use only features consistently present in chosen data: body pose, both hands, visibility and x/y/z. Normalize relative to wrist/shoulder reference points; scale by stable body/hand distance; interpolate/pad to fixed sequence length. Preserve handedness. Do not horizontally flip without linguistic validation.

## Models
Baseline: Random Forest/SVM over pooled temporal statistics (mean, std, min/max, motion deltas).
Main: compact GRU or 1D temporal CNN on `[batch,time,features]`.
Optional: RQE-inspired reference-point-relative coordinate encoding. This is an adaptation, not a claim to reproduce published RQE.

Starting hyperparameters only: 40 frames, batch 32, Adam lr 1e-3, up to 40 epochs with early stopping. Tune against validation macro-F1.

## Training
Signer split first; fit normalization on train only; class weights if needed; cautious jitter/time-warp augmentation; save seed, config, label map and artifact hash.

## Evaluation
Top-1, macro precision/recall/F1, per-class metrics, confusion matrix, top-3, latency, abstention rate/selective accuracy. Report signer/viewpoint limitations. Measure clip-level predictions, not frame-level accuracy.

## Confidence
Choose threshold on validation set. Low confidence → unknown state and repeat prompt. Softmax score is not automatically calibrated probability. If feasible, temperature-scale and report calibration error.

## Speech
Web Speech API is progressive enhancement only; browser/OS Bengali locale and voice support vary. Always retain typed input and text output fallback.

## Explainability
Show landmarks, top-3 labels, confidence, vocabulary and model version; publish confusion matrix and ablation if available. Do not claim Grad-CAM for a temporal landmark model unless implemented.

## Model card
Document intended/prohibited uses, dataset/version, class count, signer split, metrics, threshold, known failures, hardware/browser and date.
