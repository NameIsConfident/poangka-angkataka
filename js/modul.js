function shuffle(array){
for(let i=array.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[array[i],array[j]]=[array[j],array[i]];
}
return array;
}

/* =========================
GET USER GROUP
========================= */

const userGroup = localStorage.getItem("userGroup") || "mahasiswa";

/* =========================
INTERACTIVE FACE
========================= */

const char=document.getElementById("char");
const eyes=document.querySelectorAll(".eye");

let clickCount=0;

const messages=[
"Jagalah martabat sesama.",
"Setiap pilihanmu berdampak.",
"Poangka-angkataka dimulai dari empati.",
"Aku memperhatikan keputusanmu.",
"Martabat dijaga melalui sikap."
];

const easter=[
"Kamu menemukan pesan tersembunyi.",
"Empati adalah inti Poangka-angkataka.",
"Kamu cukup observatif.",
"Terus jaga martabat sesama."
];

const bubble=document.createElement("div");
bubble.style.position="absolute";
bubble.style.bottom="130px";
bubble.style.left="50%";
bubble.style.transform="translateX(-50%)";
bubble.style.background="rgba(0,0,0,.8)";
bubble.style.padding="8px 14px";
bubble.style.borderRadius="20px";
bubble.style.fontSize="12px";
bubble.style.display="none";

char.appendChild(bubble);

char.addEventListener("click",()=>{

clickCount++;

let text;

if(clickCount>=5){
text=easter[Math.floor(Math.random()*easter.length)];
clickCount=0;
}else{
text=messages[Math.floor(Math.random()*messages.length)];
}

bubble.innerText=text;
bubble.style.display="block";

setTimeout(()=>{
bubble.style.display="none";
},2000);

});


/* =========================
EYES FOLLOW
========================= */

document.addEventListener("mousemove",(e)=>{

const rect=char.getBoundingClientRect();

const centerX=rect.left+rect.width/2;
const centerY=rect.top+rect.height/2;

const angle=Math.atan2(
e.clientY-centerY,
e.clientX-centerX
);

const moveX=Math.cos(angle)*4;
const moveY=Math.sin(angle)*4;

eyes.forEach(eye=>{
eye.style.transform=`translate(${moveX}px,${moveY}px)`;
});

});


/* =========================
BLINK
========================= */

setInterval(()=>{

eyes.forEach(eye=>{
eye.style.transform="scaleY(.1)";
});

setTimeout(()=>{
eyes.forEach(eye=>{
eye.style.transform="scaleY(1)";
});
},150);

},4000);


/* =========================
SCENARIO BUILDER
========================= */

function makeScenario(text, good, bad, a,b,c){

let choices = [
{ text:a, correct:false},
{ text:b, correct:false},
{ text:c, correct:false}
];

const correctIndex = Math.floor(Math.random()*3);
choices[correctIndex].correct = true;

return {
text:text,
reactionGood:good,
reactionBad:bad,
choices:choices
};

}


/* =========================
SCENARIOS SD
========================= */

