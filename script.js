    
    const data = {
        yourLife : 5, oppLife : 5, result : "", yourTurn : "", oppTurn : ""
    } 

    const savedData = JSON.parse(localStorage.getItem('data'));
    if ( savedData ) {
        Object.assign(data, savedData);
    }

    displayLives();
    displayResult(data.result);

    function runGame(choice) 
    {
        const result = playGame(choice);
        data.result = result;

        localStorage.setItem('data', JSON.stringify(data));

        displayResult(result);
        displayLives();
    }

    function displayResult(result) 
    {   
        const res = document.getElementById('js-result');
        const options = document.querySelectorAll('.js-option');
        const yourTurn = document.getElementById('js-yourTurn');
        const oppTurn = document.getElementById('js-oppTurn');
        const yourTurnTxt = document.getElementById('js-yourTurn-txt');
        const oppTurnTxt = document.getElementById('js-oppTurn-txt');
        const endChoice = document.querySelector('.js-end-choice');

        if ( data.oppLife == 0 ) {
            res.setAttribute('src', `img/victory.png`);
            options.forEach(btn => { btn.disabled = true; });
            endChoice.style.display = 'flex';
        } else if ( data.yourLife == 0 ) {
            res.setAttribute('src', `img/defeat.png`);
            options.forEach(btn => { btn.disabled = true; });
            endChoice.style.display = 'flex';
        } else {
            res.setAttribute('src', `img/${result}.png`);
        }
        
        if ( result ) {
            yourTurn.style.display = 'block'; 
            oppTurn.style.display = 'block';

            yourTurn.setAttribute('src', 'img/' + data.yourTurn + '.png');
            yourTurnTxt.innerText = data.yourTurn;
            oppTurn.setAttribute('src', `img/${data.oppTurn}.png`);
            oppTurnTxt.innerText = data.oppTurn;
        } else {
            yourTurn.style.display = 'none';
            oppTurn.style.display = 'none'
        }
    }

    function displayLives() 
    {
        const lives = document.querySelector('.js-lives');
        const lives2 = document.querySelector('.js-lives2');
        lifeUI(data.yourLife, lives);
        lifeUIOpp(data.oppLife, lives2);
    }

    function lifeUI(lives, elem) 
    {
        let html = '';
        for ( let i = 1 ; i<=5 ; i++ ) {
            if ( i <= lives ) {
                html += "<div class='life-green'></div>";
            } else {
                html += "<div class='life-gray'></div>";
            }
        }
        elem.innerHTML = html;
    } 
    function lifeUIOpp(lives, elem) 
    {
        let html = '';
        for ( let i = 1 ; i<=5 ; i++ ) {
            if ( i <= lives ) {
                html += "<div class='life-red'></div>";
            } else {
                html += "<div class='life-gray'></div>";
            }
        }
        elem.innerHTML = html;
    }

    function showMenu( value )
    {   
        if ( value ) {
            const menuBar = document.querySelector('.menu-bar');
            const menuBar2 = document.querySelector('.menu-bar2');
            const sideBar = document.querySelector('.side-bar');
            menuBar.style.left = '150px';
            menuBar2.style.left = '150px';
            menuBar2.style.zIndex = '1000';
            sideBar.style.left = '0';
        } else {
            const menuBar = document.querySelector('.menu-bar');
            const menuBar2 = document.querySelector('.menu-bar2');
            const sideBar = document.querySelector('.side-bar');
            menuBar.style.left = '20px';
            menuBar2.style.left = '20px';
            menuBar2.style.zIndex = '200';
            sideBar.style.left = '-200px';
        }

    }

    function computerTurn() {
        let n = Math.floor((Math.random() * 3));
        return result = ['rock', 'paper', 'scissor'][n];
    } 

    function playGame( yourTurn ) {
        compTurn = computerTurn();
        data.yourTurn = yourTurn;
        data.oppTurn = compTurn;

        if ( yourTurn === compTurn ) {
            return `TIE`;
        } else if ( 
            (yourTurn === 'rock' && compTurn === 'scissor') ||
            (yourTurn === 'paper' && compTurn === 'rock') || 
            (yourTurn === 'scissor' && compTurn === 'paper') )
        {   
            data.oppLife = Math.max(0, data.oppLife - 1);
            return `WON`;                      
        } else {
             data.yourLife = Math.max(0, data.yourLife - 1);
            return `LOST`;
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const bgm = document.getElementById('bgm');
        bgm.volume = 0.3;
        bgm.play().catch(err => {
        console.warn('Autoplay was blocked:', err);
        });
    });