//This script handles the scoring system for the user's input compared to the selected text.

const userInput = document.getElementById('userInput');
const score = document.getElementById('score');
const verse = document.getElementById('currentVerse');
const difficulty = document.getElementById('difficulty');
const scoreReveal = document.getElementById('scoreReveal');
const fuzzScore = document.getElementById('btn');
const wonDisplay = document.getElementById('correct');
const verseSelection = document.getElementById('verseSelect');

let versions;

//Array of all Bible translations based on language
if(currentLanguage.value === 'eng') {
    versions = ['esv','niv', 'kjv','nlt','net'];
}
else {
    versions = ['rcuv', 'cunps', 'cnvs', 'csbs', 'cunps'];
}

let showCurrentScore = true; //Keep track of visibility of current score
let currentScore = 0; //Score is 0 by default
score.innerText = 'Score: ' + (currentScore) + '%';

let fuzzEnabled = false; //Fuzz score compares the users input against all translations of the original text simultaneously.
let overlayUsed = false; //Check if overlay has been used on current guess

//Turn fuzz on and off
fuzzScore.addEventListener('change', () => {
    fuzzEnabled = !fuzzEnabled; // This will toggle the value of fuzzEnabled
    console.log(fuzzEnabled);
});

//When a new verse is selected reset the peek window
verseSelection.addEventListener('change', () => {
    peekUsed = false;
    peekVerse.innerText = verseText.innerHTML;
})

//When user chooses to close peek
closePeek.addEventListener('click', () => {
    peekWindow.style.display = 'none';
});


//Once user clicks on input box
userInput.addEventListener('click', () => {
    //If they pressed the peek button, turn it off as soon as they start typing
    if(peekEnabled){
        peekVerse.innerText = 'Peek already Used!';
        peekUsed = true;
    }
})

//Whenever user enters something in the input box
userInput.addEventListener('input', () => {

    const userAnswer = userInput.value.trim();

    //If fuzz score is turned on check users answer against all translations instead of just one
    if(fuzzEnabled) {
        let highest = []
        versions.forEach((selectedVersion) => {
            let versionScore = fetchAllVersions(currentVerse, selectedVersion);
            highest.push(calculateBLEUScore(userAnswer,versionScore));
        });


        if(currentLanguage.value === 'eng') {
            currentScore = Math.max(...highest);
            score.innerText = 'Score: ' + (currentScore) + '%';
        }

        //If selected language is other
        else {
            const reference = verseText.textContent;

            //Segment the users input as well as the reference text
            let segmentedText = handleSegmentation(userInput.value);
            let segmentedReference =  chineseToArray(reference);


            segmentedText.then(value => {
                const candidate = value;
                //If the current score is equal to 0, don't display the 25 percent increment
                if( !(Math.round((chineseBleuScore(candidate, segmentedReference) * 100)) === 0)) {
                    currentScore = Math.round((chineseBleuScore(candidate, segmentedReference) * 100));
                    //Curve score by 25%
                    if(currentScore >= 25) {
                        currentScore += 25;
                    }
                }

            })

        }

    }

    //Else if fuzz isn't enabled change calculate score normally
    else {
        let similarity;
        if(currentLanguage.value === 'eng') {
            //If input box isn't empty
            similarity =  (calculateBLEUScore(userAnswer, verse.textContent));
            currentScore = similarity;
            score.innerText = 'Score: ' + (currentScore) + '%';
        }

        else {
            const reference = verseText.textContent;

            //Segment the users input as well as the reference text
            let segmentedText = handleSegmentation(userInput.value);
            let segmentedReference =  chineseToArray(reference);


            segmentedText.then(value => {
                const candidate = value;
                currentScore = Math.round((chineseBleuScore(candidate, segmentedReference) * 100));
                //Curve score by 25%
                if(currentScore >= 25) {
                    currentScore += 25;
                }
            })

            score.innerText = '分数: ' + (currentScore) + '%';

        }

    }

    //Set color to green once it has  reached goal and display correct screen
    if(currentScore >= difficulty.value){

        //If language is Chinese, remove segmentation before displaying
        if(currentLanguage.value === 'zho'){
            verse.textContent = verse.textContent.replace(/\s+/g, '');
        }

        verse.style.visibility = 'visible';
        score.style.color = 'darkgreen';

        let overlay = document.getElementById('overlay');
        const rect = userInput.getBoundingClientRect();

        if(!overlayUsed) {
            // Set overlay dimensions and position to match the text area
            overlay.style.width = `${rect.width}px`;
            overlay.style.height = `${rect.height}px`;
            overlay.style.top = `${userInput.offsetTop}px`;
            overlay.style.left = `${userInput.offsetLeft}px`;

            // Display the overlay
            overlay.style.display = "flex";
            overlay.style.opacity = "1";
            overlay.style.animation = "swipeLeft 3s forwards";

            // After the swipeLeft animation completes, start the fadeOut animation
            setTimeout(() => {
                overlay.style.animation = "fadeOut 2s forwards";
            }, 3000); // Start fadeOut after 3s when swipeLeft completes

            // Hide the overlay after all animations are complete (5s total)
            setTimeout(() => {
                overlay.style.display = "none";
            }, 5000); // Ensure this matches the total animation duration

            overlayUsed = true; //Only show the overlay once per guess.
        }
    }

    //Until user reaches a certain score, hide the verse and won display
    if(difficulty.value > currentScore){
        verse.style.visibility = 'hidden';
        wonDisplay.style.visibility = 'hidden';
    }

    //If the current score is a 10th of the target score, turn color red
    if (currentScore < difficulty.value / 10){
        score.style.color = 'red';
        overlayUsed = false; //Reset overlay if it is less than target
    }
    //Once user has reached halfway of target score turn yellow-ish
    else if (currentScore < difficulty.value / 2){
        score.style.color = 'darkorange';
        overlayUsed = false; //Reset overlay if it is less than target
    }

});

//When user hits score button
scoreReveal.addEventListener('click', () => {
    //Reveal Score
    if (score.style.display === 'none'){
        if(currentLanguage.value === "zho"){
            scoreReveal.innerText = '不显示得分';
        }
        else {
            scoreReveal.innerText = 'Hide Score';
        }
        showCurrentScore = true;
        score.style.display = 'block';
    }
    //Hide score
    else {
        if(currentLanguage.value === "zho"){
            scoreReveal.innerText = ' 显示得分';
        }
        else {
            scoreReveal.innerText = 'Show Score';
        }
        showCurrentScore = false;
        score.style.display = 'none';
    }
});

//Grab all versions of the current verse
function fetchAllVersions(ref, version){
    const verse = paraphraseData.find(verse => verse.ref === ref);
    return verse ? verse[version] : null;
}

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
    return text.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase().split('');
}