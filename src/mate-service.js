export class MateService {
    constructor(data) {
      this.domain = "https://apalevich.com/backend/";
      this.apiUrl = `${this.domain}mate/analyze`;
    }
  
    async getReview(parsedCode = '') {  
        try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          body: JSON.stringify({ content: parsedCode }),
          headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const responseData = await response.json();
        const resultsWrapper = { ok: true, result: this._extractResult(responseData) };
        return resultsWrapper;
      } catch (error) {
        return { ok: false, text: "Error: " + error.message };
      }
    }

    _extractResult(responseData) {
      return responseData.choices[0].message.content
    }
  }