//Triggered when help button is clicked
function openHelpWindow() {
    // Display the help window
    const helpWindow = document.getElementById('helpWindow');
    helpWindow.style.display = 'block';

    //Show help window if selected language
    if(languageSelector.value === 'eng'){
        helpWindow.innerHTML = helpWindowHTMLEnglish;
    }
    else if(languageSelector.value === 'zho'){
        helpWindow.innerHTML = helpWindowHTMLChinese;
    }


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


//This script hold the HTML and logic for the "Instructions" window
const helpWindowHTMLEnglish = `
 <div id = "helpWindow" class ="helpWindow">
        <button id ="closeHelp">X</button>
        <p id = "helpText" class = "helpText"></p>
        <h1 class ="welcome">Welcome to Verse Memory Quiz!</h1>
        <h3>This is a detailed set of introduction to the Bible Verse Memory Quiz Game.</h3>

        <h4>Getting Started</h4>

        <p>Welcome to the Bible Verse Memory Quiz, an interactive game designed to test and improve your memory of Bible
         verses. Here's how you can begin your journey into scripture memorization:
        </p>
        
        <h4>Selecting a Verse</h4>
        <div>
            
        <p>
            <label for="helpSelectBook"><b>Book: </b></label>
            <select id = "helpSelectBook" class="select">
                <option selected = "selected" hidden>Genesis</option>
            </select>
        </p>
            <p>Start the game by choosing a book, chapter, and verse from the Bible that you wish to memorize or test yourself on. 
            This might be a necessary step towards engaging with the Word in a deep and meaningful way.
            </p>
        </div>

        <h4>Understanding the Verse</h4>
        <p>Upon selection, a paraphrased version of your chosen verse will appear in the <u>Meaning of Verse</u> box located on the left side of the screen. 
        This paraphrase serves to provide you with an interpretation of the verse's message, reminding you of the content of the verse
        while you  attempt to recall the exact wording.
        </p>
        
        <p>Next to the Meaning of Verse text, is this button:  <button class="button"> Other Expressions</button> </p>
        <p>
        This button enables you to view alternative paraphrases of the selected verse. 
        This feature helps you recall the meaning of the verse by interpreting the verse from multiple perspectives.
        </p>

        <h4>Customizing Your Experience</h4>   
        <p>To make your quiz experience more tailored and beneficial, consider the following customizable features</p>
        
        <h4>Difficulty Selection</h4>
        <label for="helpSelectDifficulty"><b>Difficulty: </b></label>
            <select id = "helpSelectDifficulty" class="select">
                <option selected = selected hidden>50%</option>
            </select>
        
        <p>
        This feature adjusts how much of the verse text you need to recall in order to complete the task.
        The difficulty is gauged using a simplified concept similar to the accuracy measurement used in machine  translation, where your response is compared to the original text to determine similarity. 
        The closer your recollection is to the original verse, the higher your score.
        </p>
        
        <h4>Version Selection</h4>
        <label for="helpSelectVersion"><b>Version:</b></label>
        <select id = "helpSelectVersion" class="select">
            <option selected = selected hidden>ESV</option>
        </select>
        <p>Different translations of the Bible offer various interpretations and wordings of verses. 
        Use this option to choose the version of the Bible you're most familiar with or wish to challenge yourself with.
        </p>
        
        <h4>Fuzz Switch</h4>
        <label for="helpToggle"><b>Fuzz Score</b></label> 
        <div id = "helpToggle" class="toggle">
            <input type="checkbox" id="btnHelp">
            <label for="btnHelp">
                <span class="thumb"></span>
            </label>
            <div class="light"></div>

        </div>
        
        <p> Activating this switch allows your answers to be checked against all available translations of the Bible.
         This feature is particularly useful if you're recalling a verse from a different translation than the one selected, ensuring you're not penalized for version-specific wording differences.
        </p>
        
        <h3>Engaging with the Quiz</h3>
        <h4>As you dive into the memory quiz, here's what to expect:</h4>
        
        <h4>Entering Your Answer</h4>
        <p>The <u>Enter Your Answer</u> box on the right side of the screen is where you'll type what you believe the original verse says.
        As you input your answer, you'll notice your score fluctuating. 
        The score increases with the correct amount of your recollection, providing feedback to your progress for encouragement.
        </p>
        
        <h4>Reviewing the Verse</h4>
        <p>If you need a refresher before starting, the <button class="peekButton" style="float: none">Review Verse</button> button at the top of the screen, adjacent to the verse selection in the navigation bar, allows a sneak peek at the verse.
         Be mindful that once you begin typing your answer, the ability to view the verse again is restricted to ensure a fair challenge.
        </p>
        
        <h4>Score Visibility</h4>
        <p>
        The <button class ="button">Hide/Show Score</button> button lets you toggle the visibility of your score. 
        This option allows you to focus on recall without the pressure of a live score or, conversely, to monitor your progress in real-time.
        </p>
        
        <h4>Achieving Correctness</h4>
        <p>
        The difficulty level you've chosen dictates the score threshold for a correct answer. 
        Upon reaching the required score, a congratulatory message of "Correct!" is displayed, followed by the revelation of the complete verse at the bottom of the screen under <u>Complete Verse.</u>
        </p>
           
        
   </div>`;

//This script hold the HTML and logic for the "Instructions" window
const helpWindowHTMLChinese = `
 <div id = "helpWindow" class ="helpWindow">
        <button id ="closeHelp">X</button>
        <p id = "helpText" class = "helpText"></p>
        <!-- Welcome to-->
        <h1 class ="welcome">欢迎参加经文记忆测验！</h1>
        <!-- This is a detailed --> 
        <h3>这是对《圣经经文记忆测验游戏》的详细介绍。</h3>

        <h4>开始</h4>

        <!-- Information about the game -->
        <p>欢迎参加《圣经经文记忆测验》，这是一个旨在测试和提高你对圣经经文记忆的互动游戏。以下是你开始记忆经文之旅的方法：
        </p>
        
        <!-- Selecting a Verse -->
        <h4>选择经文</h4>
        <div>
            
        <p>
            <label for="helpSelectBook"><b>书卷: </b></label>
            <select id = "helpSelectBook" class="select">
                <option selected = "selected" hidden>创世纪</option>
            </select>
        </p>
            <p>请选择你希望记忆或测试自己的圣经经文（书-章-节）。</p>
        </div>


        <h4>经文内容提示 </h4>
        <p>选择后，所选经文的释义 (paraphrase) 版本将出现在屏幕左侧的“经文内容”框中, 帮助你回忆经文的内容。
        </p>
        
        <!-- Other paraphrases -->
        <button class="button"> 其他表达 </button> </p>
        <p>
        此按钮允许你查看所选经文的其他释义, 从不同的角度帮助你回忆经文内容。
        </p>

        <!-- Customizing your experience -->
        <h4>自定义选项</h4>   
        <p>为了使你的测验体验更加个性化和有益，请考虑以下可定制的功能 </p>
        
        <!-- Difficulty Select -->
        <h4>难度选择 </h4>
        <label for="helpSelectDifficulty"><b>难度: </b></label>
            <select id = "helpSelectDifficulty" class="select">
                <option selected = selected hidden>50%</option>
            </select>
        <p>
        调整你通过测试所需的得分。你输入的文字会与正确的译文进行比较，计算相似度。你输入的文字越接近标准答案，你的得分就越高
        </p>
        
        <!-- Version Select -->
        <h4>选择版本</h4>
        <label for="helpSelectVersion"><b>版本:</b></label>
        <select id = "helpSelectVersion" class="select">
            <option selected = selected hidden>例</option>
        </select>
        <p>选择你要记住经文的版本
        </p>
        
        <!-- Fuzz Switch -->
        <h4>模糊开关</h4>
        <label for="helpToggle"><b>模糊得分</b></label> 
        <div id = "helpToggle" class="toggle">
            <input type="checkbox" id="btnHelp">
            <label for="btnHelp">
                <span class="thumb"></span>
            </label>
            <div class="light"></div>

        </div>
        
        <!-- Activating this Switch -->
        <p>激活此开关允许你的答案与各种不同的译本相比较，使用任何版本的措辞都可以得分。 
        </p>
        
        <!-- Engaging with the Quiz -->
        <h3>参与测验 </h3>
        <h4>当你深入测验时，以下是你可以期待的：</h4>
        
        <!-- Entering your answer -->
        <h4>输入您的答案</h4>
        <p>在屏幕右侧的<button class="peekButton" style="float: none">输入你的答案</button>框中，输入你所记得的经文内容。框下的分数会随着你输入的内容而变化。回忆正确的内容越多，得分就越高。
        </p>
        
        <!-- Reviewing the Verse -->
        <h4>复习经文</h4>
        <p>如果你在开始前需要复习，请点击导航栏中经文选择旁边的,  <button class="peekButton" style="float: none">复习经文</button>按钮，可以再看一次要记的经文。一旦你开始输入你的答案，就不能反复查看标准答案。
        </p>
        
        <!-- Score Visibility -->
        <h4>显示得分</h4>
        <p>
        <button class ="button">显示得分/不显示得分</button>按钮决定是否要看分数
        </p>
        
        
        <!--- Achieving Correctness  -->
        <h4>完成测试</h4>
        <p>
        你所输入的内容达到所需得分后，屏幕底部会显示“正确！”的祝贺信息，并在“完整经文”下显示出完整的经文。
        </p>
           
        
   </div>`;


