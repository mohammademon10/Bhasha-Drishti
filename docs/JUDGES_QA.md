# Judges' Q&A

**Is this a complete translator?** No. It is a bounded word-level BdSL recognition and verified clip retrieval assistant. Continuous natural-language translation needs richer linguistic modeling and Deaf-led validation.

**What is innovative?** The two-way local workflow, reviewed reverse clips, signer-independent evaluation, uncertainty-aware abstention and Bangla-first UX—not a claim that sign recognition is new.

**Why no avatar?** A valid avatar must preserve hand form, motion, facial grammar and timing. A rushed avatar may teach incorrect signs; human-recorded clips are safer for MVP.

**How are signs validated?** Labels are mapped to documented BdSL data; reverse clips require signer/qualified reviewer approval and consent. If review is unavailable, disclose provisional status.

**How avoid signer leakage?** Split by signer ID before training; train/validation/test signer IDs are disjoint.

**Why landmarks?** Compact and efficient, but they can miss facial/context cues and are not automatically anonymous.

**What if uncertain?** Validation-selected threshold and abstention; the UI asks user to repeat rather than asserting a guess.

**Metrics?** Held-out signer macro-F1, per-class precision/recall, confusion matrix, top-1, abstention and end-to-end latency. No training accuracy as proof of generalization.

**Business?** Institutional licences for schools/universities/service branches and sponsored NGO deployments are hypotheses pending interviews and pilots.

**Global scale?** Shared platform with language-specific data/models; sign languages are not interchangeable and require local validation.

**Privacy?** Explicit camera permission, no raw footage retention by default, minimal landmark transfer, opt-in feedback, no face identification.

**Does it replace interpreters?** No. Not for medical consent, emergencies, legal matters or other high-stakes communication.

**What did you build?** State exact self-built components, reused libraries, public datasets, pretrained models, AI coding tools and external contributions. Keep commit and experiment history.

**Biggest limitation?** Small vocabulary and signer coverage; no full continuous grammar or non-manual marker modeling yet.

**Next 90 days?** Deaf-led co-design, diverse signer data, facial/non-manual markers, continuous sign segmentation, one institutional pilot and on-device optimization.
