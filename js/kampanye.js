const container = document.querySelector(".kampanye-container");
const elements = document.querySelectorAll(".hero, .content");

/* reveal scroll */

function reveal(){
elements.forEach(el=>{
const rect = el.getBoundingClientRect();
const trigger = window.innerHeight * 0.85;

if(rect.top < trigger){
el.classList.add("show");
}
});
}

container.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


/* ========================
LOAD USER SESSION
======================== */

window.addEventListener("DOMContentLoaded",()=>{

const nama = localStorage.getItem("userName");
const greeting = document.getElementById("userGreeting");

if(nama){
greeting.innerText = "Hai " + nama;
}else{
greeting.innerText = "Hai Pengguna";
}

loadQuiz();

});


/* ========================
EXIT SESSION
======================== */

function exitSession(){

localStorage.removeItem("userName");
localStorage.removeItem("userAge");
localStorage.removeItem("userGroup");

document.body.classList.add("fade-out");

setTimeout(()=>{
window.location.href = "index.html";
},400);

}


/* ======================
SCROLL PROGRESS
====================== */

const scrollFill = document.getElementById("readingBar");

container.addEventListener("scroll",()=>{

const scrollTop = container.scrollTop;
const height = container.scrollHeight - container.clientHeight;

const percent = (scrollTop / height) * 100;

scrollFill.style.width = percent + "%";

});


/* ======================
QUIZ PO5 VARIATIF
====================== */

const quizData = [

{
question:"Seorang teman sedang sedih karena gagal lomba. Sikap paling tepat adalah...",
choices:[
{ text:"Memberi dukungan dan menyemangati", correct:true },
{ text:"Menyuruhnya tidak berlebihan", correct:false },
{ text:"Mengalihkan topik pembicaraan", correct:false }
],
explain:"Pomaa-masiaka mengajarkan saling menyayangi dan memberi dukungan."
},

{
question:"Melihat teman kesulitan membawa barang berat di sekolah.",
choices:[
{ text:"Membantu membawakan", correct:true },
{ text:"Membiarkan karena bukan urusanmu", correct:false },
{ text:"Mengawasi saja", correct:false }
],
explain:"Popia-piara menekankan saling menjaga dan membantu."
},

{
question:"Temanmu berbicara kasar di depan umum.",
choices:[
{ text:"Menegur dengan sopan", correct:true },
{ text:"Ikut menertawakan", correct:false },
{ text:"Merekam lalu menyebarkan", correct:false }
],
explain:"Pomae-maeaka menekankan menjaga etika dan rasa malu."
},

{
question:"Seseorang dipermalukan di media sosial.",
choices:[
{ text:"Membela dan menghentikan ejekan", correct:true },
{ text:"Ikut berkomentar", correct:false },
{ text:"Menyebarkan ulang", correct:false }
],
explain:"Poangka-angkataka menekankan menjaga martabat sesama."
},

{
question:"Kamu melihat seseorang dihina karena penampilannya.",
choices:[
{ text:"Menghentikan dan mengingatkan", correct:true },
{ text:"Diam saja", correct:false },
{ text:"Ikut bercanda", correct:false }
],
explain:"Pobinci-binciki kuli mengajarkan empati terhadap sesama."
}

];

function loadQuiz(){

const random =
quizData[Math.floor(Math.random()*quizData.length)];

const questionEl =
document.querySelector(".quiz-question");

const choicesEl =
document.querySelector(".quiz-choices");

const feedbackEl =
document.getElementById("quizFeedback");

questionEl.innerText = random.question;

choicesEl.innerHTML="";
feedbackEl.innerText="";

random.choices
.sort(()=>Math.random()-0.5)
.forEach(c=>{

const btn=document.createElement("button");

btn.className="quiz-btn";
btn.innerText=c.text;

btn.onclick=()=>{

document
.querySelectorAll(".quiz-btn")
.forEach(b=>b.disabled=true);

if(c.correct){

btn.classList.add("correct");

feedbackEl.innerText=
"Benar. " + random.explain;

}else{

btn.classList.add("wrong");

feedbackEl.innerText=
"Kurang tepat. " + random.explain;

}

};

choicesEl.appendChild(btn);

});

}


/* ======================
QUOTE GENERATOR
====================== */

const quotes = [

"Menjaga martabat orang lain berarti menjaga martabat diri sendiri.",
"Poangka-Angkataka mengajarkan kehormatan kolektif.",
"Budaya Buton menjunjung tinggi etika sosial.",
"Empati adalah dasar hubungan manusia.",
"Menghormati orang lain memperkuat kehormatan diri.",
"Nilai PO-5 membentuk keseimbangan sosial.",
"Martabat dijaga melalui tindakan kecil.",
"Interaksi digital tetap membutuhkan etika."

];

function generateQuote(){

const box = document.getElementById("quoteBox");

const random =
quotes[Math.floor(Math.random()*quotes.length)];

box.innerText = random;

}

function decision(val){

const result = document.getElementById("decisionResult");

if(val==1){
result.innerText =
"Pilihan ini mencerminkan nilai Poangka-angkataka: menjaga martabat sesama.";
}

if(val==2){
result.innerText =
"Diam berarti membiarkan martabat seseorang direndahkan.";
}

if(val==3){
result.innerText =
"Tindakan ini bertentangan dengan nilai empati budaya Buton.";
}

}

window.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

let t = 0;

function drawDragon(){

ctx.clearRect(0,0,canvas.width,canvas.height);

let points = [];

/* generate body points */
for(let x=0; x<canvas.width; x+=8){

const y =
canvas.height/2 +
Math.sin((x * 0.008) + t) * 60 +
Math.sin((x * 0.02) + t * .5) * 20;

points.push({x,y});
}

/* BODY */
ctx.strokeStyle = "rgba(198,168,90,0.35)";
ctx.lineWidth = 3;

ctx.beginPath();
ctx.moveTo(points[0].x, points[0].y);

points.forEach(p=>{
ctx.lineTo(p.x,p.y);
});

ctx.stroke();


/* SPINES */
ctx.strokeStyle = "rgba(198,168,90,0.2)";
ctx.lineWidth = 1;

points.forEach((p,i)=>{

if(i % 8 === 0){

ctx.beginPath();
ctx.moveTo(p.x,p.y);
ctx.lineTo(
p.x,
p.y - 15 - Math.sin(t+i)*5
);
ctx.stroke();

}

});


/* HEAD */
const head = points[Math.floor(points.length * 0.8)];

const gradient = ctx.createRadialGradient(
head.x, head.y, 0,
head.x, head.y, 35
);

gradient.addColorStop(0,"rgba(198,168,90,.8)");
gradient.addColorStop(1,"transparent");

ctx.fillStyle = gradient;

ctx.beginPath();
ctx.arc(head.x, head.y, 20, 0, Math.PI*2);
ctx.fill();


/* EYE */
ctx.fillStyle="#C6A85A";
ctx.beginPath();
ctx.arc(head.x+6, head.y-4, 2, 0, Math.PI*2);
ctx.fill();


/* TAIL FADE */
ctx.strokeStyle = "rgba(198,168,90,0.2)";
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(points[0].x, points[0].y);

for(let i=0;i<40;i++){
ctx.lineTo(points[i].x,points[i].y);
}

ctx.stroke();

t += 0.01;

requestAnimationFrame(drawDragon);
}

drawDragon();

});