import type { ErrorType } from "~types/types";

export default class MateService {
    private domain: string;
    private apiUrl: string;

    constructor() {
      // this.domain = "https://apalevich.com/backend/";
      this.domain = 'http://localhost:8000/';
      this.apiUrl = `${this.domain}mate/analyze`;
    }
  
    async getReview(parsedCode = '') {  
      try {
        const response: Response = await fetch(this.apiUrl, {
          method: "POST",
          body: JSON.stringify({ content: parsedCode }),
          headers: { "Content-Type": "application/json" }
        });
        // if (!response.ok) {
        //   throw new Error(`Request failed with status: ${response.status}`);
        // }
        
        const responseData = await response.json();

        if (response.status !== 200) {
          return { ok: false, error: this._formatError(responseData) };
        }
        return { ok: true, result: this._getExtractedResult(responseData) };
      } catch (error) {
        return { ok: false, error: {message: "Failed to contact the remote server. Please check your internet connection"} };
      }
    }

    _getExtractedResult(responseData) {
      return responseData.choices[0].message.content
    }

    _formatError({icon, message, button}): ErrorType {
      return {
        icon: icon || null,
        message: message || "Unknown error",
        button: button
          ? { 
              url: button.url || null,
              text: button.text || null,
            }
          : null
      };
    }
  }