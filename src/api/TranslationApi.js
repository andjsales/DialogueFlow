import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class TranslationApi {
    static token;
    // MARK: request()
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${TranslationApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // MARK: getTranslatedSubtitles()
    static async getTranslatedSubtitles(url) {
        let res = await this.request("translate", { url });
        return res.translatedSubtitles;
    }

    // MARK: detectLanguage()
    static async detectLanguage(data) {
        let res = await this.request("detect-language", data, "post");
        return res.language;
    }

    // MARK: translateText()
    static async translateText(text, targetLang) {
        let res = await this.request("translate-text", { text, targetLang }, "post");
        return res.translatedText;
    }
}

export default TranslationApi;
