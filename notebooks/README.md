IMRaD Introduction Analysis — Notebooks

Research notebooks for the thesis "Automated IMRaD Classification with BERT and Gemini Pro: A Novel Dataset and SaaS Platform" — Sid Ali Assoul, École Supérieure en Informatique 2022-2023.

---

## Move reference

| Move | Name | Sub-moves |
|------|------|-----------|
| 0 | Establishing a Research Domain | `0.0` significance · `0.1` prior research |
| 1 | Establishing a Niche | `1.0` claim flaw · `1.1` gap · `1.2` unclear question · `1.3` extend |
| 2 | Filling the Niche | `2.0` aim · `2.1` hypothesis · `2.2` findings · `2.3` value · `2.4` structure |
| -1 | Outlier | anything that isn't a genuine introduction sentence |

---

## v1 — Baseline

| # | Notebook | What it does |
|---|---|---|
| 1 | [gemini_moves_generation](v1/1.gemini_moves_generation.ipynb) | Annotates unarXive sentences with a simple 3-class Gemini prompt |
| 2 | [bert_classification](v1/2.bert_classification_imrad_moves_latest_v8_new_dataset.ipynb) | Trains BERT on V1 data → 44.61% accuracy (labels too noisy) |

## v2 — Refinement

| # | Notebook | What it does |
|---|---|---|
| 1 | [generate_moves_predictions](v2/1.generate_moves_predictions.ipynb) | Re-annotates with an 11-sub-move JSON prompt → 148,220 sentences |
| 2 | [testing_generated_move_predictions](v2/2.testing_generated_move_predictions.ipynb) | Benchmarks TF-IDF classifiers as a data quality check → RF 60.7% |

## v3 — Final models

| # | Notebook | What it does |
|---|---|---|
| 1 | [outlier-detection](v3/1.outlier-detection.ipynb) | Removes non-introduction sentences → 30,599 rows dropped |
| 2 | [move-0-generator](v3/2.move-0-generator.ipynb) | Generates ~46k synthetic Move 0 sentences |
| 3 | [move-1-generator](v3/3.move-1-generator.ipynb) | Generates ~54k synthetic Move 1 sentences |
| 4 | [move-2-generator](v3/4.move-2-generator.ipynb) | Generates ~48k synthetic Move 2 sentences |
| 5 | [checker](v3/5.checker.ipynb) | Merges all sources, runs QC → 169,729 training sentences |
| 6 | [overall move classifier](<v3/6.pfe_training_moves_bert_model_06_26 (1).ipynb>) | BERT 3-class move classifier → F1 0.9821 |
| 7 | [sub-move classifier Move 0](v3/7.pfe_training_sub_moves_0_bert_model_07_1.ipynb) | BERT 2-class → F1 0.8959 |
| 8 | [sub-move classifier Move 1](v3/8.pfe_training_sub_moves_1_bert_model_07_1.ipynb) | BERT 4-class → F1 0.9455 |
| 9 | [sub-move classifier Move 2](v3/9.pfe_training_sub_moves_2_bert_model_07_1.ipynb) | BERT 5-class → F1 0.9591 |

---

## Models on Hugging Face

| Model | Link |
|-------|------|
| Overall move classifier | [IMRAD_introduction_moves_classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier) |
| Move 0 sub-move classifier | [IMRAD-introduction-move-zero-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier) |
| Move 1 sub-move classifier | [IMRAD-introduction-move-one-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier) |
| Move 2 sub-move classifier | [IMRAD-introduction-move-two-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier) |
