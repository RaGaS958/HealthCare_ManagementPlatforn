<div align="center">

<!-- ██████╗ ANIMATED HEADER ██████╗ -->

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=MediCore&fontSize=72&fontColor=fff&animation=twinkling&fontAlignY=32&desc=Healthcare%20Management%20Platform&descAlignY=55&descSize=22" width="100%"/>

<br/>

<!-- LIVE BADGES ROW 1 -->
<a href="https://health-care-management-platforn-ae4.vercel.app/">
  <img src="https://img.shields.io/badge/🌐_Frontend-Live_on_Vercel-00C7B7?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>
<a href="https://healthcare-managementplatforn.onrender.com">
  <img src="https://img.shields.io/badge/⚙️_Backend-Live_on_Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/>
</a>
<a href="https://hub.docker.com/repository/docker/ragas111/healthmanagement-backend/general">
  <img src="https://img.shields.io/badge/🐳_Docker-Hub_Image-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</a>

<br/><br/>

<!-- TECH STACK BADGES -->
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/Python_3.11-3776AB?style=flat-square&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/Pydantic_v2-E92063?style=flat-square&logo=pydantic&logoColor=white"/>
<img src="https://img.shields.io/badge/Uvicorn-499848?style=flat-square&logo=gunicorn&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white"/>

<br/><br/>

<!-- STATUS BADGES -->
<img src="https://img.shields.io/badge/API_Status-✅_Online-brightgreen?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
<img src="https://img.shields.io/badge/REST_API-CRUD_Ready-purple?style=for-the-badge"/>

</div>

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🧬 What is MediCore?
<!-- ═══════════════════════════════════════════════════════════════════════ -->

> **MediCore** is a full-stack, production-grade **Healthcare Patient Management Platform** built for real-time clinical workflows. It features a FastAPI backend with automatic BMI computation, intelligent health-status verdicts, paginated search, sorted analytics — all served through a beautifully animated frontend with GSAP transitions, responsive cards, and a live dashboard.

```
┌─────────────────────────────────────────────────────────────────┐
│  🏥  CREATE  →  READ  →  UPDATE  →  DELETE  →  ANALYSE          │
│      patients    records   vitals     records    BMI trends      │
└─────────────────────────────────────────────────────────────────┘
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🎬 Live Demo (App Walkthrough)
<!-- ═══════════════════════════════════════════════════════════════════════ -->

<div align="center">

### 🖥️ Dashboard & Patient Grid
<!-- GIF PLACEHOLDER — Replace with screen recording of dashboard -->
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║       [ 📽️  INSERT DASHBOARD GIF HERE ]                  ║
║                                                          ║
║   Recommended: Screen capture of the hero section,      ║
║   stat cards animating in, and patient grid loading.    ║
║   Tool: Loom / ShareX / Kap (macOS)                     ║
║   Size: 800×450px, < 5MB                                ║
╚══════════════════════════════════════════════════════════╝
```

### ➕ Add / Edit Patient Flow
<!-- GIF PLACEHOLDER — Replace with screen recording of add/edit modal -->
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║       [ 📽️  INSERT ADD-PATIENT GIF HERE ]                ║
║                                                          ║
║   Recommended: Modal open → form fill → save toast      ║
║   showing auto-calculated BMI + verdict on the card.    ║
╚══════════════════════════════════════════════════════════╝
```

### 🔍 Search, Sort & Pagination
<!-- GIF PLACEHOLDER — Replace with screen recording of search/sort -->
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║       [ 📽️  INSERT SEARCH-SORT GIF HERE ]                ║
║                                                          ║
║   Recommended: Typing in search bar → live filter,      ║
║   then BMI sort toggle, then pagination navigation.     ║
╚══════════════════════════════════════════════════════════╝
```

