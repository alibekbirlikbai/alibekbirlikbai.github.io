function formatContentDescription(description) {
    if (!description.endsWith(')')) {
        return description;
    }
    
    let lastOpenParenIndex = -1;
    let count = 0;
    
    // Scan from right to left
    for (let i = description.length - 1; i >= 0; i--) {
        if (description[i] === ')') {
            count++;
        } else if (description[i] === '(') {
            count--;
            if (count === 0) {
                lastOpenParenIndex = i;
                break;
            }
        }
    }
    
    if (lastOpenParenIndex === -1) {
        return description;
    }
    
    // Return everything before the last parentheses
    return description.substring(0, lastOpenParenIndex).trim();
}

export default formatContentDescription