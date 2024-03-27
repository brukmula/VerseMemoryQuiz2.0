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

//Check to see if language is changed
languageSelector.addEventListener('change', () => {
    switch (languageSelector.value){
        //English interface
        case "eng":
            english();
            currentVersion.value = 'rcuv';
            break;
        //Chinese Interface
        case "zho":
            chinese();
            currentVersion.value = 'esv';
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
    languageSelectLabel.innerText = "Language: ";
    fuzzLabel.innerText = "Fuzz Score";
    paraphraseTitle.innerText = "Meaning of Verse";
    paraphraseButton.innerText = "Other Expressions";
    answerTitle.innerText = 'Enter Your Answer';
    overlayText.innerText = 'CORRECT!'
    completedVerseTitle.innerText = "Complete Verse";

    //Depending on what user wants to see
    if (score.style.display === 'none') {
        scoreReveal.innerText = 'Hide Score';
    }
    else {
        scoreReveal.innerText = 'Show Score';
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
    overlayText.innerText = "正确的！";
    completedVerseTitle.innerText = "完整经文";

    //Depending on what user wants to see
    if (score.style.display === 'none') {
        scoreReveal.innerText = '不显示得分';
    }
    else {
        scoreReveal.innerText = '显示得分';
    }

    //Change dropdown menu to Chinese versions of the Bible
    //Change Dropdown menu to English Versions of the Bible
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