### 🗑️ Delete & ID Reorder
<!-- GIF PLACEHOLDER — Replace with delete confirmation + reorder -->
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║       [ 📽️  INSERT DELETE GIF HERE ]                     ║
║                                                          ║
║   Recommended: Click delete → confirm modal →           ║
║   card vanishes → IDs reordered seamlessly.             ║
╚══════════════════════════════════════════════════════════╝
```

</div>

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🏗️ System Architecture
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```mermaid
graph TB
    subgraph CLIENT ["🌐 Client Layer (Vercel)"]
        UI["🖥️ index.html<br/>MediCore Frontend"]
        JS["⚡ app.js<br/>GSAP + Fetch API"]
        CSS["🎨 style.css<br/>Animations & Layout"]
        UI --> JS
        UI --> CSS
    end

    subgraph BACKEND ["⚙️ Backend Layer (Render)"]
        FA["🚀 FastAPI App<br/>main.py"]
        PY["🐍 Pydantic v2<br/>Validation + Computed Fields"]
        UV["🦄 Uvicorn<br/>ASGI Server :8000"]
        FA --> PY
        UV --> FA
    end

    subgraph DATA ["💾 Data Layer"]
        JSON["📄 patients.json<br/>Persistent Storage"]
    end

    subgraph DOCKER ["🐳 Docker (Hub: ragas111)"]
        IMG["📦 healthmanagement-backend<br/>python:3.11-slim"]
    end

    JS -- "REST API (CORS enabled)" --> FA
    FA -- "read/write" --> JSON
    IMG -- "runs" --> UV

    style CLIENT fill:#1a1a2e,stroke:#00C7B7,color:#fff
    style BACKEND fill:#16213e,stroke:#46E3B7,color:#fff
    style DATA fill:#0f3460,stroke:#e94560,color:#fff
    style DOCKER fill:#0d1b2a,stroke:#2496ED,color:#fff
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🔄 Request Lifecycle
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```mermaid
sequenceDiagram
    actor User
    participant UI as 🖥️ Frontend (Vercel)
    participant API as ⚙️ FastAPI (Render)
    participant PY as 🐍 Pydantic v2
    participant DB as 💾 patients.json

    User->>UI: Interact (Add / Edit / Delete)
    UI->>API: HTTP Request (CORS preflight)
    API->>API: CORS middleware validates origin
    API->>PY: Validate & parse request body
    PY->>PY: Compute BMI + Verdict
    PY-->>API: Validated Patient model
    API->>DB: load_patients() → read JSON
    DB-->>API: Dict of patients
    API->>DB: save_patients() → write JSON
    DB-->>API: Confirm write
    API-->>UI: JSONResponse (201 / 200 / 404)
    UI-->>User: Toast notification + Card render
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 📊 Data Model & BMI Engine
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```mermaid
classDiagram
    class Patient {
        +str id
        +str name
        +str city
        +int age
        +Literal gender
        +float height_cm
        +float weight_kg
        +float bmi [computed]
        +str verdict [computed]
        +compute_bmi() float
        +compute_verdict() str
    }

    class PatientUpdate {
        +Optional~str~ name
        +Optional~str~ city
        +Optional~int~ age
        +Optional~Literal~ gender
        +Optional~float~ height
        +Optional~float~ weight
    }

    class BMIEngine {
        <<computed>>
        +Underweight  BMI < 18.5
        +Normal       18.5 ≤ BMI < 25
        +Overweight   25 ≤ BMI < 30
        +Obese        BMI ≥ 30
    }

    Patient --> BMIEngine : drives verdict
    PatientUpdate ..> Patient : partially updates
```

### 🧮 BMI Computation

```
         weight (kg)
BMI = ─────────────────     →   rounded to 2 decimal places
       height² (meters)
