//This script handles the "peek" window and button, also known as the "Review Verse" button.

const peekButton = document.getElementById('peekButton');
const peekWindow = document.getElementById('peekWindow');
const peekVerse = document.getElementById('peekVerse');
const closePeek = document.getElementById('closePeek');
const versionSelected = document.getElementById('versionSelect');

let peekEnabled = false;
let peekUsed = false;

//Refresh what is in the peek box whenever the current version is changed
versionSelected.addEventListener('change', () => {
    peekVerse.innerText = verseText.textContent;
})

//If user wants to see the current verse let them 'peek'
peekButton.addEventListener('click', () => {
    // Reveal Peek window
    peekWindow.style.display = 'block';

    // If they have pressed the peek button and haven't used it yet
    if (!peekEnabled && !peekUsed) {
        peekVerse.innerText = verseText.innerHTML;
        peekEnabled = true;
    }

    // Prevent adding the event listener multiple times
    if (peekWindow.__peekWindowClickListenerAdded) return;

    // Delay the attachment of the click event listener to document
    setTimeout(() => {
        document.addEventListener('click', function(event) {
            const isClickInsidePeekWindow = peekWindow.contains(event.target) || peekButton.contains(event.target);
            if (!isClickInsidePeekWindow) {
                peekWindow.style.display = 'none';
                peekUsed = true; //Mark as peek when the window is closed
                // Remove the listener if the window is not supposed to be reopened
                document.removeEventListener('click', this);
                peekWindow.__peekWindowClickListenerAdded = false;
            }
        });

        peekWindow.__peekWindowClickListenerAdded = true;
    }, 0); // Execute after the current call stack clears
});