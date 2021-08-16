//catching buttons + the message element
let restartBtnEl = document.getElementById('restart');
let giveUpBtnEl = document.getElementById('giveUp');
let winLoseEl = document.getElementById('winLose');

//adding event listeners
restartBtnEl.addEventListener('click', restart);
giveUpBtnEl.addEventListener('click', giveUp);

//moves counter
let moves = 10;

start();
function giveUp() {
    //shows all the hidden cards and the appropriate buttons + message for losing the game
    winLoseEl.textContent = 'You disgrace!';

    giveUpBtnEl.classList.add('hidden');

    let cardsGridElement = document.getElementById('cardsGrid');
    cardsGridElement.removeEventListener('click', selection);

    let allCardsArr = document.querySelectorAll('.card');
    allCardsArr.forEach(el => unhide(el));
}

function restart() {
    //restarts the game by randomizing the grid, hiding the cards and resets the moves + showing appropriate message
    moves = 10;
    winLoseEl.textContent = `You got ${moves} moves!`;

    giveUpBtnEl.classList.remove('hidden');

    let cardsArr = document.querySelectorAll('.card');
    cardsArr.forEach(c => {
        c.classList.remove('success');
        c.classList.remove('select');
    });

    let names = document.querySelectorAll('#cardsGrid h2');
    for (let i = 0; i < names.length; i++) {
        names[i].classList.add('hidden');
        if (i % 2 != 0) {
            names[i].classList.remove('hidden');
        };
    };

    let imgs = document.querySelectorAll('#cardsGrid img');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].classList.add('hidden');
        if (i % 2 != 0) {
            imgs[i].classList.remove('hidden');
        };
    };

    let allCardsArr = Array.from(document.querySelectorAll('.card'));
    let cardsGridElement = document.querySelector('#cardsGrid');
    let allCardsFragment = document.createDocumentFragment();
    cardsGridElement.addEventListener('click', selection);

    allCardsArr.forEach(c => c.remove());
    randomize(allCardsArr);

    allCardsArr.forEach(el => allCardsFragment.appendChild(el));
    cardsGridElement.appendChild(allCardsFragment);
}

function randomize(arr) {
    //randomizes the grid of cards
    let currentIndex = arr.length, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Picks a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swaps it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
    }
    return arr;
}

function hide(element) {
    //hides the img and title
    let names = element.querySelectorAll('h2');
    let images = element.querySelectorAll('img');

    names[0].classList.add('hidden');
    images[0].classList.add('hidden');
    names[1].classList.remove('hidden');
    images[1].classList.remove('hidden');
}

function unhide(element) {
    //shows the hidden img and title
    let names = element.querySelectorAll('h2');
    let images = element.querySelectorAll('img');

    names[0].classList.remove('hidden');
    images[0].classList.remove('hidden');
    names[1].classList.add('hidden');
    images[1].classList.add('hidden');
}

function selection(e) {
    //selects cards
    let selectedCard = e.target.closest('article');

    if (selectedCard === null || selectedCard.classList.contains('select') || selectedCard.classList.contains('success')) {
        return;
    }
    selectedCard.classList.add('select');
    unhide(selectedCard);
    matchCheck();
}

function matchCheck() {
    //checks if there is a match between the first two selected cards and if the game is finished
    let selectedElements = document.querySelectorAll('.select');

    if (selectedElements.length > 2) {
        selectedElements.forEach(el => el.classList.remove('select'));
        return;
    } else if (selectedElements.length == 2) {
        moves -= 1;
        let firstName = selectedElements[0].querySelectorAll('h2')[0];
        let secondName = selectedElements[1].querySelectorAll('h2')[0];

        if (firstName.textContent == secondName.textContent) {
            selectedElements.forEach(el => el.classList.add('success'));
            selectedElements.forEach(el => el.classList.remove('select'));
            unhide(selectedElements[0]);
            unhide(selectedElements[1]);
        }

        setTimeout(() => {
            let allCardsArr = document.querySelectorAll('.card');
            let successCardsArr = document.querySelectorAll('.success');

            allCardsArr.forEach(el => hide(el));
            successCardsArr.forEach(el => unhide(el));
            selectedElements.forEach(el => {
                el.classList.remove('select');
            })
        }, 500);
    };
    movesTracker() ? setTimeout(giveUp, 500) : isDone();
}

function start() {
    //starts the game by randomizing the grid and showing appropriate buttons
    let allCardsArr = Array.from(document.querySelectorAll('.card'));
    let cardsGridElement = document.querySelector('#cardsGrid');
    cardsGridElement.addEventListener('click', selection);

    allCardsArr.forEach(c => c.remove());
    randomize(allCardsArr);

    let allCardsFragment = document.createDocumentFragment();
    allCardsArr.forEach(el => allCardsFragment.appendChild(el));

    cardsGridElement.appendChild(allCardsFragment);
    matchCheck();
}

function isDone() {
    //checks if the game has finished and shows appropriate buttons + message for winning the game
    let allCardsArr = document.querySelectorAll('.success');

    if (allCardsArr.length == 10) {
        restartBtnEl.classList.remove('hidden');
        giveUpBtnEl.classList.add('hidden');
        winLoseEl.textContent = 'You awakaned your Mangekyo sharingan!';
    };
}

function movesTracker() {
    //tracks the moves and if you have none you lose
    moves == 10 ? winLoseEl.textContent = `You got ${moves} moves!` : winLoseEl.textContent = `You got ${moves} moves left!`;
    return moves == 0 ? true : false;
}



