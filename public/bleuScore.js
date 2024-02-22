const userInput = document.getElementById('userInput');
const score = document.getElementById('score');
const verse = document.getElementById('currentVerse');
const difficulty = document.getElementById('difficulty');
const scoreReveal = document.getElementById('scoreReveal');

let currentScore = 0;
score.innerText = 'Score: ' + (currentScore) + '%';

const peekButton = document.getElementById('peekButton');

let peekEnabled = false;
let peekUsed = false;

peekButton.addEventListener('click', () => {
    if (!peekEnabled && !peekUsed){
        verse.style.visibility = 'visible';
        peekEnabled = true;
        peekUsed = true;
    }
})

//Whenever user enters something in the input box
userInput.addEventListener('input', () => {

    if(peekEnabled){
        verse.style.visibility = 'hidden';
        peekEnabled = false;
    }

    //If input box isn't empty
    if(verse.textContent !== ''){
        const userAnswer = userInput.value.trim();
        const similarity =  (calculateBLEUScore(userAnswer, verse.textContent));
        currentScore = similarity;
        score.innerText = 'Score: ' + (currentScore) + '%';

        if(currentScore >= difficulty.value){
            verse.style.visibility = 'visible';
            score.style.color = 'darkgreen';
        }

        if(difficulty.value > currentScore){
            verse.style.visibility = 'hidden';
        }

        if (currentScore < difficulty.value / 10){
            score.style.color = 'red';
        }
        else if (currentScore < difficulty.value / 2){
            score.style.color = 'darkorange';
        }

    }

});

//When user hits score button
scoreReveal.addEventListener('click', () => {
    if (score.style.visibility === 'hidden'){
        scoreReveal.innerText = 'Hide Score';
        score.style.visibility = 'visible';
    }
    else {
        scoreReveal.innerText = 'Show Score';
        score.style.visibility = 'hidden';
    }
})

//Calculate the text similarity using BLEU Score
function calculateBLEUScore(userInput, referenceVerse){
    let tokenizedInput = tokenize(userInput);
    let tokenizedReference = tokenize(referenceVerse);

    let precisions = [];
    for (let n =1; n<=4; n++){
        let translatedNgrams = getNgrams(tokenizedInput, n);
        let referenceNgrams = getNgrams(tokenizedReference, n);
        precisions.push(calculatePrecision(translatedNgrams, referenceNgrams));
    }

    let precisionProduct = precisions.reduce((acc,val) => acc*val, 1);
    let geometricMean = Math.pow(precisionProduct, 1/4);

    //Brevity Penalty
    let brevityPenalty = 1.0;
    if(tokenizedInput.length < tokenizedReference.length){
        brevityPenalty = Math.exp(1- tokenizedReference.length/tokenizedInput.length);
    }

    //Smooth Bleu Score
    const percentageScore = (geometricMean * brevityPenalty) * 100;
    return Math.round(percentageScore + (100 - percentageScore) * (geometricMean * brevityPenalty));
}

//Calculate the precision for each n-gram level
function calculatePrecision(translatedNgrams, referenceNgrams){
    let count = 0;
    let total = translatedNgrams.length;

    translatedNgrams.forEach(ngram => {
        if(referenceNgrams.includes(ngram)){
            count++;
            //Remove to avoid counting the same ngram multiple times
            referenceNgrams.splice(referenceNgrams.indexOf(ngram), 1);
        }
    });

    return total > 0 ? count/total :0;
}

//Create ngrams from tokens.
function getNgrams(tokens,n){
    let ngrams = [];

    for (let i = 0; i <tokens.length - n+1; i++){
        ngrams.push(tokens.slice(i,i+1).join(''));
    }

    return ngrams;
}

//Split the translated and reference texts into words
function tokenize(text){
    //Remove punctuation and split into words
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().split('');
}