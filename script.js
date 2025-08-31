
document.addEventListener('DOMContentLoaded', () => {



    
    const typewriterElement = document.getElementById('typewriter-text');
    const textToType = "Your Personal News Dashboard.";
    const typingSpeed = 100;
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typewriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    
    type();



    const apiKey = 'db2aa756ce7fd507ae0c6a2b46f53f8e'; // <--  My GNews API Key
    const trendingTagsContainer = document.getElementById('headline-main');
    const headlinesContainer = document.querySelector('.top-headlines'); 


    async function fetchNewsByTopic(topic) {
        headlinesContainer.innerHTML = '<p style="color: white; font-size: 1.5rem; text-align: center;">Loading news...</p>';
        
        const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(topic)}&lang=en&country=in&token=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("API key is missing or invalid. Please check your script.js file.");
                }
                throw new Error(`API request failed: ${response.status}`);
            }
            const data = await response.json();
            
            displayHeadlines(data.articles);

        } catch (error) {
            console.error("Failed to fetch news:", error);
            headlinesContainer.innerHTML = `<p style="color: white; text-align: center;">${error.message}</p>`;
        }
    }

    function displayHeadlines(articles) {
        headlinesContainer.innerHTML = '';

        if (!articles || articles.length === 0) {
            headlinesContainer.innerHTML = '<p style="color: white; text-align: center;">No articles found for this topic.</p>';
            return;
        }

        const mainStory = articles[0];
        const mainStoryImage = mainStory.image || 'https://via.placeholder.com/800x450.png?text=Image+Not+Available';
        const mainStoryHTML = `
            <div class="headline-main">
                <img src="${mainStoryImage}" alt="${mainStory.title}">
                <h3 class="bighead">${mainStory.title}</h3>
                <p class="source">${mainStory.source.name} · ${new Date(mainStory.publishedAt).toLocaleDateString()}</p>
                <p class="description">${mainStory.description || 'No description available.'}</p>
                <a href="${mainStory.url}" target="_blank" class="readmore">Read more</a>
            </div>
        `;

        const smallerHeadlines = articles.slice(1, 4);
        let smallerHeadlinesHTML = '<div class="headline-list">';
        smallerHeadlines.forEach(article => {
            smallerHeadlinesHTML += `
                <div class="headline-card">
                    <h4>${article.title}</h4>
                    <p class="source">${article.source.name} · ${new Date(article.publishedAt).toLocaleDateString()}</p>
                    <a href="${article.url}" target="_blank" class="readmore">Read more</a>
                </div>
            `;
        });
        smallerHeadlinesHTML += '</div>';

        headlinesContainer.innerHTML = mainStoryHTML + smallerHeadlinesHTML;
    }

    
    fetchNewsByTopic('India');

});
