//This script handles fetching the verse,book and chapter information for the dropdown menus
const bibleDataUrl = 'public/jsonFiles/bibleData.json';

let bibleData = {}; // This will hold the JSON data once fetched
let bookSelectButton = document.getElementById('bookSelect');
let chapterSelectButton = document.getElementById('chapterSelect');

//Get the data as soon as the window has been loaded.
window.onload = function() {
    fetchBibleData();
};

async function fetchBibleData() {
    try {
        const response = await fetch(bibleDataUrl);
        bibleData = await response.json();
        populateBooks();
    } catch (error) {
        console.error('Failed to load bible data:', error);
    }
}

//Call JSON file with Bible information and fetch book names
function populateBooks() {
    const bookSelect = document.getElementById('bookSelect');
    chapterSelect.innerHTML = '<option selected = "selected" hidden>Select a Book</option>';
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
    chapterSelect.innerHTML = '<option selected = "selected" hidden>Chapter</option>'; // Reset chapter dropdown
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

    verseSelect.innerHTML = '<option  selected = "selected" hidden>Verse</option>'; // Reset verse dropdown
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