```

| Verdict | BMI Range | Badge |
|---------|-----------|-------|
| 🟦 Underweight | `< 18.5` | ![](https://img.shields.io/badge/Underweight-BMI_<_18.5-blue) |
| 🟩 Normal | `18.5 – 24.9` | ![](https://img.shields.io/badge/Normal-18.5_≤_BMI_<_25-brightgreen) |
| 🟨 Overweight | `25 – 29.9` | ![](https://img.shields.io/badge/Overweight-25_≤_BMI_<_30-yellow) |
| 🟥 Obese | `≥ 30` | ![](https://img.shields.io/badge/Obese-BMI_≥_30-red) |

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 📡 API Reference — Complete Endpoint Map
<!-- ═══════════════════════════════════════════════════════════════════════ -->

<div align="center">
<b>Base URL:</b> <code>https://healthcare-managementplatforn.onrender.com</code>
</div>

<br/>

```mermaid
flowchart LR
    ROOT(["🏥 MediCore API"])

    ROOT --> G["🟢 GET"]
    ROOT --> P["🟡 POST"]
    ROOT --> U["🔵 PUT"]
    ROOT --> D["🔴 DELETE"]

    G --> G1["/health"]
    G --> G2["/"]
    G --> G3["/about"]
    G --> G4["/view_patients"]
    G --> G5["/patients\n?page & limit & search"]
    G --> G6["/patient/:id"]
    G --> G7["/patient/:id/:field"]
    G --> G8["/sort\n?sort_by & order"]

    P --> P1["/add_patient"]

    U --> U1["/update_patient/:id"]

    D --> D1["/delete_patient/:id"]

    style ROOT fill:#1a1a2e,color:#fff,stroke:#00C7B7
    style G fill:#1a472a,color:#fff,stroke:#46E3B7
    style P fill:#3a3000,color:#fff,stroke:#FFD700
    style U fill:#002060,color:#fff,stroke:#4DA6FF
    style D fill:#4a1a1a,color:#fff,stroke:#FF6B6B
