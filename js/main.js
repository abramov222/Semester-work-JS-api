import { ApiService } from './api/api-service.js';
import { AppState } from './models/model.js';
import { UIRenderer } from './ui/ui-renderer.js';
import { Statistics } from './utils/statistics.js';

const apiService = new ApiService();
const appState = new AppState();
const uiRenderer = new UIRenderer();

const usernameInput = document.getElementById('username-input');
const startBtn = document.getElementById('start-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const loadMoreBtn = document.getElementById('load-more-btn');

const filterMovie = document.getElementById('filter-movie');
const filterSeries = document.getElementById('filter-series');
const filterGame = document.getElementById('filter-game');

async function loadInitialData(query) {
    uiRenderer.toggleLoader(true);
    try {
        const response = await apiService.fetchData(query, 1);
        appState.setInitialData(response.results, response.totalResults, query);
        updateUI();
    } catch (error) {
        uiRenderer.showError(error.message);
    } finally {
        uiRenderer.toggleLoader(false);
    }
}

async function loadMoreData() {
    const originalText = loadMoreBtn.textContent;
    loadMoreBtn.textContent = 'Загрузка...';
    loadMoreBtn.disabled = true;
    
    try {
        const nextPage = appState.currentPage + 1;
        const response = await apiService.fetchData(appState.currentQuery, nextPage);
        appState.appendData(response.results);
        updateUI();
    } catch (error) {
        console.error(error);
    } finally {
        loadMoreBtn.textContent = originalText;
        loadMoreBtn.disabled = false;
    }
}

function updateUI() {
    const processedData = appState.getProcessedData();
    const stats = Statistics.calculate(processedData);

    uiRenderer.renderStats(stats);
    uiRenderer.renderData(processedData);
    uiRenderer.toggleLoadMore(appState.hasMorePages());
}

startBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        appState.setUsername(username);
        uiRenderer.switchScreens(appState.username);
        loadInitialData(searchInput.value);
    }
});

usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startBtn.click();
    }
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) loadInitialData(query);
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) loadInitialData(query);
    }
});

loadMoreBtn.addEventListener('click', loadMoreData);

[filterMovie, filterSeries, filterGame].forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const type = e.target.id.replace('filter-', '');
        appState.setFilter(type, e.target.checked);
        updateUI();
    });
});

sortSelect.addEventListener('change', (e) => {
    appState.setSort(e.target.value);
    updateUI();
});
