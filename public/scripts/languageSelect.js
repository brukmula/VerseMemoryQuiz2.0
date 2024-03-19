//This script changes the interface language of the document
// Dev note: Not all variable are declared in this file. Variables are shared from script.js
const languageSelector = document.getElementById('languageSelect');
const logo = document.getElementById('logo');
const helpButton = document.getElementById('helpButton');
const bookSelectLabel = document.getElementById('bookSelectLabel');
const difficultyLabel = document.getElementById("difficultyLabel");
const versionLabel = document.getElementById('versionLabel');
const fuzzLabel = document.getElementById('fuzzLabel');
const paraphraseTitle = document.getElementById('paraphraseTitle');
const answerTitle = document.getElementById('answerTitle');
const overlayText = document.getElementById('overlayText');
const completedVerseTitle = document.getElementById('completedVerseTitle');

//Check to see if language is changed
languageSelector.addEventListener('change', () => {
    switch (languageSelector.value){
        //English interface
        case "eng":
            english();
            break;
        //Chinese Interface
        case "zho":
            chinese();
            break;
    }
});

//If current language is switched to English
function english(){
    logo.innerText = 'Verse Memory Quiz';
    helpButton.innerText = 'Instructions';
    bookSelectLabel.innerText = "Book: ";
    difficultyLabel.innerText = 'Difficulty:';
    versionLabel.innerText = 'Version:'
    peekButton.innerText = "Review Verse";
    fuzzLabel.innerText = "Fuzz Score";
    paraphraseTitle.innerText = "Meaning of Verse";
    paraphraseButton.innerText = "Other Expressions";
    answerTitle.innerText = 'Enter Your Answer';
    overlayText.innerText = 'CORRECT!'
    completedVerseTitle.innerText = "Complete Verse";
}

//If current language is chinese
function chinese(){
    logo.innerText = '圣经经文记忆测验';
    helpButton.innerText = '指示';
    bookSelectLabel.innerText = "书";
    peekButton.innerText = "复习经文";
    fuzzLabel.innerText = "模糊匹配";
    difficultyLabel.innerText = '选择难度';
    versionLabel.innerText = "选择版本";
    paraphraseTitle.innerText = "经文内容";
    paraphraseButton.innerText = "其他释义";
    answerTitle.innerText = "输入您的答案 (猜完后按空格键)";
    overlayText.innerText = "正确的！";
    completedVerseTitle.innerText = "完整经文";
}