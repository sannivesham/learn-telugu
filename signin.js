import {
    auth,
    provider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "./firebase.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const googleBtn = document.getElementById("googleBtn");
const forgotBtn = document.getElementById("forgotBtn");

const message = document.getElementById("message");

function showMessage(text, success = false) {

    message.textContent = text;

    message.style.color = success
        ? "#1F6F5C"
        : "#C62828";

}


// -----------------------
// Sign In
// -----------------------

loginBtn.addEventListener("click", async () => {

    if (!email.value || !password.value) {
        showMessage("Please enter your email and password.");
        return;
    }

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        showMessage("Login successful!", true);

        setTimeout(() => {

            window.location.href = "profile.html";

        }, 700);

    }

    catch (error) {

        showMessage(error.message);

    }

});


// -----------------------
// Create Account
// -----------------------

signupBtn.addEventListener("click", async () => {

    if (!email.value || !password.value) {
        showMessage("Please enter your email and password.");
        return;
    }

    if (password.value.length < 6) {

        showMessage("Password must be at least 6 characters.");

        return;

    }

    try {

        await createUserWithEmailAndPassword(

            auth,

            email.value,

            password.value

        );

        showMessage("Account created successfully!", true);

        setTimeout(() => {

            window.location.href = "profile.html";

        }, 800);

    }

    catch (error) {

        showMessage(error.message);

    }

});



// -----------------------
// Google Login
// -----------------------

googleBtn.addEventListener("click", async () => {

    try {

        await signInWithPopup(

            auth,

            provider

        );

        window.location.href = "profile.html";

    }

    catch (error) {

        showMessage(error.message);

    }

});




// -----------------------
// Forgot Password
// -----------------------

forgotBtn.addEventListener("click", async () => {

    if (!email.value) {

        showMessage("Enter your email first.");

        return;

    }

    try {

        await sendPasswordResetEmail(

            auth,

            email.value

        );

        showMessage(

            "Password reset email sent.",

            true

        );

    }

    catch (error) {

        showMessage(error.message);

    }

});
