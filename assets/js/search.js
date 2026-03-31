// Search functionality
(function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let searchIndex = [];
  
  // Load search index
  fetch('{{ "/assets/js/search-index.json" | relative_url }}')
    .then(r => r.json())
    .then(data => {
      searchIndex = data;
    })
    .catch(err => console.error('Failed to load search index:', err));
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }
      
      const results = searchIndex.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.excerpt.toLowerCase().includes(query)
      ).slice(0, 5);
      
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
      } else {
        searchResults.innerHTML = results.map(r => `
          <a href="${r.url}" class="search-result">
            <strong>${r.title}</strong>
            <p>${r.description || r.excerpt.substring(0, 100)}...</p>
          </a>
        `).join('');
      }
      
      searchResults.style.display = 'block';
    });
    
    // Close search on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        searchResults.style.display = 'none';
      }
    });
  }
})();
