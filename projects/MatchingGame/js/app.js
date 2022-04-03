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
    const [deck] = document.getElementsByClassName('deck');
    const lis = document.getElementsByClassName("card");
    const [restart] = document.getElementsByClassName("fa-repeat");
    const [star] = document.getElementsByClassName("fa-star");
    const [starsContainer] = document.getElementsByClassName("stars");
    const [moves] = document.getElementsByClassName("moves");
    let matchs = 0, tmpElement, firstTime = true;
  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

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
        if (!(tmpLi.classList.contains('show') && tmpLi.classList.contains('open')) || !(tmpLi.classList.contains('match'))) {

            if ((!tmpElement && firstTime)) {
                firstTime = false;
                openCard(tmpLi);
                tmpElement = object.target.firstElementChild;
            } else {
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

    function addElements(els) {
        for (const shuffled of els) {
            shuffled.classList.remove('open', 'show', 'match')
            shuffled.addEventListener('click', process)
            deck.appendChild(shuffled);
        }
    }
    /*
    * 
     */
    function init() {
        moves.textContent = 0;
        // firstTime = true;
        let shuffleds = shuffle([...lis]);
        rmChild(deck);
        rmChild(starsContainer);
        console.log(star)
        addElements(shuffleds);
        
    }

    function rmChild(el) {
        console.log(el);
        while (el?.firstChild) {
            el?.removeChild(el?.firstChild);
        }
    }


    init()

    restart.addEventListener('click', init);
});
