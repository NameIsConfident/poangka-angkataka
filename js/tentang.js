const elements = document.querySelectorAll(
".hero, .content"
);

function reveal(){

elements.forEach(el=>{

const top = el.getBoundingClientRect().top;

if(top < window.innerHeight - 120){
el.classList.add("show");
}

});

}

window.addEventListener("scroll", reveal);

reveal();
const collage = document.getElementById("bgCollage");

/* posisi FIX biar ga tabrakan */
const positions = [
{ top: "5%", left: "5%" },
{ top: "10%", left: "35%" },
{ top: "15%", left: "65%" },

{ top: "40%", left: "10%" },
{ top: "45%", left: "40%" },
{ top: "50%", left: "70%" },

{ top: "70%", left: "5%" },
{ top: "75%", left: "35%" },
{ top: "80%", left: "65%" },

{ top: "30%", left: "80%" }
];

for(let i=1; i<=10; i++){

const img = document.createElement("img");
img.src = "img/" + i + ".jpg";
img.className = "bg-img";

/* posisi */
img.style.top = positions[i-1].top;
img.style.left = positions[i-1].left;

/* sedikit rotasi biar natural */
const rot = (Math.random()*6 - 3) + "deg";
img.style.setProperty("--rot", rot);

/* delay biar cinematic */
img.style.transitionDelay = (i * 0.15) + "s";

collage.appendChild(img);

/* trigger muncul */
setTimeout(()=>{
img.classList.add("show");
}, 300);
}
