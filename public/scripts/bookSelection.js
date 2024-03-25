//This script handles fetching the verse,book and chapter information for the dropdown menus
const bibleDataUrl = '/jsonFiles/bibleData.json';
const chineseBibleDataUrl = '/jsonFiles/chineseBibleData.json';

let bibleData = {}; // This will hold the JSON data once fetched
let bookSelectButton = document.getElementById('bookSelect');
let chapterSelectButton = document.getElementById('chapterSelect');

let currentLanguage = document.getElementById('languageSelect');

//Get the data as soon as the window has been loaded.
window.onload = function() {
    fetchBibleData();
};

currentLanguage.addEventListener('change', () => {
    //Call the fetch function to get all the names of the books
    fetchBibleData();


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
})

async function fetchBibleData() {
    try {
        bibleData = {}; //Clear Bible data

        let response;
        // Load books based on which language is selected
        if (currentLanguage.value === 'eng') {
            response = await fetch(bibleDataUrl);
        } else if (currentLanguage.value === 'zho') {
            response = await fetch(chineseBibleDataUrl);
        } else {
            console.error('Unknown language selection');
            return; // Stop the function if the selected language is not supported
        }

        bibleData = await response.json();
        populateBooks();
    } catch (error) {
        console.error('Failed to load bible data:', error);
    }
}

//Call JSON file with Bible information and fetch book names
function populateBooks() {

    const bookSelect = document.getElementById('bookSelect');

    // Clear the existing options in the bookSelect dropdown
    while (bookSelect.options.length > 0) {
        bookSelect.remove(0);
    }

    bibleData.books.forEach(book => {
        const option = new Option(book.bookName, book.bookName);
        bookSelect.options.add(option);
    });
}

//Once a book is selected, let the user select a chapter
bookSelectButton.addEventListener('click', () => {

    const bookSelect = document.getElementById('bookSelect');
    const chapterSelect = document.getElementById('chapterSelect');
    chapterSelect.style.visibility = 'visible';

    //Change the "Chapter" text based on current language
    if(currentLanguage.value === "zho"){
        chapterSelect.innerHTML = '<option selected = "selected" hidden>章节</option>'; // Reset chapter dropdown
    }

    else {
        chapterSelect.innerHTML = '<option selected = "selected" hidden>Chapter</option>'; // Reset chapter dropdown
    }


    const selectedBook = bibleData.books.find(book => book.bookName === bookSelect.value);
    if (selectedBook) {
        selectedBook.chapters.forEach(chapter => {
            const option = new Option(chapter.chapter, chapter.chapter);
            chapterSelect.options.add(option);
        });
    }
})

//Once the user has selected a chapter
chapterSelectButton.addEventListener('change', () => {
    const bookSelect = document.getElementById('bookSelect');
    const chapterSelect = document.getElementById('chapterSelect');
    const verseSelect = document.getElementById('verseSelect');

    //Show verse select
    verseSelect.style.visibility = 'visible';

    //Change the "Verse" text based on current language
    if(currentLanguage.value === "zho"){
        verseSelect.innerHTML = '<option  selected = "selected" hidden>圣经</option>'; // Reset verse dropdown
    }

    else {
        verseSelect.innerHTML = '<option  selected = "selected" hidden>Verse</option>'; // Reset verse dropdown
    }

    const selectedBook = bibleData.books.find(book => book.bookName === bookSelect.value);
    if (selectedBook) {
        const selectedChapter = selectedBook.chapters.find(chapter => chapter.chapter === parseInt(chapterSelect.value));
        if (selectedChapter) {
            for (let i = 1; i <= selectedChapter.verseCount; i++) {
                const option = new Option(i);
                verseSelect.options.add(option);
            }
        }
    }
})