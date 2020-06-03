const correctArray = ["wenn", "ich", "nicht", "sehe", "dass", "ich", "blind", "bin", "dann", "bin", "ich", "blind", "wenn", "ich", "aber", "sehe", "dass", "ich", "blind", "bin", "dann", "sehe", "ich"];
let quoteIndex = 0;
const correctQuote = "wenn ich nicht sehe, dass ich blind bin, dann bin ich blind; wenn ich aber sehe, dass ich blind bin, dann sehe ich."
const sourceText = "- heinz von förster";
let lastWord = "";

function speak(elem) {
  var msg = new SpeechSynthesisUtterance();
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();
  console.log(voices);
  msg.text = elem.innerText;
  msg.lang = 'de-DE';
  msg.voice = voices[2];

  msg.volume = 1; // 0 to 1
  msg.rate = 0.9; // 0.1 to 10
  msg.pitch = 1; //0 to 2


  msg.start = function(e) {
    elem.classList.add("highlight");
  };
  msg.onend = function(e) {
    elem.classList.remove("highlight");
  };

  if(correctArray[quoteIndex-1] == elem.innerText) {
    return;
  }
  if(correctArray[quoteIndex] == elem.innerText) {
    // console.log()
    quoteIndex++;
    quote.innerText = truncate(correctQuote, quoteIndex);
  } else if(quoteIndex < 23) {
    quoteIndex = 0;
    quote.innerText = "";
  }

  if(quoteIndex == 23) {
    source.innerText = sourceText;
  }

  // console.log("speaking", msg);

  speechSynthesis.speak(msg);
  lastWord = elem.innerText;


}


// event listeners
const schaltWord = document.getElementsByClassName("schaltWord");
console.log(schaltWord);
for(let i = 0; i < schaltWord.length; i++) {
  schaltWord[i].addEventListener("mouseenter", function( event ) {
    console.log(schaltWord[i].innerText);
    if(lastWord != schaltWord[i].innerText) {
      console.log("uhmm...", lastWord, schaltWord[i].innerText);
      speak(schaltWord[i]);
    }
  });
}

function truncate(str, no_words) {
    return str.split(" ").splice(0,no_words).join(" ");
}

//show quote on success
const quote = document.getElementById("quoteshow");
const source = document.getElementById("source");
// quote.innerText = correctQuote;