const scenariosSD = shuffle([

{
text:"Saat istirahat, kamu melihat seorang teman berdiri sendiri di dekat lapangan. Ia terlihat ingin ikut bermain, tetapi kelompok lain sudah asyik bermain bersama.",
reactionGood:"Ia merasa diterima dan mulai bermain bersama.",
reactionBad:"Ia merasa tidak ada yang ingin berteman dengannya.",
choices:[
{ text:"Mengajaknya ikut bermain bersama kelompokmu", correct:true},
{ text:"Tetap bermain karena permainan sudah dimulai", correct:false},
{ text:"Menyuruhnya mencari kelompok lain", correct:false}
]
},

{
text:"Saat guru bertanya, temanmu menjawab tetapi jawabannya salah. Beberapa siswa mulai tertawa pelan.",
reactionGood:"Ia tetap percaya diri mencoba lagi.",
reactionBad:"Ia merasa malu dan tidak ingin menjawab lagi.",
choices:[
{ text:"Memberi semangat bahwa mencoba itu hal baik", correct:true},
{ text:"Ikut tertawa agar suasana santai", correct:false},
{ text:"Diam saja tanpa menanggapi", correct:false}
]
},

{
text:"Dalam kerja kelompok, satu teman terlihat bingung karena belum memahami tugas yang diberikan.",
reactionGood:"Ia merasa dibantu dan ikut berkontribusi.",
reactionBad:"Ia merasa tidak dianggap dalam kelompok.",
choices:[
{ text:"Menjelaskan tugas dengan sabar", correct:true},
{ text:"Mengambil alih tugasnya tanpa bicara", correct:false},
{ text:"Mengabaikannya dan lanjut bekerja", correct:false}
]
},

{
text:"Temanmu membawa bekal yang sederhana. Beberapa teman lain mulai membandingkan bekal mereka.",
reactionGood:"Ia tetap nyaman makan bersama.",
reactionBad:"Ia merasa minder dengan bekalnya.",
choices:[
{ text:"Mengatakan semua bekal sama baiknya", correct:true},
{ text:"Membandingkan bekal milikmu", correct:false},
{ text:"Diam dan tidak ikut bicara", correct:false}
]
},

{
text:"Saat bermain, temanmu kalah dan terlihat kecewa. Ia mulai duduk sendiri dan tidak ikut bermain lagi.",
reactionGood:"Ia kembali semangat bermain.",
reactionBad:"Ia merasa tidak ingin bermain lagi.",
choices:[
{ text:"Memberi semangat dan mengajaknya bermain lagi", correct:true},
{ text:"Mengatakan ia kalah karena kurang hebat", correct:false},
{ text:"Melanjutkan permainan tanpa memperhatikan", correct:false}
]
},

{
text:"Saat istirahat, kamu melihat temanmu duduk sendirian sementara teman lain bermain bersama.",
reactionGood:"Ia merasa ditemani.",
reactionBad:"Ia merasa kesepian.",
choices:[
{ text:"Mengajaknya duduk dan berbicara", correct:true},
{ text:"Membiarkannya sendiri", correct:false},
{ text:"Menghindari agar tidak canggung", correct:false}
]
},

{
text:"Temanmu terjatuh saat bermain. Ia terlihat kesakitan dan beberapa anak hanya melihat.",
reactionGood:"Ia merasa diperhatikan.",
reactionBad:"Ia merasa diabaikan.",
choices:[
{ text:"Menolongnya dan menanyakan keadaannya", correct:true},
{ text:"Menertawakan karena terlihat lucu", correct:false},
{ text:"Melanjutkan bermain", correct:false}
]
},

{
text:"Temanmu membaca dengan pelan di depan kelas dan terlihat gugup.",
reactionGood:"Ia menjadi lebih percaya diri.",
reactionBad:"Ia semakin gugup dan berhenti.",
choices:[
{ text:"Mendengarkan dengan tenang", correct:true},
{ text:"Menyuruhnya lebih cepat", correct:false},
{ text:"Menertawakan cara membacanya", correct:false}
]
},

{
text:"Temanmu lupa membawa alat tulis saat pelajaran dimulai.",
reactionGood:"Ia merasa terbantu.",
reactionBad:"Ia merasa tidak dipedulikan.",
choices:[
{ text:"Meminjamkan alat tulis milikmu", correct:true},
{ text:"Menyuruhnya meminjam ke orang lain", correct:false},
{ text:"Mengabaikannya", correct:false}
]
},

{
text:"Saat kerja kelompok, pendapat temanmu tidak langsung diterima dan ia terlihat ragu untuk berbicara lagi.",
reactionGood:"Ia kembali berani menyampaikan pendapat.",
reactionBad:"Ia memilih diam sepanjang diskusi.",
choices:[
{ text:"Mengatakan pendapatnya juga penting untuk didengar", correct:true},
{ text:"Langsung mengganti topik diskusi", correct:false},
{ text:"Membiarkan diskusi lanjut tanpa dirinya", correct:false}
]
}

]);

/* =========================
SCENARIOS SMP
========================= */

