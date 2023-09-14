function parseTextFromDiv() {
    // Get the div element by its ID
    const divElement = document.getElementById("read-only-cursor-text-area");

    if (divElement) {
        // Get the text content of the div
        const text = divElement.textContent;

        // Do something with the text, for example, log it to the console
        console.log("Parsed text:", text);

        // Return the parsed text if needed
        return text;
    } else {
        // Handle the case when the element is not found
        console.error("Element with ID 'read-only-cursor-text-area' not found");
        return null; // or return an error message or handle it as appropriate
    }
}

// Call the function to parse text from the div
const parsedText = parseTextFromDiv();
