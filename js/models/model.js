export class AppState {
    constructor() {
        this.username = '';
        this.data = [];
        this.currentQuery = '';
        this.currentPage = 1;
        this.totalResults = 0;
        this.filters = {
            movie: true,
            series: true,
            game: true
        };
        this.sortType = 'default';
    }

    setUsername(name) {
        this.username = name;
    }

    setInitialData(data, totalResults, query) {
        this.data = data;
        this.totalResults = totalResults;
        this.currentQuery = query;
        this.currentPage = 1;
    }

    appendData(newData) {
        this.data = [...this.data, ...newData];
        this.currentPage++;
    }

    setFilter(type, value) {
        this.filters[type] = value;
    }

    setSort(type) {
        this.sortType = type;
    }

    getProcessedData() {
        let processed = this.data.filter(item => {
            return this.filters[item.Type] === true;
        });

        if (this.sortType === 'year-asc') {
            processed.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        } else if (this.sortType === 'year-desc') {
            processed.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        }

        return processed;
    }
    
    hasMorePages() {
        return this.data.length < this.totalResults;
    }
}
