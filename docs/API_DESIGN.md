# API Design — `/api/v1`

## GET /health
Returns service status, model_loaded and model_version.

## POST /predict
Request:
```json
{"model_version":"bdsl-word-mvp-0.1.0","sequence":[...],"feature_schema":"verified-schema-v1"}
```
The sequence dimensions must exactly match the trained model; example abbreviated.

Recognized response:
```json
{"status":"recognized","prediction":{"class_id":"class_001","gloss":"VERIFIED_GLOSS","label_bn":"যাচাইকৃত বাংলা লেবেল","confidence":0.87},"alternatives":[{"class_id":"class_001","confidence":0.87}],"model_version":"bdsl-word-mvp-0.1.0","latency_ms":42}
```
Unknown response:
```json
{"status":"unknown","prediction":null,"message_bn":"নিশ্চিতভাবে sign শনাক্ত করা যায়নি। আবার চেষ্টা করুন।","model_version":"bdsl-word-mvp-0.1.0"}
```

## GET /labels
Returns model version and supported class metadata.

## GET /sign-clips?query=
Exact normalized phrase lookup. Return `matched:false` for unknown phrase; never fabricate a sign.

## POST /feedback (optional)
Accept model version, predicted/corrected class, confidence and explicit consent. Do not accept raw media.

## Security
Strict Pydantic schemas, shape/size validation, reject NaN/Infinity, CORS allowlist, rate limiting, HTTPS, secrets in environment only.
