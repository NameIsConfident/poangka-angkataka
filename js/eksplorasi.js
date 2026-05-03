const cards = document.querySelectorAll(".card");
const mulaiBtn = document.getElementById("mulaiBtn");

let openedCards = 0;

/* =========================
CARD EXPAND
========================= */

cards.forEach(card => {

const content = card.querySelector(".card-content");

card.addEventListener("click", () => {

const isOpen = card.classList.contains("active");

cards.forEach(c=>{
c.classList.remove("active");
c.querySelector(".card-content").style.maxHeight = null;
});

if(!isOpen){

card.classList.add("active");

content.style.maxHeight =
content.scrollHeight + "px";

/* unlock counter */
if(!card.dataset.opened){

card.dataset.opened = true;
openedCards++;

const title =
card.querySelector(".card-title")
.innerText.toLowerCase();

if(title.includes("pomaa")){
unlockNilai("pomaa");
}

if(title.includes("popia")){
unlockNilai("popia");
}

if(title.includes("pomae")){
unlockNilai("pomae");
}

if(title.includes("poangka")){
unlockNilai("poangka");
}

if(title.includes("pobinci")){
unlockNilai("pobinci");
}

checkUnlock();
}

}

});

/* =========================
BUTTON INSIDE CARD
========================= */

const btn = card.querySelector(".mulai-btn");

if(btn){
btn.addEventListener("click",(e)=>{

e.stopPropagation();

if(btn.classList.contains("unlock")){
window.location.href = "modul.html";
}else{

btn.innerText = "Buka 3 nilai dulu";
btn.style.background = "#8B1E1E";

setTimeout(()=>{
btn.innerText = "Masuk Modul Interaktif";
btn.style.background = "#555";
},1500);

}

});
}

});


/* =========================
UNLOCK MODULE BUTTON
========================= */

function checkUnlock(){

if(openedCards >= 3){

mulaiBtn.classList.add("unlock");
mulaiBtn.innerText = "Masuk Modul Interaktif";

}else{

mulaiBtn.innerText =
"Buka " + (3-openedCards) + " nilai lagi";

}

}


/* =========================
GREETING USER
========================= */

window.addEventListener("DOMContentLoaded",()=>{

const nama = localStorage.getItem("userName");
const greeting = document.getElementById("userGreeting");

if(nama){
greeting.innerText = "Hai " + nama;
}else{
greeting.innerText = "Hai Pengguna";
}

/* random fact first load */
generateFact();

});


/* =========================
EXIT
========================= */

function exitSession(){

localStorage.removeItem("userName");
localStorage.removeItem("userAge");
localStorage.removeItem("userGroup");

document.body.classList.add("fade-out");

setTimeout(()=>{
window.location.href="index.html";
},400);

}


/* =========================
READING PROGRESS
========================= */

const fill = document.getElementById("readingFill");

window.addEventListener("scroll",()=>{

const scrollTop =
document.documentElement.scrollTop ||
document.body.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const percent = (scrollTop/height)*100;

fill.style.width = percent+"%";

});


/* =========================
RANDOM FACT
========================= */

const facts = [

"Nilai Poangka-angkataka menekankan menjaga martabat sesama manusia.",

"PO-5 merupakan falsafah sosial masyarakat Buton.",

"Pobinci-binciki kuli berarti menyakiti orang lain sama dengan menyakiti diri sendiri.",

"Pomaa-masiaka mengajarkan kasih sayang dalam interaksi sosial.",

"Pomae-maeaka menekankan menjaga rasa malu dalam kehidupan sosial."

];

const factBox = document.getElementById("factBox");

function generateFact(){

const random =
facts[Math.floor(Math.random()*facts.length)];

factBox.innerText = random;

}

factBox.addEventListener("click", generateFact);

/* =========================
PROGRESS VISUAL
========================= */

function unlockNilai(n){

const el =
document.querySelector(`[data-nilai="${n}"]`);

if(el){
el.classList.add("active");
}

}


/* =========================
SCENARIO
========================= */

function chooseScenario(val){

const result =
document.getElementById("scenarioResult");

if(val==="poangka"){

result.innerText =
"Kamu menerapkan Poangka-Angkataka: menjaga martabat sesama.";

unlockNilai("poangka");

}

else if(val==="pomae"){

result.innerText =
"Kamu menerapkan Pomae-maeaka: menjaga etika sosial.";

unlockNilai("pomae");

}

else{

result.innerText =
"Diam berarti membiarkan martabat seseorang direndahkan.";

}

}


/* =========================
QUIZ
========================= */

function answerQuiz(btn,correct){

const result =
document.getElementById("quizResult");

document
.querySelectorAll(".quiz-options button")
.forEach(b=>b.disabled=true);

if(correct){

btn.style.borderColor="#4CAF50";

result.innerText =
"Benar! Ini termasuk nilai Pobinci-binciki kuli.";

unlockNilai("pobinci");

}else{

btn.style.borderColor="#ff5252";

result.innerText =
"Kurang tepat. Coba pahami kembali nilai empati.";

}

}