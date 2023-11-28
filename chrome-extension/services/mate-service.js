export default class MateService {

    _apiBase = 'https://apalevich.com/backend/mate';

    getReview = () => {
        const parsedText = document.getElementById("read-only-cursor-text-area");;
    
        if (!parsedText) {
          sendResponse({ ok: false, text: "Error: No code found on the webpage" });
        }
    
        fetch(${this._apiBase}/analyze, {
          method: "POST",
          body: JSON.stringify({
            content: parsedText,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
    }
}