```

---

### 🟢 GET Endpoints

#### `GET /health`
> System health probe — returns live status.

```http
GET https://healthcare-managementplatforn.onrender.com/health
```

**Response `200 OK`**
```json
{ "status": "healthy" }
```

---

#### `GET /patients` — Paginated + Searchable
> Primary listing endpoint with full pagination and search.

```http
GET /patients?page=1&limit=20&search=john
```

| Query Param | Type | Default | Description |
|-------------|------|---------|-------------|
| `page` | `int ≥ 1` | `1` | Page number |
| `limit` | `int 1–100` | `20` | Records per page |
| `search` | `string` | `""` | Filter by name, city, ID, or gender |

**Response `200 OK`**
```json
{
  "data": {
    "P0001": { "name": "John Doe", "city": "Mumbai", "age": 30, "bmi": 22.86, "verdict": "Normal" }
  },
  "total": 150,
  "page": 1,
  "limit": 20,
  "total_pages": 8,
  "has_next": true,
  "has_prev": false
}
```

---

#### `GET /patient/{patient_id}`
> Fetch a single patient's complete record.

```http
GET /patient/P0001
```

**Response `200 OK`**
```json
{
  "name": "John Doe",
  "city": "New Delhi",
  "age": 28,
  "gender": "Male",
  "height": 175.0,
  "weight": 70.0,
  "bmi": 22.86,
  "verdict": "Normal"
}
```

**Response `404 Not Found`**
```json
{ "detail": "Patient not found" }
```

---

#### `GET /patient/{patient_id}/{field}`
> Retrieve a specific field from a patient record.

```http
GET /patient/P0001/bmi
```

**Response `200 OK`**
```json
{ "bmi": 22.86 }
```

**Valid fields:** `name`, `city`, `age`, `gender`, `height`, `weight`, `bmi`, `verdict`

---

#### `GET /sort`
> Sort all patients by a numeric field.

```http
GET /sort?sort_by=bmi&order=desc
```

| Query Param | Options | Description |
|-------------|---------|-------------|
| `sort_by` | `bmi`, `weight`, `height` | Field to sort on |
| `order` | `asc`, `desc` | Ascending or descending |

**Response `200 OK`**
```json
[
  { "name": "Alice", "bmi": 33.2, "verdict": "Obese" },
  { "name": "Bob",   "bmi": 27.1, "verdict": "Overweight" }
]
```

---

### 🟡 POST Endpoint

#### `POST /add_patient`
> Add a new patient. BMI and verdict are **auto-computed** server-side.

```http
POST /add_patient
Content-Type: application/json
```

**Request Body**
```json
{
  "id":     "P0010",
  "name":   "Priya Sharma",
  "city":   "Lucknow",
  "age":    26,
  "gender": "Female",
  "height": 162.0,
  "weight": 58.5
}
```

**Validation Rules**

| Field | Type | Constraint |
|-------|------|------------|
| `id` | `str` | Required, unique |
| `name` | `str` | Required |
| `city` | `str` | Required |
| `age` | `int` | `> 0` |
| `gender` | `Literal` | `Male` \| `Female` \| `Other` |
| `height` | `float` | `> 0` (cm) |
| `weight` | `float` | `> 0` (kg) |

**Response `201 Created`**
```json
{ "message": "Patient added successfully", "patient_id": "P0010" }
```

**Response `400 Bad Request`** (duplicate ID)
```json
{ "detail": "Patient with this ID already exists" }
```

---

### 🔵 PUT Endpoint

#### `PUT /update_patient/{patient_id}`
> Partially update any patient field. Only provided fields are changed. BMI/verdict **recompute automatically** if height or weight changes.

```http
PUT /update_patient/P0010
Content-Type: application/json
```

**Request Body** (all fields optional)
```json
{
  "weight": 62.0,
  "city":   "Kanpur"
}
```

**Response `200 OK`**
```json
{ "message": "Patient updated successfully", "patient_id": "P0010" }
```

**Response `404`** — Patient not found  
**Response `400`** — Invalid field or no fields provided

---

### 🔴 DELETE Endpoint

#### `DELETE /delete_patient/{patient_id}`
> Delete a patient and **automatically reorder all remaining IDs** to maintain a clean sequential gap-free list (P0001, P0002, P0003…).

```http
DELETE /delete_patient/P0003
```

**Before Delete:**
```
P0001 Alice  →  P0001 Alice
P0002 Bob    →  P0002 Bob
P0003 Carol  ✗  [DELETED]
P0004 Dave   →  P0003 Dave  ← reordered
P0005 Eve    →  P0004 Eve   ← reordered
```

**Response `200 OK`**
```json
{
  "message": "Patient deleted and IDs reordered successfully",
  "deleted_id": "P0003"
}
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🔁 CRUD Flow Diagram
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```mermaid
flowchart LR
    A([🧑 User Input]) --> B{Action?}

    B -->|POST /add_patient| C[Validate Schema\nPydantic v2]
    C --> D{ID Unique?}
    D -->|No| E[❌ 400 Duplicate ID]
    D -->|Yes| F[Compute BMI\n& Verdict]
    F --> G[(💾 Save to JSON)]
    G --> H[✅ 201 Created]

    B -->|GET /patients| I[Load JSON\nApply search filter]
    I --> J[Paginate\nchunk result]
    J --> K[✅ 200 + metadata]

    B -->|PUT /update_patient| L{Patient\nExists?}
    L -->|No| M[❌ 404 Not Found]
    L -->|Yes| N[Merge fields\nRecompute if h/w changed]
    N --> G

    B -->|DELETE /delete_patient| O{Patient\nExists?}
    O -->|No| P[❌ 404 Not Found]
    O -->|Yes| Q[Delete record\nReorder all IDs]
    Q --> G

    style A fill:#1a1a2e,color:#fff
    style H fill:#1a472a,color:#fff
    style K fill:#1a472a,color:#fff
    style E fill:#4a1a1a,color:#fff
    style M fill:#4a1a1a,color:#fff
    style P fill:#4a1a1a,color:#fff
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 📈 Analytics & Platform Metrics
<!-- ═══════════════════════════════════════════════════════════════════════ -->

### 🩺 BMI Distribution (Example Population)

```mermaid
pie title Patient BMI Distribution
    "✅ Normal (18.5–24.9)"     : 42
    "🔵 Underweight (< 18.5)"   : 11
    "🟡 Overweight (25–29.9)"   : 29
    "🔴 Obese (≥ 30)"           : 18
