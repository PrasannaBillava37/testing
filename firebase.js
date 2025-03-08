// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSUrdarpAqrf686M0MzZWS1ZesQ_pkmZE",
  authDomain: "testing-ce976.firebaseapp.com",
  projectId: "testing-ce976",
  storageBucket: "testing-ce976.appspot.com", // ✅ Corrected storage bucket
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
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();

    try {
        // Add data to Firestore
        await addDoc(collection(db, "FormSubmissions"), {
            name,
            email,
            phone,
            message,
            timestamp: serverTimestamp()
        });

        alert("Form submitted successfully!");
        document.getElementById("contactForm").reset(); // Clear form
    } catch (error) {
        console.error("Error submitting form: ", error);
        alert("Failed to submit form");
    }

    // ✅ Send Data to Google Sheets
    const googleSheetURL = "https://script.google.com/macros/s/AKfycbxrlURPRPPC35VKHQBkbnvpCse2luy60iaa-Uar06wlJVvRoxxmGhSbr-GWuxD5BBdT/exec";

    try {
        await fetch(googleSheetURL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, message }),
        });

        console.log("Data sent to Google Sheets!");
    } catch (error) {
        console.error("Error sending data to Google Sheets:", error);
    }
});
