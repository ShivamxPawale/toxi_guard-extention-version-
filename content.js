// Dictionary 
const harmfulWords = {
    "shit": "bad (replaced)",
    "fuck": "oh no (replaced)",
    "disgusting": "very bad (replaced)",
    "creepy": "scary (replaced)",
    "boring": "not interesting (replaced)",
};

// Function to sanitize text
function sanitizeText(text) {
    for (let [badWord, goodWord] of Object.entries(harmfulWords)) {
        let regex = new RegExp(badWord, 'gi');
        text = text.replace(regex, goodWord);
    }
    return text;
}

// Function to sanitize nodes
function sanitizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = sanitizeText(node.textContent);
    } else {
        node.childNodes.forEach(sanitizeNode);
    }
}

// Observer DOM for changes in text
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                const startTime = performance.now(); // Start timing
                sanitizeNode(node); // Sanitize the new node
                const endTime = performance.now(); // End timing
                console.log(`Time taken to sanitize: ${endTime - startTime} milliseconds`);
            });
        }
    });
});

// Start observing the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Sanitize the existing content on the page
const startTime = performance.now(); // Start timing for initial load
sanitizeNode(document.body); 
const endTime = performance.now(); // End timing for initial load
console.log(`Time taken to sanitize initial content: ${endTime - startTime} milliseconds`);
