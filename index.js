function seperateLettersIntoSpans() {
    var wigglyText = document.querySelectorAll('.wiggly-text');

    if (wigglyText.length === 0) {
        return;
    }

    // Loop trough each element with the wiggly text element
    for (let index = 0; index < wigglyText.length; index++) {
        const wigglyTextWord = wigglyText[index];

        const letters = wigglyTextWord.innerText.split('');

        let wrappedLetters = '';

        for (let j = 0; j < letters.length; j++) {
            const letter = letters[j];
            // Wrap each letter in a span, except for spaces
            if (letter === " ") {
                wrappedLetters += ' ';
            } else {
                wrappedLetters += `<span>${letter}</span>`;
            }
        }

        wigglyTextWord.innerHTML = wrappedLetters;
    }
}

function randomPx(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2) + 'px';
}

function generateWiggleKeyframes(name) {
    return `
        @keyframes ${name} {
            0%   { transform: translateY(0) translateX(0); }
            25%  { transform: translateY(${randomPx(-1, 1)}) translateX(${randomPx(-0.5, 0.5)}); }
            50%  { transform: translateY(${randomPx(-1, 0.5)}) translateX(${randomPx(-0.5, 0.5)}); }
            75%  { transform: translateY(${randomPx(-1, 1)}) translateX(${randomPx(0, 0,5)}); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
}

function addWigglyAnimToSpans() {
    const wigglyElements = document.querySelectorAll('.wiggly-text');

    if (wigglyElements.length === 0) {
        return;
    }

    let styles = '';

    for (let i = 0; i < wigglyElements.length; i++) {
        const spans = wigglyElements[i].querySelectorAll('span');

        for (let j = 0; j < spans.length; j++) {
            const animName = `wiggleLetter-${i}-${j}`;
            // Add keyframes for the animation
            styles += generateWiggleKeyframes(animName);

            spans[j].style.animation = `${animName} 1s infinite`;
            spans[j].style.display = 'inline-block';
        }
    }

    // Add the css to the document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

function init() {
    separateLettersIntoSpans();
    addWigglyAnimToSpans();
}

document.addEventListener('DOMContentLoaded', function() {
    seperateLettersIntoSpans();
    addWigglyAnimToSpans();
});