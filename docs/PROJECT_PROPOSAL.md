# Project Proposal

## Abstract
Bhasha Drishti is a Bangla-first assistive communication prototype for bounded everyday interactions between BdSL signers and hearing people. It recognizes a small, verified vocabulary of BdSL word-level signs from webcam-derived landmarks and displays Bengali text with optional speech. In the reverse direction, typed Bengali or optional browser speech input retrieves a human-recorded, consented and reviewed BdSL sign clip.

## Problem and users
Target users include Deaf/BdSL signers, family members, teachers and service-desk staff. Initial contexts: greetings, asking for help/repetition, classroom and reception exchanges. Not for diagnosis, emergency triage, legal testimony, informed consent or financial authorization.

## Objectives
- Bangla-first accessible web app.
- Recognize 15–30 isolated word-level signs if data and evaluation support them.
- Display Bengali label, top-k predictions and confidence.
- Abstain on uncertain/unsupported inputs.
- Map 10–20 Bengali phrases to reviewed sign clips.
- Evaluate on signers excluded from training.
- Document provenance, privacy and limitations.

## Novelty
The differentiation is the combination of BdSL-specific word-level recognition, two-way interaction, Deaf-reviewed reverse-direction clips, signer-independent evaluation, uncertainty-aware abstention and Bangla UX. Do not claim to be the first BdSL translator.

## Research questions
1. How well does a compact landmark classifier generalize to unseen signers?
2. Does reference-point normalization improve robustness?
3. How often does the system abstain on unknown/ambiguous signs?
4. Can verified clip retrieval provide useful reverse communication without pretending to solve generative text-to-sign?

## MVP boundaries
Isolated word-level recognition only; no fluent continuous translation, no generated avatar, no unsupported ASL/ISL substitution, no high-stakes use. Alphabet recognition must not be called word translation.

## Success measures
Held-out signer macro-F1, per-class recall, confusion matrix, top-1 accuracy, abstention rate, end-to-end latency, supported-task completion and structured user feedback. No results may be claimed before measurement.
