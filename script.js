const RPS = ['ROCK', 'PAPER', 'SCISSORS'];

let gameStartingTimer = 5;
let countDown = setInterval(() => {
    console.clear();
    console.log('#### loading game ####');
    console.log(gameStartingTimer);
    gameStartingTimer--;
}, 1000);
setTimeout(() => {
    clearInterval(countDown);
    console.clear();
    console.log('######## Rock, Paper, Scissors. START ########');
    game();
}, 6000);

function game () {
    let counter = 1; 
    let playerSelection;
    let computerSelection;
    let playerScore = 0;
    let computerScore = 0;
    let currentRound;

    while (counter <= 5) {
        playerSelection = refine(RPS, prompt(`round ${counter},\nplase type in your choice "R"/"Rock", "P"/"Paper", "S"/"Scissors"`));
        computerSelection = refine(RPS, computerPlay());

        if (playerSelection && playerSelection != 'end') {
            console.log(`round number ${counter}: `);
            console.log(`you: ${playerSelection}, computer: ${computerSelection}`);
            currentRound = playRound(playerSelection, computerSelection);
            
            switch (currentRound[0]) {
                case 0:
                    console.log(currentRound[1]);
                    console.log('---------------------');
                    continue;  
                case 1:
                    playerScore++;
                    console.log(currentRound[1]);
                    console.log(`you: ${playerScore}, computer: ${computerScore}`);
                    counter++;
                    console.log('---------------------');
                    continue;  
                case 2:
                    computerScore++;
                    console.log(currentRound[1]);
                    console.log(`you: ${playerScore}, computer: ${computerScore}`);
                    counter++;
                    console.log('---------------------');
                    continue;  
            }
        } else if (playerSelection == 'end') {
            console.log("######### hope to see you soon. #########");
            break;
        } else {
            alert('please type your choice and pay attention for the spelling of your selection, also you can wright the first letter only of your selection');
            continue;
        }
    }

    if (playerSelection != 'end') {
        console.log(`score -> you: ${playerScore}, computer: ${computerScore}`);

        if (playerScore > computerScore) {
            console.log('YOU WON, YOU\'RE JUST TOO GOOD');
        } else {
            console.log('YOU LOSE, NOW COMPUTERS WILL RULE THE WORLD');
        }
    }
}

function refine (base, input) {
    // cleans up the input and returns the closest / intended input option from the "base" param, otherwise returns null
    // >> spacese, capital and small letters, First Letter selections 
    if (input != null) {
        let refinedInput = input.trim().toUpperCase();
        if (base.includes(refinedInput)) {
            return refinedInput;
        } else if (refinedInput.length == 1) {
            return base.filter(sel => sel[0] == refinedInput)[0];
        } else return null;
    } else {
        if (confirm('are sure you want to quit?')) {
            return 'end';
        } else return refine(RPS, prompt(`plase type in your choice "R"/"Rock", "P"/"Paper", "S"/"Scissors"`));
    }
}

function computerPlay (selection = RPS) {
    // returns a random selection of any array given. 
    return selection[Math.floor(Math.random() * selection.length)];
}

function playRound (player1, player2) {
    // returns an array, winner in index 0 (0 = tie, 1 = player1 win, 2 = player2 win), and message in index 1 (messages are for player 1)
    switch (player1) {
        case player2:
            return [0, 'tie go again'];
        case 'ROCK':
            if (player2 == 'PAPER') {
                return [2, 'You Lose! Paper beats Rock'];
            } else if (player2 == 'SCISSORS') {
                return [1, 'You Win! Rock beats Scissors'];
            }
        case 'PAPER':
            if (player2 == 'SCISSORS') {
                return [2, 'You Lose! Scissors beats Paper'];
            } else if (player2 == 'ROCK') {
                return [1, 'You Win! Paper beats Rock'];
            }
        case 'SCISSORS':
            if (player2 == 'ROCK') {
                return [2, 'You Lose! Rock beats Scissors'];
            } else if (player2 == 'PAPER') {
                return [1, 'You Win! Scissors beats Paper'];
            }
        default:
            return [null, 'Err: no case match'];
    }
}