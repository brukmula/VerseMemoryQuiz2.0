//This script segments Chinese texts

userInput.addEventListener('input', () => {

    const reference = verseText.textContent;

    //If they pressed the peek button, turn it off as soon as they start typing
    let segmentedText = handleSegmentation(userInput.value);
    let segmentedReference =  chineseToArray(reference);

    segmentedText.then(value => {
        console.log("User's text segmented: ", (value));
        const candidate = value;
        console.log((chineseBleuScore(candidate, segmentedReference) * 100));
    })

});

//This function changes the Chinese Reference texts to arrays
function chineseToArray (sentence){
    // Define a list of common Chinese punctuation marks to remove
    const punctuation = "，。！？；：「」『』（）《》【】、";

    // Remove punctuation from the sentence
    let cleanSentence = sentence.split('').filter(char => !punctuation.includes(char)).join('');

    // Split the sentence into words assuming spaces as delimiters
    const wordsArray = cleanSentence.split(' ').filter(word => word.trim() !== '');

    return wordsArray;
}

async function handleSegmentation(inputText) {
    try {
        const segmentedArray = await segmentChineseText(inputText);
        return segmentedArray;
    }catch (error){
        console.error('Error during text segmentation: ', error);
    }
}

//Load in JSON from given URL into project
async function loadJsonContent(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error fetching file from ${url}: ` ,err);
    }
}

//Segmentation for the Chinese text
async function segmentChineseText(inputText) {
    //Load JSON content from urls
    //Load in dictionary file
    const wordList = new Set(await loadJsonContent('/jsonFiles/ChineseWords.json'));
    //Load in overlap file
    const overlapContent = await loadJsonContent('/jsonFiles/overlap.json');
    //Create a map for overlaps
    const overlapMap = new Map(Object.entries(overlapContent));

    //If both list are empty return an empty array
    if(!wordList || !overlapMap) return [];

    let segmentedWords = [];

    for(let i =0; i<inputText.length; i++){
        let found = false; //Set to true once word has been found
        //Compare the inputted text to both the dictionary and the inputted text
        for (let j = Math.min(inputText.length - i, 10); j > 0; j--){
            let potentialWord = inputText.slice(i,i+j);
            if(wordList.has(potentialWord)){
                segmentedWords.push(potentialWord); //Push word to list of segmented words
                i += j-1;
                found = true;
                break;
            }
        }
        if (!found){
        }
    }

    //Apply replacements based on overlapMap
    let processedWords = segmentedWords.map(word => overlapMap.get(word) || word);

    return processedWords;
}