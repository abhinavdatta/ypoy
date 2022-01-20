const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
whatsappBtn = document.querySelector(".whatsapp"),
facebookBtn = document.querySelector(".facebook"),

synth = speechSynthesis;

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

facebookBtn.addEventListener("click", ()=>{
    let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=fourinone.epizy.com`;
    window.open(facebookUrl, "_blank");
});

whatsappBtn.addEventListener("click", ()=>{
    let whatsappUrl = `https://api.whatsapp.com/send?text=${quoteText.innerText}`;
    window.open(whatsappUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

//"https://wa.me/whatsappphonenumber/?text=urlencodedtext"
//https://api.whatsapp.com/send?text=YourShareTextHere