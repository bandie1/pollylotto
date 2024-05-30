document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const lotteryNumber = document.getElementById('lottery-number');
    const countdown = document.getElementById('countdown');
    const historyList = document.getElementById('history-list');
    const connectWalletButton = document.getElementById('connect-wallet');

    let timerInterval;
    const history = JSON.parse(localStorage.getItem('lotteryHistory')) || [];

    // Initialize history
    function updateHistory() {
        historyList.innerHTML = '';
        history.forEach(number => {
            const li = document.createElement('li');
            li.textContent = number;
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
                drawButton.disabled = false;
            }
        }, 1000);
    }

    function drawLotteryNumber() {
        const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        lotteryNumber.textContent = number;
        history.push(number);
        localStorage.setItem('lotteryHistory', JSON.stringify(history));
        updateHistory();
        drawButton.disabled = true;
        startTimer(60); // 1 minute countdown for next draw
    }

    drawButton.addEventListener('click', drawLotteryNumber);

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

    // Start initial timer
    startTimer(60);
});