```

### 👥 Gender Distribution

```mermaid
pie title Gender Breakdown
    "Male"   : 54
    "Female" : 43
    "Other"  : 3
```

### 📊 Age Group Distribution

```
Age Group Distribution (per 150 patients)
──────────────────────────────────────────
 0 – 18  │████░░░░░░░░░░░░░░░░░│   8 patients
19 – 30  │████████████░░░░░░░░░│  32 patients
31 – 45  │█████████████████░░░░│  45 patients  ← largest group
46 – 60  │███████████████░░░░░░│  38 patients
61 – 75  │████████░░░░░░░░░░░░░│  22 patients
  76+    │██░░░░░░░░░░░░░░░░░░░│   5 patients
──────────────────────────────────────────
```

### 📉 BMI by City (Example)

```
Average BMI by City (example data)
────────────────────────────────────────────────
  Mumbai    │█████████████████████░░░│  23.4
  Delhi     │███████████████████████░│  25.1  ⚠️
  Lucknow   │██████████████████████░░│  24.8
  Bangalore │████████████████████░░░░│  22.9  ✅
  Chennai   │████████████████████████│  26.3  ⚠️
────────────────────────────────────────────────
  Scale: 18 ──────────────────────── 30
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🖼️ Frontend Features
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```mermaid
graph LR
    subgraph FRONTEND ["🖥️ Frontend Capabilities"]
        A[🦸 Animated Hero Section\nGSAP tween on load] --> B
        B[📊 Live Stat Cards\nTotal, Normal, Overweight, Obese] --> C
        C[🃏 Patient Cards Grid\nResponsive + BMI badge] --> D
        D[🔍 Real-time Search\nName / City / ID / Gender] --> E
        E[🔃 Sort Controls\nBMI / Weight / Height] --> F
        F[📄 Smart Pagination\n10 / 20 / 50 / 100 per page] --> G
        G[➕ Add/Edit Modal\nAuto-suggest next Patient ID]
        G --> H[🗑️ Delete Modal\nConfirm + reorder IDs]
        H --> I[🔔 Toast Notifications\nSuccess / Error feedback]
    end
```

| Feature | Detail |
|---------|--------|
| 🎨 Animation library | **GSAP 3.12** with ScrollTrigger |
| 🅰️ Fonts | Syne + DM Mono + Instrument Sans (Google Fonts) |
| 📱 Responsive | Mobile hamburger menu + adaptive grid |
| 🌑 Theme | Dark clinical design with accent gradients |
| ♿ Accessibility | `aria-modal`, `aria-live`, `aria-label` throughout |
| 🔄 Auto-refresh | Refresh button + search debounce |
| 🔢 ID suggestion | Frontend computes next available `P000X` automatically |

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🐍 Backend Tech Deep Dive
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```mermaid
graph TD
    subgraph PYDANTIC ["🐍 Pydantic v2 Magic"]
        A[Raw JSON body] --> B[Field validation\ntype + constraints]
        B --> C[Computed Fields\nbmi + verdict]
        C --> D[model_dump\nexclude id]
        D --> E[Stored to JSON]
    end

    subgraph CORS ["🌐 CORS Middleware"]
        F[Any origin *] --> G[All methods\nGET POST PUT DELETE OPTIONS]
        G --> H[All headers allowed]
    end

    subgraph PAGINATION ["📄 Pagination Engine"]
        I[All records] --> J[Apply search filter]
        J --> K[Ceiling division\nfor total_pages]
        K --> L[Slice chunk\nstart:end]
        L --> M[Return + metadata]
    end
```

