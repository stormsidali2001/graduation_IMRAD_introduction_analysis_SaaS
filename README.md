# IMRaD Introduction Analysis Micro SaaS Platform 

This repository contains the complete Next.js application (both frontend and API) for a Micro SaaS platform designed to help researchers and students analyze and improve the introductions of their scientific research papers. The platform leverages cutting-edge AI models to automatically identify and classify sentences according to their IMRaD (Introduction, Methods, Results, and Discussion) moves and sub-moves.

## Understanding IMRaD

The IMRaD structure is a widely accepted standard for organizing scientific papers, ensuring clarity and a logical flow of information. The introduction section, in particular, is crucial for:

* **Establishing a Research Territory:** Setting the context and background of the research.
* **Establishing a Niche:** Identifying a gap or problem in existing research.
* **Occupying the Niche:**  Outlining the study's purpose and proposed solution. 

## Platform Features

* **Automated IMRaD Analysis:**  Our AI models automatically analyze introductions, identifying the IMRaD moves and sub-moves present in each sentence. 
* **Visualized Results:** The platform provides an intuitive visual representation of the analysis results. Each sentence is highlighted and labeled according to its IMRaD classification. 
* **Detailed Feedback:** Users can provide feedback on the AI's predictions, helping to improve the accuracy of the models over time. 
* **Premium Features:** Paid subscribers gain access to advanced features, including:
    * **Summarization:**  Generate concise summaries of analyzed introductions.
    * **Thought Process:** Explore a hypothetical representation of the author's thought process behind the introduction.
* **User-Friendly Interface:** The platform's web interface is designed for ease of use and accessibility, catering to researchers, students, and educators.

## Microservice Architecture

We've implemented a microservice architecture to ensure scalability, flexibility, and maintainability.  While this repository contains the complete Next.js application (both frontend and API), the platform interacts with several other microservices:

**Other Microservice Repositories:**

