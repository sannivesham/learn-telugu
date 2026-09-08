import {
  auth,
  onAuthStateChanged,
  signOut
} from "./firebase.js";

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const profilePhoto = document.getElementById("profilePhoto");
const logoutBtn = document.getElementById("logoutBtn");

const userLevel = document.getElementById("userLevel");
const userLessons = document.getElementById("userLessons");
const userStreak = document.getElementById("userStreak");
const userCertificates = document.getElementById("userCertificates");

function loadUserStats() {
  try {
    const completed = JSON.parse(localStorage.getItem('aksharam_completed_lessons') || '[]');
    const streak = parseInt(localStorage.getItem('aksharam_streak') || '0', 10);

    if (userLessons) userLessons.textContent = completed.length.toString();
    if (userStreak) userStreak.textContent = `${streak} Day${streak === 1 ? '' : 's'}`;
    if (userLevel) {
      userLevel.textContent = completed.length > 0 ? "Level 1" : "Level 1";
    }
    if (userCertificates) {
      userCertificates.textContent = completed.length >= 7 ? "1" : "0";
    }
  } catch (e) {
    console.warn("Error loading user stats", e);
  }
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "signin.html";
    return;
  }

  userName.textContent = user.displayName || user.email.split("@")[0];
  userEmail.textContent = user.email;

  if (user.photoURL) {
    profilePhoto.src = user.photoURL;
  } else {
    const initial = (user.displayName || user.email || 'U')[0].toUpperCase();
    profilePhoto.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initial)}&background=7A2048&color=ffffff&size=300`;
  }

  loadUserStats();
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "signin.html";
});
