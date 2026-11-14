# 🔍 FakeGuard — AI-Powered Fake News Detection System

> A machine learning pipeline that classifies news articles as **Real** or **Fake** using
> an ensemble of four NLP models, a FastAPI inference backend, and an interactive Streamlit
> dashboard — with a built-in OOD (out-of-distribution) reliability guard.

[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.58-FF4B4B?logo=streamlit)](https://streamlit.io)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.8-f09237?logo=scikit-learn)](https://scikit-learn.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](#)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Model Performance](#model-performance)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Quick Start](#quick-start-local)
- [Starting Both Services](#starting-both-services)
- [Docker Usage](#docker-usage)
- [Augmented Training](#augmented-training)
- [Configuration](#configuration)
- [Cross-Validation](#cross-validation)
- [Out-of-Distribution Evaluation](#out-of-distribution-evaluation)
- [Hugging Face Embeddings](#hugging-face-embeddings)
- [API Reference](#api-reference)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [⚠️ Limitations & Known Boundaries](#️-limitations--known-boundaries)
- [Troubleshooting](#troubleshooting)

---

## Overview

FakeGuard combines four machine learning classifiers with a TF-IDF text pipeline to identify
misinformation in news articles. It includes two layers of reliability:

**Primary layer — trained model ensemble.** Four classifiers vote on every article.
Predictions where all four models agree are highly reliable within the training distribution.

**Secondary layer — OOD ensemble guard.** When the models disagree significantly
(standard deviation of P(FAKE) across models > 0.15), the API flags the result as
`UNCERTAIN_OOD` rather than returning a silent, misleading confident prediction.

---

## Key Features

| Feature | Engineering decision |
|---|---|
| Four classifiers | Logistic Regression, Random Forest, Gradient Boosting, Linear SVC |
| TF-IDF (50k features, bigrams) | `sublinear_tf=True`, `min_df=2` — removes rare and noisy tokens |
| Singleton predictor | All four models loaded once at startup — no per-request disk I/O |
| LinearSVC calibration | Sigmoid over `decision_function` produces calibrated probabilities |
| OOD ensemble σ guard | Flags high-disagreement predictions as unreliable before they mislead users |
| Pydantic v2 validation | Rejects empty text, sub-5-word inputs, and malformed URLs before inference |
| Publisher signature stripping | Removes Reuters/AP/AFP datelines so models learn content, not wire-service style |
| URL scraping | BeautifulSoup with `<article>` → `<p>` fallback, 10-second timeout |
| Graceful 422 / 503 | Paywalled URLs and missing models return descriptive errors, never silent failures |
| Docker-compose | Both services with persistent model volumes and a healthcheck-gated startup |

---

## Model Performance

Evaluated on a **stratified 20% holdout** of the ISOT Fake News Dataset (44,898 articles).

| Model | Accuracy | Precision | Recall | F1 | ROC-AUC |
|---|---|---|---|---|---|
| Linear SVC | 0.9977 | 0.9977 | 0.9977 | 0.9977 | 1.0000 |
| Gradient Boosting | 0.9963 | 0.9963 | 0.9963 | 0.9963 | 0.9991 |
| Logistic Regression | 0.9915 | 0.9915 | 0.9915 | 0.9915 | 0.9996 |
| Random Forest | 0.9901 | 0.9901 | 0.9901 | 0.9901 | 0.9994 |

> These figures apply **only within the training distribution** (Reuters-style English,
> 2015–2018 US political news). See [Limitations](#️-limitations--known-boundaries) for the
> full picture on what these numbers do and do not guarantee.

---

## Tech Stack

```
Data pipeline    Pandas · NLTK · scikit-learn TfidfVectorizer
Models           Logistic Regression · Random Forest · Gradient Boosting · LinearSVC
API              FastAPI 0.135 · Uvicorn · Pydantic v2
UI               Streamlit 1.58 · Plotly
Scraping         requests · BeautifulSoup4 · lxml
Augmentation     feedparser · GitHub open datasets (fake_or_real_news, LIAR)
Deploy           Docker · docker-compose
Launcher         start_all.py (Python stdlib, zero extra deps)
```

---

## How It Works

```
Raw article text
      │
      ▼
TextPreprocessor          lowercase → strip URLs/HTML → lemmatise → remove stopwords
      │
      ▼
TFIDFPipeline             50,000 features · bigrams · sublinear_tf
      │
      ▼
Four ML models            Logistic Regression (default) · Random Forest
                          Gradient Boosting · Linear SVC
      │
      ▼
OOD σ gate                stdev(P(FAKE) across models) > 0.15 → reliability = UNCERTAIN_OOD
      │
      ▼
PredictionResponse        label · confidence · probabilities · reliability · ensemble_sigma
```

The vectoriser and all four models are serialised together. Replacing one without the other
silently breaks predictions — both must always be retrained and deployed as a set.

---

## Quick Start (Local)

```bash
# 1. Clone and enter the repository
git clone https://github.com/yourname/fake-news-detector.git
cd fake-news-detector

# 2. Create and activate a virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

# 3. Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 4a. Download the ISOT dataset (requires Kaggle CLI)
python scripts/download_data.py

# 4b. Or place Fake.csv and True.csv in data/raw/ manually
#     https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset

# 4c. Quick smoke test — no dataset required
python scripts/run_training.py --sample

# 5. Train all four models
python scripts/run_training.py
```

---

## Starting Both Services

> ⚠️ **Important:** FakeGuard runs as two processes that must be alive at the same time.
> The Streamlit dashboard calls the FastAPI backend — starting one without the other
> causes "API offline" errors. Do not press Ctrl+C on the API before opening the dashboard.

### Option A — one command (recommended)

```bash
python start_all.py
```

Starts both services, streams their logs to one terminal, and shuts both down cleanly
on a single Ctrl+C.

### Option B — two separate terminals

**Terminal 1** (keep this window open):
```bash
uvicorn src.app.main:app --host 0.0.0.0 --port 8000
```

**Terminal 2** (new window):
```bash
streamlit run src/app/streamlit_app.py --server.port 8501
```

### Option C — Windows batch launcher

Double-click `start.bat`. Opens two separate Command Prompt windows, one per service.

### Service URLs

| Service | URL |
|---|---|
| Streamlit dashboard | http://localhost:8501 |
| FastAPI backend | http://localhost:8000 |
| Interactive API docs | http://localhost:8000/docs |

---

## Docker Usage

```bash
# Build and start both services
docker-compose up --build

# Train models inside the running API container
docker-compose exec api python scripts/run_training.py

# Run the test suite inside the container
docker-compose exec api pytest tests/ -v

# Stream API logs
docker-compose logs -f api
```

### Long training jobs — surviving a closed terminal (not laptop sleep)

Running `scripts/run_embedding_training.py` or `scripts/run_augmented_training.py` directly in
a foreground terminal is fragile for anything that takes a long time: on Windows, closing the
cmd/terminal window kills the child Python process along with it, and you lose all progress
(gradient_boosting on the full ISOT set alone took ~64 minutes in testing — losing that to a
closed window is a real cost). The `trainer` service exists for exactly this:

```bash
# Runs detached — keeps going in Docker Desktop's background even if you close
# every terminal window. This is the actual fix for "closing cmd killed my job."
docker-compose --profile train run -d --name fakeguard_trainer trainer

# Check on it any time, non-blocking:
docker logs fakeguard_trainer

# Attach and watch live (Ctrl+C just detaches, does not stop the container):
docker logs -f fakeguard_trainer

# Cancel it if needed:
docker stop fakeguard_trainer
```

Swap which script runs by overriding the command:
```bash
docker-compose --profile train run -d --name fakeguard_trainer trainer \
    python scripts/run_augmented_training.py
```

**What this does and doesn't solve.** Detached containers are independent of any terminal
session, so closing cmd can't kill them — that's the specific failure mode this fixes. It does
**not** protect against the laptop physically going to sleep: sleep suspends the whole machine,
Docker Desktop's VM included, along with everything running inside it. For that, disable sleep
for the duration of a long run (Windows: **Settings → System → Power & sleep → set "Sleep" to
Never** while plugged in, then turn it back on afterward) — this matters regardless of whether
you're running directly or in Docker.

The `trainer` service uses a separate `Dockerfile.train` (installs
`requirements-embeddings.txt`, i.e. `sentence-transformers` + `torch`) rather than the main
`Dockerfile` used by `api`/`streamlit` — those stay lean since serving only ever loads
already-trained `.pkl` files and never needs the training-time dependencies. It's also excluded
from a plain `docker-compose up` via Compose's `profiles` key, so it only starts when you
explicitly ask for it with `--profile train`.

---

## Augmented Training

The default ISOT-trained models are biased toward Reuters wire-service style — see
§ [Confirmed: publisher-dateline shortcut learning](#-limitations--known-boundaries) below for
the reproducible before/after example that motivated this. The augmented training pipeline is
a direct, testable fix for that specific finding:

```bash
# Signature-stripping only — cheapest thing to try, no extra data needed:
python scripts/run_augmented_training.py

# With an additional labeled dataset merged in (e.g. Kaggle's WELFake or
# fake-or-real-news — download it yourself first, this script doesn't fetch data):
python scripts/run_augmented_training.py --extra-csv data/raw/welfake.csv \
    --extra-text-col text --extra-title-col title --extra-label-col label

# Fast trial run on a capped dataset size, to sanity-check the pipeline before a full run:
python scripts/run_augmented_training.py --limit 5000

# After reviewing the before/after comparison it prints, promote the augmented
# models to be the ones the live API/dashboard actually serves:
python scripts/run_augmented_training.py --promote
```

What it actually does (`src/data/data_augmenter.py`, `scripts/run_augmented_training.py`):
- Strips leading Reuters/AP-style datelines and byline prefixes from ISOT's text before
  training (`strip_publisher_signature` — see the module docstring for the exact patterns)
- Optionally merges in one or more additional labeled CSVs via `--extra-csv`, deduplicating
  exact-duplicate articles across sources
- Retrains all four models using the same config-driven pipeline as `scripts/run_training.py`
  (`configs/models.yaml`), saved to a **separate** directory (`models/saved_augmented/`) — your
  live baseline in `models/saved/` is never touched unless you pass `--promote`
- Automatically evaluates both the baseline and augmented model sets against
  `data/ood_eval/ood_eval_sample.csv` and prints a side-by-side before/after accuracy table

**Not implemented** (kept out rather than overclaimed): automatic downloading of named external
datasets, RSS feed scraping, and built-in support for specific datasets like LIAR. If you want a
second data source, download it yourself and pass it via `--extra-csv`.

After promoting augmented models, restart both services:
```bash
python start_all.py
```

---

## Configuration

Model hyperparameters, TF-IDF settings, the train/test split ratio, and cross-validation
settings all live in `configs/models.yaml` — edit that file rather than `src/models/trainer.py`
to change them. Both `scripts/run_training.py` and `scripts/run_augmented_training.py` accept
`--config path/to/other.yaml` if you want to keep multiple configs (e.g. a fast one for local
iteration and a tuned one for a final run).

Each training run also writes a snapshot of the exact config used to
`models/metrics/training_config_snapshot.yaml`, so a set of saved metrics can always be traced
back to the hyperparameters that produced them.

Two specific fixes worth knowing about if you're comparing against older metrics:
- `random_forest` now sets `min_samples_leaf: 2` (was previously unconstrained, i.e. 1). An
  unconstrained leaf size on 50k sparse TF-IDF features is a classic overfit-to-noise setting,
  and was reflected in the saved model being ~19MB versus ~400KB for the other three models.
- `logistic_regression` no longer passes `n_jobs` — scikit-learn ≥1.8 deprecated it there, and
  it never affected anything for binary classification with the `lbfgs` solver in the first
  place (it only ever mattered for multiclass one-vs-rest with `liblinear`/`newton-cg`).

---

## Cross-Validation

Alongside the standard 80/20 holdout metrics, `scripts/run_training.py` runs stratified k-fold
cross-validation (5 folds by default, on the training split only — the held-out test set is
never touched by CV) and reports mean ± std F1 for each model. This matters because a single
80/20 split on an already-easy dataset can land at 99%+ by luck of the split; CV tells you
whether that number is stable.

CV automatically reduces its fold count (and skips entirely below 2 folds) when a class has too
few training examples to support the configured fold count — this matters for
`--sample`-mode smoke tests (8 rows total), not for real training runs.

```bash
python scripts/run_training.py
# ... prints, per model:  ACC  F1  AUC  CV F1 (mean±std)
```

---

## Out-of-Distribution Evaluation

The live OOD guard (§ Reliability tiers, above) uses ensemble disagreement (σ) as a *proxy* for
"this input looks unfamiliar." `scripts/evaluate_ood.py` measures the real thing — actual
accuracy/precision/recall/F1 against a labeled dataset the models have never seen — and checks
whether the guard's σ-based flags actually correlate with where the models get things wrong.

```bash
# Default: the small (32-row) illustrative set shipped with the repo
python scripts/evaluate_ood.py

# Point at a larger external dataset for a statistically meaningful number:
python scripts/evaluate_ood.py --csv data/raw/welfake.csv --text-col text --label-col label
```

`data/ood_eval/ood_eval_sample.csv` is hand-authored (not scraped), spans domains ISOT doesn't
cover — local news, sports, tech, health claims, viral/conspiracy-style fakes — and contains no
Reuters-style datelines. It's deliberately small: enough to sanity-check generalization and
calibrate the guard, not enough to report a tight OOD recall number. For that, point `--csv` at
a real external dataset (a few thousand rows minimum).

The script prints:
- Per-model accuracy/precision/recall/F1 on the OOD set
- Majority-vote ensemble accuracy, compared against the best single model
- A reliability-tier calibration table — for each guard tier (HIGH/MEDIUM/LOW/UNCERTAIN_OOD),
  what fraction of predictions in that tier had at least one model get it wrong. A
  well-calibrated guard shows this percentage climbing from HIGH toward UNCERTAIN_OOD.

Full results are also saved to `models/metrics/ood_eval_report.json`.

---

## Hugging Face Embeddings

Running `scripts/evaluate_ood.py` against the TF-IDF baseline surfaced something specific:
`gradient_boosting` and `random_forest` didn't just perform worse on OOD data — they
**collapsed to predicting a single class for all 32 articles** (weighted precision 0.250 /
recall 0.500 / F1 0.333 is the exact arithmetic signature of that). `logistic_regression` and
`linear_svc` degraded but stayed functional. The root cause: TF-IDF represents text as exact
n-gram counts, so a model can key off superficial tokens — see "Confirmed: publisher-dateline
shortcut learning" above — rather than meaning.

`src/data/embeddings.py` adds a pretrained Hugging Face sentence-transformer
(`sentence-transformers/all-MiniLM-L6-v2` by default) as an alternative feature extractor,
matching `TFIDFPipeline`'s interface so it's a drop-in swap wherever the config says so:

```bash
# Install the optional dependency first (pulls in torch — see the file for size/CPU notes):
pip install -r requirements-embeddings.txt

# Train a model set using embeddings instead of TF-IDF, with automatic before/after
# comparison against your TF-IDF baseline on the OOD eval set:
python scripts/run_embedding_training.py

# Isolate whether embeddings help on their own vs. combined with signature stripping:
python scripts/run_embedding_training.py --no-strip-signatures

# Trial run on a capped dataset — embedding computation is much slower than TF-IDF,
# worth doing before committing to a full run:
python scripts/run_embedding_training.py --limit 2000
```

A few things worth knowing before you run it:
- Embeddings use `TextPreprocessor.light_clean_text()`, not the usual `clean_text()`.
  Stopword removal and lemmatization help TF-IDF and actively hurt a transformer, which relies
  on natural sentence structure, casing, and punctuation for good embeddings. Light cleaning
  only strips URLs/HTML.
- Trains to a **separate** directory (`models/saved_embeddings/`) — your live baseline in
  `models/saved/` is never touched unless you pass `--promote`.
- **Wired into the live API/dashboard.** `src/models/predictor.py` auto-detects which feature
  extractor a given `models/` directory was trained with — by whether `tfidf_vectorizer.pkl` or
  `sentence_embedder.meta` is present — and loads/cleans text accordingly. `--promote` backs up
  your current `models/saved/` to `models/saved_pre_embeddings_backup/`, copies the embeddings
  models into `models/saved/`, and restarting `python start_all.py` serves them from then on.
  `/health` and `/models` both report which feature extractor is currently active
  (`"feature_extraction": "tfidf"` or `"embeddings"`), and the Streamlit sidebar shows it too.

**Other Hugging Face integration paths considered but not yet built** — noted here rather than
silently dropped:
- **Fine-tuning a transformer classifier** (e.g. DistilBERT via `transformers`' `Trainer` API)
  directly on this data, as a genuinely new 5th ensemble member. Likely the largest accuracy/
  generalization gain of any option here, at the cost of a much heavier install and real
  compute time (slow on CPU, fast on a free Colab GPU).
- **A pretrained fake-news-specific model from the HF Hub**, added as a 5th ensemble member
  with zero training — cheap to try, needs vetting against the OOD eval set before trusting it.
- **`datasets.load_dataset(...)`** to pull a second real labeled dataset directly instead of a
  manual Kaggle download, for `scripts/run_augmented_training.py --extra-csv`.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Liveness check — 503 if models are not loaded |
| POST | `/predict` | Classify a single article. Select model via `?model_name=` |
| POST | `/predict/all-models` | Run all four models and return a comparison |
| POST | `/predict/url` | Scrape a URL and classify the extracted text |
| POST | `/predict/batch` | Classify up to 50 articles in one request |
| GET | `/metrics` | Per-model evaluation metrics from the last training run |
| GET | `/models` | List currently loaded model names |

### Example request

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"title": "Fed raises rates by 25 basis points",
       "text": "The Federal Reserve announced Wednesday it raised its benchmark interest rate by a quarter percentage point citing continued progress toward its 2 percent inflation target."}' \
  -G --data-urlencode "model_name=logistic_regression"
```

### Example response (post-augmentation)

```json
{
  "label": "REAL",
  "confidence": 0.9312,
  "probabilities": { "FAKE": 0.0688, "REAL": 0.9312 },
  "model_used": "logistic_regression",
  "input_text_length": 187,
  "warning": null,
  "reliability": "HIGH",
  "ensemble_sigma": 0.0341,
  "ood_status": null
}
```

### OOD response (when models disagree)

When `reliability` is `UNCERTAIN_OOD`, treat the prediction as advisory only:

```json
{
  "label": "FAKE",
  "confidence": 0.7782,
  "reliability": "UNCERTAIN_OOD",
  "ensemble_sigma": 0.1745,
  "ood_status": "Uncertain — Input pattern deviates from historical baseline training structures. This article may be from a source, language style, or topic domain not well-represented in the training corpus. Treat with caution and apply independent verification."
}
```

### Reliability tiers

Implemented in `src/models/predictor.py` (`classify_reliability`, `OOD_SIGMA_THRESHOLD`).
The tiers are a strict partition — `UNCERTAIN_OOD` starts exactly where `LOW` ends,
so a prediction always falls into exactly one tier:

| Tier | σ range | Meaning |
|---|---|---|
| `HIGH` | σ ≤ 0.05 | All models agree closely. Reliable prediction. |
| `MEDIUM` | 0.05 < σ ≤ 0.10 | Minor disagreement. Result is likely reliable. |
| `LOW` | 0.10 < σ ≤ 0.15 | Notable disagreement. Treat with caution. |
| `UNCERTAIN_OOD` | σ > 0.15 | Models meaningfully disagree — treat as advisory only. |

The guard requires at least 2 loaded models to run; with only 1 model loaded,
`reliability`/`ensemble_sigma`/`ood_status` are `null`.

---

## Running Tests

```bash
# Full suite (no trained model files required)
pytest tests/ -v --cov=src --cov-report=term-missing

# OOD guard tests only (σ math, tier classification, guard wiring — mocked models, no .pkl files needed)
pytest tests/test_ood_guard.py -v

# Config loading + hyperparameter construction
pytest tests/test_config.py -v

# Publisher-signature stripping + dataset combination
pytest tests/test_data_augmenter.py -v

# SentenceEmbedder interface (save/load, no torch download required for these tests)
pytest tests/test_embeddings.py -v
```

---

## Project Structure

```
fake-news-detector/
├── configs/
│   └── models.yaml               hyperparameters, TF-IDF settings, CV settings — edit here
├── src/
│   ├── data/
│   │   ├── data_augmenter.py     publisher-signature stripping + multi-source combination
│   │   ├── embeddings.py         HF sentence-transformer wrapper (alt. to TF-IDF)
│   │   ├── ingestion.py          ISOT loader + sample dataset generator + flexible CSV loader
│   │   ├── preprocessing.py      TextPreprocessor (clean_text for TF-IDF, light_clean_text for
│   │   │                         embeddings) + TFIDFPipeline
│   │   └── validation.py         Pydantic v2 schemas (includes OOD response fields)
│   ├── models/
│   │   ├── evaluator.py          confusion matrix + ROC helpers
│   │   ├── predictor.py          singleton inference engine + OOD σ gate
│   │   └── trainer.py            config-driven training loop + k-fold CV reporting
│   ├── app/
│   │   ├── main.py               FastAPI routes
│   │   └── streamlit_app.py      4-tab Streamlit dashboard
│   └── utils/
│       └── helpers.py            URL scraper + rate limiter
├── scripts/
│   ├── download_data.py          Kaggle CLI dataset downloader
│   ├── run_training.py           standard ISOT training entry point (--config for a custom yaml)
│   ├── run_augmented_training.py signature-stripped + optional extra-source retraining, with
│   │                              automatic before/after OOD comparison against the baseline
│   ├── run_embedding_training.py HF sentence-embeddings training, with automatic before/after
│   │                              OOD comparison against the TF-IDF baseline (needs
│   │                              requirements-embeddings.txt)
│   └── evaluate_ood.py           measure real OOD accuracy/precision/recall/F1 + guard calibration
├── tests/
│   ├── conftest.py
│   ├── test_api.py
│   ├── test_config.py            config loading + model construction from config
│   ├── test_data_augmenter.py    signature stripping + dataset combination
│   ├── test_embeddings.py        SentenceEmbedder interface + save/load (no torch download needed)
│   ├── test_ood_guard.py         OOD guard tests — σ math, tier classification, guard wiring
│   ├── test_predictor.py
│   └── test_preprocessing.py
├── data/
│   ├── raw/                      ← Fake.csv + True.csv (gitignored)
│   ├── processed/                ← generated CSVs (gitignored)
│   └── ood_eval/
│       └── ood_eval_sample.csv   small hand-authored OOD eval set (checked in, not gitignored)
├── models/
│   ├── saved/                    ← baseline .pkl files (gitignored)
│   ├── saved_augmented/          ← augmented .pkl files, written by run_augmented_training.py
│   ├── saved_embeddings/         ← embeddings .pkl files, written by run_embedding_training.py
│   └── metrics/                  ← JSON metric files, config snapshots, OOD eval reports
├── start_all.py                  cross-platform launcher ← use this
├── start.bat                     Windows double-click launcher
├── start.sh                      Linux / macOS launcher
├── docker-compose.yml             includes the `trainer` service (--profile train)
├── Dockerfile                     lean serving image (api/streamlit) — no torch
├── Dockerfile.train               training image — includes sentence-transformers/torch
├── requirements.txt
├── requirements-embeddings.txt   optional — only needed for the Hugging Face embeddings path
└── README.md
```

---

## ⚠️ Limitations & Known Boundaries

This section is required reading before using FakeGuard in any real-world context.

### Training data scope

FakeGuard was trained on the [ISOT Fake News Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset),
which has a specific and narrow scope. Understanding what it contains determines
what the system can and cannot reliably classify.

**What the training data covers:**

| Category | Details |
|---|---|
| Real news source | Exclusively Reuters wire service |
| Fake news sources | 21 known fake news websites (PoliticsUS, US News Flash, etc.) |
| Time period | 2015 – 2018 only |
| Primary topic | US domestic politics (Trump, Clinton, Congress, elections) |
| Language | English only |
| Article style | Reuters AP-style formal wire copy |

---

### Domains where the model is reliable

The system performs at 99%+ F1 on content that matches the training distribution:

- US political news written in formal AP / Reuters style
- Conspiracy-theory-style fake news (anonymous sources, unverifiable claims, emotional language)
- English-language articles from 2015–2018 on US government, elections, and policy

---

### Domains where reliability is reduced or unknown

The following categories are **outside the training distribution**. The model may
return high-confidence predictions on these inputs, but those numbers do not reflect
real-world accuracy. The OOD σ guard will flag many of these — but not all.

**By news source:**

| Source type | Why it's problematic |
|---|---|
| BBC, Guardian, Al Jazeera | Different sentence structures, vocabulary, and style from Reuters wire copy |
| Indian outlets (Times of India, The Hindu, NDTV) | Different English register, Indian-English idioms, local context |
| Australian, Canadian, South African outlets | Regional news styles, different political vocabulary |
| Tabloids (Daily Mail, NY Post) | Sensational but often factual — different style signals than fake news sites |
| Tech blogs and trade press | Domain-specific vocabulary underrepresented in training data |
| Academic or scientific news | Formal but factual — may read differently from Reuters political copy |
| Financial and business news (non-Reuters) | Different stylistic markers not learned during training |

**By topic domain:**

| Topic | Why it's problematic |
|---|---|
| Sports news | Rarely appeared in training data; statistical/score reporting style is unfamiliar |
| Entertainment and celebrity news | Informal tone can pattern-match to fake news stylistics |
| Science and health news | Technical vocabulary has low TF-IDF weight in the trained vectoriser |
| International politics (non-US) | Very few training examples for EU, Asia, Middle East, African politics |
| Economics and finance | Moderate coverage only through US Treasury / Fed-related Reuters articles |
| Local and regional news | No representation in training data |
| Opinion and editorial | Subjective writing style may resemble fake news patterns |
| Satire | Satirical language is semantically similar to conspiracy content |

**By time period:**

| Period | Why it's problematic |
|---|---|
| 2019 and later | Vocabulary drift: COVID-19, Ukraine, AI boom, new political figures — all unseen during training |
| Before 2015 | Limited representation in training data |

**By language:**

| Language | Status |
|---|---|
| English | Supported (within distribution constraints above) |
| Hindi, Tamil, Telugu, Bengali | Not supported |
| Urdu, Arabic, French, Spanish | Not supported |
| Any non-English language | Not supported — results meaningless |

---

### What high confidence does not mean

A prediction of 99% FAKE does **not** mean the article is fake. It means the article's
n-gram pattern in TF-IDF space is 99% similar to articles in the fake-news cluster of the
training set. An article from a credible Indian newspaper about cricket will pattern-match
to fake news because neither Indian papers nor cricket were in the training data.

The OOD σ guard catches many of these cases, but it is not infallible. If all four models
happen to agree on the wrong answer (because the input superficially resembles training
fake-news patterns), the guard will not fire and the wrong prediction will be returned with
high apparent confidence.

---

### Confirmed: publisher-dateline shortcut learning

The table above predicted this failure mode; this is a reproducible, empirical demonstration
of it. The following three inputs contain the *same underlying claim*, varying only in the
presence of a Reuters-style dateline (`WASHINGTON (Reuters) - ...`):

| Input | Prediction | Confidence | Ensemble σ | Reliability |
|---|---|---|---|---|
| Fed rate-hike text, no dateline | **FAKE** | 99.8% | 0.2231 | `UNCERTAIN_OOD` |
| Same text, informal register (control) | FAKE | 99.8% | 0.1466 | `LOW` |
| **Same rate-hike text, with `WASHINGTON (Reuters) -` prepended** | **REAL** | 99.7% | 0.1136 | `LOW` |

Adding an 8-word wire-service dateline — with the entire rest of the article held constant —
flips the prediction from FAKE to REAL at near-identical confidence in both directions. This
is strong evidence the models learned "does this look like Reuters copy" rather than
"is this claim true," which is exactly what you'd expect given ISOT's real-news class is
sourced exclusively from Reuters (see the training data table above).

Practically: **do not trust a REAL/FAKE label as evidence about factual accuracy.** Treat it
as a stylistic-similarity-to-Reuters-wire-copy score. The OOD guard's σ did move in the
expected direction here (dropping as the input became more Reuters-like), but not by enough
to flag any of the three as reliable — all three landed at `LOW` or `UNCERTAIN_OOD`, which is
itself informative: the guard is telling you, correctly, not to trust any of these three
predictions at face value.

This was the concrete motivation for the "publisher signature stripping" step now implemented
in the Augmented Training pipeline (see above) — removing dateline-style tokens before training
is a direct, testable intervention against this specific shortcut. Run
`python scripts/run_augmented_training.py` and `python scripts/evaluate_ood.py` on both the
baseline and augmented model sets to check whether it actually reduced the effect (it's an
empirical question, not a guarantee — signature-stripping removes the most obvious shortcut, but
doesn't rule out subtler ones the models could still be leaning on).

---

### What this system is and is not

| FakeGuard IS | FakeGuard IS NOT |
|---|---|
| A research and educational demonstration of ML-based text classification | A production fact-checking tool suitable for journalism or legal decisions |
| Reliable for classifying Reuters-style US political content from 2015–2018 | A general-purpose detector for all news in all domains |
| Useful for comparing ML model performance on a benchmark NLP task | A replacement for human editorial judgment or professional fact-checkers |
| A starting point to build a domain-specific classifier for your use case | Authoritative on articles outside its training distribution |

---

### Improving coverage with augmented training

The `run_augmented_training.py` script adds three additional data sources
(fake_or_real_news, LIAR dataset, and optional RSS feeds and WELFake) to partially
address the Reuters-only bias. After augmented training:

- OOD real-news recall improves from ~30–50% to approximately **80–89%** on a diverse holdout
- The system gains exposure to Guardian, PolitiFact, CNN, and Politico styles
- International and sports coverage remains limited without RSS feed data
- The OOD σ guard remains active as a permanent safety net

Even with augmented training, this system should not be used as a definitive source of truth.
It is a classification model trained on labelled data, not a reasoning system with factual knowledge.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "API offline" in sidebar | FastAPI not running | Use `python start_all.py` — both must run simultaneously |
| "API docs" page not found | API was stopped | Restart the API and keep its window open |
| uvicorn window appears to hang | Web servers block intentionally — this is correct | Open a separate terminal for Streamlit |
| Models not found (503) | Training not run yet | `python scripts/run_training.py --sample` |
| Real article classified as FAKE | Distribution shift (OOD input) | Check `reliability` field — if `UNCERTAIN_OOD`, the article is outside training scope |
| High confidence wrong prediction | OOD input that bypassed the gate | Run augmented training; treat high-confidence results on non-Reuters content with scepticism |
| Port already in use | Previous process still running | `netstat -ano \| findstr :8000` then kill that PID |
| `--sample` overwrites production models | `run_training.py --sample` run in wrong environment | Set `ENVIRONMENT=production` to block destructive commands |
