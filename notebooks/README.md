# IMRaD Introduction Analysis - Notebook Reference

This directory contains all research notebooks for the thesis:

> **"Leveraging Gemini Pro and BERT for Automated IMRaD Classification:  
> A Novel Dataset and SaaS Platform"**  
> Sid Ali Assoul, École Supérieure en Informatique, SIW · 2022-2023

---

## Table of Contents

- [Research Background and Motivation](#research-background-and-motivation)
- [The Dataset Problem: Why We Built Our Own](#the-dataset-problem-why-we-built-our-own)
- [The Three-Phase Strategy](#the-three-phase-strategy)
- [IMRaD Move Reference](#imrad-move-reference)
- [Pipeline Overview](#pipeline-overview)
- [Directory Structure](#directory-structure)
- [Phase 1: Baseline](#phase-1-baseline)
  - [1. Gemini V1 Annotation](#1-gemini-v1-annotation)
  - [2. V1 BERT Training](#2-v1-bert-training)
- [Phase 2: Refinement](#phase-2-refinement)
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
- [Final Model Performance Summary](#final-model-performance-summary)
- [Model Deployment](#model-deployment)

---

## Research Background and Motivation

Scientific papers follow the **IMRaD** format (Introduction, Methods, Results, Discussion), and the introduction in particular has a well-studied rhetorical structure described by Swales' CARS model. Every sentence in an introduction serves a specific purpose: it might be establishing why the topic matters, pointing out a gap in the literature, or announcing what the paper contributes. These purposes are organized into three top-level **moves** and eleven **sub-moves**.

Being able to automatically identify these moves and sub-moves at the sentence level is useful in several ways:
- Students can see whether their introduction follows the expected structure before submitting
- Researchers can quickly map the rhetorical strategy of papers they are reviewing
- Educators can provide structured, automated feedback on drafts

However, building a reliable classifier for this task requires a large, cleanly labeled dataset at the **sentence level** - and at the start of this research, no such dataset existed publicly.

---

## The Dataset Problem: Why We Built Our Own

The most relevant public corpus available is **unarXive** (Saier & Färber), which contains hundreds of thousands of scientific paper introductions extracted from arXiv. However, unarXive has two limitations that make it unsuitable for direct use:

1. **Section-level labels only.** unarXive labels entire sections as "Introduction," "Methods," etc. It does not label individual sentences within an introduction with their rhetorical move or sub-move. There is no column that says "this sentence is sub-move 1.1 (highlight a gap)."

2. **LaTeX artifacts.** The corpus contains raw LaTeX text, including citation commands like `\cite{...}`, equation environments, table and figure references, and other formatting symbols. These artifacts add noise and must be cleaned before training.

Because of these gaps, we could not simply download a dataset and start training. We had to build one from scratch.

The solution was to use **Gemini Pro** as an automated annotator: feed it introduction sentences from unarXive and use a custom prompt to label each sentence with its IMRaD move and sub-move. This is cheaper and faster than hiring domain experts to annotate 150,000+ sentences by hand, and recent work shows that LLMs can produce annotation quality close to human annotators when the prompt is well designed.

The challenge then became: **how good is the annotation, and how do we verify it?** This is the core question that drove the three-phase approach described in this thesis.

---

## The Three-Phase Strategy

Because we were both generating the data and training models on it, we could not verify quality in the usual way (comparing to a gold-standard test set) at the start. Instead, we used an iterative strategy:

| Phase | Goal | Data size | Best result |
|---|---|---|---|
| **V1** | Establish a baseline; prove the idea works | Small subset of unarXive sentences | 44.61 % accuracy (BERT) |
| **V2** | Improve prompt quality; measure data quality with cheap classifiers | 148,220 sentences | 60.7 % accuracy (Random Forest) |
| **V3** | Clean V2 data, generate synthetic sentences, fine-tune final BERT models | 169,729 sentences | 98.21 % F1 (overall move BERT) |

Each phase exposed specific weaknesses in the previous one. V1 showed that a vague 3-class prompt produces noisy labels that BERT cannot learn from reliably. V2 showed that adding sub-move definitions to the prompt genuinely improved label quality (TF-IDF classifiers went from random-chance performance to 60 %), but TF-IDF hit a ceiling and the data still contained non-introduction sentences. V3 removed those outliers, balanced the dataset with synthetic generation, and fine-tuned BERT models that achieve over 95 % F1 on sub-move tasks.

---

## IMRaD Move Reference

Every sentence in a scientific introduction belongs to one of three rhetorical **moves**, each subdivided into **sub-moves**:

| Move | Name | Sub-moves |
|---|---|---|
| **0** | Establishing a Research Territory | `0.0` Show importance/relevance · `0.1` Review prior research |
| **1** | Establishing a Niche | `1.0` Claim flaw in prior work · `1.1` Highlight a gap · `1.2` Raise an unclear question · `1.3` Extend prior research |
| **2** | Occupying the Niche | `2.0` State purpose · `2.1` Hypothesis/research question · `2.2` Share findings · `2.3` Elaborate value · `2.4` Outline structure |
| **-1** | Outlier | Does not belong to any move (e.g. method description, conclusion sentence, section header) |

> **Note:** The thesis uses a numbering system that starts moves at 0 (Move 0, 1, 2). Some referenced literature starts at Move 1. The concepts are identical; only the numbering differs.

---

## Pipeline Overview

```
unarXive corpus (264,799 introductions from arXiv)
│  (section-level labels only; no sentence-level sub-move annotations)
│
├─ v1/  -- Phase 1: Baseline
│   ├─ 1. Annotate each sentence with a simple 3-class prompt (Gemini Pro)  ->  raw chunks
│   └─ 2. Fine-tune BERT on V1 data  ->  44.61 % accuracy  <- noisy labels, redesign
│
├─ v2/  -- Phase 2: Refinement
│   ├─ 1. Re-annotate with enhanced 11-sub-move prompt  ->  148,220 labeled sentences
│   └─ 2. Benchmark TF-IDF classifiers to measure data quality  ->  RF 60.7 %  <- TF-IDF ceiling -> need BERT
│
└─ v3/  -- Phase 3: Final Models
    ├─ 1. Outlier detection: re-label V2 with full prompt, discard -1 rows  ->  -30,599 outliers removed
    ├─ 2. Synthetic generation (Move 0)  ->  ~46,000 new sentences
    ├─ 3. Synthetic generation (Move 1)  ->  ~54,000 new sentences
    ├─ 4. Synthetic generation (Move 2)  ->  ~48,000 new sentences
    ├─ 5. Merge all sources, run quality checks  ->  169,729 clean training sentences
    ├─ 6. BERT: Overall move classifier (3 classes)  ->  F1 0.9821  ✓ deployed
    ├─ 7. BERT: Move 0 sub-move classifier (2 classes)  ->  F1 0.8959  ✓ deployed
    ├─ 8. BERT: Move 1 sub-move classifier (4 classes)  ->  F1 0.9455  ✓ deployed
    └─ 9. BERT: Move 2 sub-move classifier (5 classes)  ->  F1 0.9591  ✓ deployed
```

---

## Directory Structure

```
notebooks/
├── README.md                          <- this file
├── v1/                                <- Phase 1: Baseline
│   ├── 1.gemini_moves_generation.ipynb
│   └── 2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb
├── v2/                                <- Phase 2: Refinement
│   ├── 1.generate_moves_predictions.ipynb
│   └── 2.testing_generated_move_predictions.ipynb
└── v3/                                <- Phase 3: Final Models
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

## Phase 1: Baseline

**Goal:** Prove the concept. Use Gemini Pro to annotate introduction sentences and train a first BERT model. Accept that this baseline will be imperfect.

### [1. Gemini V1 Annotation](v1/1.gemini_moves_generation.ipynb)

Thesis: Chapter 3, Section 3.1.1

The unarXive corpus was used as the raw text source: each paper's introduction was extracted and split into sentences. These sentences were then passed one by one to **Gemini Pro** using a minimal prompt that simply listed the three move names and asked the model to pick one:

```
analyze the provided text {sentence}, which represents a sentence of an
introduction of an imrad formatted scientific paper. classify the sentence
into an imrad introduction move, knowing that the imrad moves are:
(establishing a research territory, establishing a niche, occupying the niche).
the output should be the corresponding imrad move without anything extra
```

The prompt is intentionally concise: no definitions, no examples, no JSON schema. The goal at this stage was to get labeled data quickly and test whether the overall pipeline worked before investing in prompt engineering.

The corpus was processed in 1,000-row chunks, with results saved incrementally to Google Drive to guard against session interruptions.

- **Data source:** unarXive introduction sentences (subset)
- **Prompt type:** V1 - 3 classes, no definitions, no examples, plain text output
- **Output format:** One move name per sentence, saved as CSV chunks in `/pfe/gemini-results/`
- **Limitation:** No sub-move detail. Output was free-form text (e.g., "establishing a niche"), which needed post-processing to normalize. The vague prompt led to ambiguous and inconsistent labels.

---

### [2. V1 BERT Training](v1/2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb)

Thesis: Chapter 3, Section 3.1.2 and 3.2

Fine-tunes `bert-en-uncased-L-12-H-768-A-12` (from TensorFlow Hub) on the V1 annotated data for 3-class move classification.

The architecture adds a small classification head on top of BERT's `[CLS]` token output:

| | |
|---|---|
| Architecture | BERT -> Dropout(0.3) -> Dense(3, softmax) |
| Optimizer | AdamW, LR 3e-5 |
| Batch size | 32 |
| Epochs | Up to 15 with early stopping |
| Data split | 80 % train / 10 % val / 10 % test |
| **Accuracy** | **44.61 %** |

A random baseline for 3 classes would be 33.3 %, so the model is learning something, but the 44.61 % accuracy is far too low for practical use. The training and validation loss barely moved across 15 epochs (train loss ~1.96, val loss ~1.94 for every epoch), which strongly suggests the data labels are too noisy for the model to find a reliable signal.

**Root causes identified:**
- The V1 prompt had no definitions or examples, so Gemini applied inconsistent criteria when choosing between the three moves
- No sub-move structure meant all the nuance within each move was collapsed into one label
- The resulting label distribution was skewed and unreliable

This poor result is what made the redesign in Phase 2 necessary.

---

## Phase 2: Refinement

**Goal:** Improve annotation quality by redesigning the prompt around sub-moves. Use lightweight TF-IDF classifiers (not BERT) to measure whether the new prompt produced better data, before investing GPU time in a second BERT run.

### [1. Gemini V2 Annotation](v2/1.generate_moves_predictions.ipynb)

Thesis: Chapter 4, Section 4.1.2

The key insight for V2 was that the V1 prompt was too vague. A human expert classifying sentences would not just know the three move names - they would know exactly what each sub-move looks like, with examples. The V2 prompt gave Gemini that context:

- All 11 sub-moves were listed with descriptions and concrete example sentences
- The output format was changed from free text to a structured JSON schema with `sentence`, `move`, and `sub_move` fields for every sentence in the introduction
- The entire introduction was passed at once (instead of sentence by sentence), so Gemini could use surrounding context to classify each sentence

The full corpus was re-processed: ~37,000 introductions were sent to the Gemini API, each producing a JSON array of classified sentences. Results were saved as `processed_{index}.json` chunks.

- **Key change from V1:** 11 sub-move definitions + examples + JSON output -> significantly cleaner labels
- **Output:** ~37,000 JSON files, each containing one introduction's sentences with move and sub-move labels, consumed by [Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb)

---

### [2. Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb)

Thesis: Chapter 4, Section 4.2

This notebook aggregates all the JSON chunks from [Gemini V2 Annotation](v2/1.generate_moves_predictions.ipynb) and uses TF-IDF classifiers to measure whether the improved prompt actually produced better-quality labeled data.

The rationale for using TF-IDF instead of BERT here: training a BERT model takes hours. TF-IDF classifiers train in minutes and can serve as a quick quality gate. If even a fast classifier can reach 55-60 % on 11-class sub-move classification, that is evidence the labels are meaningful.

**Data cleaning:** Gemini returned approximately 30 different label variants across all runs (e.g., `"0.1"`, `"0_1"`, `"move_0.1"`, `"sub-move 0.1"`, etc.). Mapping functions were written to normalize all variants to the canonical `0.0`, `0.1`, ..., `2.4` format. After cleaning:

**Dataset: 148,220 sentences, 11 valid sub-move labels**

| Classifier | Accuracy |
|---|---|
| Random Forest | **60.7 %** |
| Logistic Regression | 60.0 % |
| Neural Network (Keras) | 57.5 % |
| Naive Bayes | 55.6 % |
| K-Nearest Neighbors | 54.0 % |
| Decision Tree | 51.6 % |

Compared to a random baseline of ~9 % for 11 classes, 60 % is a strong signal that the labels are meaningful. The improvement over V1 (where BERT itself only hit 44 % on 3 classes) confirms that the enhanced sub-move prompt produced significantly better annotations.

However, 60 % is also clearly a ceiling for TF-IDF on this task. TF-IDF treats each word independently and ignores sentence structure, so it cannot capture the rhetorical nuance needed for sub-move classification. The next step was to use BERT, but first the data needed further cleaning.

Saves the full dataset as `aggregated_data.csv`, consumed by [Outlier Detection](v3/1.outlier-detection.ipynb).

---

## Phase 3: Final Models

**Goal:** Remove non-introduction sentences from V2, balance the dataset by generating synthetic sentences for each sub-move, and fine-tune four BERT models for final deployment.

### [1. Outlier Detection](v3/1.outlier-detection.ipynb)

Thesis: Chapter 5, Section 5.2.1

The V2 dataset of 148,220 sentences was annotated from full introduction texts, but those texts were not always clean. Some papers included method descriptions, conclusion sentences, or section headers that found their way into what was labeled as "the introduction." These sentences do not belong to any IMRaD introduction move, and training on them would degrade model quality.

To find and remove them, every sentence in `aggregated_data.csv` (from [Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb)) was re-analyzed by Gemini Pro using the **full outlier detection prompt**: all 11 sub-moves, definitions, examples, and a `-1` class for anything that does not fit. Gemini also returned a confidence score and a short explanation for each label.

Sentences assigned `-1` were flagged as outliers and excluded from training. The loop was designed to be resumable (an `is_processed` flag was saved per row) so that API failures mid-run did not mean starting over.

**Results:**
- **30,599 outliers found out of 148,220 sentences (20.6 %)**
- Remaining clean sentences: 117,621 with updated sub-move labels

- **Output:** Updated `aggregated_data.csv` with a `move_sub_move_gemini` column, consumed by [Final Dataset Assembly](v3/5.checker.ipynb)

---

### [2. Move 0 Generator](v3/2.move-0-generator.ipynb)

Thesis: Chapter 5, Section 5.2.2

After removing outliers, the V2 data still had an uneven sub-move distribution. Some sub-moves had too few examples to train a reliable classifier. To fix this, Gemini Pro was used to generate new synthetic sentences for each move and sub-move.

This notebook handles **Move 0: Establishing a Research Territory**. The generation prompt listed both sub-moves with definitions and two concrete example sentences each, then asked Gemini to produce 3 new sentences per sub-move per API call (temperature 0.9 for vocabulary variety). Results were deduplicated and saved in chunks.

The key breakthrough compared to earlier generation attempts was including **concrete examples** in the prompt. Without examples, Gemini tended to produce generic, repetitive sentences. With examples, the output was more varied and linguistically natural.

- **Sub-moves:** `0.0` Show importance/relevance · `0.1` Review prior research
- **API calls:** 10,000 iterations
- **Output:** ~46,000 unique synthetic sentences in `generated_move0/`, consumed by [Final Dataset Assembly](v3/5.checker.ipynb)

---

### [3. Move 1 Generator](v3/3.move-1-generator.ipynb)

Thesis: Chapter 5, Section 5.2.2

Same generation pipeline for **Move 1: Establishing a Niche**, which has four sub-moves and was historically the most difficult to classify correctly (the distinctions between "claim a flaw," "highlight a gap," "raise an unclear question," and "extend prior research" are subtle).

- **Sub-moves:** `1.0` Claim flaw · `1.1` Gap · `1.2` Unclear question · `1.3` Extend
- **Output:** ~54,000 unique synthetic sentences in `generated_move1/`, consumed by [Final Dataset Assembly](v3/5.checker.ipynb)

---

### [4. Move 2 Generator](v3/4.move-2-generator.ipynb)

Thesis: Chapter 5, Section 5.2.2

Same generation pipeline for **Move 2: Occupying the Niche**. This move has five sub-moves, the least common of which (`2.4` outline structure, `2.2` share findings) are rarely seen in real introductions, which is why synthetic generation was especially important here.

- **Sub-moves:** `2.0` Purpose · `2.1` Hypothesis · `2.2` Findings · `2.3` Value · `2.4` Structure
- **Output:** ~48,000 unique synthetic sentences in `generated_move2/`, consumed by [Final Dataset Assembly](v3/5.checker.ipynb)

---

### [5. Final Dataset Assembly](v3/5.checker.ipynb)

Thesis: Chapter 5, Section 5.2.3 and 5.3

This notebook merges all data sources and runs a series of quality checks before BERT fine-tuning begins.

**Inputs:**
- `generated_move0/` from [Move 0 Generator](v3/2.move-0-generator.ipynb)
- `generated_move1/` from [Move 1 Generator](v3/3.move-1-generator.ipynb)
- `generated_move2/` from [Move 2 Generator](v3/4.move-2-generator.ipynb)
- `aggregated_data.csv` from [Outlier Detection](v3/1.outlier-detection.ipynb) (V2 re-labeled, -1 rows kept in the file but excluded at training time)

**Final dataset composition (from thesis Table 5.1-5.4):**

| Move | Sentences | Sub-move breakdown |
|---|---|---|
| Move 0 | 56,468 | `0.0`: 27,799 · `0.1`: 28,669 |
| Move 1 | 55,604 | `1.0`: 14,577 · `1.1`: 14,295 · `1.2`: 13,080 · `1.3`: 13,652 |
| Move 2 | 57,657 | `2.0`: 27,217 · `2.1`: 18,724 · `2.2`: 5,026 · `2.3`: 5,635 · `2.4`: 1,955 |
| Outliers (-1) | 30,599 | Filtered out before training |
| **Training corpus** | **169,729** | After removing outliers |

**Quality checks:**
- Label cleaning: ~30 malformed label variants from Gemini output are normalized
- Logistic Regression + PCA scatter plots per move group to check whether sub-move clusters separate visually
- LaTeX artifact audit: 1,505 equation tokens · 22,031 citations · 2,918 other non-language tokens identified
- Feature-engineered LR (TF-IDF + citation/equation/non-language counts) as a final sanity check on label quality

**Output:** `processed_data_with_outliers.csv`, consumed by all four BERT training notebooks: [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>), [Move 0 Sub-move Classifier](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb), [Move 1 Sub-move Classifier](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb), [Move 2 Sub-move Classifier](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb)

---

### [6. Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the full 169,729-sentence corpus (from [Final Dataset Assembly](v3/5.checker.ipynb)) to classify any sentence into one of three top-level moves. This is **Model 1**, the first model called by the SaaS platform whenever a user submits an introduction.

The input sentence is tokenized by `bert_en_uncased_l-12_h-768_a-12`, the `[CLS]` pooled output is passed through a Dropout(0.3) layer, and a Dense(3, softmax) head produces the final probabilities. All BERT parameters were unfrozen during fine-tuning.

| | |
|---|---|
| Classes | Move 0 · Move 1 · Move 2 |
| Training data | 169,729 sentences (outliers removed) |
| Split | 135,783 train / 16,973 val / 16,973 test (80/10/10) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| Epochs | 3 (2 initial + 1 continued from checkpoint) |
| **Accuracy** | **98.21 %** |
| **Precision** | **98.35 %** |
| **F1** | **98.21 %** |

The jump from 44.61 % (V1) to 98.21 % is explained by the combination of three things: a much larger and cleaner dataset, BERT's ability to capture sentence meaning rather than just word frequencies, and removing the outlier sentences that would have confused the model.

This model is served via TensorFlow Serving as a standalone microservice in the SaaS platform.

---

### [7. Move 0 Sub-move Classifier](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the **Move 0 subset** of the corpus for **binary sub-move classification** (`0.0` vs `0.1`). This is **Model 2**, invoked only when the Overall Move Classifier predicts Move 0.

Using a separate specialist model per move (rather than one single model predicting all 11 sub-moves) was a specific choice: each model only needs to separate 2-5 closely related categories, which is a simpler task that trains faster and scores higher.

| | |
|---|---|
| Classes | `0.0` Show importance · `0.1` Review prior research |
| Training data | Move 0 subset (56,468 sentences total, 80 % for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| **F1** | **0.8959** |

Invoked when [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) predicts Move 0.

---

### [8. Move 1 Sub-move Classifier](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the **Move 1 subset** for **4-class sub-move classification**. This is **Model 3**. Move 1 has the most closely related sub-moves - the difference between "there is a flaw in prior work" (1.0), "there is a gap" (1.1), "a question is unclear" (1.2), and "more research would be useful" (1.3) is small and requires the model to understand context well.

| | |
|---|---|
| Classes | `1.0` Claim flaw · `1.1` Gap · `1.2` Unclear question · `1.3` Extend |
| Training data | Move 1 subset (55,604 sentences total, 80 % for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| **F1** | **0.9455** |

Invoked when [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) predicts Move 1.

---

### [9. Move 2 Sub-move Classifier](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb)

Thesis: Chapter 5, Section 5.3

Fine-tunes BERT on the **Move 2 subset** for **5-class sub-move classification**. This is **Model 4**. Move 2 achieved the highest sub-move F1 score of the three specialist models, likely because many Move 2 sub-moves have distinctive vocabulary (e.g., "the purpose of this paper" for 2.0, "we hypothesize" for 2.1, "this paper is organized as follows" for 2.4).

| | |
|---|---|
| Classes | `2.0` Purpose · `2.1` Hypothesis · `2.2` Findings · `2.3` Value · `2.4` Structure |
| Training data | Move 2 subset (57,657 sentences total, 80 % for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 |
| **F1** | **0.9591** |

Invoked when [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) predicts Move 2.

---

## Final Model Performance Summary

| Model | Task | Classes | F1 / Accuracy | Thesis ref |
|---|---|---|---|---|
| [Model 1: Overall](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) | Move classification | 3 | **0.9821** | Table 5.5 |
| [Model 2: Move 0](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb) | Move 0 sub-moves | 2 | **0.8959** | Table 5.6 |
| [Model 3: Move 1](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb) | Move 1 sub-moves | 4 | **0.9455** | Table 5.6 |
| [Model 4: Move 2](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb) | Move 2 sub-moves | 5 | **0.9591** | Table 5.6 |

A sentence is first routed through Model 1 to identify its move, then passed to the matching specialist model for sub-move classification. Having one model per move (rather than one model for all 11 sub-moves) keeps each task simple and focused, which is why even the hardest case (Move 1, 4 classes) reaches 94.55 % F1.

---

## Model Deployment

After training, all four models were exported in the **SavedModel** format and published on Hugging Face:

| Model | Hugging Face |
|---|---|
| Model 1: Overall move classifier | [stormsidali2001/IMRAD_introduction_moves_classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier) |
| Model 2: Move 0 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier) |
| Model 3: Move 1 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier) |
| Model 4: Move 2 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier) |

The platform is built as a set of independent microservices. The four models plug into this architecture through two of them:

**TensorFlow Serving** is a dedicated microservice whose only job is to load the four SavedModel files and expose them over HTTP. It is purpose-built for serving TensorFlow models efficiently, handling batching and hardware acceleration without any custom serving code.

**AI Analysis microservice (FastAPI + Python)** sits between the rest of the platform and TensorFlow Serving. It receives an introduction text (either typed by the user or extracted from a PDF by a separate PDF Extractor microservice), splits it into sentences, and runs the two-stage classification: first calls Model 1 (overall move) for each sentence, then calls the right specialist model (2, 3, or 4) based on the result. This microservice also handles the premium features - introduction summarization and author thought-process generation - by calling the Gemini API (Gemini Pro / Gemini Flash).

The full platform is split across three repositories:

**[graduation_IMRAD_introduction_analysis_SaaS](https://github.com/stormsidali2001/graduation_IMRAD_introduction_analysis_SaaS)** - this repo. Contains the Next.js frontend, the Next.js API (auth, subscriptions, Stripe), Nginx config, and the Prisma/PostgreSQL schema.

**[imrad_intros_moves_submoves_python_microservices](https://github.com/stormsidali2001/imrad_intros_moves_submoves_python_microservices)** - contains two Python services and the TensorFlow Serving Docker Compose setup:
- AI Analysis microservice (FastAPI) - runs the classification pipeline and premium features
- PDF Extractor microservice (FastAPI) - pulls introduction text from uploaded PDFs
- `tensorflow-models/` - Docker Compose file that starts TensorFlow Serving with the four SavedModel files mounted

**[imrad_introduction_moves_sub_moves_express_user_data](https://github.com/stormsidali2001/imrad_introduction_moves_sub_moves_express_user_data)** - the Express.js + TypeScript + MongoDB service that stores introduction predictions, summaries, and user feedback. Also contains the Redis and MongoDB Docker Compose files.

| Microservice | Repo | Tech | Role |
|---|---|---|---|
| API Gateway | graduation_IMRAD_introduction_analysis_SaaS | Nginx | Entry point, routes requests, SSL, rate limiting |
| Service Discovery | (Spring Cloud Eureka server) | Spring Boot | Lets microservices find each other at runtime |
| Frontend + Auth | graduation_IMRAD_introduction_analysis_SaaS | Next.js + PostgreSQL | UI, authentication, subscription management (Stripe) |
| PDF Extractor | imrad_intros_moves_submoves_python_microservices | FastAPI (Python) | Extracts introduction text from uploaded PDFs |
| Model Serving | imrad_intros_moves_submoves_python_microservices | TensorFlow Serving | Serves the 4 BERT models over HTTP (port 8501) |
| AI Analysis | imrad_intros_moves_submoves_python_microservices | FastAPI (Python) | Runs classification pipeline, calls Gemini for premium features |
| User Data | imrad_introduction_moves_sub_moves_express_user_data | Express.js + MongoDB | Stores predictions, summaries, and user feedback |
| Message Broker | imrad_introduction_moves_sub_moves_express_user_data | Redis | Async communication between AI Analysis and User Data |
