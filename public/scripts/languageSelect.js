//This script changes the interface language of the document
// Dev note: Not all variable are declared in this file. Variables are shared from script.js
const languageSelector = document.getElementById('languageSelect');
const languageSelectLabel = document.getElementById('languageSelectLabel');
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

//Actions when a language is changed
languageSelector.addEventListener('change', () => {

    //Call function that gets the names of the books
    fetchBibleData();

    switch (languageSelector.value){
        //English interface
        case "eng":
            english();
            currentVersion.value = 'esv';

            //Load in book and paraphrase data
            loadBooksData();
            loadParaphraseData();

            break;
        //Chinese Interface
        case "zho":
            chinese();
            currentVersion.value = 'rcuv';

            //Load Chinese Books and paraphrases
            loadChineseBooksData();
            loadChineseParaphrases();

            break;
    }

    //Clear the text from the paraphrase display
    paraphraseDisplay.innerText = ' ';

    //Reset the chapter and verse selection
    chapterSelect.style.visibility = 'hidden';
    verseSelect.style.visibility = 'hidden';

    //Set the verse text to current verse content
    verseText.textContent = fetchVerse(currentVerse);

    //Set peek used to false so the user can check the peek window again
    peekUsed = false;
});

//If current language is switched to English
function english(){
    logo.innerText = 'Verse Memory Quiz';
    helpButton.innerText = 'Instructions';
    bookSelectLabel.innerText = "Book: ";
    difficultyLabel.innerText = 'Difficulty:';
    versionLabel.innerText = 'Version:'
    peekButton.innerText = "Review Verse";
    languageSelectLabel.innerText = "Language: ";
    fuzzLabel.innerText = "Fuzz Score";
    paraphraseTitle.innerText = "Meaning of Verse";
    paraphraseButton.innerText = "Other Expressions";
    answerTitle.innerText = 'Enter Your Answer';
    overlayText.innerText = 'CORRECT!'
    completedVerseTitle.innerText = "Complete Verse";
    score.innerText = 'Score: ' + (currentScore) + '%';

    //Depending on what user wants to see
    if (score.style.display === 'none') {
        scoreReveal.innerText = 'Show Score';
    }
    else {
        scoreReveal.innerText = 'Hide Score';
    }

    //Change Dropdown menu to English Versions of the Bible
    const englishVersions = [
        {value: 'esv', text: 'ESV'},
        {value: 'kjv', text: 'KJV'},
        {value: 'net', text: 'NET'},
        {value: 'niv', text: 'NIV'},
        {value: 'nlt', text: 'NLT'},
    ];

    //Clear previous options
    versionSelect.innerHTML = '';

    //Populate Select with new options
    englishVersions.forEach(option =>{
        const newOption = document.createElement('option');
        newOption.value= option.value;
        newOption.textContent = option.text;
        versionSelect.appendChild(newOption);
    });
}

//If current language is chinese
function chinese(){
    logo.innerText = '圣经经文记忆测验';
    helpButton.innerText = ' 操作指南';
    bookSelectLabel.innerText = "书";
    peekButton.innerText = "复习经文";
    languageSelectLabel.innerText = "选择语言: ";
    fuzzLabel.innerText = "模糊匹配";
    difficultyLabel.innerText = '选择难度';
    versionLabel.innerText = "选择版本";
    paraphraseTitle.innerText = "经文内容";
    paraphraseButton.innerText = "其他释义";
    answerTitle.innerText = "输入您的答案";
    overlayText.innerText = "正确！";
    completedVerseTitle.innerText = "完整经文";
    score.innerText = '分数: ' + (currentScore) + '%';

    currentVersion = 'rcuv';

    //Depending on what user wants to see
    if (score.style.display === 'none') {
        scoreReveal.innerText = '显示得分';
    }
    else {
        scoreReveal.innerText = '不显示得分';
    }

    //Change dropdown menu to Chinese versions of the Bible
    const chineseVersions = [
        {value: 'rcuv', text: '和合本'},
        {value: 'cunps', text: '和修本'},
        {value: 'cnvs', text: '新译本'},
        {value: 'csbs', text: '标准译本'},
        {value: 'cunps', text: '当代译本'},
    ];

    //Clear previous options
    versionSelect.innerHTML = '';

    //Populate Select with new options
    chineseVersions.forEach(option =>{
        const newOption = document.createElement('option');
        newOption.value= option.value;
        newOption.textContent = option.text;
        versionSelect.appendChild(newOption);
    });

}