* **User Data Microservice:**  [https://github.com/stormsidali2001/imrad_introduction_moves_sub_moves_express_user_data](https://github.com/stormsidali2001/imrad_introduction_moves_sub_moves_express_user_data)
    * Built with Express.js and TypeScript.
    * Stores user data, analyzed introductions, predictions, summaries, and user feedback. 
    * Manages the feedback system. 

* **AI Models and PDF Extractor Microservices:**  [https://github.com/stormsidali2001/imrad_intros_moves_submoves_python_microservices](https://github.com/stormsidali2001/imrad_intros_moves_submoves_python_microservices)
    * This repository contains two separate microservices:
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

The heart of this platform is a meticulously crafted dataset used to train the AI models. It consists of over 169,000 sentences, generated through a custom pipeline that utilizes Google's Gemini Pro model and the **unarXive IMRaD Classification Dataset (Hugging Face):** [https://huggingface.co/datasets/saier/unarXive_imrad_clf](https://huggingface.co/datasets/saier/unarXive_imrad_clf).

The dataset creation process involved:

1. **Introduction Selection:** A random selection of introductions was taken from the unarXive dataset. 
2. **Sentence Splitting (Gemini Pro):** The introductions were split into sentences using Gemini Pro. 
3. **Initial IMRaD Predictions (Gemini Pro):**  Gemini Pro generated initial predictions for the IMRaD move and sub-move of each sentence.
4. **Outlier Detection:**  A custom pipeline identified and removed sentences with potentially incorrect classifications.
5. **Data Augmentation (Gemini Pro):** For each IMRaD move, Gemini Pro generated additional sentences, expanding the dataset to over 169,000 accurately labeled sentences.

You can explore the detailed process of dataset creation in the `/notebooks/v3` directory.

## Trained Models

The fine-tuned TensorFlow models for IMRaD classification are available on Hugging Face:

* **IMRaD Introduction Move Classifier:**  [https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier) 
* **IMRaD Introduction Move 0 Sub-move Classifier:** [https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-zero-sub-moves-classifier)
* **IMRaD Introduction Move 1 Sub-move Classifier:** [https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-one-sub-moves-classifier)
* **IMRaD Introduction Move 2 Sub-move Classifier:**  [https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier](https://huggingface.co/stormsidali2001/IMRAD-introduction-move-two-sub-moves-classifier) 

## Application Features and Functionality

The platform is designed to cater to the needs of researchers, students, and educators alike, providing them with valuable insights into the structure of scientific introductions. Here is a breakdown of the platform's core features:

###  Introduction Analysis

At its core, the platform is designed to accurately identify and classify IMRaD moves and sub-moves within scientific introductions. 

- **Upload Research Paper:** Users can conveniently upload research papers in PDF format for analysis. The system automatically extracts the introduction section.
- **Direct Text Input:** Users can also manually paste or type the introduction text if a PDF is unavailable. 
- **Sentence-Level Classification:** The platform's powerful AI models, based on the fine-tuned BERT architecture, analyze each sentence in the introduction. 
- **Visualization of Results:** The analysis results are visually presented with sentences highlighted and clearly labeled according to their predicted IMRaD moves and sub-moves. 

### Feedback System

To ensure ongoing improvement and adaptation to different writing styles and disciplines, the platform incorporates a comprehensive feedback mechanism. 

- **Sentence-Specific Feedback:** Users can provide feedback on each sentence, indicating whether they agree or disagree with the AI's classification. 
- **Corrections and Rationale:** Users can suggest corrections for misclassified sentences and provide a brief rationale to explain their feedback. 
- **Feedback Review (Administrators):** Administrators have a dedicated section to review all submitted feedback, providing valuable insights for model training and platform refinement.
- **Feedback Download (Administrators):**  Administrators can download all submitted feedback data, facilitating offline analysis.

### Subscription Model and Premium Features

To support further development and provide enhanced capabilities, the platform implements a subscription-based model, offering premium features to paid users.

- **Premium Plans:**  Users can choose from various subscription plans tailored to different needs and usage levels. 
- **Stripe Integration:** The platform leverages Stripe, a secure and robust payment gateway, to handle subscriptions, payments, and billing.
- **Premium Features:**  Premium users unlock access to additional powerful tools:
    * **Introduction Summarization:**  Generate automated, concise summaries that capture the key points of the analyzed introduction. 
    * **Author Thought Process:**  Explore a hypothetical representation of the author's thought process based on the detected IMRaD moves, providing unique insights into the underlying logic of the introduction. 

### Account Management

The platform provides standard functionalities for user account management, ensuring a secure and personalized experience. 

- **User Registration:**  New users can easily create an account by providing their name, email, and password.
- **Login:**  Registered users can securely log in to access their personalized data and features.
- **Profile Management:** Users can manage their profile settings, including updating their information and changing their password.
- **Email Verification:**  To maintain account security and data integrity, the platform requires email verification during registration. 
- **Password Reset:** A streamlined password reset process is provided for users who forget their password. 

### Administrative Functionalities

For efficient management and oversight, the platform offers dedicated features for administrators.

- **User Management:** Administrators have control over user accounts, allowing them to view user lists, edit user details, manage roles (normal user or administrator), and ban or unban users. 
- **Subscription Management:** Administrators can view detailed information about all subscriptions, including plan details and payment statuses. 
- **Feedback Review:**  Administrators have a dedicated interface to review and analyze all user feedback.  This feedback helps identify patterns, prioritize improvements, and assess model performance.
- **Platform Statistics:** Administrators can access comprehensive platform usage statistics, providing insights into user engagement, popular features, and overall performance. 

## Repository Structure

* `/api`: Contains the Next.js API server code.
* `/frontend`: Contains the Next.js frontend code.
* `/nginx`:  Includes the Docker Compose configuration and Nginx configuration files for the API Gateway. 
* `/notebooks`: Contains the Jupyter notebooks used for data analysis, model training, and experimentation. 
* `/images`: Contains screenshots of the application interface.


**App Screens:**

### Admin Section

![Admin Dashboard](./app_screens/admin_dashboard_page.png)
![Admin Subscriptions](./app_screens/admin_subscriptions_page.png)
![Admin Users](./app_screens/admin_users_page.png)
![Admin Download Feedback](./app_screens/download_all_plateform_feedbacks_admin.png) 

### User Section 

![Introduction Details (Normal User)](./app_screens/app_screens_introduction_details_normal_user.png)
![Introduction Details (Premium User)](./app_screens/app_screens_introduction_details_premium_user.png)
![Billing Portal 1](./app_screens/billing_portal_1.png)
![Billing Portal 2](./app_screens/billing_portal_2.png)
![Feedbacks](./app_screens/feedbacks_state_1.png)
![Submit Feedback (Like)](./app_screens/submit_feedback_like.png)
![Submit Feedback (Dislike)](./app_screens/submit_feedback_dislike.png) 
![Plans](./app_screens/upgrade_plan_screens_1.png)
![Stripe Checkout](./app_screens/upgrade_plan_screens_2_stripe_checkout.png)
![Premium User](./app_screens/upgrade_plan_screens_3_premium_user.png)

### Public Pages 

![Forgot Password Form](./app_screens/forgot_password_state_1.png)
![Forgot Password Success](./app_screens/forgot_password_state_2.png)
![Generate (Initial State)](./app_screens/generate_state_1.png)
![Generate (Introduction Input)](./app_screens/generate_state_2.png)
![Generate (Sentence List)](./app_screens/generate_state_3.png)
![Generate (Loading)](./app_screens/generate_state_4_loading.png)
![Generate (Analysis Results)](./app_screens/generate_state_5.png)
![Introductions List](./app_screens/introductions_page.png)
![Loading Page](./app_screens/loading_page.png)
![Login](./app_screens/login.png)
![Reset Password Form](./app_screens/reset_password_callback_page_state_1.png)
![Reset Password Success](./app_screens/reset_password_callback_page_state_2.png)
![Settings Part 1](./app_screens/settings_1.png)
![Settings Part 2](./app_screens/settings_2.png)
![Registration Form](./app_screens/sign_up_state_1.png)
![Registration Form (State 2)](./app_screens/sign_up_state_2.png)
![Verify Email (Pending)](./app_screens/verify_email_page_1.png)
![Verify Email (Success)](./app_screens/verify_email_page_2.png)
![Dashboard Error Page](./app_screens/dashboard_error_page.png)
![General Error Page](./app_screens/error_page.png)



## Getting Started

[Provide instructions on how to set up and run the project locally. Include prerequisites, installation steps, and how to start the different microservices.] 

## Contributing

Contributions are welcome! 

## License 

Mit