const scenariosSMP = shuffle([

{
text:"Di grup kelas, seseorang mengirim foto temanmu yang sedang tidur di kelas dengan caption bercanda. Beberapa mulai ikut menertawakan. Temanmu terlihat online tapi tidak membalas.",
reactionGood:"Situasi mereda dan temanmu tidak merasa dipermalukan.",
reactionBad:"Candaan semakin ramai dan temanmu merasa tidak nyaman.",
choices:[
{ text:"Menulis di grup agar tidak mempermalukan teman", correct:true},
{ text:"Mengirim emoji tertawa agar ikut ramai", correct:false},
{ text:"Mengirim foto lain agar topik berganti", correct:false}
]
},

{
text:"Saat diskusi kelompok, pendapat temanmu dianggap aneh dan langsung ditolak tanpa didengar. Ia terlihat diam setelah itu.",
reactionGood:"Ia kembali percaya diri menyampaikan ide.",
reactionBad:"Ia memilih tidak berpendapat lagi.",
choices:[
{ text:"Meminta kelompok mendengarkan idenya dulu", correct:true},
{ text:"Mengganti topik diskusi", correct:false},
{ text:"Menyarankan lanjut ke pendapat lain", correct:false}
]
},

{
text:"Temanmu mendapatkan nilai rendah dan beberapa teman mulai membandingkan nilai mereka dengan nada bercanda.",
reactionGood:"Ia tetap merasa dihargai.",
reactionBad:"Ia merasa minder dan tertekan.",
choices:[
{ text:"Mengatakan setiap orang punya proses belajar berbeda", correct:true},
{ text:"Ikut membandingkan nilai", correct:false},
{ text:"Diam saja sambil mendengarkan", correct:false}
]
},

{
text:"Dalam kerja kelompok, satu anggota terlihat kurang aktif karena tampak ragu berbicara.",
reactionGood:"Ia mulai ikut berkontribusi.",
reactionBad:"Ia semakin menarik diri.",
choices:[
{ text:"Mengajaknya menyampaikan bagian kecil dulu", correct:true},
{ text:"Mengambil alih bagiannya", correct:false},
{ text:"Mengeluh ke anggota lain", correct:false}
]
},

{
text:"Temanmu salah menyebut informasi saat presentasi dan beberapa siswa mulai berbisik-bisik.",
reactionGood:"Ia menerima koreksi tanpa merasa malu.",
reactionBad:"Ia menjadi gugup dan berhenti.",
choices:[
{ text:"Mengoreksi dengan bahasa sopan setelah presentasi", correct:true},
{ text:"Langsung membenarkan di tengah presentasi", correct:false},
{ text:"Membiarkan saja", correct:false}
]
},

{
text:"Di kelas, seorang teman terlihat duduk sendirian sementara kelompok lain sudah terbentuk.",
reactionGood:"Ia merasa diterima.",
reactionBad:"Ia merasa dikucilkan.",
choices:[
{ text:"Mengajaknya bergabung ke kelompokmu", correct:true},
{ text:"Membiarkannya karena kelompok sudah penuh", correct:false},
{ text:"Mengatakan ia bisa cari kelompok lain", correct:false}
]
},

{
text:"Temanmu berbicara pelan saat menyampaikan pendapat dan beberapa mulai tidak memperhatikan.",
reactionGood:"Ia merasa dihargai dan melanjutkan.",
reactionBad:"Ia berhenti berbicara.",
choices:[
{ text:"Meminta teman lain mendengarkan dulu", correct:true},
{ text:"Langsung menyampaikan pendapatmu sendiri", correct:false},
{ text:"Mengalihkan pembicaraan", correct:false}
]
},

{
text:"Seseorang membuat kesalahan kecil dalam tugas kelompok dan langsung disalahkan oleh anggota lain.",
reactionGood:"Diskusi menjadi lebih tenang.",
reactionBad:"Suasana menjadi tegang.",
choices:[
{ text:"Mengatakan kesalahan bisa diperbaiki bersama", correct:true},
{ text:"Menunjukkan kesalahannya dengan tegas", correct:false},
{ text:"Diam saja", correct:false}
]
},

{
text:"Temanmu berbeda pendapat dengan mayoritas dan mulai dianggap 'tidak sejalan'.",
reactionGood:"Diskusi menjadi lebih terbuka.",
reactionBad:"Ia memilih tidak berbicara lagi.",
choices:[
{ text:"Mengatakan perbedaan pendapat itu wajar", correct:true},
{ text:"Mengikuti mayoritas saja", correct:false},
{ text:"Mengakhiri diskusi", correct:false}
]
},

{
text:"Dalam kegiatan kelas, seorang teman terlihat gugup saat ditunjuk berbicara di depan.",
reactionGood:"Ia menjadi lebih percaya diri.",
reactionBad:"Ia semakin tegang.",
choices:[
{ text:"Memberi dukungan verbal sebelum ia berbicara", correct:true},
{ text:"Menggantikan dia berbicara", correct:false},
{ text:"Menunggu saja", correct:false}
]
}

]);


