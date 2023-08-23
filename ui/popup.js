document.getElementById("start").addEventListener("click", async () => {
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Loading...";

    const codeContent = await fetchCodeFromGitHub();
    if(!codeContent) {
        resultDiv.innerText = "Not a valid GitHub code page.";
        return;
    }

    try {
        const response = await fetch('YOUR_BACKEND_URL', {
            method: 'POST',
            body: JSON.stringify({ code: codeContent }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        resultDiv.innerText = data.result;
    } catch(error) {
        resultDiv.innerText = "Error processing code.";
    }
});

async function fetchCodeFromGitHub() {
    // Fetch the code content using Chrome Extension's APIs
    // If not GitHub or not code, return null or an appropriate message
}
