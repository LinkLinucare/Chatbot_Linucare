Linucare Chatbot

📌 Overview

Basically, on the side, I am part of the startup Linucare. Our app is primarily used by elderly people, so we aim to make the setup process as easy as possible.

To support this, I have developed a chatbot that provides instant answers to common questions about Linucare's safety button, services, and setup. The chatbot is integrated with Firebase Firestore, ensuring responses are always up-to-date and relevant. It is also designed for future implementation in our app and website, both built on Firebase/Google Cloud.

🚀 Features

- Real-time Assistance: Provides information about Linucare products directly from the knowledge base.

- Easy-to-Use Interface: Built using Streamlit for a simple, chat-like experience.

- Secure & Efficient: Uses Ollama for local AI model inference, ensuring fast and private responses.

- Firebase Integration: Syncs product and setup information dynamically.


![2](https://github.com/user-attachments/assets/0a9ef198-3aa5-47ce-9db6-7eb5ba199a29)


🔧 Installation & Running the Chatbot

1️⃣ Prerequisites

Install Python 3.9+

Install Ollama (for running the AI model locally):

- curl -fsSL https://ollama.ai/install.sh | sh

Install the required Python dependencies:

- pip install -r requirements.txt

Run Ollama (ensure the model is available):

- ollama serve

Start the chatbot locally:

- streamlit run app.py

🌍 Future Integration

We plan to integrate the chatbot into both the Linucare website and mobile app for real-time support.

✅ On the Website:

A floating chat widget for troubleshooting and setup guidance and Syncs with Firebase Firestore for the latest FAQs.

✅ In the Mobile App:

A built-in support assistant for step-by-step setup help and Directs users to customer support if needed.

🛠️ Next Steps

Test with real users for refinement.

Deploy on the Linucare website.

Build an API for mobile app integration.


