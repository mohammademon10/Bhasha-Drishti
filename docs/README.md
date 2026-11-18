# Bhasha Drishti — Competition Package
**AI-powered Bangladesh Sign Language Communication Assistant | Solo | 15-day sprint**

## Product definition
A Bangla-first, bounded BdSL communication assistant:
1. Sign → text/optional voice: webcam landmarks → temporal classifier → Bengali gloss, confidence and abstention.
2. Text/optional speech → sign: Bengali input → exact lookup in a human-recorded, signer-consented, reviewer-verified BdSL clip library.

This is an isolated word-level recognition + verified clip retrieval MVP, NOT unrestricted continuous sign-language translation. Do not claim otherwise.

## Recommended stack
React + Vite + TypeScript; MediaPipe Tasks Vision; Python + FastAPI; compact GRU/1D-CNN with a Random Forest/SVM baseline; JSON vocabulary/clip manifest; Vercel frontend + Render API (or stable local demo). Web Speech API is optional and must have typed/text fallbacks.

## Repo layout
frontend/{src/components,src/lib,public/sign-clips}; backend/app/{routes,services,models}; ml/{preprocessing,training,evaluation}; data/; docs/.

## Demo
1. Explain supported vocabulary.
2. Start webcam; show live landmarks.
3. Perform supported sign; show prediction, confidence and Bengali text.
4. Speak only if Bengali TTS voice exists.
5. Enter supported Bengali phrase; play verified sign clip.
6. Try unknown sign; show abstention.
7. Show real held-out signer metrics and limitations.

## Package contents
PROJECT_PROPOSAL.md, RESEARCH_REVIEW.md, SYSTEM_ARCHITECTURE.md, AI_ML_DESIGN.md, DATABASE_SCHEMA.md, API_DESIGN.md, DEVELOPMENT_ROADMAP.md, BUSINESS_MODEL.md, RESPONSIBLE_AI.md, COMPETITION_SUBMISSION.md, JUDGES_QA.md, AI_PROVENANCE.md, VALIDATION_CHECKLIST.md.

## Primary references
- BdSLW401 paper (Scientific Reports, 2026): https://www.nature.com/articles/s41598-026-53835-3
- BdSLW401 data: https://www.kaggle.com/datasets/hasanssl/bdslw401
- BdSLW401 code: https://github.com/hasanssl/RQE
- RSBdSL38 data: https://data.mendeley.com/datasets/tgvmb2jsdb/2
- BdSL47 data: https://datadryad.org/dataset/doi:10.5061/dryad.1vhhmgqwk
- BdSL-NMM repository: https://dspace.bracu.ac.bd/items/7cb38354-439f-45fd-948d-808331efcb3a
- MediaPipe Hand Landmarker: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- Congress submission policy: https://cloudcampbd.com/events/ai-builders-congress/policies/submission
- AI usage policy: https://cloudcampbd.com/events/ai-builders-congress/policies/ai-usage

Verify current event deadlines and dataset terms before submission.
