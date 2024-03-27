//This script calculates the BLEU score of two segmented Chinese texts


//Remove punctuations before calculating score
function removeChinesePunctuation(text) {
    // List of common Chinese punctuation marks as a regular expression
    const punctuation = /[\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\uff5b\uff5d]/g;
    // Remove the punctuation marks from the word
    return text.replace(punctuation, '');
}

//Check if input is an array or a string
function cleanInput(input) {
    // Determine if input is a string or already an array
    if (typeof input === 'string') {
        // Remove punctuation and then split by spaces (assuming space-delimited words)
        return removeChinesePunctuation(input).split(/\s+/);
    } else if (Array.isArray(input)) {
        // Map through the array and remove punctuation from each word
        return input.map(word => removeChinesePunctuation(word));
    } else {
        // In case the input is neither a string nor an array, log an error or handle as needed
        console.error('Input must be a string or an array of strings.');
        return []; // Return an empty array to prevent further errors
    }
}
function isChinese(text) {
    // Regular expression to check for Chinese characters
    // This includes characters in the range of common CJK Unified Ideographs
    // but may not cover all possible Chinese characters.
    return /[\u3400-\u9FBF]/.test(text);
}

function chineseBleuScore(candidate, reference) {

    // Clean both candidate and reference inputs
    const candidateArray = cleanInput(candidate);
    const referenceArray = cleanInput(reference);

    // Check if both texts are Chinese
    if (!isChinese(candidate) || !isChinese(reference)) {
        console.log("One or both of the texts are not in Chinese.");
        return 0; // Or any other value you consider appropriate for this case
    }

    //Assuming both the candidate and reference texts are already segmented

    //Calculate the unigram precision
    let matchCount = 0;
    candidateArray.forEach(word => {
        if(referenceArray.includes(word)) {
            matchCount++;
        }
    });

    // Additive smoothing
    const smoothingFactor = 0.5; // This can be adjusted based on the expected error rate or data distribution
    const smoothedMatchCount = matchCount + smoothingFactor;
    const smoothedTotalCount = candidateArray.length + smoothingFactor * referenceArray.length;

    const precision = smoothedMatchCount / smoothedTotalCount;

    // Calculate brevity penalty
    const brevityPenalty = candidateArray.length < referenceArray.length ? Math.exp(1 - referenceArray.length / candidateArray.length) : 1;

    // Calculate Bleu score
    const bleuScore = brevityPenalty * precision;

    return bleuScore;
}