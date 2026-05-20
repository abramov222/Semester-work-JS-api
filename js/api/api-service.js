export class ApiService {
    constructor() {
        this.apiKey = '3306f82f';
        this.baseUrl = 'https://www.omdbapi.com/';
    }

    async fetchData(searchQuery, page = 1) {
        const response = await fetch(`${this.baseUrl}?s=${searchQuery}&page=${page}&apikey=${this.apiKey}`);
        const data = await response.json();
        
        if (data.Response === 'False') {
            throw new Error(data.Error);
        }

        return {
            results: data.Search,
            totalResults: parseInt(data.totalResults)
        };
    }
}
