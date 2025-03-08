// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSUrdarpAqrf686M0MzZWS1ZesQ_pkmZE",
  authDomain: "testing-ce976.firebaseapp.com",
  projectId: "testing-ce976",
  storageBucket: "testing-ce976.firebasestorage.app",
  messagingSenderId: "830414676180",
  appId: "1:830414676180:web:1c974c3850520949eddb41",
  measurementId: "G-48W9C5M743"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Form Submission
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    try {
        // Add data to Firestore
        await addDoc(collection(db, "FormSubmissions"), {
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: serverTimestamp()
        });

        alert("Form submitted successfully!");
        document.getElementById("contactForm").reset(); // Clear form
    } catch (error) {
        console.error("Error submitting form: ", error);
        alert("Failed to submit form");
    }
  const googleSheetURL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

fetch(googleSheetURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message }),
});
