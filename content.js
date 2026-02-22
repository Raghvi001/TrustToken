(function(){

// Prevent double injection
if (document.getElementById("trust-token-fab")) return;

const style = document.createElement('style');
style.innerHTML = `
@keyframes trustTokenPulse {
0% { box-shadow: 0 0 0 0 rgba(6,182,212,0.7), 0 0 15px rgba(6,182,212,0.5); }
70% { box-shadow: 0 0 0 20px rgba(6,182,212,0), 0 0 25px rgba(6,182,212,0.8); }
100% { box-shadow: 0 0 0 0 rgba(6,182,212,0), 0 0 15px rgba(6,182,212,0.5); }
}

.trust-token-fab {
position: fixed;
bottom: 30px;
right: 30px;
width: 60px;
height: 60px;
background:#09090b;
border:2px solid #06b6d4;
border-radius:50%;
z-index:999999;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
animation:trustTokenPulse 2s infinite;
}

.trust-token-fab img {
width:36px;
height:36px;
object-fit:contain;
border-radius:50%;
}
`;
document.head.appendChild(style);

const fab = document.createElement("div");
fab.id = "trust-token-fab";
fab.className = "trust-token-fab";

const icon = document.createElement("img");
icon.src = chrome.runtime.getURL("icon48.png");

fab.appendChild(icon);
document.body.appendChild(fab);

function cleanText(text){
return text
.replace(/https?:\/\/\S+/g,'')
.replace(/#\w+/g,'')
.replace(/@\w+/g,'')
.replace(/\s+/g,' ')
.trim();
}

// -------- INSTAGRAM ----------
function getInstagramCaption(){

let caption="";

const posts=document.querySelectorAll("article");

posts.forEach(post=>{
const spans=post.querySelectorAll("span");

spans.forEach(span=>{
if(span.closest("ul")==null){

let txt=span.innerText;

if(txt &&
!txt.includes("Follow") &&
!txt.includes("View") &&
txt.length>30){

caption+=" "+txt;

}

}
});
});

return cleanText(caption);
}

// -------- X ----------
function getTweet(){

let tweet="";

const containers=document.querySelectorAll('[data-testid="tweetText"]');

containers.forEach(c=>{
tweet+=" "+c.innerText;
});

return cleanText(tweet);
}

// -------- FALLBACK ----------
function fallback(){

let best="";

document.querySelectorAll("article,p,div").forEach(el=>{

const txt=cleanText(el.innerText);

if(txt.length>120 && txt.length>best.length){

best=txt;

}

});

return best;
}

function extract(){

const host=window.location.hostname;

let text="";

if(host.includes("instagram.com")){

text=getInstagramCaption();

}
else if(host.includes("x.com") || host.includes("twitter.com")){

text=getTweet();

}

if(!text || text.length<10){

text=fallback();

}

return text;
}

fab.onclick=()=>{

const claim=extract();

if(claim){

chrome.runtime.sendMessage({
action:"verifyClaim",
claimText:claim
});

}

};

})();