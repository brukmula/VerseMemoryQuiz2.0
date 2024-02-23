const helpWindowHTML = `
 <div id = "helpWindow" class ="helpWindow">
        <button id ="closeHelp">X</button>
        <p id = "helpText" class = "helpText"></p>
        <h1 class ="welcome">Welcome to Verse Memory Quiz!</h1>
        <h3>This is a game designed to test Bible memory skills</h3>

        <h2>How to play:</h2>

        <p>To get started, enter your </p>
        

        <p>If you reach the target goal the verse will appear in the  <b>Completed Verse</b> box</p>

        <p>The game can also be played in <b>Verse Reference</b> mode. In this mode the game will only display the verses
        reference without displaying the paraphrases.
        </p>

        <p>
        <select class="dropdown">Select Difficulty
            <option value = "none" selected = "selected" hidden>Select Difficulty</option>
        </select>
           determines how much of the original verse you need to get right to win.
        </p>

        <p>
        <select class ="dropdown">
            <option value="none" selected="selected" hidden>Select Version</option>
        </select>
         lets you choose which translation you want to use.</p>

        <p><button class="helpOtherButtons">Check Verse</button>
            let's you check the original verse. (one use per verse)
        </p>
        <p><button  class="helpOtherButtons">New Verse</button>
            generates a new verse for you.
        </p>

        <p>
            <button class="helpOtherButtons">Change Game Mode</button>
            changes the game from <b>Paraphrase</b> mode to <b>Verse Reference</b> mode and vice versa.
            This button can be used at any time without changing the score, even in the middle of a guess or
            after pressing check verse.
        </p>

        <p>
            <button class="helpOtherButtons">Themes</button>
            will display hints when in <b>Verse Reference</b>, mode specifically themes from the verse.
        </p>

        <p>
            <button class="helpOtherButtons">Other Paraphrases</button>
            lets you cycle through different paraphrases of selected verse.
        </p>

        <p>
            <button class="helpOtherButtons">Themes</button>
            displays hints when the user has selected Verse Reference Mode. Specifically themes from each verse.
        </p>

        <p>
            <button class="helpOtherButtons">Hide Score</button>
            lets you see your score as you type, click to turn on or off.
        </p>
   </div>`;

//Triggered when help button is clicked
function openHelpWindow() {
    // Display the help window
    const helpWindow = document.getElementById('helpWindow');
    helpWindow.style.display = 'block';
    helpWindow.innerHTML = helpWindowHTML;

    // Function to handle clicks outside the help window
    function handleClickOutside(event) {
        if (!helpWindow.contains(event.target)) {
            helpWindow.style.display = 'none';
            // Do not remove the listener; it stays for future clicks
        }
    }

    // Check if the event listener has been added to avoid multiple assignments
    if (!document.__helpWindowClickListenerAdded) {
        document.addEventListener('click', handleClickOutside);
        document.__helpWindowClickListenerAdded = true;
    }

    document.getElementById('closeHelp').addEventListener('click', () => {
        helpWindow.style.display = 'none';
    });
}

// Ensure to stop propagation of the click event on the button that triggers the help window
// This can be done directly in the HTML by adding an onclick attribute to the button or by adding an event listener to the button in JavaScript
document.getElementById('helpButton').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from immediately propagating to document
    openHelpWindow();
});



