import firebaseConfig from "./firebaseConfig.js"; // ✅ Must match default export
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function getAnswerFromFirestore(userQuestion) {
    const normalizedQuestion = userQuestion.toLowerCase().trim();
    console.log(`🔍 Fetching answer for: ${normalizedQuestion}`);

    try {
        const docRef = doc(db, "knowledge_base", normalizedQuestion);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(`✅ Found answer: ${docSnap.data().answer}`);
            return docSnap.data().answer;
        } else {
            console.warn("⚠️ No matching document found in Firestore.");
            return "I'm sorry, I don't have an answer for that. Please contact support.";
        }
    } catch (error) {
        console.error("❌ Firestore error:", error);
        return "There was an issue retrieving the response. Please try again later.";
    }
}

// Attach function globally so the button can call it
window.sendMessage = async function() {
    const input = document.getElementById("userInput").value;
    const response = await getAnswerFromFirestore(input);

    document.getElementById("chatbox").innerHTML += `<p><b>You:</b> ${input}</p>`;
    document.getElementById("chatbox").innerHTML += `<p><b>Bot:</b> ${response}</p>`;
    
    document.getElementById("userInput").value = "";
};

console.log("✅ Chatbot script loaded successfully");
