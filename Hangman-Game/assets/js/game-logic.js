var characters = ["goku", "vegeta", "gohan", "trunks", "gotenks", "vegito", "piccolo", "frieza", "buu", "cell", "bulma", "videl", "chichi", "beerus", "whis"]
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var newGameButton = document.getElementById("new-game")

// add event listeners to New Game button and space bar
newGameButton.addEventListener("click", newGame) // new game button event listener
document.addEventListener("keyup", function (event) { // space bar event listener
  if (event.key === " ") {
    newGame()
  }
})

newGame()

document.onkeyup = function (event) { // fire game logic function on lowercase letter keyup
  var guess = event.key
  var arr = document.querySelectorAll("h3")
  var hiddenCount = 0
  runGameLogic(guess, hiddenCount, arr)
}

//---------------------- define all functions below this line -------------------------

function newGame() { // clears and sets new active word, fills underscores into letter guess section
  animateBG()
  inPlay = true
  clearAll()
  setWord()
  setGuesses(5)
  setLetterButtons()
  $('.wrapper').removeClass("inverse")
  $(".ParalaxImage1").attr("class", "ParalaxImage1")
  for (i = 0; i < activeWord.length; i++) {
    var node = document.createElement("h3")
    var textNode = document.createTextNode("_")
    node.appendChild(textNode)
    document.getElementById("letter-section").appendChild(node)
  }

  var arr = document.querySelectorAll("h3")

  for (i = 0; i < arr.length; i++) { // set class of "letter-" + letter for each h3 in #letter-section div
    letterPosition = "letter-" + activeWord[i]
    arr[i].setAttribute("class", letterPosition + ' hidden')
  }
}

function runGameLogic(guess, hiddenCount, arr) { // main game logic, open for details
  if (inPlay && /^[a-z]{1}/.test(guess)) { // if game is active, use regex to check that guess is a single lowercase letter
    $('#bank-' + guess).text("_"); // update letter bank to remove used letters
    if (activeWord.includes(guess)) { // determine whether guess is in active word, update letter guess section or decrement remaining guesses appropriately
      for (i = 0; i < activeWord.length; i++) {
        if (guess === activeWord[i]) {
          arr[i].innerText = activeWord[i]
          letterPosition = "letter-" + activeWord[i]
          arr[i].setAttribute("class", letterPosition + " revealed") // change class of revealed letter to its identity
        }
      }
      for (i = 0; i < activeWord.length; i++) {
        if (arr[i].innerText === "_") { // increment variable that counts remaining hidden letters
          hiddenCount++
        }
      }

      var hidden = $('.hidden') // create array of hidden letter elements to check for duplicates
      var hiddenNames = []
      for (i = 0; i < hidden.length; i++) {
        hiddenNames.push(hidden[i].className)
      }

      if (hiddenCount === 0 || (hiddenCount === 1 && duplicateCheck(hiddenNames))) { // win condition, change game status to inactive
        scrollBG(activeWord)
        inPlay = false
      }
    } else {
      guessesRemaining--
      setGuesses()
    }

    if (guessesRemaining <= 0) { // game over: change game status to inactive and reveal active word
      inPlay = false
      $('.wrapper').addClass("inverse") // toggle inverse color palette to indicate game loss
      for (i = 0; i < activeWord.length; i++) {
        arr[i].innerText = activeWord[i]
      }
    }
  }
}

function setLetterButtons() { // add event listeners to letters in bank to allow for clicking to fire game logic function
  for (i = 0; i < alphabet.length; i++) {
    document.getElementById('bank-' + alphabet[i]).onclick = function () { // fire game logic function on bank letter click
      var guess = this.innerText[0].toLowerCase() // using index 0 to grab letter without space
      var arr = document.querySelectorAll("h3")
      var hiddenCount = 0
      runGameLogic(guess, hiddenCount, arr)
    }
  }
}

function clearAll() { // clears letter guess section of all letters, resets letter bank
  document.getElementById("letter-section").innerHTML = ""
  var letterBank = $("#letter-bank")
  letterBank.html('')
  for (i = 0; i < alphabet.length; i++) {
    var letter = $('<span>');
    letter.attr("class", "bank-letter")
    letter.attr("id", "bank-" + alphabet[i])
    letter.text(alphabet[i].toUpperCase() + ' ')
    letterBank.append(letter)
  }
}

function setWord() { // sets activeWord to name of random character from object array
  activeWord = characters[Math.floor(Math.random() * characters.length)]
}

function setGuesses(x) { // updates number of guesses to value of guessesRemaining, can update guessesRemaining to value of optional argument, handles graphics for remaining guesses
  if (x) {
    guessesRemaining = x
  }
  document.getElementById("guesses").innerText = "Guesses Remaining: " + guessesRemaining
  $('#guesses').text('Guesses Remaining: ')
  for (i = 0; i < guessesRemaining; i++) {
    $('#guesses').append('<span class="dragon-ball">O</span>')
  }
}

function animateBG() { // animate horizontal scrolling of background
  $('#bg').animate({ backgroundPosition: '+=100000px' }, 5000000, 'linear')
}

function scrollBG(char) { // adds css class for corresponding character background to game window upon victory
  $(".ParalaxImage1").addClass(char)
  $(".ParalaxImage1").animate({ backgroundPositionY: '+=1000px' }, 50000, 'linear')
}

function duplicateCheck(arr) { // checks for duplicates in an array and returns a boolean
  var counts = []
  for (var i = 0; i <= arr.length; i++) {
    if (counts[arr[i]] === undefined) {
      counts[arr[i]] = 1
    } else {
      return true
    }
  }
  return false
}