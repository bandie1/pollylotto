document.addEventListener('DOMContentLoaded', function() {
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://bandie1.github.io/pollylotto/manifest.json',
        buttonRootId: 'connect-wallet-btn'
    });

    // Navigation between pages
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    const page3 = document.getElementById('page-3');

    const goToPage2Btn = document.getElementById('goto-page-2');
    const goToPage3BtnFrom2 = document.getElementById('goto-page-3');
    const goToPage1BtnFrom2 = document.getElementById('goto-page-1');
    const goToPage2BtnFrom3 = document.getElementById('goto-page-2');

    goToPage2Btn.addEventListener('click', () => {
        page1.style.display = 'none';
        page2.style.display = 'block';
    });

    goToPage3BtnFrom2.addEventListener('click', () => {
        page2.style.display = 'none';
        page3.style.display = 'block';
        // Additional functionalities specific to page 3 can be added here
        // For example, fetching and displaying round history
    });

    goToPage1BtnFrom2.addEventListener('click', () => {
        page2.style.display = 'none';
        page1.style.display = 'block';
    });

    goToPage2BtnFrom3.addEventListener('click', () => {
        page3.style.display = 'none';
        page2.style.display = 'block';
    });

    // Functionality specific to Page 2
    const participateBtn = document.getElementById('participate-btn');
    const viewHistoryBtn = document.getElementById('view-history-btn');

    participateBtn.addEventListener('click', () => {
        // Placeholder for participating in the lottery
        alert('Congratulations! You have participated in the lottery.');
    });

    // Functionality specific to Page 3 (View History)
    const goBackBtn = document.getElementById('go-back-btn');

    viewHistoryBtn.addEventListener('click', () => {
        page2.style.display = 'none';
        page3.style.display = 'block';
        // Additional functionalities specific to viewing history can be added here
        // For example, fetching and displaying round history
    });

    goBackBtn.addEventListener('click', () => {
        page3.style.display = 'none';
        page2.style.display = 'block';
    });

    // Functionality specific to connecting wallet (can be placed on Page 1)
    const connectWalletBtn = document.getElementById('connect-wallet-btn');

    connectWalletBtn.addEventListener('click', () => {
        // Placeholder for connecting wallet functionality
        alert('Connect wallet functionality will be implemented here.');
    });
});