/* =========================
SCENARIOS MAHASISWA
========================= */

const scenariosMahasiswa = shuffle([

{
text:"Dalam diskusi kelas, ide seseorang ditolak dengan cepat tanpa penjelasan. Ia terlihat ingin menambahkan sesuatu namun ragu.",
reactionGood:"Diskusi menjadi lebih terbuka dan ia kembali berbicara.",
reactionBad:"Ia memilih diam sepanjang diskusi.",
choices:[
{ text:"Meminta ia menjelaskan idenya lebih lanjut", correct:true},
{ text:"Melanjutkan diskusi ke topik lain", correct:false},
{ text:"Mengikuti keputusan mayoritas saja", correct:false}
]
},

{
text:"Saat presentasi kelompok, satu anggota salah menyampaikan data dan dosen mulai mempertanyakan. Ia terlihat panik.",
reactionGood:"Situasi menjadi lebih tenang dan ia bisa memperbaiki.",
reactionBad:"Ia semakin gugup dan kehilangan arah.",
choices:[
{ text:"Membantu menjelaskan tanpa menyalahkan", correct:true},
{ text:"Mengoreksi dengan nada tegas di depan", correct:false},
{ text:"Diam dan membiarkannya menjawab sendiri", correct:false}
]
},

{
text:"Dalam kerja tim, satu anggota jarang berbicara dan terlihat tidak dilibatkan dalam keputusan.",
reactionGood:"Ia mulai berkontribusi.",
reactionBad:"Ia semakin menarik diri.",
choices:[
{ text:"Menanyakan pendapatnya secara langsung", correct:true},
{ text:"Melanjutkan diskusi tanpa melibatkannya", correct:false},
{ text:"Mengambil alih bagiannya", correct:false}
]
},

{
text:"Seseorang menyampaikan kritik keras terhadap ide temanmu di depan kelompok.",
reactionGood:"Diskusi tetap sehat.",
reactionBad:"Suasana menjadi tegang.",
choices:[
{ text:"Menengahi dan mengarahkan ke kritik konstruktif", correct:true},
{ text:"Mendukung kritik tersebut secara langsung", correct:false},
{ text:"Menghentikan diskusi", correct:false}
]
},

{
text:"Temanmu terlihat gugup saat harus mempresentasikan hasil kerja yang belum sempurna.",
reactionGood:"Ia menjadi lebih percaya diri.",
reactionBad:"Ia semakin ragu.",
choices:[
{ text:"Memberi dukungan bahwa proses belajar itu wajar", correct:true},
{ text:"Mengambil alih presentasi", correct:false},
{ text:"Menyarankan menunda presentasi", correct:false}
]
},

{
text:"Dalam diskusi online, seseorang menanggapi pendapat temanmu dengan kalimat merendahkan.",
reactionGood:"Diskusi kembali kondusif.",
reactionBad:"Konflik semakin berkembang.",
choices:[
{ text:"Mengajak fokus pada isi argumen bukan pribadi", correct:true},
{ text:"Membalas dengan nada sarkastik", correct:false},
{ text:"Meninggalkan diskusi", correct:false}
]
},

{
text:"Satu anggota kelompok terlambat mengumpulkan bagiannya dan langsung disalahkan oleh anggota lain.",
reactionGood:"Situasi menjadi lebih memahami.",
reactionBad:"Ia merasa dipermalukan.",
choices:[
{ text:"Menanyakan kendalanya terlebih dahulu", correct:true},
{ text:"Menegur di depan semua anggota", correct:false},
{ text:"Mengeluh tentangnya", correct:false}
]
},

{
text:"Temanmu idenya tidak dipilih dan ia terlihat kecewa.",
reactionGood:"Ia tetap merasa dihargai.",
reactionBad:"Ia merasa idenya tidak dianggap.",
choices:[
{ text:"Mengapresiasi idenya sebelum memilih alternatif", correct:true},
{ text:"Langsung mengganti dengan ide lain", correct:false},
{ text:"Mengakhiri diskusi", correct:false}
]
},

{
text:"Dalam kerja kelompok, seseorang melakukan kesalahan kecil yang berdampak pada hasil.",
reactionGood:"Ia merasa dibantu memperbaiki.",
reactionBad:"Ia merasa disalahkan.",
choices:[
{ text:"Mengajak memperbaiki bersama", correct:true},
{ text:"Menunjukkan kesalahannya di depan", correct:false},
{ text:"Mengambil alih pekerjaannya", correct:false}
]
},

{
text:"Diskusi menjadi panas karena dua orang mempertahankan pendapat masing-masing.",
reactionGood:"Diskusi kembali produktif.",
reactionBad:"Konflik meningkat.",
choices:[
{ text:"Menawarkan mencari titik tengah", correct:true},
{ text:"Mendukung salah satu pihak", correct:false},
{ text:"Menghentikan diskusi", correct:false}
]
}

]);

