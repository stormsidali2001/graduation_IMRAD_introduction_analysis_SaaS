IMRaD Introduction Analysis - Notebook Reference

This directory contains all research notebooks for the thesis: 

> **"Automated IMRaD Classification with BERT and Gemini Pro:  
> A Novel Dataset and SaaS Platform”**  
Sid Ali Assoul SIW · École Supérieure en Informatique 2022-2023

--- 

## Contents

- [Motivation and Background of the Research](#motivation-and-background-of-the-research)
- [The Dataset Problem: Why We Created Our Own](#the-dataset-problem-why-we-built-our-own)
- [The Three-Phase Strategy](#three-phase-strategy)
- [IMRaD Move Reference](#imrad-move-reference) 
- [Pipeline Overview](#pipeline-overview) 
- [Directory Structure](#directory-structure) 
- [Phase 1: Baseline](#phase-1-baseline) 
- [1.  Gemini V1 Annotation](#1-gemini-v1-annotation) 
- [2.  [2. V1 BERT Training](#2-v1-bert-training)
- [Phase 2: Refinement](#phase-2-refinement-1)
- [1.  # 1. Gemini V2 Note
- [2.  Classifier Benchmarking](#2-classifier-benchmarking) 
- [Phase 3: Final Models](#phase-3-final-models) 
- [1.  Outlier Detection](#1-outlier-detection) 
- [2.  [Move 0 Generator](#2-move-0-generator)
- [3.  3. Swap 1 Generator
- [4.  Move 2 Generator](#4-move-2-generator) 
- [5.  Final Dataset Assembly </a>
- [6.  # Move Classifier #6 Overall
- [7.  [7. Move 0 Sub-move Classifier](#7-move-0-sub-move-classifier)
- [8.  [8. Move 1 Sub-move Classifier](#8-move-1-sub-move-classifier)
- [9.  [Move 2 Sub-move Classifier](#9-move-2-sub-move-classifier)
- [Summary of Final Model Performance](#final-model-performance-summary)
- [Deploying Models](#model-deployment)

--- 

## Background and Motivation

The scientific papers are written in the **IMRaD** format (Introduction, Methods, Results, Discussion) and the introduction has a well-studied rhetorical structure described by Swales' CARS model. Every sentence in an introduction has a purpose; it may be to establish why the topic matters, to point out a gap in the literature, or to announce what the paper contributes. These purposes are organized into three top-level **moves** and eleven **sub-moves**. 

Automated identification of these moves and sub-moves at the sentence level has several uses:
- Students can verify that their introduction has the expected structure before they submit it.
- Reviewers can easily map the rhetorical strategy of papers they are reviewing
- Automated, structured feedback on drafts by teachers possible

However, to develop a reliable classifier for this task, we need a large and clean dataset labeled at the **sentence level**, and no such dataset was publicly available at the beginning of this research.

--- 

## The Dataset Problem: Why We Created Our Own Dataset

The most relevant public corpus available is **unarXive** (Saier & Färber), which contains hundreds of thousands of introductions to scientific papers extracted from arXiv. However, unarXive has two drawbacks that make it not usable directly:

1.  Section-level labels only. unarXive labels whole sections as "Introduction", "Methods", etc. It does not label each sentence in an introduction with its rhetorical move or sub-move. There is no column saying "this sentence is sub-move 1.1 (highlight a gap)".

2.  **Latex artifacts.** The corpus contains raw LaTeX text, including citation commands (e.g. \cite{...}), equation environments, table and figure references, and other formatting symbols. Artifacts add noise and must be cleaned before training.

Because of these gaps, we couldn’t just download a dataset and start training. We had to make one for ourselves.

We addressed this by employing **Gemini Pro** as an automatic annotator: we provided it with introduction sentences extracted from unarXive, and applied a custom prompt to annotate each sentence with its IMRaD move and sub-move. This is cheaper and faster than hiring domain experts to manually annotate 150,000+ sentences and recent work shows that LLMs can achieve annotation quality close to human annotators when the prompt is well designed.

So then the challenge was how good is the annotation and how do we verify it?This is the central question of the three-phase approach developed in this thesis.

--- 

## The Three Stage Approach

We were both generating the data and training models on it, so we could not check quality in the usual way (against a gold-standard test set) at the outset. Instead, we adopted an iterative approach:

| Phase | Ziel | Datenmenge | Bestes Ergebnis |
|---|---|---|---| 
| **V1** | Show that the idea works; establish a baseline | A small subset of unarXive sentences | 44.61 % accuracy (BERT) |
| **V2** | Enhance prompt quality; assess data quality using inexpensive classifiers | 148,220 sentences | 60.7 % accuracy (Random Forest) |
| **V3** | Clean V2 data, create synthetic sentences, fine-tune final BERT models | 169,729 sentences | 98.21 % F1 (overall move BERT) |

In each phase the weaknesses of the previous one were made apparent. In V1, the study showed that a vague 3-class prompt results in noisy labels that BERT cannot learn from reliably. V2 showed that adding sub-move definitions to the prompt improved label quality (TF-IDF classifiers went from random-chance performance to 60 %), but TF-IDF hit a ceiling and the data still contained non-introduction sentences. V3 eliminated outliers, balanced the dataset with synthetic generation, and improved BERT models with over 95 % F1 on the sub-move tasks.

--- 

## IMRaD Move Citation

A scientific introduction contains three kinds of rhetorical **moves**, which are further divided into **sub-moves**:

| Move | Name | Sub-moves | 
|---|---|---| 
| **0** | Establishing a Research Domain | `0.0` Show significance/relevance · `0.1` Examine prior research |
| **1** | Establishing a Niche | `1.0` Claim flaw in prior work · `1.1` Highlight a gap · `1.2` Raise an unclear question · `1.3` Extend prior research | 
| **2** | Filling the Niche | `2.0` State aim · `2.1` Hypothesis/research question · `2.2` Present findings · `2.3` Develop value · `2.4` Sketch structure |
| **-1** | Outlier | Not part of any move (e.g. method description, sentence of conclusion, section header) |

**Note:** The numbering of moves in the thesis starts from 0 (Move 0, 1, 2). Some cited literature begins at Move 1. The concepts are the same, only the numbering is different.

--- 

## Pipelines Overview

``` 
unarXive corpus (264,799 intros from arXiv)
(section-level labels only, no sentence-level sub-move annotations)
│ 
├─ v1/ -- Phase 1: Base Line
│ ├─ 1.  Prompt: Gemini Pro -> raw chunks Each sentence is annotated with a simple 3-class prompt (Gemini Pro) -> raw chunks
│ └─ 2.  Fine-tune BERT on V1 data -> 44.61 % accuracy <- redesign, noisy labels
│ 
├─ v2/ -- Phase 2: Refinement 
│ ├─ 1.  Re-annotated with improved 11-sub-move prompt -> 148,220 annotated sentences
│ └─ 2.  Need BERT Benchmark TF-IDF classifiers for data quality assessment <- RF 60.7 % <- TF-IDF ceiling >
│ 
└── v3/ ├── Phase 3: Final Models
├─ 1.  Outlier detection: Re-label V2 with full prompt, discard -1 rows -> -30,599 outliers removed
├─ 2.  Synthetic generation (Move 0) -> ~46k new sentences
├─ 3.  Synthetic generation (Move 1) -> ~54K new sentences
├─ 4.  Synthetic generation (Move 2) -> ~48000 new sentences
├─ 5.  169,729 clean training sentencesMerge all sources, perform quality checks
├─ 6.  BERT: overall move classifier (3 classes) -> F1 0.9821 ✓ deployed
├─ 7.  BERT: Move 0 sub-move classifier (2 classes) -> F1 0.8959 ✓ deployed
├─ 8.  BERT: 1 sub-move classifier (4 classes) -> F1 0.9455 ✓ deployed
└─ 9.  BERT: Move 2 sub-move classifier (5 classes) -> F1 0.9591 ✓ deployed 
``` 

--- 

## File Structure

``` 
notebooks/ 
├── README.md <- this file
├── v1/ <- Phase 1 : Baseline
│ ├── 1.gemini_moves_generation.ipynb 
│ └── 2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb
├── v2/ <- Phase 2: Refinement 
│ ├── 1.generate_moves_predictions.ipynb 
│ └── 2.testing_generated_move_predictions.ipynb
└── v3/ <- Phase 3: Final Models 
├── 2.outlier-detection.ipynb
├── 2.move-0-generator.ipynb 
├── 3.move-1-generator.ipynb 
4.move-2-generator.ipynb
├── 5.checker.ipynb 
├── 6.pfe_training_moves_bert_model_06_26 (1).ipynb 
7.pfe_training_sub_moves_0_bert_model_07.1.ipynb
├── 8.pfe_training_sub_moves_1_bert_model_07_1.ipynb 
└── 9.pfe_training_sub_moves_2_bert_model_09.1.ipynb
``` 

--- 

## Stage 1: Foundation

**Objective:** Show the idea. Annotate first sentences of introduction with Gemini Pro Train first BERT model Realise that this baseline will be wrong.

### [1.  [Gemini V1 Annotation](v1/1.gemini_moves_generation.html)

THESIS: CHAPTER 3: SECTION 3.1.1

The raw text source is the unarXive corpus: the introduction of every paper was extracted and split into sentences. These sentences were then provided one-by-one to **Gemini Pro** with a minimal prompt that just listed the three move names and asked the model to pick one:

``` 
analyze the given text {sentence}, which is a sentence of a
introduction of an imrad formatted scientific paper categorize the sentence
move into an imrad introduction, knowing that the imrad moves are:
(establishing a territory, establishing a niche, taking over the niche).
The output should be the corresponding imrad move and nothing else
``` 

The prompt is intentionally short: no definitions, no examples, no json schema. The goal here was to get labeled data quickly and test that the overall pipeline worked before investing in prompt engineering.

The corpus was processed in chunks of 1,000 rows, and results were saved incrementally to Google Drive to prevent interruption of the session.

- **Source of data:** unarXive intro sentences (subset)
- **Prompt type:** V1 - 3 classes, no definitions, no examples, text output
- **Output format:** CSV chunks with a single move name per sentence, saved in `/pfe/gemini-results/`
- **Limitation** No details of sub moves. Output was free-form text (e.g., “establishing a niche”) that needed to be normalized in post-processing. The ambiguity in the prompt led to ambiguous and inconsistent labels.

--- 

### [2.  V1 BERT Training](v1/2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb) 

Thesis: Chapter 3, Section 3.1.2 and 3.2 

Fine-tune `bert-en-uncased-L-12-H-768-A-12` (from TensorFlow Hub) on V1 annotated data for 3-class move classification.

The architecture adds a small classification head on top of BERT’s representation of the `[CLS]` token:

| | | 
|---|---| 
| Architecture | BERT -> Dropout(0.3) -> Dense(3, softmax) | 
Optimizer | AdamW, LR 3e-5 |
Batch size | 32 |
Epochs 15 (Early Stopping)
Data split | 80% training / 10% validation / 10% test |
| **Accuracy** | **44.61** |

So the model is learning something, but 44.61 % accuracy is way too low for practical use (the random baseline for 3 classes would be 33.3 %). Over 15 epochs, the train loss hovered around ~1.96, and the val loss around ~1.94 for every epoch, which is a very strong indication that the data labels are too noisy for the model to find any kind of reliable signal.

**Root Cause Analyses:**
- There were no definitions or examples in the V1 prompt, so Gemini used inconsistent criteria to choose among the three moves
- Without sub-move structure, all the nuance in each move was squashed down to a single label
- The distribution of the labels obtained was skewed and unreliable

This bad result made the redesign in phase 2 necessary.

--- 

## Phase 2: Polish

**Goal:** Re-architect prompt using sub-moves to improve annotation quality Before spending GPU time on a second BERT run, measure if the new prompt produced better data using lightweight TF-IDF classifiers (not BERT).

### [1.  [Gemini V2 Annotation](v2/1.generate_moves_predictions.ipynb)

Thesis: Chapter 4, Section 4.1.2.

The key insight for V2 was that the V1 prompt was too generic. A human expert doing sentence classification would not only know the three move names, but would know exactly what each sub-move looks like, with examples. The V2 prompt provided Gemini with that context:

- All 11 sub-moves were listed, with descriptions and concrete example sentences.
- The output format has changed from free text to a structured JSON schema, with `sentence`, `move` and `sub_move` fields for every sentence in the introduction.
- The whole intro was passed in one go (not sentence by sentence) so Gemini could use surrounding context to classify each sentence

The full corpus was reprocessed. ~37,000 introductions were sent to the Gemini API, each resulting in a JSON array of classified sentences. Results were saved in chunks of processed_{index}.json.

Major change vs V1: 11 sub-move definitions + examples + JSON output -> much cleaner labels
~37,000 JSON files, each with one introduction's sentences with move and sub-move labels used by [Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb)

--- 

### [2.  Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb) 

Thesis: Chapter 4, sub-section 4.2

This notebook aggregates all the JSON chunks from [Gemini V2 Annotation](v2/1.generate_moves_predictions.ipynb) and uses TF-IDF classifiers to check if the improved prompt actually resulted in better quality labeled data.

The reason for using TF-IDF instead of BERT here: training a BERT model takes hours. TF-IDF classifiers can be trained in minutes and serve as a fast quality gate. If a fast classifier can get 55-60% accuracy on 11-class sub-move classification, that is evidence the labels are meaningful.

**Data cleaning:** In all runs, Gemini generated approximately 30 different variants of the labels (e.g., `"0.1"`, `"0_1"`, `"move_0.1"`, `"sub-move 0.1"`, etc.). Mapping functions were written to convert all variants to the canonical format of `0.0`, `0.1`, ..., `2.4`. After cleaning: 

**Dataset: 148,220 sentences, 11 valid sub-move tags**

Classifier | Accuracy |
|---|---| 
Random Forest | **60.7%** |
| Logistic Regression | 60.0% |
Neural Network (Keras) | 57.5% |
| Naive Bayes | 55.6 |
| K-Nearest Neighbors | 54.0% |
Decision Tree | 51.6 % |

60% is a strong signal that the labels are meaningful as compared to a random baseline of ~9% for 11 classes. The improvement over V1 (where BERT itself only reached 44 % on 3 classes) confirms that the enhanced sub-move prompt produced significantly better annotations.

However 60 % is also clearly a ceiling for TF-IDF on this task. TF-IDF does not consider sentence structure, each word is an independent feature. It is not able to capture the rhetorical nuance of the sub-move classification. Next was to use BERT, but the data had to be cleaned up further.

Saves full dataset as `aggregated_data.csv`, used by [Outlier Detection](v3/1.outlier-detection.ipynb).

--- 

## Phase 3: Final Models 

**Objective:** Remove non-introduction sentences from V2, balance the dataset by generating synthetic sentences for each sub-move, and fine-tune four BERT models for final deployment.

### [1.  [Outlier Detection](v3/1.outlier-detection.ipynb)

Chapter 5 Section 5.2.1 Thesis:

The V2 dataset contains 148,220 annotated sentences from complete introduction texts, but the texts were not always clean. Some papers had method descriptions, conclusion sentences or section headers that found their way into what was labeled as “the introduction.” These sentences do not belong to any IMRaD introduction move and training on them would hurt model quality.

To find and remove them, Gemini Pro reprocessed every sentence in `aggregated_data.csv` (from [Classifier Benchmarking](v2/2.testing_generated_move_predictions.ipynb)) with the **full outlier detection prompt**: all 11 sub-moves, definitions, examples, and a `-1` class for anything that does not fit. Gemini also gave a confidence score and a short explanation for each label.

We removed from training the sentences that were labeled as outliers by label `-1`. The loop was designed to be resumable (an `is_processed` flag was saved per row) so that API failures mid-run didn't mean starting over.

**Outcomes**
- **20.6 % (30,599 outliers in 148,220 sentences)**
- Sentences left to clean: 117,621 with updated sub-move labels

- **Output:** Updated `aggregated_data.csv` with `move_sub_move_gemini` column, used by [Final Dataset Assembly](v3/5.checker.ipynb)

--- 

### [2.  [Move 0 Generator](v3/2.move-0-generator.ipynb)

Thesis Chapter 5, Section 5.2.2

The distribution of the sub-moves in the V2 data was still not even after removing the outliers. Some sub-moves did not have enough training data for a reliable classifier. To mitigate this, new synthetic sentences for each move and sub-move were generated using Gemini Pro.

This notebook covers **Move 0: Setting up a Place to Do Research**. The generation prompt included both sub-moves and definitions, plus two concrete example sentences each, and then asked Gemini to generate 3 new sentences per sub-move per API call (temperature 0.9 for vocabulary variety). Results were de-duplicated and chunked.

The key breakthrough compared to earlier generation attempts was to include **concrete examples** in the prompt. In the absence of examples, Gemini often wrote generic, repetitive sentences. The output was more varied and linguistically natural, with examples.

- **Sub-moves:** `0.0` Indicate importance/relevance · `0.1` Review prior research
- **API calls:** 10 thousand iterations
~46k unique synthetic sentences in `generated_move0/` used by [Final Dataset Assembly](v3/5.checker.ipynb)

--- 

### [3.  [Move 1 Generator](v3/3.move-1-generator.ipynb)

Chap. 5, 5.2.2, Thesis

Same generation pipeline for **Move 1: Establishing a Niche**. This move has four sub-moves, and has been the hardest to classify correctly (the differences between “claim a flaw”, “highlight a gap”, “raise an unclear question” and “extend prior research” are subtle).

- **Sub-moves:** `1.0` Claim flaw · `1.1` Gap · `1.2` Unclear question · `1.3` Extend 
- **Output:** ~54k unique synthetic sentences in `generated_move1/`, utilized by [Final Dataset Assembly](v3/5.checker.ipynb)

--- 

### [4.  [Move 2 Generator](v3/4.move-2-generator.ipynb)

Thesis: Section: 5.2.2 Chapter: 5

Same generation pipeline for **Move 2: Fill the Niche**. The least common of these moves (`2.4` outline structure, `2.2` share findings) are rarely seen in real introductions, so synthetic generation was especially important here.

2.0 Purpose · 2.1 Hypothesis · 2.2 Findings · 2.3 Value · 2.4 Structure
~48,000 unique synthetic sentences in `generated_move2/`, used by [Final Dataset Assembly](v3/5.checker.ipynb)

--- 

### [5.  Final Dataset Compilation](v3/5.checker.ipynb)

**Thesis** Chapter 5 5.2.3 5.3

This notebook aggregates all sources of data and performs a set of quality checks before BERT fine tuning is initiated.

Inputs:
generated_move0/ from Move 0 Generator (v3/2.move-0-generator.ipynb)
- `generated_move1/` from [Move 1 Generator](v3/3.move-1-generator.ipynb) 
- `generated_move2/` from Move 2 Generator [v3/4.move-2-generator.ipynb](v3/4.move-2-generator.ipynb)
- `aggregated_data.csv` from [Outlier Detection](v3/1.outlier-detection.ipynb) (V2 re-labeled, -1 rows kept in the file but not used during training)

**Final dataset composition (Table 5.1-5.4 in thesis):**

| Move | Sentences | Sub-move decomposition |
|---|---|---| 
| Move 0 | 56,468 | `0.0`: 27,799 · `0.1`: 28,669 | 
Move 1 | 55,604 | `1.0`: 14,577 · `1.1`: 14,295 · `1.2`: 13,080 · `1.3`: 13,652 |
| Move 2 | 57,657 | `2.0`: 27,217 · `2.1`: 18,724 · `2.2`: 5,026 · `2.3`: 5,635 · `2.4`: 1,955
| Outliers (-1) | 30,599 | Removed in the pre-processing step |
| **Training corpus** | **169,729** | Outlier removal |

**Quality Control**
- Label cleaning: Normalized ~30 malformed variants of labels from Gemini output
- PCA scatter plots per move group to check whether the sub-move clusters are visually separable (Logistic Regression + PCA)
- LaTeX artifact audit: 1,505 equation tokens, 22,031 citations, 2,918 other non-language tokens identified
- Sanity check of the final label quality using a feature-engineered LR (TF-IDF + citation count, equation count, non-language count)

**Output:** `processed_data_with_outliers.csv` used as input for the four BERT training notebooks: [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>), [Move 0 Sub-move Classifier](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb), [Move 1 Sub-move Classifier](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb), [Move 2 Sub-move Classifier](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb)

--- 

### [6.  [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>)

Thesis: Chapter 5: Section 5.3

Fine-tunes BERT on the whole 169,729-sentence corpus (from [Final Dataset Assembly](v3/5.checker.ipynb)) to classify any sentence into one of three top-level moves. This is **Model 1** , the first model that the SaaS platform calls whenever a user submits an introduction.

The input sentence is tokenized by `bert_en_uncased_l-12_h-768_a-12`, `[CLS]` pooled output is fed into a Dropout(0.3) layer, and a Dense(3, softmax) head produces the final probabilities. We unfreeze all BERT parameters during fine-tuning.

| | | 
|---|---| 
| Classes | Move 0 | Move 1 | Move 2 |
| Outliers | 169,729 sentences (excluding outliers) |
| Split | 135,783 train / 16,973 val / 16,973 test (80/10/10)
| Optimizer | AdamW with learning rate 3e-5 and batch size 32 |
Epochs | 3 (2 initial + 1 from checkpoint) |
| **Accuracy** | 98.21% |
| **Precision** | 98.35% |
| **F1** | **98.21%** |

The reason why it jumped from 44.61 % (V1) to 98.21 % is due to a combination of three things: a much larger and cleaner dataset, BERT's ability to understand sentence meaning instead of just word frequencies and getting rid of the outlier sentences that would have confused the model.

This model is deployed as a single microservice on the SaaS platform using TensorFlow Serving.

--- 

### [7.  [Move 0 Sub-move Classifier](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb)

Thesis: Chapter Five, Section Five-Point-Three

Fine-tunes BERT on the **Move 0 subset** of the corpus for **binary sub-move classification** (`0.0` vs `0.1`).  This is **Model 2** which is only used when the Overall Move Classifier predicts Move 0.

We made a specific choice to use a separate specialist model for each move instead of a single model predicting all 11 sub-moves. The reason is that each model only needs to separate 2-5 closely related categories, which is a simpler task that trains faster and scores higher.

| | | 
|---|---| 
| Classes | Importance `0.0` Review `0.1` Previous work
| Training data | Move 0 subset (total 56,468 sentences, 80% for training) |
| Optimizer | AdamW, learning rate 3e-5, batch size 32 |
| **F1** | 0.8959 |

Called when [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) outputs Move 0.

--- 

### [8.  [Sub-move Classifier for Move 1](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb)

Thesis: Section 5.3, Chapter 5

Fine-tune BERT on ** Move 1 subset ** for ** 4-class sub-move classification ** . This is, **Model 3**. The sub-moves of Move 1 are the most similar – the difference between “there is a flaw in prior work” (1.0), “there is a gap” (1.1), “a question is unclear” (1.2), and “more research would be useful” (1.3) is small and requires the model to have a good understanding of context.

| | | 
|---|---| 
| Classes | `1.0` Claim flaw · `1.1` Gap · `1.2` Unclear question · `1.3` Extend | 
| Training data | Move 1 subset (Total: 55,604 sentences – 80% used for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 | 
| **F1** | **0.9455** | 

Called when Move 1 is predicted by [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>).

--- 

### [9.  Move 2 Sub-move Classifier](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb) 

Thesis: Sec. 5.3 of Chap. 5

Fine-tune BERT on **Move 2 subset** for **5-class sub-move classification**. This is **Model 4** Move 2 had the highest sub-move F1 score of the three specialist models, likely because many of the Move 2 sub-moves have distinctive vocabulary (e.g., “the purpose of this paper” for 2.0, “we hypothesize” for 2.1, “this paper is organized as follows” for 2.4).

| | | 
|---|---| 
| Classes | `2.0` Purpose · `2.1` Hypothesis · `2.2` Findings · `2.3` Value · `2.4` Structure | 
| Move 2 training data | 57,657 sentences (80 % for training) |
| Optimizer | AdamW, LR 3e-5, batch size 32 | 
| **F1** | **.9591** |

Called when [Overall Move Classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) predicts Move 2.

--- 

## Summary of the performance of the final model

| Model | Task | Classes | F1 / Accuracy | Thesis ref | 
|---|---|---|---|---| 
| [Model 1: Overall](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) | Move classification | 3 | **0.9821** | Table 5.5 | 
| [Model 2: Move 0](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb) | Move 0 sub-moves | 2 | **0.8959** | Table 5.6 | 
| [Model 3: Move 1](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb) | Move 1 sub-moves | 4 | **0.9455** | Table 5.6 | 
| [Model 4: Move 2](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb) | Move 2 sub-moves | 5 | **0.9591** | Table 5.6 | 

First, a sentence is passed through Model 1 to identify its move. Then, the matching specialist model is used for sub-move classification. There is one model per move (not one model for all 11 sub-moves), so each task is kept simple and focused. This is why even the hardest case (Move 1, 4 classes) reaches 94.55 % F1.

--- 

### Running the Model

All four models were trained and exported in the **SavedModel** format and published on Hugging Face:

| Model | Hugging Face | 
|---|---| 
Model 1: Overall move classifier | [stormsidali2001/IMRAD_introduction_moves_classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier) |
| Move 0 sub-move classifier | Model 2 | [stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier) |
| Model 3: Move 1 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier]( https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier) |
| Model 4: Move 2 sub-move classifier | [stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier) | 

The platform is built as a collection of independent microservices. Two of the four models are plugged into this architecture:

**TensorFlow Serving** is a dedicated microservice that loads the four SavedModel files and serves them over HTTP. It is designed to serve TensorFlow models efficiently, with batching and hardware acceleration without custom serving code.

**AI Analysis microservice (FastAPI + Python)** is the component between the rest of the platform and TensorFlow Serving. The service accepts an introduction text (either typed in by the user or extracted from a PDF by a separate PDF Extractor microservice), splits it into sentences, and performs the two-stage classification: first calling Model 1 (overall move) for each sentence, then calling the right specialist model (2, 3, or 4) depending on the result. This microservice also manages the premium features - introduction summarization and author thought-process generation - by calling the Gemini API (Gemini Pro / Gemini Flash)

The full platform is divided into three repositories:

[graduation_IMRAD_introduction_analysis_SaaS](https://github.com/stormsidali2001/graduation_IMRAD_introduction_analysis_SaaS) - the repo. Includes the Next.js frontend, Next.js API (auth, subscriptions, Stripe), Nginx configuration, and Prisma/PostgreSQL schema.

**[imrad_intros_moves_submoves_python_microservices](https://github.com/stormsidali2001/imrad_intros_moves_submoves_python_microservices)** - two Python services and TensorFlow Serving Docker Compose setup.
- AI Analysis microservice (FastAPI) - runs the classification pipeline and premium features 
- PDF Extractor microservice (FastAPI) - extracts introduction text from uploaded PDFs
- `tensorflow-models/` - Docker Compose file to run TensorFlow Serving with the four SavedModel files mounted

[imrad_introduction_moves_sub_moves_express_user_data](https://github.com/stormsidali2001/imrad_introduction_moves_sub_moves_express_user_data) - A service using Express.js, TypeScript, and MongoDB to store introduction predictions, summaries, and user feedback. Also includes the docker-compose files for Redis and MongoDB.

| Microservice | Repo | Tech | Role | 
|---|---|---|---| 
| API Gateway | graduation_IMRAD_introduction_analysis_SaaS | Nginx | Entry point, route requests, SSL, rate limiting |
| Service Discovery | (Spring Cloud Eureka server) | Spring Boot | Allows microservices to discover each other at runtime |
| Frontend + Auth | graduation_IMRAD_introduction_analysis_SaaS | Next.js + PostgreSQL | UI, authentication, subscription management (Stripe) | 
| PDF Extractor | imrad_intros_moves_submoves_python_microservices | FastAPI (Python) | Extracts introduction text from PDFs that are uploaded |
| Model Serving | imrad_intros_moves_submoves_python_microservices | TensorFlow Serving | Serve the 4 BERT models over HTTP (port 8501) |
| AI Analysis | imrad_intros_moves_submoves_python_microservices | FastAPI (Python) | Executes classification pipeline, invokes Gemini for premium features |
| User Data | imrad_introduction_moves_sub_moves_express_user_data | Express.js + MongoDB | Store predictions, summaries, and user feedback |
| Message Broker | imrad_introduction_moves_sub_moves_express_user_data | Redis | Asynchronous communication between AI Analysis and User Data |
