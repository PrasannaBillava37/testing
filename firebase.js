document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.1)";
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });

    // Import Firebase SDK
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDSUrdarpAqrf686M0MzZWS1ZesQ_pkmZE",
      authDomain: "testing-ce976.firebaseapp.com",
      projectId: "testing-ce976",
      storageBucket: "testing-ce976.appspot.com",
      messagingSenderId: "830414676180",
      appId: "1:830414676180:web:1c974c3850520949eddb41",
      measurementId: "G-48W9C5M743"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Google Apps Script Web App URL
    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbyZHl0s8xBojEJIiv5oWoyYvT8VSxFTqmfdR1TOA6OsCpwJz6uqSRkG1ou86PpPt225/exec"; 

    // Handle Form Submission
    document.getElementById("contactForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form values
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let message = document.getElementById("message").value.trim();

        const formData = { name, email, phone, message, timestamp: serverTimestamp() };

        try {
            // Add data to Firebase Firestore
            await addDoc(collection(db, "FormSubmissions"), formData);

            // Add data to Google Sheets
            fetch(googleSheetUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, message })
            })
            .then(response => response.text())
            .then(data => console.log("Google Sheet Response:", data))
            .catch(error => console.error("Error sending data to Google Sheet:", error));

            // Show confirmation message on the webpage
            document.getElementById("contactForm").innerHTML = "<p style='color: white; font-size: 18px;'>Thank you for providing the information. We will contact you soon!</p>";
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("Failed to submit form");
        }
    });
});
