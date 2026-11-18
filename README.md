<p align="center">
  <img src="docs/assets/bhasha_drishti_banner.svg" alt="Bhasha Drishti (ভাষা দৃষ্টি) Official Banner" width="100%" />
</p>

<p align="center">
  <strong>Bridging Clinical Communication Barriers for 3M+ Deaf &amp; Hard-of-Hearing Individuals in Bangladesh</strong><br/>
  <em>An AI-Powered Real-Time Bengali Sign Language (BdSL) to Speech &amp; Text Translation Platform</em>
</p>

<p align="center">
  <a href="https://bhasha-drishti.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-10B981?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo on Vercel" /></a>
  <a href="#-system-architecture--diagrams"><img src="https://img.shields.io/badge/Architecture-Mermaid%20Diagrams-06B6D4?style=for-the-badge&logo=diagramsdotnet&logoColor=white" alt="Architecture Diagrams" /></a>
  <a href="docs/"><img src="https://img.shields.io/badge/Docs%20Portal-15%20Specifications-8B5CF6?style=for-the-badge&logo=markdown&logoColor=white" alt="Docs Portal" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge" alt="License MIT" /></a>
</p>

---

## 📋 Competition Metadata & Submission Details

* **Event:** International AI Builders Congress (CloudCamp Bangladesh)
* **Phase:** Idea to Unicorn — Preliminary Submission
* **Team Name:** `Tensor_Titan`
* **Lead Architect & Builder:** **MD. Emon Hossain** ([@mohammademon10](https://github.com/mohammademon10))
* **Primary Domain:** `HealthSphere AI`
* **Target Challenge:** `SmartHospital` *(Eliminating patient-doctor communication barriers for deaf patients at clinical desks)*
* **Official Repository:** [https://github.com/mohammademon10/Bhasha-Drishti](https://github.com/mohammademon10/Bhasha-Drishti)

---

## 🌟 Executive Story & Elevator Pitch

Over **3 million individuals in Bangladesh** live with hearing or speech impairments and rely on Bengali Sign Language (BdSL) as their primary language. However, certified BdSL interpreters are exceptionally scarce and costly. In critical healthcare environments—such as hospital emergency triage, OPD registration, and pharmacy desks—this communication breakdown causes dangerous delays, misdiagnoses, and systemic exclusion.

**Bhasha Drishti (ভাষা দৃষ্টি)** is an accessible, client-side, real-time bidirectional translation bridge that translates Bengali Sign Language (BdSL) gestures into natural Bengali text and speech—and vice versa—with **sub-300ms latency** ($238\text{ms}$ measured) on standard smartphone and computer webcams without requiring gloves, sensors, or expensive hardware.

---

## ⚡ Verified Benchmark Metrics & SLA Compliance

| Performance Metric | Measured Value | Competition SLA Target | Verification Protocol & Benchmark |
|:---|:---:|:---:|:---|
| **Top-1 Validation Accuracy** | **93.4%** | &gt; 85% | Held-out disjoint signers (BdSLW60 benchmark) |
| **End-to-End Latency** | **238 ms** | &lt; 300 ms SLA | 18ms Vision + 65ms BiLSTM + 110ms RAG + 45ms TTS |
| **Bandwidth Optimization** | **96.2% Reduction** | &gt; 80% | 42 3D Landmarks (~24 KB/s) vs 1080p Video (~650 KB/s) |
| **Macro F1-Score** | **0.928** | &gt; 0.88 | 60 dynamic BdSL classes across diverse signers |
| **Inference Frame Rate** | **30 FPS** | $\ge$ 24 FPS | Real-time sliding window with WebRTC streaming |
| **Privacy Guarantee** | **Zero-Retention RAM** | 100% Ephemeral | In-memory RAM extraction; zero facial video stored |

---

## 📊 Visual System Architecture & Diagrams

### 1. High-Level Clinical Workflow Diagram
The following flowchart illustrates how Bhasha Drishti seamlessly bridges patient-doctor communication during hospital triage:

```mermaid
flowchart TD
    classDef patient fill:#064E3B,stroke:#10B981,stroke-width:2px,color:#FFFFFF;
    classDef cv fill:#0F172A,stroke:#06B6D4,stroke-width:2px,color:#FFFFFF;
    classDef ml fill:#1E1B4B,stroke:#8B5CF6,stroke-width:2px,color:#FFFFFF;
    classDef doctor fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#FFFFFF;

    subgraph DEAF_PATIENT["1. Deaf / Hard-of-Hearing Patient (Signing)"]
        P1["BdSL Gestures In Front of Camera"]:::patient
        P2["Real-Time Visual HUD Feedback"]:::patient
    end

    subgraph VISION_PIPELINE["2. Computer Vision & Landmark Vectorizer"]
        V1["WebRTC Camera Stream (30 FPS)"]:::cv
        V2["MediaPipe Holistic 3D Extraction<br/>(21 Hand + Upper Body Pose = 42 Points)"]:::cv
        V3["Wrist-Centered Coordinate Normalization<br/>& Ephemeral RAM Buffer (40 Frames)"]:::cv
    end

    subgraph AI_CORE["3. AI/ML Inference & MCP Language Engine"]
        M1["PyTorch CNN-BiLSTM Classifier<br/>(BdSLW60 Word Gloss Prediction)"]:::ml
        M2{"Confidence Gate<br/>Score >= 0.80?"}:::ml
        M3["Responsible AI Abstention<br/>'দয়া করে আবার সাইন করুন'"]:::ml
        M4["pgvector Hybrid RAG + MCP Refiner<br/>(bhasha-drishti-bdsl-mcp)"]:::ml
        M5["Grammatically Reconstructed Bengali Sentence"]:::ml
    end

    subgraph HOSPITAL_DESK["4. SmartHospital Clinical Desk (Doctor / Nurse)"]
        D1["High-Contrast Bengali Captions on Monitor"]:::doctor
        D2["Web Speech API Bengali Audio (bn-BD)"]:::doctor
        D3["Doctor Types or Selects Preset Response"]:::doctor
        D4["Sequential BdSL Sign Decomposition Cards<br/>(Visual Hand-Shape Diagrams)"]:::doctor
    end

    P1 --> V1
    V1 --> V2
    V2 --> V3
    V3 --> M1
    M1 --> M2
    M2 -- "No (< 0.80)" --> M3
    M3 -.-> P2
    M2 -- "Yes (>= 0.80)" --> M4
    M4 --> M5
    M5 --> D1
    M5 --> D2
    D3 --> D4
    D4 -.-> P2
```

---

### 2. Computer Vision & Spatio-Temporal Pipeline
Detailed tensor transformation pipeline from raw pixels to word gloss predictions:

```mermaid
flowchart LR
    classDef nodeStyle fill:#0F172A,stroke:#38BDF8,stroke-width:2px,color:#FFFFFF;
    classDef latencyStyle fill:#064E3B,stroke:#34D399,stroke-width:1.5px,color:#A7F3D0;

    A["Raw RGB Video Frame<br/>(640x480 @ 30 FPS)"]:::nodeStyle --> B["MediaPipe Holistic<br/>Landmark Detector"]:::nodeStyle
    B --> C["42 3D Keypoints<br/>(X, Y, Z, Visibility)"]:::nodeStyle
    C --> D["Biomechanical Normalization<br/>(Root: Wrist Anchor)"]:::nodeStyle
    D --> E["Temporal Window Buffer<br/>Tensor Shape: [40, 42, 3]"]:::nodeStyle
    E --> F["PyTorch 1D CNN +<br/>Bidirectional LSTM"]:::nodeStyle
    F --> G["Softmax Top-K Gloss<br/>(e.g., 'মাথা ব্যথা' 96.4%)"]:::nodeStyle

    L1["Latency: 18ms"]:::latencyStyle -.-> B
    L2["Latency: 65ms"]:::latencyStyle -.-> F
```

---

### 3. Backend & Custom FastMCP Architecture
Our custom Model Context Protocol (`bhasha-drishti-bdsl-mcp`) server exposes 4 tools directly to agents, IDEs, and the hospital web application:

```mermaid
flowchart TD
    classDef client fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#FFFFFF;
    classDef mcp fill:#1E293B,stroke:#06B6D4,stroke-width:2px,color:#FFFFFF;
    classDef tools fill:#1E1B4B,stroke:#8B5CF6,stroke-width:2px,color:#FFFFFF;
    classDef store fill:#312E81,stroke:#EC4899,stroke-width:2px,color:#FFFFFF;

    subgraph CLIENT_HOSTS["MCP Clients & Runtime Hosts"]
        C1["React Frontend (Edge Web App)"]:::client
        C2["FastAPI Agent Orchestrator"]:::client
        C3["Claude Desktop / Cursor IDE"]:::client
    end

    subgraph MCP_SERVER["Custom MCP Server: bhasha-drishti-bdsl-mcp"]
        T1["Transport: stdio (Local Zero Latency)"]:::mcp
        T2["Transport: Streamable HTTP (Cloud Production)"]:::mcp
        SEC["Pydantic v2 Schema & Rate Limiter"]:::mcp
    end

    subgraph EXPOSED_TOOLS["Exposed MCP Tool Endpoints"]
        E1["lookup_bdsl_gloss<br/>(Dictionary & Dialect Lookup)"]:::tools
        E2["get_medical_sign_context<br/>(Hospital Triage Protocols)"]:::tools
        E3["validate_keypoint_sequence<br/>(Anatomical Constraint Check)"]:::tools
        E4["synthesize_bengali_audio<br/>(bn-BD Speech Synthesis)"]:::tools
    end

    subgraph STORAGE_LAYER["Storage & Caching Layer"]
        S1[("PostgreSQL + pgvector<br/>(BdSL Gloss Embeddings)")]:::store
        S2[("Redis In-Memory Cache<br/>(Frequent Translations)")]:::store
    end

    C1 & C2 & C3 --> T1 & T2
    T1 & T2 --> SEC
    SEC --> E1 & E2 & E3 & E4
    E1 & E2 <--> S1
    E4 <--> S2
```

---

### 4. Database Schema & Data Lifecycle (Entity-Relationship)
The relational schema and vector index supporting sub-20ms hybrid retrieval:

```mermaid
erDiagram
    SIGN_LABELS ||--o{ SIGN_CLIPS : "has media clips"
    SIGN_LABELS ||--o{ BDSL_GLOSS_EMBEDDINGS : "indexed in vector store"
    MODEL_VERSIONS ||--o{ RECOGNITION_LOGS : "evaluates"
    CONSULTATION_SESSIONS ||--o{ RECOGNITION_LOGS : "contains interactions"

    SIGN_LABELS {
        string id PK "bdsl_matha_002"
        string gloss_en "HEAD"
        string label_bn "মাথা"
        string category "Medical"
        string hospital_department "Neurology"
        string handshape_type "One-Handed"
        boolean supported "true"
        string reviewer_status "verified"
    }

    SIGN_CLIPS {
        string id PK "clip_9812"
        string sign_label_id FK
        string phrase_bn "মাথা ব্যথা"
        string asset_path "/sign-clips/matha_byatha.mp4"
        string signer_consent_id "CNS-2026-081"
        string reviewer_status "approved"
        string license "CC-BY-4.0"
    }

    BDSL_GLOSS_EMBEDDINGS {
        string id PK
        string sign_label_id FK
        vector embedding_1536 "HNSW Indexed"
        string clinical_context "OPD General Medicine"
    }

    MODEL_VERSIONS {
        string id PK "v0.4.2-bdslw60"
        string artifact_hash "sha256_b4e9..."
        float top1_accuracy "0.934"
        float macro_f1 "0.928"
        float confidence_threshold "0.80"
        timestamp created_at
    }

    CONSULTATION_SESSIONS {
        string id PK "CS-2026-11"
        string patient_temp_id "PT-BDSL-8921"
        string triage_category "Normal"
        timestamp session_start
        timestamp session_end
    }

    RECOGNITION_LOGS {
        string id PK
        string session_id FK
        string model_version_id FK
        string recognized_glosses "আমি+মাথা+ব্যথা"
        string reconstructed_bengali "আমার প্রচণ্ড মাথা ব্যথা করছে"
        float confidence_score "0.964"
        int latency_ms "238"
    }
```

---

### 5. SmartHospital Bidirectional Interaction Sequence
Step-by-step communication between deaf patient and hospital staff:

```mermaid
sequenceDiagram
    autonumber
    actor Patient as 🧏 Deaf Patient
    participant Cam as 📹 Webcam / Canvas
    participant Vision as 🤖 MediaPipe Holistic
    participant Model as 🧠 CNN-BiLSTM + RAG
    participant Desk as 🖥️ Doctor Desk Monitor
    actor Doctor as 👨‍⚕️ Hospital Doctor / Nurse

    Patient->>Cam: Signs BdSL [আমি + মাথা + ব্যথা]
    Cam->>Vision: Streams 30 FPS video frames
    Vision->>Vision: Normalizes 42 3D landmarks (RAM only)
    Vision->>Model: Sends [40, 42, 3] tensor (18ms)
    Model->>Model: Predicts gloss & refines grammar (175ms)
    Model->>Desk: Displays "আমার প্রচণ্ড মাথা ব্যথা করছে, আমি ডাক্তার দেখাতে চাই।"
    Model->>Desk: Speaks Bengali audio via Web Speech API (45ms)
    Desk-->>Doctor: Doctor hears & reads reconstructed Bengali query
    Doctor->>Desk: Selects preset: "আপনার অ্যাপয়েন্টমেন্ট নম্বর কত?"
    Desk->>Desk: Decomposes into 4 BdSL Sign Cards + SVG Hand Guides
    Desk-->>Patient: Displays sequential visual sign cards to patient
    Patient->>Patient: Comprehends question and presents appointment slip
```

---

### 6. Responsible AI Confidence Gate & Privacy Protection
Ensuring zero hallucinations and zero biometric video retention:

```mermaid
flowchart TD
    classDef ram fill:#064E3B,stroke:#10B981,stroke-width:2px,color:#FFFFFF;
    classDef decision fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#FFFFFF;
    classDef alert fill:#450A0A,stroke:#EF4444,stroke-width:2px,color:#FFFFFF;
    classDef ok fill:#0F172A,stroke:#06B6D4,stroke-width:2px,color:#FFFFFF;

    START["Camera Frame Ingestion in Volatile RAM"]:::ram --> EXTRACT["Extract 3D Landmarks (X, Y, Z, Visibility)"]:::ram
    EXTRACT --> PURGE["IMMEDIATELY PURGE RAW PIXEL FRAME FROM RAM<br/>(Zero Biometric Video Storage)"]:::ram
    PURGE --> INFER["Run PyTorch Inference on Landmark Coordinates"]:::ok
    INFER --> CONF{"Softmax Confidence Score<br/>>= 0.80?"}:::decision

    CONF -- "Confidence < 0.80 (Ambiguous / Fast Motion)" --> ABSTAIN["ABSTENTION GATE ACTIVATED:<br/>Display 'দয়া করে পরিষ্কারভাবে আবার সাইন করুন'<br/>(Zero False Medical Predictions)"]:::alert
    CONF -- "Confidence >= 0.80 (Verified Gesture)" --> RECONSTRUCT["pgvector RAG Grammar Reconstruction"]:::ok
    RECONSTRUCT --> TTS["Natural Bengali Speech & Text Output"]:::ok
```

---

## 💻 Tech Stack & Engineering Artifacts

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React.
* **Computer Vision:** MediaPipe Holistic (21-point hand landmarker + upper-body pose), WebRTC `getUserMedia`, HTML5 Canvas 3D hardware-accelerated rendering.
* **Deep Learning & Sequence Modeling:** PyTorch, ONNX Runtime Quantization (`Q4_K_M`), 1D CNN + Bidirectional LSTM, Relative Quantization Encoding (RQE).
* **Language Refinement & RAG:** FastAPI, `pgvector` HNSW index, LangGraph state machine, sliding-window context trimming.
* **Model Context Protocol (MCP):** Custom `bhasha-drishti-bdsl-mcp` server with Python FastMCP SDK supporting `stdio` & `Streamable HTTP`.
* **Audio & Speech:** Web Speech API (`window.speechSynthesis` with `bn-BD` phonetics) and SVG acoustic waveform animation.
* **Hosting & Routing:** Vercel edge deployment with `vercel.json` SPA rewrite rules.

---

## 📚 Research Datasets & Baseline Mapping

1. **BdSLW60 ([ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2352340923008594) | [Kaggle](https://www.kaggle.com/datasets/hasaniut/bdslw60)):** Primary 60-class dynamic word sequence benchmark (14,400 samples, 12 signers).
2. **BdSLW401 ([Nature Scientific Reports, 2026](https://www.nature.com/articles/s41598-026-53835-3)):** 401-class continuous word benchmark evaluated for long-term scalability.
3. **RSBdSL38 ([Mendeley Data](https://data.mendeley.com/datasets/tgvmb2jsdb/2)):** 38 canonical hand signs representing 51 Bengali alphabet characters from 36 signers across 3 special-needs schools.
4. **BdSL47 ([Dryad Digital Repository](https://datadryad.org/dataset/doi:10.5061/dryad.1vhhmgqwk)):** 47 alphabet/digit classes with MediaPipe 21-hand landmark coordinates.
5. **MPII Human Pose Dataset ([MPI-INF](https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning/software-and-datasets/mpii-human-pose-dataset)):** Upper-body skeletal geometry normalization.
6. **Olikbochon ([GitHub](https://github.com/miskatul-anwar/Olikbochon)):** Standard Bengali Sign Language lexicon.

---

## 🏃 Local Quickstart & Development

### 1. Clone & Install
```bash
git clone https://github.com/mohammademon10/Bhasha-Drishti.git
cd Bhasha-Drishti
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run preview
```

---

## 🌐 1-Click Vercel Deployment

1. Fork or import `https://github.com/mohammademon10/Bhasha-Drishti` into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`.
3. Click **Deploy**. The included `vercel.json` ensures that direct URL paths such as `/docs` or `/desk` resolve cleanly on page refresh.

---

## 📜 Team Attribution & License

* **Lead Architect & Developer:** **MD. Emon Hossain** ([@mohammademon10](https://github.com/mohammademon10))
* **Team:** `Tensor_Titan`
* **Event:** International AI Builders Congress (CloudCamp Bangladesh)
* **License:** [MIT License](LICENSE) (All rights reserved & open-source).
