# Data Model

MVP can use versioned JSON/CSV files; no production DB required.

## sign_labels
`id`, `gloss_en`, `label_bn`, `description_bn`, `dataset_source`, `dataset_label`, `supported`, `reviewer_status`, `notes`.

## sign_clips
`id`, `sign_label_id`, `phrase_bn`, `gloss`, `asset_path`, `signer_consent_id`, `reviewer_status`, `attribution`, `license`, `created_at`.

## model_versions
`id`, `artifact_hash`, `dataset_version`, `label_map_version`, `threshold`, `metrics_json`, `created_at`.

## optional feedback
`id`, `model_version`, `predicted_label`, `corrected_label`, `confidence`, coarse device context, timestamp, consent.

Example schema only:
```json
{"id":"bdsl_help_001","gloss_en":"HELP","label_bn":"সাহায্য","dataset_source":"BdSLW401","dataset_label":"verified-original-label-required","supported":false,"reviewer_status":"unreviewed"}
```
Do not enable a label until exact dataset mapping and BdSL meaning are verified. Do not store raw camera video/audio, names, health information or precise location. Landmark data can still be sensitive when linkable to a person.