### Key Backend Design Decisions

| Decision | Why |
|----------|-----|
| `patients.json` as DB | Zero-dependency persistence, suitable for demo/educational deployments |
| `@computed_field` BMI | Never stale — always recalculated from source height/weight |
| ID reordering on delete | Maintains clean sequential IDs, avoids gaps |
| `exclude_unset=True` on PATCH | Prevents accidental null overwrites on partial updates |
| `python:3.11-slim` Docker base | 70% smaller image than full Python image |

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🐳 Docker Setup
<!-- ═══════════════════════════════════════════════════════════════════════ -->

### Pull from Docker Hub

```bash
docker pull ragas111/healthmanagement-backend:latest
```

🔗 **Docker Hub:** [ragas111/healthmanagement-backend](https://hub.docker.com/repository/docker/ragas111/healthmanagement-backend/general)

### Run Locally

```bash
# Run the container
docker run -d \
  --name medicore-backend \
  -p 8000:8000 \
  ragas111/healthmanagement-backend:latest

# Check logs
docker logs medicore-backend

# Test health
curl http://localhost:8000/health
```

### Build from Source

```bash
# Clone the repo
git clone https://github.com/RaGaS958/HealthCare_ManagementPlatforn.git
cd HealthCare_ManagementPlatforn/Backend

# Build image
docker build -t medicore-backend .

# Run
docker run -d -p 8000:8000 medicore-backend
```

### Docker Architecture

```mermaid
graph LR
    A["📦 python:3.11-slim\nBase Image"] --> B["📋 requirements.txt\nCopied first for cache"]
    B --> C["⚡ pip install\n--no-cache-dir"]
    C --> D["📁 COPY . .\nSource code"]
    D --> E["🔌 EXPOSE 8000"]
    E --> F["🦄 uvicorn main:app\n--host 0.0.0.0 --port 8000"]
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🚀 Local Development Setup
<!-- ═══════════════════════════════════════════════════════════════════════ -->

### Prerequisites

```
Python 3.11+   Node.js (optional, for frontend dev)   Docker (optional)
```

### Backend

```bash
# 1. Clone
git clone https://github.com/RaGaS958/HealthCare_ManagementPlatforn.git
cd HealthCare_ManagementPlatforn/Backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate      # Linux/macOS
venv\Scripts\activate         # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run
uvicorn main:app --reload --port 8000

# 5. Open interactive docs
open http://localhost:8000/docs
```

### Frontend

```bash
cd ../Frontend

# No build step needed — plain HTML/CSS/JS
# Just update the API_BASE_URL in app.js if running locally:
# const API_BASE = "http://localhost:8000";

# Serve with any static server:
npx serve .
# OR
python -m http.server 3000
```

### Full Stack (Docker Compose — optional)

```yaml
# docker-compose.yml
version: "3.9"
services:
  backend:
    image: ragas111/healthmanagement-backend:latest
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app   # persist patients.json
  frontend:
    image: nginx:alpine
    ports:
      - "3000:80"
    volumes:
      - ./Frontend:/usr/share/nginx/html
```

```bash
docker compose up -d
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 📁 Project Structure
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```
HealthCare_ManagementPlatforn/
│
├── 📁 Backend/
│   ├── 🐍 main.py              # FastAPI app — all routes + Pydantic models
│   ├── 📋 requirements.txt     # Python dependencies
│   ├── 🐳 Dockerfile           # python:3.11-slim container definition
│   ├── 🔒 .dockerignore        # Docker build exclusions
│   └── 📄 patients.json        # JSON flat-file database (auto-created)
│
├── 📁 Frontend/
│   ├── 🌐 index.html           # Full SPA structure + modals
│   ├── ⚡ app.js               # API calls, GSAP animations, UI logic
│   └── 🎨 style.css            # Dark theme + responsive design
│
└── 📖 README.md
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🌐 Deployments
<!-- ═══════════════════════════════════════════════════════════════════════ -->

| Layer | Platform | URL | Status |
|-------|----------|-----|--------|
| 🖥️ Frontend | Vercel | [health-care-management-platforn-ae4.vercel.app](https://health-care-management-platforn-ae4.vercel.app/) | ![](https://img.shields.io/badge/status-live-brightgreen) |
| ⚙️ Backend | Render | [healthcare-managementplatforn.onrender.com](https://healthcare-managementplatforn.onrender.com) | ![](https://img.shields.io/badge/status-live-brightgreen) |
| 🐳 Image | Docker Hub | [ragas111/healthmanagement-backend](https://hub.docker.com/repository/docker/ragas111/healthmanagement-backend/general) | ![](https://img.shields.io/badge/docker-published-2496ED) |

> ⚠️ **Note:** Render free tier may sleep after inactivity — first request can take ~30s to cold start.

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🔐 API Error Reference
<!-- ═══════════════════════════════════════════════════════════════════════ -->

| HTTP Code | Scenario | Response |
|-----------|----------|----------|
| `200 OK` | Success (GET / PUT) | Data payload |
| `201 Created` | Patient added successfully | `{ "message": "...", "patient_id": "..." }` |
| `400 Bad Request` | Duplicate ID / Invalid field / No update data | `{ "detail": "..." }` |
| `404 Not Found` | Patient or field not found | `{ "detail": "Patient not found" }` |
| `422 Unprocessable` | Pydantic validation failed | Pydantic error details |
| `500 Internal` | JSON file write failure | `{ "detail": "Error saving..." }` |

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## ⚡ Dependencies
<!-- ═══════════════════════════════════════════════════════════════════════ -->

### Backend (`requirements.txt`)

| Package | Version | Purpose |
|---------|---------|---------|
| `fastapi` | 0.129.0 | Web framework |
| `pydantic` | 2.12.5 | Data validation + computed fields |
| `uvicorn` | 0.41.0 | ASGI server |
| `starlette` | 0.52.1 | ASGI toolkit (FastAPI base) |
| `pydantic-core` | 2.41.5 | Pydantic Rust core |
| `annotated-types` | 0.7.0 | Type annotation utilities |

### Frontend (CDN)

| Library | Version | Purpose |
|---------|---------|---------|
| GSAP | 3.12.2 | Scroll + entrance animations |
| ScrollTrigger | 3.12.2 | Scroll-based animation triggers |
| Google Fonts | — | Syne, DM Mono, Instrument Sans |

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 🗺️ Roadmap
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```mermaid
timeline
    title MediCore Roadmap
    section v1.0 — Current
        Core CRUD     : Add / Read / Update / Delete
        BMI Engine    : Auto-computed verdict
        Pagination    : Search + Sort + Limit
        Docker        : Published to Hub
        Deploy        : Vercel + Render

    section v1.1 — Next
        Auth          : JWT-based login
        PostgreSQL    : Replace JSON with real DB
        Charts        : Chart.js BMI trend graphs
        Export        : CSV / PDF patient export

    section v2.0 — Future
        Multi-tenant  : Hospital-level isolation
        AI Insights   : Risk prediction model
        Mobile App    : React Native companion
        Audit Log     : Change history per patient
```

---

<!-- ═══════════════════════════════════════════════════════════════════════ -->
## 📜 License
<!-- ═══════════════════════════════════════════════════════════════════════ -->

<div align="center">

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

**Built with ❤️ by [RaGaS958](https://github.com/RaGaS958)**

[![GitHub](https://img.shields.io/badge/GitHub-RaGaS958-181717?style=for-the-badge&logo=github)](https://github.com/RaGaS958)
[![Docker Hub](https://img.shields.io/badge/Docker-ragas111-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/ragas111)

</div>
