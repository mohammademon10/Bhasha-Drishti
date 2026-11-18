# 15-Day Solo Roadmap

| Day | Work | Exit deliverable |
|---|---|---|
| 1 | Dataset access, licence, schema, signer audit | Data audit and fallback |
| 2 | Vocabulary freeze, signer split, loader | 15–30 candidate classes |
| 3 | Preprocessing, sequence normalization | Reproducible feature pipeline |
| 4 | RF/SVM baseline | Baseline metrics |
| 5 | GRU/1D-CNN | Main model trained |
| 6 | Held-out signer evaluation | Macro-F1, per-class metrics, confusion matrix |
| 7 | FastAPI | Health/predict/labels working |
| 8 | React Bangla UI | App shell |
| 9 | Webcam + MediaPipe | Live landmark overlay |
| 10 | Model integration | Real live predictions + abstention |
| 11 | Text-to-sign library | Approved clips or honest provisional state |
| 12 | Optional speech/TTS, accessibility | Typed fallback, captions, keyboard support |
| 13 | Deployment and integration | Stable live/local demo |
| 14 | User review, bug fixes, model card | Validation and limitations |
| 15 | One-page summary, 3-min video, rehearsal | Submission-ready release |

## Scope freeze
At Day 2 lock dataset, labels, features and reverse clip list. Do not add avatar generation, accounts, payments or mobile app.

## Go/no-go
If dataset cannot be accessed/parsed by Day 2, switch to lawful smaller data; do not scrape. If test performance is weak, shrink vocabulary. If live inference is unstable, use upload-a-clip mode and label it accurately. If Bengali TTS is unavailable, show text. If clips are not reviewed, do not call them verified.

## Definition of done
Five scripted flows work; real model is invoked; metrics are reproducible; unknown signs abstain; provenance is documented; no unconsented media or fake results.
