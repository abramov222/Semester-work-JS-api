export class UIRenderer {
    constructor() {
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.mainScreen = document.getElementById('main-screen');
        this.greetingText = document.getElementById('greeting-text');
        this.dataContainer = document.getElementById('data-container');
        this.statsPanel = document.getElementById('statistics-panel');
        this.loader = document.getElementById('loader');
        this.errorMsg = document.getElementById('error-message');
        this.loadMoreBtn = document.getElementById('load-more-btn');
    }

    switchScreens(username) {
        this.welcomeScreen.classList.add('hidden');
        this.mainScreen.classList.remove('hidden');
        this.greetingText.textContent = `Привет, ${username}!`;
    }

    toggleLoader(show) {
        if (show) {
            this.loader.classList.remove('hidden');
            this.dataContainer.classList.add('hidden');
            this.errorMsg.classList.add('hidden');
            this.loadMoreBtn.classList.add('hidden');
        } else {
            this.loader.classList.add('hidden');
            this.dataContainer.classList.remove('hidden');
        }
    }

    showError(message) {
        this.errorMsg.textContent = message === 'Movie not found!' ? 'По вашему запросу ничего не найдено.' : message;
        this.errorMsg.classList.remove('hidden');
        this.dataContainer.innerHTML = '';
        this.statsPanel.innerHTML = '';
        this.loadMoreBtn.classList.add('hidden');
    }

    renderStats(stats) {
        this.statsPanel.innerHTML = `
            <span>На экране: <b>${stats.count}</b></span>
            <span>Самый старый: <b>${stats.minYear}</b></span>
            <span>Самый новый: <b>${stats.maxYear}</b></span>
        `;
    }

    toggleLoadMore(show) {
        if (show) {
            this.loadMoreBtn.classList.remove('hidden');
        } else {
            this.loadMoreBtn.classList.add('hidden');
        }
    }

    renderData(data) {
        this.dataContainer.innerHTML = '';

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/300x450?text=Нет+постера';
            
            const content = document.createElement('div');
            content.className = 'card-content';

            const title = document.createElement('h3');
            title.textContent = item.Title;

            const info = document.createElement('p');
            info.textContent = `Год выпуска: ${item.Year}`;
            
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = item.Type === 'movie' ? 'Фильм' : item.Type === 'series' ? 'Сериал' : 'Игра';

            content.appendChild(title);
            content.appendChild(info);
            content.appendChild(badge);
            
            card.appendChild(img);
            card.appendChild(content);

            this.dataContainer.appendChild(card);
        });
    }
}