/* =========================
PICK SCENARIO
========================= */

let scenarios;

if(userGroup==="sd") scenarios=scenariosSD;
else if(userGroup==="smp") scenarios=scenariosSMP;
else scenarios=scenariosMahasiswa;


/* =========================
ENGINE
========================= */

let index=0;
let benar=0;
let salah=0;
let meter=0;

const scenario=document.getElementById("scenario");
const choicesBox=document.getElementById("choices");
const feedback=document.getElementById("feedback");
const next=document.getElementById("next");
const restart=document.getElementById("restart");
const reaction=document.getElementById("reaction");
const meterFill=document.getElementById("meter");

const benarEl=document.getElementById("benar");
const salahEl=document.getElementById("salah");

const current=document.getElementById("current");
const level=document.getElementById("level");

function setFace(type){
char.classList.remove("happy","sad","neutral");
char.classList.add(type);
}

function updateLevel(){

if(meter<20) level.innerText="Level: Kurang Empati";
else if(meter<40) level.innerText="Level: Mulai Memahami";
else if(meter<60) level.innerText="Level: Menghargai Sesama";
else if(meter<80) level.innerText="Level: Penjaga Martabat";
else level.innerText="Level: Poangka-Angkataka Sejati";

}

function load(){

setFace("neutral");

current.innerText=index+1;

feedback.style.display="none";
next.style.display="none";

const data=scenarios[index];

scenario.innerText=data.text;

choicesBox.innerHTML="";

shuffle([...data.choices]).forEach(c=>{

const btn=document.createElement("button");
btn.className="choice";
btn.innerText=c.text;

btn.onclick=()=>select(btn,c.correct,data);

choicesBox.appendChild(btn);

});

}

function select(btn,correct,data){

document.querySelectorAll(".choice")
.forEach(b=>b.disabled=true);

if(correct){

btn.classList.add("correct");

reaction.innerText=data.reactionGood;
feedback.innerText="Pilihan ini menjaga martabat sesama.";

benar++;
meter+=10;

setFace("happy");

}else{

btn.classList.add("wrong");

reaction.innerText=data.reactionBad;
feedback.innerText="Pilihan ini dapat menurunkan martabat orang lain.";

salah++;
meter-=10;

setFace("sad");

}

meter=Math.max(0,Math.min(100,meter));

meterFill.style.width=meter+"%";

updateLevel();

benarEl.innerText=benar;
salahEl.innerText=salah;

feedback.style.display="block";
next.style.display="inline-block";

}

next.onclick=()=>{

index++;

if(index>=scenarios.length){
ending();
}else{
load();
}

};

restart.onclick=()=>{

index=0;
benar=0;
salah=0;
meter=0;

benarEl.innerText=0;
salahEl.innerText=0;

meterFill.style.width="0%";

scenarios=shuffle(scenarios);

restart.style.display="none";

load();

};

function ending(){

scenario.innerText="Simulasi selesai";
choicesBox.innerHTML="";
reaction.innerText="";

if(meter>=70){

feedback.innerText="Kamu berhasil menerapkan nilai Poangka-Angkataka.";
setFace("happy");

}else if(meter>=40){

feedback.innerText="Kamu cukup memahami nilai Poangka-Angkataka.";
setFace("neutral");

}else{

feedback.innerText="Kamu perlu memahami kembali nilai Poangka-Angkataka.";
setFace("sad");

}

feedback.style.display="block";
next.style.display="none";
restart.style.display="inline-block";

}

load();

