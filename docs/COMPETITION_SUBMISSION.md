# Competition Submission Pack

## One-page structured summary
**Bhasha Drishti — AI-powered two-way Bangladesh Sign Language communication assistant**

**Problem:** Everyday exchanges in classrooms and service environments can be difficult when BdSL signers and hearing partners do not share a communication method. Generic speech tools do not understand BdSL; alphabet gesture demos are not language translation.

**Solution:** A bounded two-way workflow. Sign-to-text uses webcam landmarks and a temporal classifier to recognize supported BdSL word-level signs, display Bengali text and optional speech. Text/optional speech-to-sign retrieves human-recorded, consented, reviewer-verified sign clips.

**Innovation:** BdSL-specific word-level recognition, two-way UX, signer-independent evaluation, confidence-aware abstention and Deaf-reviewed reverse assets. No claim of unrestricted sentence translation.

**AI:** MediaPipe landmarks, normalized sequences, compact GRU/1D-CNN or baseline, confidence gate, FastAPI and phrase-to-clip retrieval. Disclose exact versions.

**Data:** BdSLW401 is the primary candidate (401 signs, 102,176 videos, 18 signers; access/terms to verify). RSBdSL38 is optional alphabet data. Reverse clips require signer consent and review.

**Impact KPIs:** Held-out signer macro-F1, per-class recall, latency, abstention, task completion, time-to-understanding and user feedback.

**Ethics:** Not for high-stakes decisions or interpreter replacement. Raw camera footage not stored by default. Unknown signs abstain.

**Next:** Deaf-led vocabulary expansion, non-manual markers, continuous signing research, offline deployment and institutional pilot.

## Three-minute pitch
**0:00–0:20 Hook:** “Imagine visiting a classroom or service desk and not sharing a communication method with the person in front of you. Bhasha Drishti aims to make a small but meaningful set of everyday interactions easier.”

**0:20–0:45 Problem:** “Our first users are BdSL signers and hearing communication partners. We are not claiming to translate every conversation.”

**0:45–1:15 Sign demo:** “The camera captures a supported sign. MediaPipe extracts landmarks; our temporal model predicts from a verified vocabulary. Bengali text and confidence appear. Low confidence triggers abstention.”

**1:15–1:40 Reverse demo:** “A hearing user enters a supported Bengali phrase. The app retrieves a human-recorded sign clip reviewed for correctness and permission. We chose this over a rushed synthetic avatar.”

**1:40–2:10 Technical:** “We use a BdSL word-level dataset candidate, signer-separated evaluation, landmark normalization and a compact temporal model. We report macro-F1, per-class recall, confusion matrix and latency. Published benchmark results are not our results.”

**2:10–2:35 Impact/ethics:** “Sign language includes more than hand shapes. Deaf community participation and non-manual markers are essential. Camera data is not stored by default; this tool does not replace interpreters.”

**2:35–3:00 Future:** “Our next step is a Deaf-led pilot with an education or accessibility partner. Bhasha Drishti: communication support designed around the language and people it serves.”

Replace all generic statements with actual implemented features and measured results before recording.

## Demo checklist
Camera/backend tested; model invoked live; supported signs rehearsed; unknown sign abstention shown; reverse clips consented/reviewed; Bengali voice checked; typed fallback ready; internet/local backup; no fake inference; three-minute video; honest limitations.

## Submission rule reminder
Published Congress policy requests a one-page structured summary and a 3-minute demo video covering problem/users, AI solution, demo, AI approach/data/tools, impact/KPIs and next steps. It prohibits fabricated results and requires disclosure of AI tools, data and external contributions. Verify live portal for updates.
