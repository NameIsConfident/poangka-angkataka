let targetPage = null;

function startNavigate(page){

targetPage = page;

document
.getElementById("popup")
.classList.add("show");

}

function submitUser(){

const nama = document.getElementById("nama").value.trim();
const umur = parseInt(
document.getElementById("umur").value
);

/* validasi kosong */
if(!nama || isNaN(umur)){
alert("Isi nama dan umur terlebih dahulu");
return;
}

/* validasi umur minimum */
if(umur < 6){
alert("Media interaktif ini ditujukan untuk usia minimal 6 tahun.");
return;
}

/* validasi umur tidak masuk akal */
if(umur > 100){
alert("Masukkan umur yang valid.");
return;
}

let group="";

/* pembagian kelompok umur */
if(umur >= 6 && umur <= 12){
group="sd";
}
else if(umur >= 13 && umur <=18){
group="smp";
}
else{
group="mahasiswa";
}

localStorage.setItem("userName",nama);
localStorage.setItem("userAge",umur);
localStorage.setItem("userGroup",group);

if(targetPage === "kampanye.html"){
playIntro();
}else{
navigate(targetPage);
}

}


function navigate(page){
document.body.classList.add("fade-out");

setTimeout(()=>{
window.location.href = page;
},400);
}


/* =========================
BACKGROUND CINEMATIC
========================= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", ()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

let particles = [];

for(let i=0;i<60;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speedX:(Math.random()-0.5)*0.2,
speedY:(Math.random()-0.5)*0.2
});
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove",(e)=>{
mouseX = e.clientX * 0.0005;
mouseY = e.clientY * 0.0005;
});

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

let gradient = ctx.createRadialGradient(
canvas.width/2,
canvas.height/2,
0,
canvas.width/2,
canvas.height/2,
canvas.width
);

gradient.addColorStop(0,"rgba(198,168,90,0.05)");
gradient.addColorStop(1,"rgba(0,0,0,0)");

ctx.fillStyle = gradient;
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x += p.speedX + mouseX;
p.y += p.speedY + mouseY;

if(p.x > canvas.width) p.x = 0;
if(p.x < 0) p.x = canvas.width;
if(p.y > canvas.height) p.y = 0;
if(p.y < 0) p.y = canvas.height;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="rgba(198,168,90,0.15)";
ctx.fill();

});

requestAnimationFrame(animate);
}

animate();

function goBack(){

const popup = document.getElementById("popup");

popup.style.opacity = "0";

setTimeout(()=>{
popup.classList.remove("show");
popup.style.opacity = "";
},200);

}

function playIntro(){

const intro = document.getElementById("introScreen");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

const popup = document.getElementById("popup");

/* reset */
[line1,line2,line3].forEach(line=>{
line.classList.remove("active");
});

intro.classList.add("show");

/* gate close */
setTimeout(()=>{
intro.classList.add("open");
},200);


/* line 1 */
setTimeout(()=>{
line1.classList.add("active");
},1800);


/* line 2 */
setTimeout(()=>{
line1.classList.remove("active");
line2.classList.add("active");
},3400);


/* line 3 */
setTimeout(()=>{
line2.classList.remove("active");
line3.classList.add("active");
},5000);


/* finish */
setTimeout(()=>{

intro.classList.remove("open");

setTimeout(()=>{

intro.classList.remove("show");

[line1,line2,line3].forEach(line=>{
line.classList.remove("active");
});

navigate(targetPage);

},1200);

},6500);

}