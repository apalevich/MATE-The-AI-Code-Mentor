export class MateService {
    constructor(data) {
      this.domain = "https://apalevich.com/backend/";
      this.apiUrl = `${this.domain}mate/analyze`;
    }
  
    async mockGetReview() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ ok: true, result: "Mocked review result" });
          }, 1000); // Simulate a 1 second delay
        });
      }
  }