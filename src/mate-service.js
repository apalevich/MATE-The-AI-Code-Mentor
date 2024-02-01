export default class MateService {
    constructor() {
      this.domain = "https://apalevich.com/backend/";
      // this.domain = 'http://localhost:8000/';
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
        return { ok: true, result: this._getExtractedResult(responseData) };
      } catch (error) {
        return { ok: false, result: "Error: " + error.message };
      }
    }

    _getExtractedResult(responseData) {
      return responseData.choices[0].message.content
    }
  }