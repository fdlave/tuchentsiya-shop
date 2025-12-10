const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

async function getRandomCat() {
    try {
        const response = await fetch(CAT_API_URL);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        
        return {
            url: data[0].url,
            width: data[0].width,
            height: data[0].height
        };
    } catch (error) {
        console.error('Ошибка API котиков:', error);
        return {
            url: 'https://cdn2.thecatapi.com/images/MTk1ODY2Mw.jpg',
            width: 640,
            height: 480
        };
    }
}

async function displayCat() {
    const container = document.getElementById('cat-api-content');
    if (!container) return;
    
    container.innerHTML = '<p>🐱 Загрузка милого котика...</p>';
    
    const cat = await getRandomCat();
    
    container.innerHTML = `
        <div class="cat-card">
            <img src="${cat.url}" alt="Случайный котик" class="cat-image" 
                 style="max-width: 100%; border-radius: 8px; margin: 20px 0;">
            <p><em>Изображение загружено с TheCatAPI.com</em></p>
            <button class="button" id="new-cat-btn"> Новый котик</button>
        </div>
    `;
    
    document.getElementById('new-cat-btn')?.addEventListener('click', displayCat);
}

if (document.getElementById('cat-api-content')) {
    document.addEventListener('DOMContentLoaded', displayCat);
}