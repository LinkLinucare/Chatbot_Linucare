Linucare Chatbot

📌 Overview

Linucare's chatbot is designed to assist users by providing instant answers to common questions about Linucare's safety button products and services. The chatbot is integrated with Firebase Firestore to ensure that responses are always up-to-date and relevant.

Currently, the chatbot is a web-based solution running locally, but our long-term goal is to integrate it into the Linucare website and mobile app to assist users, particularly elderly individuals, in setting up and using the Linucare app effectively.

🚀 Features

Real-time Assistance: Provides information about Linucare products directly from the knowledge base.

Easy-to-Use Interface: Built using Streamlit for a simple, chat-like experience.

Secure & Efficient: Uses Ollama for local AI model inference, ensuring fast and private responses.

Firebase Integration: Syncs product and setup information dynamically.

🔧 Installation & Running the Chatbot

1️⃣ Prerequisites

Install Python 3.9+

Install Ollama (for running the AI model locally):

curl -fsSL https://ollama.ai/install.sh | sh

Install the required Python dependencies:

pip install -r requirements.txt

Run Ollama (ensure the model is available):

ollama serve

Start the chatbot locally:

streamlit run app.py

🌍 Future Integration into the Linucare Platform

Our long-term plan is to integrate this chatbot into both the Linucare website and mobile app, making real-time assistance available 24/7. Given that many of our users are elderly, accessibility and ease of use are top priorities.

✅ How it will work on the Linucare website

The chatbot will be embedded as a floating chat widget on the website.

Users will be able to ask questions about setting up their safety button, connecting it to their phone, and troubleshooting issues.

Information will be fetched directly from Firebase Firestore, ensuring that the latest setup guides and FAQs are always available.

✅ How it will work in the Linucare mobile app

The chatbot will be integrated as a support assistant inside the Linucare app.

Users can receive step-by-step guidance on pairing the safety button with their device.

If further help is needed, the chatbot will direct users to Linucare's customer support.

🤝 Why This Matters for Our Users

Linucare's mission is to enhance safety and accessibility for elderly individuals. Many of our users rely on our products to stay safe in their daily lives. However, some may struggle with setting up the app or troubleshooting issues.

By integrating this chatbot, we ensure that:

Help is always available – Users don’t have to wait for customer support.

Guidance is clear and simple – Designed with elderly users in mind.

Information is always up to date – Managed through Firebase Firestore.

🛠️ Next Steps

Test the chatbot with real users to refine the experience.

Deploy it on the Linucare website.

Build an API for integration with the Linucare mobile app.

📩 Feedback & Contributions
If you have any feedback or want to contribute to this project, feel free to submit a pull request or reach out to the Linucare team!

🚀 Let's make Linucare even more accessible for everyone!
