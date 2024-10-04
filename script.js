function searchFiles() {
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');

    // Vyčisti předchozí výsledky
    resultsContainer.innerHTML = '';

    // Vytvoř seznam souborů, které se mají prohledávat
    const files = [
        'wiki/page1.html',
        'wiki/page2.html',
        'wiki/page3.html'
    ];

    // Projdi všechny soubory a zkontroluj, zda odpovídají hledanému termínu
    files.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const title = doc.querySelector('h1').innerText.toLowerCase();

                if (title.includes(searchTerm)) {
                    const link = document.createElement('a');
                    link.href = file;
                    link.innerText = title;
                    resultsContainer.appendChild(link);
                    resultsContainer.appendChild(document.createElement('br'));
                }
            })
            .catch(err => console.error(err));
    });
}
