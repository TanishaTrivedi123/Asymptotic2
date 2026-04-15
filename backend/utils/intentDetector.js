const { YES_KEYWORDS, NO_KEYWORDS } = require("../constants/intentKeywords");

function detectYesNoIntent(text){
    const normalized = text.trim().toLowerCase();

    if(YES_KEYWORDS.has(normalized)){
        return "YES";
    }
    
    if(NO_KEYWORDS.has(normalized)){
        return "NO";
    }

    return "UNKNOWN";
}

module.exports = {detectYesNoIntent}