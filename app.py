import streamlit as st
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import firebase_admin
from firebase_admin import credentials, firestore

# Streamlit config (first command)
st.set_page_config(page_title="Linucare Chatbot", page_icon="🤖")

# Initialize Firebase (cached)
@st.cache_resource
def init_firestore():
    if not firebase_admin._apps:
        cred = credentials.Certificate('serviceAccountKey.json')
        firebase_admin.initialize_app(cred)
    return firestore.client()

db = init_firestore()

# Ollama model initialization (cached)
@st.cache_resource
def load_llm():
    return Ollama(base_url="http://localhost:11434", model="llama3")

llm = load_llm()

# Fetch and cache knowledge base data
@st.cache_data(ttl=1800)
def fetch_knowledge_base():
    docs = db.collection("knowledge_base").stream()
    return "\n".join([
        f"Produkt: {doc.get('description', 'Ingen beskrivelse')} Pris: {doc.get('price', 'Ukendt pris')}. Lagerstatus: {doc.get('stock', 'Ukendt lagerstatus')}. Mere info: {doc.get('url', 'Ingen URL')}"
        for doc in (d.to_dict() for d in docs)
    ])

knowledge_base = fetch_knowledge_base()

# Define prompt template once
prompt_template = """
Du er en AI-assistent for Linucare, en virksomhed der tilbyder tryghedsknapper og produkter.
Besvar kun spørgsmål relateret til Linucare-produkter eller generelle hilsener. Afvis høfligt andre emner.

Linucare produkter:
{knowledge_base}

Spørgsmål: {question}
Svar:
"""

prompt = PromptTemplate(
    input_variables=["knowledge_base", "question"],
    template=prompt_template
)

chain = LLMChain(llm=llm, prompt=prompt)

# Streamlit UI
st.title("🤖 Linucare AI Chatbot")

if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat history
for message in st.session_state.messages:
    role = "user" if "user" in message else "assistant"
    st.chat_message(role).write(message[role := "user" if "user" in message else "bot"])

# Input area
user_input = st.chat_input("Skriv dit spørgsmål her...")

if user_input:
    st.session_state.messages.append({"user": user_input})

    with st.spinner("Linucare tænker..."):
        response = chain.run({"knowledge_base": knowledge_base, "question": user_input}).strip()

    st.session_state.messages.append({"bot": response})

    st.rerun()
