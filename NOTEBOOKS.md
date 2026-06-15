IMRaD Introduction Analysis - Notebook Reference

This directory contains all research notebooks for the thesis:

> "Automated IMRaD Classification with BERT and Gemini Pro:
> A Novel Dataset and SaaS Platform"
> Sid Ali Assoul SIW · École Supérieure en Informatique 2022-2023

---

## Contents

- [Background and Motivation](#background-and-motivation)
- [The Dataset Problem](#the-dataset-problem-why-we-created-our-own-dataset)
- [The Three Stage Approach](#the-three-stage-approach)
- [IMRaD Move Reference](#imrad-move-citation)
- [Pipeline Overview](#pipelines-overview)
- [Directory Structure](#file-structure)
- [Phase 1: Baseline](#stage-1-foundation)
  - [1. Gemini V1 Annotation](#1-gemini-v1-annotation)
  - [2. V1 BERT Training](#2-v1-bert-training)
- [Phase 2: Refinement](#phase-2-polish)
  - [1. Gemini V2 Annotation](#1-gemini-v2-annotation)
  - [2. Classifier Benchmarking](#2-classifier-benchmarking)
- [Phase 3: Final Models](#phase-3-final-models)
  - [1. Outlier Detection](#1-outlier-detection)
  - [2. Move 0 Generator](#2-move-0-generator)
  - [3. Move 1 Generator](#3-move-1-generator)
  - [4. Move 2 Generator](#4-move-2-generator)
  - [5. Final Dataset Assembly](#5-final-dataset-assembly)
  - [6. Overall Move Classifier](#6-overall-move-classifier)
  - [7. Move 0 Sub-move Classifier](#7-move-0-sub-move-classifier)
  - [8. Move 1 Sub-move Classifier](#8-move-1-sub-move-classifier)
  - [9. Move 2 Sub-move Classifier](#9-move-2-sub-move-classifier)
- [Final Model Performance](#summary-of-final-model-performance)
- [Deploying Models](#deploying-models)

---

## Background and Motivation

Scientific papers follow the IMRaD format (Introduction, Methods, Results, Discussion) and the introduction has a well-studied rhetorical structure described by Swales' CARS model. Every sentence in an introduction has a purpose: to establish why the topic matters, to point out a gap in the literature, or to announce what the paper contributes. These purposes are organized into three top-level moves and eleven sub-moves.

Automated identification of these moves and sub-moves at the sentence level has several uses:
- Students can verify that their introduction has the expected structure before submitting.
- Reviewers can quickly map the rhetorical strategy of a paper.
- Teachers can provide automated, structured feedback on drafts.

To build a reliable classifier, we need a large dataset labeled at the sentence level. No such dataset was publicly available at the start of this research.

---

## The Dataset Problem: Why We Created Our Own Dataset

The most relevant public corpus is **unarXive** (Saier & Färber), which contains hundreds of thousands of scientific paper introductions extracted from arXiv. It has two problems that make it unusable directly:

1. Section-level labels only. unarXive labels whole sections as "Introduction", "Methods", etc. There is no sentence-level annotation with rhetorical move or sub-move.

2. LaTeX artifacts. The corpus contains raw LaTeX text: citation commands (`\cite{...}`), equation environments, table and figure references, and other formatting symbols that add noise.

Because of these gaps, we had to build the dataset ourselves.

We did this by using **Gemini Pro** as an automatic annotator: we fed it introduction sentences from unarXive and applied a custom prompt to label each sentence with its IMRaD move and sub-move. This is cheaper and faster than hiring domain experts to manually annotate 150,000+ sentences, and recent work shows that LLMs can achieve annotation quality close to human annotators when the prompt is well designed.

The central question then became: how good is that annotation, and how do we verify it? That is what the three-phase approach addresses.

---

## The Three Stage Approach

We were generating the data and training models on it at the same time, so we could not check quality against an external gold-standard test set from the start. Instead we used an iterative approach:

| Phase | Goal | Dataset size | Best result |
|-------|------|-------------|-------------|
| V1 | Prove the pipeline works; establish a baseline | Small subset of unarXive | 44.61% accuracy (BERT) |
| V2 | Improve prompt quality; assess data quality with lightweight classifiers | 148,220 sentences | 60.7% accuracy (Random Forest) |
| V3 | Clean V2 data, add synthetic sentences, fine-tune final BERT models | 169,729 sentences | 98.21% F1 (overall move BERT) |

Each phase exposed the weaknesses of the previous one. V1 showed that a vague 3-class prompt produces noisy labels that BERT cannot learn from reliably. V2 showed that adding sub-move definitions to the prompt improved label quality (TF-IDF classifiers went from random-chance to 60%), but TF-IDF hit a ceiling and the data still contained non-introduction sentences. V3 removed outliers, balanced the dataset with synthetic generation, and produced BERT models with over 95% F1 on the sub-move tasks.

---

## IMRaD Move Citation

A scientific introduction contains three rhetorical moves, divided into sub-moves:

| Move | Name | Sub-moves |
|------|------|-----------|
| 0 | Establishing a Research Domain | `0.0` Show significance/relevance · `0.1` Examine prior research |
| 1 | Establishing a Niche | `1.0` Claim flaw in prior work · `1.1` Highlight a gap · `1.2` Raise an unclear question · `1.3` Extend prior research |
| 2 | Filling the Niche | `2.0` State aim · `2.1` Hypothesis/research question · `2.2` Present findings · `2.3` Develop value · `2.4` Sketch structure |
| -1 | Outlier | Not part of any move (method descriptions, conclusion sentences, section headers) |

Note: the numbering in this thesis starts from 0 (Move 0, 1, 2). Some cited literature starts from Move 1. The concepts are the same.

---

## Pipelines Overview

```
unarXive corpus (264,799 intros from arXiv)
(section-level labels only, no sentence-level sub-move annotations)
│
├─ v1/ -- Phase 1: Baseline
│  ├─ 1. Prompt: Gemini Pro annotates each sentence with a 3-class prompt -> raw chunks
│  └─ 2. Fine-tune BERT on V1 data -> 44.61% accuracy <- redesign, noisy labels
│
├─ v2/ -- Phase 2: Refinement
│  ├─ 1. Re-annotated with improved 11-sub-move prompt -> 148,220 annotated sentences
│  └─ 2. Benchmark TF-IDF classifiers for data quality assessment <- RF 60.7% <- TF-IDF ceiling
│
└─ v3/ -- Phase 3: Final Models
   ├─ 1. Outlier detection: re-label V2 with full prompt, discard -1 rows -> 30,599 removed
   ├─ 2. Synthetic generation (Move 0) -> ~46k new sentences
   ├─ 3. Synthetic generation (Move 1) -> ~54k new sentences
   ├─ 4. Synthetic generation (Move 2) -> ~48k new sentences
   ├─ 5. Merge all sources, quality checks -> 169,729 clean training sentences
   ├─ 6. BERT: overall move classifier (3 classes) -> F1 0.9821 ✓ deployed
   ├─ 7. BERT: Move 0 sub-move classifier (2 classes) -> F1 0.8959 ✓ deployed
   ├─ 8. BERT: Move 1 sub-move classifier (4 classes) -> F1 0.9455 ✓ deployed
   └─ 9. BERT: Move 2 sub-move classifier (5 classes) -> F1 0.9591 ✓ deployed
```

---

## File Structure

```
notebooks/
├── README.md
├── v1/                    <- Phase 1: Baseline
│   ├── 1.gemini_moves_generation.ipynb
│   └── 2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb
├── v2/                    <- Phase 2: Refinement
│   ├── 1.generate_moves_predictions.ipynb
│   └── 2.testing_generated_move_predictions.ipynb
└── v3/                    <- Phase 3: Final Models
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

## Stage 1: Foundation

Show the idea: annotate introduction sentences with Gemini Pro, train a first BERT model, and see how bad the baseline is.

### [1. Gemini V1 Annotation](v1/1.gemini_moves_generation.ipynb)

Thesis: Chapter 3, Section 3.1.1

The raw text source is the unarXive corpus. Introduction texts were extracted and split into sentences, then fed one-by-one to Gemini Pro with a minimal prompt:

```
analyze the given text {sentence}, which is a sentence of a
introduction of an imrad formatted scientific paper categorize the sentence
move into an imrad introduction, knowing that the imrad moves are:
(establishing a territory, establishing a niche, taking over the niche).
The output should be the corresponding imrad move and nothing else
```

The prompt is intentionally short — no definitions, no examples, no JSON schema. The goal was to get labeled data quickly and test that the pipeline worked end-to-end before investing in prompt engineering.

The corpus was processed in chunks of 1,000 rows, saving results incrementally to Google Drive.

- Data source: unarXive intro sentences (subset)
- Prompt: 3 classes, no definitions, no examples, free-text output
- Output: CSV chunks with one move name per sentence, saved to `/pfe/gemini-results/`
- Limitation: no sub-move structure; free-form output (e.g. "establishing a niche") required normalization in post-processing; the vague prompt produced inconsistent labels.

---

### [2. V1 BERT Training](v1/2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb)

Thesis: Chapter 3, Sections 3.1.2 and 3.2

Fine-tunes `bert-en-uncased-L-12-H-768-A-12` (TensorFlow Hub) on the V1 annotations for 3-class move classification. A small classification head is added on top of BERT's `[CLS]` token representation:

| | |
|---|---|
| Architecture | BERT → Dropout(0.3) → Dense(3, softmax) |
| Optimizer | AdamW, LR 3e-5 |
| Batch size | 32 |
| Epochs | 15 (early stopping) |
| Data split | 80% train / 10% val / 10% test |
| Accuracy | 44.61% |

44.61% is way too low for practical use (random baseline for 3 classes is 33.3%). Over 15 epochs, train loss hovered around 1.96 and val loss around 1.94 — a clear sign the labels were too noisy for the model to find any signal.

What went wrong:
- No definitions or examples in the V1 prompt, so Gemini used inconsistent criteria for the three moves
- Without sub-move structure, all the nuance within each move was collapsed into a single label
- The resulting label distribution was skewed and unreliable

This result made the Phase 2 redesign necessary.

---

## Phase 2: Polish

Re-architect the prompt using sub-moves to improve annotation quality. Before spending GPU time on a second BERT run, measure whether the new prompt produced better data using lightweight TF-IDF classifiers.

### [1. Gemini V2 Annotation](v2/1.generate_moves_predictions.ipynb)

Thesis: Chapter 4, Section 4.1.2

The key insight for V2 was that the V1 prompt was too generic. A human expert classifying sentences would not just know the three move names — they would know exactly what each sub-move looks like, with examples. The V2 prompt provided that context:

- All 11 sub-moves listed with descriptions and concrete example sentences.
- Output format changed from free text to a structured JSON schema, with `sentence`, `move`, and `sub_move` fields for every sentence.
- The whole introduction was passed at once (not sentence by sentence) so Gemini could use surrounding context.

~37,000 introductions were sent to the Gemini API, each returning a JSON array of classified sentences. Results saved in chunks as `processed_{index}.json`.

Main change vs V1: 11 sub-move definitions + examples + JSON output → much cleaner labels. Output: ~37,000 JSON files used by [Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb).

---

### [2. Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb)

Thesis: Chapter 4, Section 4.2

This notebook aggregates all JSON chunks from [Gemini V2 Annotation](v2/1.generate_moves_predictions.ipynb) and runs TF-IDF classifiers to check whether the improved prompt actually produced better labels.

TF-IDF was used instead of BERT because BERT training takes hours. TF-IDF trains in minutes and works as a fast quality gate: if it can reach 55-60% on 11-class sub-move classification, the labels are meaningful.

Data cleaning: Gemini produced ~30 variants of the labels (e.g. `"0.1"`, `"0_1"`, `"move_0.1"`, `"sub-move 0.1"`). Mapping functions converted all variants to the canonical format `0.0`, `0.1`, ..., `2.4`.

Final dataset: **148,220 sentences, 11 valid sub-move tags**

| Classifier | Accuracy |
|---|---|
| Random Forest | 60.7% |
| Logistic Regression | 60.0% |
| Neural Network (Keras) | 57.5% |
| Naive Bayes | 55.6% |
| K-Nearest Neighbors | 54.0% |
| Decision Tree | 51.6% |

60% is a strong signal that the labels are meaningful, compared to a random baseline of ~9% for 11 classes. The improvement over V1 (where BERT itself only reached 44% on 3 classes) confirms that the enhanced prompt produced significantly better annotations.

60% is also a clear ceiling for TF-IDF on this task — it treats each word as an independent feature and cannot capture the rhetorical nuance of sub-move classification. The next step was BERT, but the data needed further cleaning first.

Saves full dataset as `aggregated_data.csv`, used by [Outlier Detection](v3/1.outlier-detection.ipynb).

---

## Phase 3: Final Models

Remove non-introduction sentences from V2, balance the dataset by generating synthetic sentences for each sub-move, and fine-tune four BERT models for deployment.

### [1. Outlier Detection](v3/1.outlier-detection.ipynb)

Thesis: Chapter 5, Section 5.2.1

The V2 dataset has 148,220 annotated sentences from full introduction texts, but those texts were not always clean. Some papers contained method descriptions, conclusion sentences, or section headers that ended up labeled as "introduction." These sentences don't belong to any IMRaD move and would hurt model quality.

To find and remove them, Gemini Pro reprocessed every sentence in `aggregated_data.csv` with the full outlier detection prompt: all 11 sub-moves, definitions, examples, and a `-1` class for anything that doesn't fit. Gemini also returned a confidence score and a short explanation for each label.

The loop was designed to be resumable (an `is_processed` flag per row) so API failures mid-run didn't require starting over.

Results:
- 20.6% of sentences (30,599 out of 148,220) labeled as outliers and removed
- 117,621 sentences remaining with updated sub-move labels

Output: updated `aggregated_data.csv` with `move_sub_move_gemini` column, used by [Final Dataset Assembly](v3/5.checker.ipynb).

---

### [2. Move 0 Generator](v3/2.move-0-generator.ipynb)

Thesis: Chapter 5, Section 5.2.2

After removing outliers, the sub-move distribution was still uneven — some sub-moves didn't have enough training data for a reliable classifier. To address this, synthetic sentences were generated for each move and sub-move using Gemini Pro.

This notebook covers **Move 0: Setting up a Place to Do Research**. The generation prompt included sub-moves with definitions and two concrete example sentences each, then asked Gemini to generate 3 new sentences per sub-move per API call (temperature 0.9 for variety). Results were de-duplicated and chunked.

The key improvement over earlier generation attempts was including concrete examples in the prompt. Without examples, Gemini wrote generic, repetitive sentences; with examples the output was more varied and linguistically natural.

- Sub-moves: `0.0` Indicate importance/relevance · `0.1` Review prior research
- ~46k unique synthetic sentences in `generated_move0/`, used by [Final Dataset Assembly](v3/5.checker.ipynb)

---

### [3. Move 1 Generator](v3/3.move-1-generator.ipynb)

Thesis: Chapter 5, Section 5.2.2

Same generation pipeline for **Move 1: Establishing a Niche**. This move has four sub-moves and was the hardest to classify: the differences between "claim a flaw" (1.0), "highlight a gap" (1.1), "raise an unclear question" (1.2), and "extend prior research" (1.3) are subtle.

- Sub-moves: `1.0` Claim flaw · `1.1` Gap · `1.2` Unclear question · `1.3` Extend
- ~54k unique synthetic sentences in `generated_move1/`, used by [Final Dataset Assembly](v3/5.checker.ipynb)

---

### [4. Move 2 Generator](v3/4.move-2-generator.ipynb)

Thesis: Chapter 5, Section 5.2.2

Same generation pipeline for **Move 2: Fill the Niche**. The rarest sub-moves (`2.4` outline structure, `2.2` share findings) appear infrequently in real introductions, so synthetic generation was especially important here.

- Sub-moves: `2.0` Purpose · `2.1` Hypothesis · `2.2` Findings · `2.3` Value · `2.4` Structure
- ~48,000 unique synthetic sentences in `generated_move2/`, used by [Final Dataset Assembly](v3/5.checker.ipynb)

---

### [5. Final Dataset Assembly](v3/5.checker.ipynb)

Thesis: Chapter 5, Sections 5.2.3 and 5.3

Merges all data sources and runs quality checks before BERT fine-tuning.

Inputs:
- `generated_move0/` from [Move 0 Generator](v3/2.move-0-generator.ipynb)
- `generated_move1/` from [Move 1 Generator](v3/3.move-1-generator.ipynb)
- `generated_move2/` from [Move 2 Generator](v3/4.move-2-generator.ipynb)
- `aggregated_data.csv` from [Outlier Detection](v3/1.outlier-detection.ipynb)

Final dataset composition (Tables 5.1–5.4 in thesis):

| Move | Sentences | Sub-move breakdown |
|------|-----------|-------------------|
| Move 0 | 56,468 | `0.0`: 27,799 · `0.1`: 28,669 |
| Move 1 | 55,604 | `1.0`: 14,577 · `1.1`: 14,295 · `1.2`: 13,080 · `1.3`: 13,652 |
| Move 2 | 57,657 | `2.0`: 27,217 · `2.1`: 18,724 · `2.2`: 5,026 · `2.3`: 5,635 · `2.4`: 1,955 |
| Outliers (-1) | 30,599 | Removed in pre-processing |
| **Training corpus** | **169,729** | |

Quality checks run:
- Label normalization: ~30 malformed Gemini output variants mapped to canonical format
- PCA scatter plots per move group to check visual separability of sub-move clusters
- LaTeX artifact audit: 1,505 equation tokens, 22,031 citations, 2,918 other non-language tokens identified
- Sanity check via feature-engineered LR (TF-IDF + citation count, equation count, non-language count)

Output: `processed_data_with_outliers.csv` used as input for all four BERT training notebooks.

---

### [6. Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the full 169,729-sentence corpus to classify any sentence into one of three top-level moves. This is Model 1 — the first model the platform calls when a user submits an introduction.

The input sentence is tokenized by `bert_en_uncased_l-12_h-768_a-12`, the `[CLS]` pooled output is fed into a Dropout(0.3) layer, and a Dense(3, softmax) head produces the final probabilities. All BERT parameters are unfrozen during fine-tuning.

| | |
|---|---|
| Classes | Move 0, Move 1, Move 2 |
| Total sentences | 169,729 (excluding outliers) |
| Split | 135,783 train / 16,973 val / 16,973 test (80/10/10) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| Epochs | 3 (2 initial + 1 from checkpoint) |
| Accuracy | 98.21% |
| F1 | 98.21% |

The jump from 44.61% (V1) to 98.21% comes from three things together: a much larger and cleaner dataset, BERT understanding sentence meaning rather than just word frequencies, and removing the outlier sentences that would have confused the model.

Deployed as a TensorFlow Serving microservice.

---

### [7. Move 0 Sub-move Classifier](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the Move 0 subset for binary sub-move classification (`0.0` vs `0.1`). This is Model 2, called only when the Overall Move Classifier predicts Move 0.

The choice to use a separate specialist model per move (rather than one model predicting all 11 sub-moves) is deliberate: each model only needs to separate 2–5 closely related categories, which is a simpler task that trains faster and scores higher.

| | |
|---|---|
| Classes | Importance `0.0`, Review `0.1` |
| Training data | Move 0 subset (56,468 sentences, 80% for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| F1 | 0.8959 |

---

### [8. Move 1 Sub-move Classifier](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the Move 1 subset for 4-class sub-move classification. This is Model 3. The sub-moves of Move 1 are the most similar to each other — the difference between "there is a flaw in prior work" (1.0), "there is a gap" (1.1), "a question is unclear" (1.2), and "more research would be useful" (1.3) is small and requires the model to understand context well.

| | |
|---|---|
| Classes | `1.0` Claim flaw, `1.1` Gap, `1.2` Unclear question, `1.3` Extend |
| Training data | Move 1 subset (55,604 sentences, 80% for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| F1 | 0.9455 |

---

### [9. Move 2 Sub-move Classifier](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the Move 2 subset for 5-class sub-move classification. This is Model 4. Move 2 achieved the highest sub-move F1 of the three specialist models, likely because many of its sub-moves have distinctive vocabulary (e.g. "the purpose of this paper" for 2.0, "we hypothesize" for 2.1, "this paper is organized as follows" for 2.4).

| | |
|---|---|
| Classes | `2.0` Purpose, `2.1` Hypothesis, `2.2` Findings, `2.3` Value, `2.4` Structure |
| Training data | Move 2 subset (57,657 sentences, 80% for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| F1 | 0.9591 |

---

## Summary of Final Model Performance

| Model | Task | Classes | F1 | Thesis ref |
|-------|------|---------|-----|-----------|
| [Model 1: Overall](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) | Move classification | 3 | 0.9821 | Table 5.5 |
| [Model 2: Move 0](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb) | Move 0 sub-moves | 2 | 0.8959 | Table 5.6 |
| [Model 3: Move 1](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb) | Move 1 sub-moves | 4 | 0.9455 | Table 5.6 |
| [Model 4: Move 2](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb) | Move 2 sub-moves | 5 | 0.9591 | Table 5.6 |

At inference time, a sentence goes through Model 1 first to get its top-level move, then the matching specialist model (2, 3, or 4) runs for the sub-move. Keeping each task small and focused is why even the hardest case (Move 1, 4 classes) reaches 94.55% F1.

---

## Deploying Models

All four models were exported in SavedModel format and published on Hugging Face:

| Model | Hugging Face |
|-------|-------------|
| Model 1: Overall move classifier | [stormsidali2001/IMRAD_introduction_moves_classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier) |
| Model 2: Move 0 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier) |
| Model 3: Move 1 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier) |
| Model 4: Move 2 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier) |

The full platform is in this repository. The relevant services:

| Microservice | Location | Tech | Role |
|---|---|---|---|
| API Gateway | `apps/web/nginx/` | Nginx | Entry point, routing, SSL |
| Service Discovery | `apps/eureka/` | Spring Boot | Microservices register at startup |
| Frontend + Auth | `apps/web/` | Next.js + PostgreSQL | UI, authentication, Stripe subscriptions |
| PDF Extractor | `apps/python-services/pdf-extractor/` | FastAPI | Extracts introduction text from uploaded PDFs |
| Model Serving | `docker-compose.yml` (tf-serving) | TensorFlow Serving | Serves the 4 BERT models over HTTP (port 8501) |
| AI Analysis | `apps/python-services/moves/` | FastAPI | Runs the classification pipeline, calls Gemini for premium features |
| User Data | `apps/user-data/` | Express.js + MongoDB | Stores predictions, summaries, and feedback |
| Message Broker | `docker-compose.yml` (redis) | Redis | Async communication between AI Analysis and User Data |
