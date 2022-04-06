/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

window.addEventListener("load", () => {
  /*
   * Create a list that holds all of your cards
   */
    const [container] = document.getElementsByClassName('container');
    const [deck] = document.getElementsByClassName('deck');
    const lis = document.getElementsByClassName("card");
    const [restart] = document.getElementsByClassName("fa-repeat");
    const [star] = document.getElementsByClassName("fa-star");
    const [starsContainer] = document.getElementsByClassName("stars");
    const [moves] = document.getElementsByClassName("moves");
    const [time] = document.getElementsByClassName('time')
    let matchs = 0, tmpElement, firstTime = true, current_time_played, timer;
  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

    //Timer function provide by the reviewer
    
    function gameTimer(el_display) {
        const game_start_time = new Date().getTime();

        return setInterval(function () {
            let current_time = new Date().getTime();
            current_time_played = current_time - game_start_time;
            let hrs = Math.floor((current_time_played % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let mins = Math.floor((current_time_played % (1000 * 60 * 60 * 24)) / (1000 * 60));
            let secs = Math.floor((current_time_played % (1000 * 60)) / 1000);

            if (secs < 10) {
                secs = '0' + secs;
            }

            el_display.textContent = hrs + ":" + mins + ":" + secs;

            current_time_played = hrs + ":" + mins + ':' + secs;

        }, 500);
        
    }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
    }
    
    function process(object) {
        const tmpLi = object.target
        if (!(tmpLi.tagName.toUpperCase() === 'i'.toUpperCase()) ) {
            if (!(tmpLi.classList.contains('show') && tmpLi.classList.contains('open'))) {
    
                if ((!tmpElement && firstTime)) {
                    firstTime = false;
                    openCard(tmpLi);
                    tmpElement = tmpLi.firstElementChild;
                } else {
                    console.log(tmpLi.tagName);
                    if (tmpElement?.classList.value === tmpLi.firstElementChild.classList.value) {
                        cardMatch(tmpLi);
                        changeFirstElement(tmpElement, lis);
                        tmpElement = null;
                        firstTime = true;
                    } else {
                        openCard(tmpLi);
                        removeElement(tmpLi);
            
                    }
                }
            }
        }
    }

    function createI() {
        const i = document.createElement('i');
        i.classList.add('fa', 'fa-star');

        return i;
    }

    function addStar(limit) {
        if (!(starsContainer.childNodes.length > limit)) {
            starsContainer.appendChild(createI());             
        }
    }

    function displaayStars() {
        if (matchs >= 2 && matchs <= 4) {

            console.log(`Match ${matchs}`)
            addStar(0);
            
        }
        if (matchs > 4 && matchs <=6) {
            // rmChild(starsContainer)
            console.log(`Match ${matchs}`)
            addStar(1);
        }
        
        if (matchs > 6 && matchs <= 8) {
            // rmChild(starsContainer)
            console.log(`Match ${matchs}`)
            addStar(2);
            if (matchs == 8) {
                clearTimeout(timer);
                clearInterval(timer);
                console.log(timer);
                setTimeout(() => {
                    messageDisplay()
                }, 300);
            }
        }
    }

    function openCard(el) {
        el.classList.add('open', 'show');
        moves.textContent = parseInt(moves.textContent) + 1;
    }

    function cardMatch(el) {
        openCard(el)
        matchs = matchs + 1;
        el.classList.add('show');
        displaayStars()
    }

    function removeElement(el) {
        setTimeout(() => {
            el.classList.remove('open', 'show');
        }, 500)
    }

    function changeFirstElement(el, lis) {
        let ls = shuffle([...lis]);
        ls.map(li => {
            if (el.classList.value === li.firstElementChild.classList.value) {
                li.classList.add('match');
            }
        });
    }

    function addElements(els, el) {
        for (const shuffled of els) {
            shuffled.classList.remove('open', 'show', 'match')
            shuffled.addEventListener('click', process)
            el.appendChild(shuffled);
        }
        timer = gameTimer(time);
    }
    /*
    * 
     */
    function init() {
        moves.textContent = 0;
        matchs = 0;
        let shuffleds = shuffle([...lis]);
        rmChild(deck);
        rmChild(starsContainer);
        console.log(star)
        console.log(shuffleds)
        addElements(shuffleds, deck);
        
    }

    function rmChild(el) {
        console.log(el);
        while (el?.firstChild) {
            el?.removeChild(el?.firstChild);
        }
    }

    function messageDisplay() {
        
        const text = `Great Work! Your need ${current_time_played} to do ${matchs} moves to complete to match all symbols.`;
        const textButton = `Play again`;
        const div = document.createElement('div');
        const p = document.createElement('p');
        const button = document.createElement('button');
        p.textContent= text;
        button.textContent = textButton;
        button.classList.add('button');
        button.addEventListener('click', () => {
            container.removeChild(div);
            init()
        });

        div.appendChild(p);
        div.appendChild(button);
        container.appendChild(div);
    }

    init()

    restart.addEventListener('click', init);
});
