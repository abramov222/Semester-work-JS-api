export class Statistics {
    static calculate(data) {
        if (!data.length) return { count: 0, minYear: '-', maxYear: '-' };

        const years = data.map(item => parseInt(item.Year)).filter(y => !isNaN(y));
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);

        return {
            count: data.length,
            minYear: years.length ? minYear : '-',
            maxYear: years.length ? maxYear : '-'
        };
    }
}
