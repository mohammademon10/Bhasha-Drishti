# System Architecture

## Flow
Camera → MediaPipe landmark extraction → fixed-length temporal buffer → FastAPI model inference → confidence gate → Bengali gloss/text → optional TTS.

Reverse: Bengali typed/optional speech input → Unicode/text normalization → exact vocabulary lookup → consented/reviewed sign clip playback.

## Frontend
React/Vite/TypeScript components: CameraPanel, LandmarkOverlay, RecognitionPanel, BengaliOutput, TextToSignPanel, SpeechInput, SignClipPlayer, FeedbackControl, AboutAndLimitations.

## Backend
FastAPI endpoints: `/health`, `/api/v1/predict`, `/api/v1/labels`, optional `/api/v1/feedback`. Load model once at startup. Validate tensor shape, finite values and request size.

## AI pipeline
1. Explicit camera permission.
2. Sample frames and extract only supported landmarks.
3. Normalize relative to wrist/shoulder reference as supported by training schema.
4. Buffer N frames matching model input.
5. Send landmarks, not raw frames, to API where possible.
6. Return top-k class/confidence.
7. Apply validation-selected threshold; abstain if uncertain.
8. Display Bengali output; TTS only if available.

## Deployment
Vercel frontend + Render FastAPI backend; HTTPS, restricted CORS, environment secrets, health checks. Keep a stable local demo fallback. Never present a prerecorded mock as live AI inference.

## Reliability and privacy
Graceful camera/mic/API errors; stop camera control; no raw webcam retention by default; no face identification; opt-in non-identifying feedback; rate limiting; explicit model version and supported vocabulary.
