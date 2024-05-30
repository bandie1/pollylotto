document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const historyButton = document.getElementById('history-button');
    const buyTicketsButton = document.getElementById('buy-tickets-button');
    const backButton = document.getElementById('back-button');
    const backButton2 = document.getElementById('back-button2');
    const lotteryNumber = document.getElementById('lottery-number');
    const countdown = document.getElementById('countdown');
    const roundNumber = document.getElementById('round-number');
    const historyList = document.getElementById('history-list');
    const connectWalletButton = document.getElementById('connect-wallet');
    const ticketInput = document.getElementById('ticket-input');
    const submitTicketButton = document.getElementById('submit-ticket');
    const homePage = document.getElementById('home-page');
    const historyPage = document.getElementById('history-page');
    const buyTicketsPage = document.getElementById('buy-tickets-page');

    let timerInterval;
    let currentRound = 1;
    const history = JSON.parse(localStorage.getItem('lotteryHistory')) || [];

    function updateHistory() {
        historyList.innerHTML = '';
        history.forEach(({ round, number }) => {
            const li = document.createElement('li');
            li.textContent = `Round ${round}: ${number}`;
            historyList.appendChild(li);
        });
    }

    updateHistory();

    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        timerInterval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countdown.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval);
                drawLotteryNumber();
            }
        }, 1000);
    }

    function drawLotteryNumber() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const number = Array.from({ length: 3 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        lotteryNumber.textContent = number;
        history.push({ round: currentRound, number });
        localStorage.setItem('lotteryHistory', JSON.stringify(history));
        updateHistory();
        roundNumber.textContent = ++currentRound;
        startTimer(120); // 2 minutes countdown for next draw
    }

    drawButton.addEventListener('click', drawLotteryNumber);

    historyButton.addEventListener('click', () => {
        homePage.classList.add('hidden');
        historyPage.classList.remove('hidden');
    });

    buyTicketsButton.addEventListener('click', () => {
        homePage.classList.add('hidden');
        buyTicketsPage.classList.remove('hidden');
    });

    backButton.addEventListener('click', () => {
        historyPage.classList.add('hidden');
        homePage.classList.remove('hidden');
    });

    backButton2.addEventListener('click', () => {
        buyTicketsPage.classList.add('hidden');
        homePage.classList.remove('hidden');
    });

    submitTicketButton.addEventListener('click', () => {
        const ticket = ticketInput.value.toUpperCase();
        if (ticket.length === 3 && /^[A-Z0-9]+$/.test(ticket)) {
            alert(`Ticket ${ticket} submitted!`);
        } else {
            alert('Please enter a valid 3-character ticket.');
        }
    });

    connectWalletButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                alert('Wallet connected');
            } catch (error) {
                alert('Failed to connect wallet');
            }
        } else {
            alert('MetaMask is not installed');
        }
    });

    startTimer(120); // Start initial timer for 2 minutes
});
