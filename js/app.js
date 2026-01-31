let items = document.querySelectorAll('button, .card');
let index = 0;
let voices = [];

// Load voices correctly
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}

// Some browsers load voices asynchronously
window.speechSynthesis.onvoiceschanged = loadVoices;

// Call once
loadVoices();

function speak(text)
 {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.9;
    msg.pitch = 1;
    msg.volume = 1;

    let voiceFound = false;

    if (selectedLanguage === 'ar') {
        // Try to find Arabic voice
        for (let voice of voices) {
            if (voice.lang.startsWith('ar')) {
                msg.voice = voice;
                msg.lang = voice.lang;
                voiceFound = true;
                break;
            }
        }
    } else {
        // English voice
        for (let voice of voices) {
            if (voice.lang.startsWith('en')) {
                msg.voice = voice;
                msg.lang = voice.lang;
                voiceFound = true;
                break;
            }
        }
    }

    // Fallback (still try to speak)
    if (!voiceFound) {
        msg.lang = selectedLanguage === 'ar' ? 'ar-SA' : 'en-US';
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}
 let selectedLanguage = 'en';

function selectLanguage(lang) {
    selectedLanguage = lang;

    document.getElementById('languageScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';

    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    speak(lang === 'ar' ? 'تم اختيار اللغة العربية' : 'English language selected');
}




// Text-to-Speech function
 function speak(text) {
    if (selectedLanguage === 'ar') {
        speakArabic(text);
    } else {
        speakEnglish(text);
    }
}

function speakEnglish(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    msg.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}

function speakArabic(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ar-SA';
    msg.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}



function getItemText(item) {
if (item.tagName === 'BUTTON') {
return item.innerText;
}
if (item.classList.contains('card')) {
return item.querySelector('p').innerText;
}
return '';
}


 function highlight() {
    items.forEach(i => i.style.outline = 'none');

    const current = items[index];
    current.style.outline = '4px solid purple';

    // 🔊 Speak focused item
    speak(getItemText(current));

    // 🧭 AUTO SCROLL to focused item
    current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

highlight();


// Simulated gestures (replace with ESP32 data later)
document.addEventListener('keydown', e => {
if (e.key === 'ArrowRight') {
index = (index + 1) % items.length;
highlight();
}
if (e.key === 'ArrowLeft') {
index = (index - 1 + items.length) % items.length;
highlight();
}
if (e.key === 'Enter') {
items[index].click();
}
});


 const cards = document.querySelectorAll('.card');

 cards.forEach(card => {
    card.addEventListener('click', () => {
        const text = card.querySelector('p').innerText;
         if (text === "Cold") {
            speak("I am cold");
            return;
        }

        if (text === "Hot") {
            speak("I am hot");
            return;
        }

        if (text === "Boring") {
            speak("I am bored");
            return;
        }

        if (selectedLanguage === 'ar') {
            speak(`من فضلك أحتاج ${text}`);
        } else {
            speak(`Please, I need ${text}`);
        }
    });
});

 
 const textarea = document.getElementById('output');
const keyboardButtons = document.querySelectorAll('.keys button');

keyboardButtons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.innerText;

        if (key === 'SPACE') {
            textarea.value += ' ';
        } 
        else if (key === 'DEL') {
            textarea.value = textarea.value.slice(0, -1);
        } 
        else if (key === 'ENTER') {
            if (textarea.value.trim() !== '') {
                speak(textarea.value);
            }
        } 
        else {
            textarea.value += key;
        }
    });
});

 
let typingTimer;
const typingDelay = 1200; // 1.2 seconds after typing stops

textarea.addEventListener('input', () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
        if (textarea.value.trim() !== '') {
            speak(textarea.value);
        }
    }, typingDelay);
});
   