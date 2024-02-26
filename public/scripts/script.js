//This file handles the bulk of the game logic

//URL for books mapping
const booksRef = 'public/jsonFiles/references.json'
let booksData = {};

//URL for JSON file with paraphrase information
const paraphrasesRef = 'public/jsonFiles/wholeBibleWithVersions.json';
let paraphraseData = {};

// Async function to load and parse the JSON file
async function loadBooksData() {
    try {
        const response = await fetch(booksRef);
        const data = await response.json();
        // Assuming the JSON structure matches your needs directly
        booksData = data;
    } catch (error) {
        console.error('Error loading books data:', error);
    }
}

// Async function to load and parse the JSON file
async function loadParaphraseData() {
    try {
        const response = await fetch(paraphrasesRef);
        const data = await response.json();
        // Assuming the JSON structure matches your needs directly
        paraphraseData = data;
    } catch (error) {
        console.error('Error loading books data:', error);
    }
}

//Call HTML id's
const bookSelect = document.getElementById('bookSelect');
const chapterSelect = document.getElementById('chapterSelect');
const verseSelect = document.getElementById('verseSelect');

const difficultySelect = document.getElementById('difficulty');
const versionSelect = document.getElementById('versionSelect');
const paraphraseButton = document.getElementById('paraphraseButton');

const paraphraseDisplay = document.getElementById('paraphrase');

const verseText = document.getElementById('currentVerse');

//Set variables that will can be changed
let currentDifficulty = 50; //Default difficulty is 50%
let currentVersion = 'esv'; //Default version is ESV

let currentBook = 'Genesis'; //Default book selection is Genesis 1:1
let bookNumber =  "01"; //Set default book number
let chapterNumber = "001"; //Set default chapter number
let verseNumber = "001";

let verseLoaded = false; // If the verse hasn't loaded yet

let currentVerse = "01001001"; //Default verse reference is Genesis 1:1
let paraphrases = {};

//Load current book
bookSelect.addEventListener('change', () => {
    currentBook = bookSelect.value; //Get book string
    bookNumber = fetchBook(booksData,currentBook); //Send to fetch book to see what number is used to reference it

});

//Load in current chapter
chapterSelect.addEventListener('change', () => {
    chapterNumber = formatNumberToThreeDigits(parseInt(chapterSelect.value)); //Change to three digit format
});

//load in current verse
verseSelect.addEventListener('change', () => {
    verseNumber = formatNumberToThreeDigits(parseInt(verseSelect.value));  //Change to three digit format
    currentVerse = (bookNumber + '' + chapterNumber + '' + verseNumber); //This is the # id for the current verse for the JSON file to reference

    //Fetch paraphrases of the verse from JSON
    paraphrases = (fetchVerseParaphrases(currentVerse));

    //Display first paraphrase
    paraphraseDisplay.innerText = paraphrases[paraphraseIndex];

    //Fetch verse from JSON
    verseText.textContent = fetchVerse(currentVerse);
    verseLoaded = true; //Set verse loaded to true

});

//Wait for user to change the difficulty
difficultySelect.addEventListener('change',() => {
    currentDifficulty = parseInt(difficultySelect.value);
});

//Wait for user to select a version
versionSelect.addEventListener('change', () => {
    currentVersion = versionSelect.value.toLowerCase();
    verseText.textContent = fetchVerse(currentVerse);
});

//When other paraphrase button is clicked, display the next paraphrase
paraphraseButton.addEventListener('click', () => {

    //Once the verse is loaded let the user scroll through paraphrases
    if(verseLoaded) {
        browseParaphrases();
        paraphraseDisplay.innerText = paraphrases[paraphraseIndex];
    } else {
        paraphraseDisplay.innerText = 'Please Select a Verse.'
    }
});

function fetchBook(map, book){
    //Iterate over each book in Bible Map
    for (let [key, value] of Object.entries(map)){
        //Check if the current value matches the name we're searching for
        if(value === book) {
            //If a match is found return the book
            return key;
        }
    }
    return null;
}

//Format number to be compatible with id format
function formatNumberToThreeDigits(number) {
    if (number >= 0 && number <= 999) {
        return number.toString().padStart(3, '0');
    } else {
        return 'Invalid input: Number must be between 0 and 999.';
    }
}

//Function to fetch information about verse from JSON
function fetchVerseParaphrases(ref){
    const verse = paraphraseData.find(verse => verse.ref === ref);
    return verse ? verse.paraphrases : null;
}

//Function to fetch verse from JSON
function fetchVerse(ref){

    const verse = paraphraseData.find(verse => verse.ref === ref);
    return verse ? verse[currentVersion] : null;
}

//Keeps track of current Paraphrase being displayed
let paraphraseIndex = 0; //Current index of paraphrase being displayed

//Function is called to go through all possible paraphrases of selected verse
function browseParaphrases () {

    //If the last paraphrase is chosen, go back to the first
    if (paraphraseIndex === 3){
        paraphraseIndex = 0;
      // else find next paraphrase
    } else {
        paraphraseIndex++;
    }
}

//Load data from books and paraphrases
loadBooksData();
loadParaphraseData();
