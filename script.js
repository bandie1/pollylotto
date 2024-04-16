document.addEventListener('DOMContentLoaded', function() {
    let roundNumber = 1;
    const countdownElement = document.getElementById('countdown');
    let secondsLeft = 60;
    let prizePool = 100;

    const prizePoolElement = document.getElementById('prize-amount');
    const roundNumberElement = document.getElementById('round-number');
    const roundDateElement = document.getElementById('round-date');

    const updatePrizePool = (amount) => {
        prizePool += amount;
        prizePoolElement.textContent = prizePool;
    };

    const updateRoundInfo = () => {
        roundNumber++;
        roundNumberElement.textContent = roundNumber;
        const currentDate = new Date();
        roundDateElement.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const endRound = () => {
        updateRoundInfo();
        prizePool = 0;
        updatePrizePool(0);
        const historyTableBody = document.querySelector('#history-table tbody');
        historyTableBody.insertAdjacentHTML('beforeend', `<tr class="round-entry"><td>${roundNumber}</td><td>$0</td><td>${roundDateElement.textContent}</td></tr>`);
    };

    const participateInLottery = () => {
        updatePrizePool(5);
        alert('Congratulations! You have participated in the lottery.');
    };

    const showHistory = () => {
        const historyContainer = document.getElementById('history-container');
        const historyTable = document.getElementById('history-table');

        historyContainer.style.display = 'block';
        historyTable.style.display = 'block';
    };

    const countdownInterval = setInterval(() => {
        secondsLeft--;
        countdownElement.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            secondsLeft = 60;
            countdownElement.textContent = 'Time Left: 60 seconds';
            endRound();
        }
    }, 1000);

    const connectToWallet = async () => {
        try {
            const connectedWallet = await tonConnectUI.connectWallet();
            // Do something with connectedWallet if needed
            console.log(connectedWallet);
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    };

    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    const participateBtn = document.getElementById('participate-btn');
    const viewHistoryBtn = document.getElementById('view-history-btn');

    connectWalletBtn.addEventListener('click', connectToWallet);
    participateBtn.addEventListener('click', participateInLottery);
    viewHistoryBtn.addEventListener('click', showHistory);
});
