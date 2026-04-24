# IMRaD Introduction Analysis — Notebook Reference

This directory contains all research notebooks for the thesis:

> **"Leveraging Gemini Pro and BERT for Automated IMRaD Classification:  
> A Novel Dataset and SaaS Platform"**  
> Sid Ali Assoul — École Supérieure en Informatique, SIW · 2022–2023

---

## Table of Contents

- [IMRaD Move Reference](#imrad-move-reference)
- [Pipeline Overview](#pipeline-overview)
- [Directory Structure](#directory-structure)
- [v1/ — Phase 1: Baseline](#v1--phase-1-baseline)
  - [1. Gemini V1 Annotation](#v111gemini_moves_generationipynb)
  - [2. V1 BERT Training](#v12bert_classification_imrad_moves_latest_v8_new_datasetipynb)
- [v2/ — Phase 2: Refinement](#v2--phase-2-refinement)
  - [1. Gemini V2 Annotation](#v21generate_moves_predictionsipynb)
  - [2. Classifier Benchmarking](#v22testing_generated_move_predictionsipynb)
- [v3/ — Phase 3: Final Models](#v3--phase-3-final-models)
  - [1. Outlier Detection](#v31outlier-detectionipynb)
  - [2. Move 0 Generator](#v32move-0-generatoripynb)
  - [3. Move 1 Generator](#v33move-1-generatoripynb)
  - [4. Move 2 Generator](#v34move-2-generatoripynb)
  - [5. Dataset Assembly](#v35checkeripynb)
  - [6. BERT — Overall Move Classifier](#v36pfe_training_moves_bert_model_06_26-1ipynb)
  - [7. BERT — Move 0 Sub-moves](#v37pfe_training_sub_moves_0_bert_model_07_1ipynb)
  - [8. BERT — Move 1 Sub-moves](#v38pfe_training_sub_moves_1_bert_model_07_1ipynb)
  - [9. BERT — Move 2 Sub-moves](#v39pfe_training_sub_moves_2_bert_model_07_1ipynb)
- [Final Model Performance Summary](#final-model-performance-summary)

---

## IMRaD Move Reference

Every sentence in a scientific introduction belongs to one of three rhetorical **moves**, each subdivided into **sub-moves**:

| Move | Name | Sub-moves |
|---|---|---|
| **0** | Establishing a Research Territory | `0.0` Show importance/relevance · `0.1` Review prior research |
| **1** | Establishing a Niche | `1.0` Claim flaw · `1.1` Highlight gap · `1.2` Raise unclear question · `1.3` Extend prior research |
| **2** | Occupying the Niche | `2.0` State purpose · `2.1` Hypothesis/RQ · `2.2` Share findings · `2.3` Elaborate value · `2.4` Outline structure |
| **-1** | Outlier | Does not belong to any move (e.g. method description, section header) |

---

## Pipeline Overview

```
unarXive corpus (264,799 introductions)
│
├─ v1/  ── Phase 1: Baseline
│   ├─ 1. Gemini V1 annotation (3-class prompt)  →  raw labeled chunks
│   └─ 2. BERT fine-tuning on V1 data            →  44.61 % accuracy  ← too low, redesign
│
├─ v2/  ── Phase 2: Refinement
│   ├─ 1. Gemini V2 annotation (11 sub-move prompt) →  148 K sentences
│   └─ 2. TF-IDF classifier benchmarking            →  best RF 60.7 %  ← ceiling hit, → BERT
│
└─ v3/  ── Phase 3: Final Models
    ├─ 1. Outlier detection (re-label with sub-move prompt) →  −30,599 outliers
    ├─ 2. Synthetic generation — Move 0  →  ~46,000 sentences
    ├─ 3. Synthetic generation — Move 1  →  ~54,000 sentences
    ├─ 4. Synthetic generation — Move 2  →  ~48,000 sentences
    ├─ 5. Dataset assembly & quality validation  →  169,729 training sentences
    ├─ 6. BERT — Overall move classifier   →  F1 98.21 %  ✓ deployed
    ├─ 7. BERT — Move 0 sub-move classifier →  F1 89.59 %  ✓ deployed
    ├─ 8. BERT — Move 1 sub-move classifier →  F1 > 89 %   ✓ deployed
    └─ 9. BERT — Move 2 sub-move classifier →  F1 > 89 %   ✓ deployed
```

---

## Directory Structure

```
notebooks/
├── README.md                          ← this file
├── v1/                                ← Phase 1: Baseline
│   ├── 1.gemini_moves_generation.ipynb
│   └── 2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb
├── v2/                                ← Phase 2: Refinement
│   ├── 1.generate_moves_predictions.ipynb
│   └── 2.testing_generated_move_predictions.ipynb
└── v3/                                ← Phase 3: Final Models
    ├── 1.outlier-detection.ipynb
    ├── 2.move-0-generator.ipynb
    ├── 3.move-1-generator.ipynb
    ├── 4.move-2-generator.ipynb
    ├── 5.checker.ipynb
    ├── 6.pfe_training_moves_bert_model_06_26 (1).ipynb
    ├── 7.pfe_training_sub_moves_0_bert_model_07_1.ipynb
    ├── 8.pfe_training_sub_moves_1_bert_model_07_1.ipynb
    └── 9.pfe_training_sub_moves_2_bert_model_07_1.ipynb
```

---

## [v1/](v1/) — Phase 1: Baseline

### [v1/1.gemini_moves_generation.ipynb](v1/1.gemini_moves_generation.ipynb)

**Thesis:** Chapter 3 · Data Generation

Annotates the 264,799-sentence unarXive introduction corpus using **Gemini Pro** with a minimal 3-class prompt. The corpus is split into 1,000-row chunks; each sentence is classified as one of the three top-level move names. Results are saved to Google Drive as partial CSVs.

- **Prompt type:** V1 — simple, no definitions, no examples
- **Output:** Raw annotated chunks in `/pfe/gemini-results/`
- **Limitation:** Prompt ambiguity causes label noise → leads to poor BERT accuracy

---

### [v1/2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb](v1/2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb)

**Thesis:** Chapter 3 · V1 BERT Baseline Training

Fine-tunes `bert-en-uncased-L-12-H-768-A-12` on the V1 dataset for 3-class move classification.

| | |
|---|---|
| Architecture | BERT → Dropout(0.3) → Dense(3, softmax) |
| Optimizer | AdamW · LR 3e-5 · up to 15 epochs + early stopping |
| Result | **44.61 % accuracy** |

The model fails to distinguish moves reliably. Root causes: oversimplified prompt, limited data diversity, no sub-move structure. This motivates a full redesign in Phase 2.

---

## [v2/](v2/) — Phase 2: Refinement

### [v2/1.generate_moves_predictions.ipynb](v2/1.generate_moves_predictions.ipynb)

**Thesis:** Chapter 4 · Enhanced Annotation Prompt

Re-annotates the full corpus with a **structured V2 prompt** that includes all 11 sub-moves, definitions, and examples. The prompt requests a JSON object with `sentence`, `move`, and `sub_move` per sentence. Saves ~37,000 processed introductions as chunked JSON files (`processed_{index}.json`).

- **Key change from V1:** Sub-move granularity + explicit definitions → higher label quality
- **Output:** `processed_*.json` consumed by [v2/2.testing_generated_move_predictions.ipynb](v2/2.testing_generated_move_predictions.ipynb)

---

### [v2/2.testing_generated_move_predictions.ipynb](v2/2.testing_generated_move_predictions.ipynb)

**Thesis:** Chapter 4 · Classifier Benchmarking (Table 4.1 & 4.2)

Aggregates all JSON chunks from [v2/1](v2/1.generate_moves_predictions.ipynb), normalises ~30 inconsistent Gemini label variants, and benchmarks seven TF-IDF classifiers to validate data quality.

**Dataset after cleaning:** 148,220 sentences · 11 valid `move_sub_move` labels

| Classifier | Accuracy |
|---|---|
| Random Forest | **60.7 %** |
| Logistic Regression | 60.0 % |
| Neural Network (Keras) | 57.5 % |
| Naive Bayes | 55.6 % |
| K-Nearest Neighbors | 54.0 % |
| Decision Tree | 51.6 % |

The 60 % ceiling confirms TF-IDF features are insufficient → BERT fine-tuning required.  
Saves the cleaned dataset as `aggregated_data.csv`, consumed by [v3/1.outlier-detection.ipynb](v3/1.outlier-detection.ipynb).

---

## [v3/](v3/) — Phase 3: Final Models

### [v3/1.outlier-detection.ipynb](v3/1.outlier-detection.ipynb)

**Thesis:** Chapter 5 §5.2.1 · Outlier Detection

Re-labels every row in `aggregated_data.csv` (produced by [v2/2](v2/2.testing_generated_move_predictions.ipynb)) using the **full sub-move prompt** (11 sub-moves + confidence score). Sentences that do not fit any move are assigned `-1` and excluded from training. The loop is resumable via the `is_processed` flag.

- **Outliers identified:** 30,599 of 148,220 sentences (20.6 %)
- **Output:** Updated `aggregated_data.csv` with `move_sub_move_gemini` column, consumed by [v3/5.checker.ipynb](v3/5.checker.ipynb)

---

### [v3/2.move-0-generator.ipynb](v3/2.move-0-generator.ipynb)

**Thesis:** Chapter 5 §5.2.2 · Move 0 Data Augmentation

Generates synthetic training sentences for **Move 0 — Establishing a Research Territory** using a move-specific Gemini prompt (temperature 0.9 for diversity). Runs 10,000 API calls, requesting 3 sentences per sub-move per call.

- **Sub-moves covered:** `0.0` Show importance · `0.1` Review prior research
- **Output:** ~46,000 unique sentences saved to `generated_move0/`, consumed by [v3/5.checker.ipynb](v3/5.checker.ipynb)

---

### [v3/3.move-1-generator.ipynb](v3/3.move-1-generator.ipynb)

**Thesis:** Chapter 5 §5.2.2 · Move 1 Data Augmentation

Same generation pipeline for **Move 1 — Establishing a Niche**.

- **Sub-moves covered:** `1.0` Claim flaw · `1.1` Gap · `1.2` Unclear · `1.3` Extend
- **Output:** ~54,000 unique sentences saved to `generated_move1/`, consumed by [v3/5.checker.ipynb](v3/5.checker.ipynb)

---

### [v3/4.move-2-generator.ipynb](v3/4.move-2-generator.ipynb)

**Thesis:** Chapter 5 §5.2.2 · Move 2 Data Augmentation

Same generation pipeline for **Move 2 — Occupying the Niche**.

- **Sub-moves covered:** `2.0` Purpose · `2.1` Hypothesis · `2.2` Findings · `2.3` Value · `2.4` Structure
- **Output:** ~48,000 unique sentences saved to `generated_move2/`, consumed by [v3/5.checker.ipynb](v3/5.checker.ipynb)

---

### [v3/5.checker.ipynb](v3/5.checker.ipynb)

**Thesis:** Chapter 5 §5.2.3 & §5.3 · Dataset Assembly & Quality Validation

Merges all data sources into the final training corpus and validates quality before BERT fine-tuning.

**Inputs:**
- `generated_move0/` from [v3/2.move-0-generator.ipynb](v3/2.move-0-generator.ipynb)
- `generated_move1/` from [v3/3.move-1-generator.ipynb](v3/3.move-1-generator.ipynb)
- `generated_move2/` from [v3/4.move-2-generator.ipynb](v3/4.move-2-generator.ipynb)
- `aggregated_data.csv` from [v3/1.outlier-detection.ipynb](v3/1.outlier-detection.ipynb)

**Final dataset composition:**

| Source | Sentences |
|---|---|
| Move 0 synthetic | ~46,000 |
| Move 1 synthetic | ~54,000 |
| Move 2 synthetic | ~48,000 |
| V2 real (outliers removed) | ~41,000 |
| **Training corpus total** | **~169,000** |

**Validation steps:**
- Label cleaning — drops ~30 malformed Gemini output variants
- Logistic Regression + PCA scatter plots to verify sub-move separability per move group
- LaTeX artefact audit: 1,505 equations · 22,031 citations · 2,918 non-language tokens
- Feature-engineered LR (TF-IDF + citation/equation/non-language counts) as final quality gate

**Output:** `processed_data_with_outliers.csv`, consumed by [v3/6](v3/6.pfe_training_moves_bert_model_06_26%20(1).ipynb), [v3/7](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb), [v3/8](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb), [v3/9](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb)

---

### [v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>)

**Thesis:** Chapter 5 §5.3 · Model 1 — Overall Move Classifier

Fine-tunes BERT on the full 169,729-sentence corpus (from [v3/5](v3/5.checker.ipynb)) for **3-class move classification**.

| | |
|---|---|
| Classes | Move 0 · Move 1 · Move 2 |
| Training data | Full corpus — outliers removed |
| Split | 135,783 train / 16,973 val / 16,973 test |
| Epochs | 3 (2 initial + 1 continued from checkpoint) |
| **Accuracy** | **98.21 %** |
| **Precision** | **98.35 %** |
| **F1** | **98.21 %** |

This is the primary model deployed in the SaaS platform via TensorFlow Serving. Every submitted sentence passes through this model first.

---

### [v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb)

**Thesis:** Chapter 5 §5.3 · Model 2 — Move 0 Sub-move Classifier

Fine-tunes BERT on the Move 0 subset (from [v3/5](v3/5.checker.ipynb)) for **binary sub-move classification** (`0.0` vs `0.1`).

| | |
|---|---|
| Classes | `0.0` Show importance · `0.1` Review prior research |
| Training data | 41,622 Move 0 sentences |
| **F1** | **0.8959** |

Invoked by the platform when Model 1 ([v3/6](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>)) predicts Move 0.

---

### [v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb)

**Thesis:** Chapter 5 §5.3 · Model 3 — Move 1 Sub-move Classifier

Fine-tunes BERT on the Move 1 subset (from [v3/5](v3/5.checker.ipynb)) for **4-class sub-move classification**.

| | |
|---|---|
| Classes | `1.0` Claim flaw · `1.1` Gap · `1.2` Unclear · `1.3` Extend |
| Training data | 38,371 Move 1 sentences |
| **F1** | **> 0.89** |

Invoked by the platform when Model 1 ([v3/6](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>)) predicts Move 1.

---

### [v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb)

**Thesis:** Chapter 5 §5.3 · Model 4 — Move 2 Sub-move Classifier

Fine-tunes BERT on the Move 2 subset (from [v3/5](v3/5.checker.ipynb)) for **5-class sub-move classification**.

| | |
|---|---|
| Classes | `2.0` Purpose · `2.1` Hypothesis · `2.2` Findings · `2.3` Value · `2.4` Structure |
| Training data | 40,272 Move 2 sentences |
| **F1** | **> 0.89** |

Invoked by the platform when Model 1 ([v3/6](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>)) predicts Move 2.

---

## Final Model Performance Summary

| Model | Notebook | Task | Classes | F1 / Accuracy |
|---|---|---|---|---|
| Model 1 | [v3/6](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) | Overall move classification | 3 | **98.21 %** |
| Model 2 | [v3/7](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb) | Move 0 sub-moves | 2 | **89.59 %** |
| Model 3 | [v3/8](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb) | Move 1 sub-moves | 4 | **> 89 %** |
| Model 4 | [v3/9](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb) | Move 2 sub-moves | 5 | **> 89 %** |

All four models are deployed via **TensorFlow Serving** as independent microservices. A sentence is first classified by Model 1 to identify its move, then routed to the corresponding sub-move model for fine-grained classification.
