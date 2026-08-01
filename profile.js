import {
auth,
onAuthStateChanged,
signOut
} from "./firebase.js";

const userName=document.getElementById("userName");
const userEmail=document.getElementById("userEmail");
const profilePhoto=document.getElementById("profilePhoto");

const logoutBtn=document.getElementById("logoutBtn");

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="signin.html";

return;

}

userName.textContent=

user.displayName ||

user.email.split("@")[0];

userEmail.textContent=

user.email;

if(user.photoURL){

profilePhoto.src=user.photoURL;

}

});

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

window.location.href="signin.html";

});
