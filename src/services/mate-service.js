export class MateService {
  constructor(data) {
    this.domain = "https://apalevich.com/backend/";
    this.apiUrl = `${this.domain}mate/analyze`;
    this.parsedCode = data || '';
  }

  getReview() {  
      return fetch(this.apiUrl, {
        method: "POST",
        body: JSON.stringify({ content: this.parsedCode }),
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        const resultsWrapper = { ok: true, responseData };
        return resultsWrapper;
      })
      .catch(error => {
        return { ok: false, text: "Error: " + error.message };
      });
  }
}