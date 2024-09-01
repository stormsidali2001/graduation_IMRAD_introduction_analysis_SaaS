
# IMRaD Introduction Analysis Platform (Next.js Microservice)

This repository contains the Next.js-based frontend and API for a Micro SaaS platform designed to analyze the introductions of scientific research papers based on the IMRaD (Introduction, Methods, Results, and Discussion) structure.

## Project Overview

The platform uses state-of-the-art AI models to automatically classify sentences in introductions into their corresponding IMRaD moves and sub-moves. It provides:

* **Automated Analysis:**  Accurately identify and categorize sentences within research paper introductions.
* **Visual Feedback:** Highlight sentences and label them with their predicted moves and sub-moves.
* **Premium Features:**  Offer advanced features like summarization and author thought process analysis for paid subscribers. 
* **User-Friendly Interface:**  Provide an easy-to-use web interface for researchers, students, and educators to analyze introductions and improve their scientific writing. 

## Microservice Architecture

The platform is built using a microservice architecture for scalability and maintainability. This repository is the main microservice, responsible for the frontend user interface, user authentication, API endpoints, and orchestration of other microservices.

**Other Microservices:**

* **User Data Microservice:**  [https://github.com/stormsidali2001/imrad_introduction_moves_sub_moves_express_user_data](https://github.com/stormsidali2001/imrad_introduction_moves_sub_moves_express_user_data)
    * Built with Express.js and TypeScript.
    * Stores user data, analyzed introductions, predictions, summaries, and user feedback. 
    * Manages the feedback system. 

* **AI Models and PDF Extractor Microservices:**  [https://github.com/stormsidali2001/imrad_intros_moves_submoves_python_microservices](https://github.com/stormsidali2001/imrad_intros_moves_submoves_python_microservices)
    * **AI Models Microservice:**
        * Built with FastAPI (Python).
        * Handles interaction with the AI models, predictions, summarization, and thought process generation.
    * **PDF Extractor Microservice:**
        * Built with FastAPI (Python).
        * Extracts introductions from PDF research papers. 

**Additional Components:**

* **TensorFlow Serving:** Deployed using Docker, serves the AI models for prediction. (Docker Compose configuration is in the AI Models Microservice repository).
* **Redis:**  Used as a message broker for asynchronous communication between microservices.

## Datasets

The AI models in this platform are trained on a unique dataset of over 169,000 sentences. This dataset was generated using Google's Gemini Pro model and a custom-designed pipeline applied to a set of randomly selected introductions from the **unarXive IMRaD Classification Dataset (Hugging Face):** [https://huggingface.co/datasets/saier/unarXive_imrad_clf](https://huggingface.co/datasets/saier/unarXive_imrad_clf).

The pipeline involved the following steps:

1. **Introduction Selection:**  A set of introductions were randomly selected from the unarXive dataset. 
2. **Sentence Splitting with Gemini Pro:**  Gemini Pro was used to split each selected introduction into individual sentences. 
3. **Initial Move and Sub-move Prediction (Gemini Pro):** Gemini Pro was used to generate initial predictions for the IMRaD move and sub-move of each sentence. 
4. **Outlier Detection:** A custom outlier detection pipeline analyzed the initial predictions, identifying and removing sentences with likely incorrect classifications. 
5. **Data Augmentation with Gemini Pro:** For each IMRaD move label, additional sentences were generated using Gemini Pro, based on the correctly classified sentences remaining after outlier detection.

This process resulted in a final dataset of over 169,000 sentences, meticulously labeled for their respective IMRaD moves and sub-moves.

**Dataset Generation Notebooks:**

The notebooks used to create this dataset can be found in the `/notebooks` directory of this repository. 

**Trained Models:**

The trained TensorFlow models are published on Hugging Face:

* **IMRaD Introduction Move Classifier:**  [https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier) 
* **IMRaD Introduction Move 0 Sub-move Classifier:** [https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier)
* **IMRaD Introduction Move 1 Sub-move Classifier:** [https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier)
* **IMRaD Introduction Move 2 Sub-move Classifier:**  [https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier) 

## Repository Structure

* `/api`: Contains the Next.js API server code.
* `/frontend`: Contains the Next.js frontend code.
* `/nginx`:  Includes the Docker Compose configuration and Nginx configuration files for the API Gateway. 
* `/notebooks`: Contains the Jupyter notebooks used for data analysis, model training, and experimentation. 
* `/images`: Contains screenshots of the application interface.

**App Screens:**

* [Admin Dashboard](./app_screens/admin_dashboard_page.png)
* [Admin Subscriptions](./app_screens/admin_subscriptions_page.png)
* [Admin Users](./app_screens/admin_users_page.png)
* [Introduction Details (Normal User)](./app_screens/app_screens_introduction_details_normal_user.png)
* [Introduction Details (Premium User)](./app_screens/app_screens_introduction_details_premium_user.png)
* [Billing Portal 1](./app_screens/billing_portal_1.png)
* [Billing Portal 2](./app_screens/billing_portal_2.png)
* [Dashboard Error Page](./app_screens/dashboard_error_page.png)
* [General Error Page](./app_screens/error_page.png)
* [Feedbacks](./app_screens/feedbacks_state_1.png)
* [Forgot Password Form](./app_screens/forgot_password_state_1.png)
* [Forgot Password Success](./app_screens/forgot_password_state_2.png)
* [Generate (Initial State)](./app_screens/generate_state_1.png)
* [Generate (Introduction Input)](./app_screens/generate_state_2.png)
* [Generate (Sentence List)](./app_screens/generate_state_3.png)
* [Generate (Loading)](./app_screens/generate_state_4_loading.png)
* [Generate (Analysis Results)](./app_screens/generate_state_5.png)
* [Introductions List](./app_screens/introductions_page.png)
* [Loading Page](./app_screens/loading_page.png)
* [Login](./app_screens/login.png)
* [Reset Password Form](./app_screens/reset_password_callback_page_state_1.png)
* [Reset Password Success](./app_screens/reset_password_callback_page_state_2.png)
* [Settings Part 1](./app_screens/settings_1.png)
* [Settings Part 2](./app_screens/settings_2.png)
* [Registration Form](./app_screens/sign_up_state_1.png)
* [Registration Form (State 2)](./app_screens/sign_up_state_2.png)
* [Submit Feedback (Dislike)](./app_screens/submit_feedback_dislike.png)
* [Submit Feedback (Like)](./app_screens/submit_feedback_like.png)
* [Plans Page](./app_screens/upgrade_plan_screens_1.png)
* [Stripe Checkout](./app_screens/upgrade_plan_screens_2_stripe_checkout.png)
* [Premium User](./app_screens/upgrade_plan_screens_3_premium_user.png)
* [Verify Email (Pending)](./app_screens/verify_email_page_1.png)
* [Verify Email (Success)](./app_screens/verify_email_page_2.png)

## Getting Started

[Provide instructions on how to set up and run the project locally. Include prerequisites, installation steps, and how to start the different microservices.] 

## Contributing

Contributions are welcome! 

## License 

[Specify your project's license]


**Key Features:**

* **Appealing:** The README uses clear headings, concise descriptions, and links for easy navigation.
* **Complete:**  Includes references to all datasets, trained models, microservice repositories, and important directories. 
* **Informative:** Provides an overview of the project, architecture, and key components.
* **Actionable:**  Includes a "Getting Started" section to guide users on how to run the project. 

Remember to customize the placeholders (like "[Provide instructions...]") with your specific information.  
