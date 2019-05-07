//locations
const tiles = document.getElementById("tile-container")
const innerCard = document.querySelectorAll(".pic")
const gameContent = document.querySelector(".memory-game")
const messages = document.querySelector(".messages")
const stopClock = document.getElementById("stop-clock")
const timerHeader = document.querySelector("h2")

//variables
let choice = ""
let doingSomething = ""
let user = ""
let cards = 0
let completedCards = 0
let newRecord = ""

let centiseconds = 0
let seconds = 0
let minutes = 0

let t = 0

function addTime() {
  centiseconds++;
  if (centiseconds >= 100) {
    centiseconds = 0;
    seconds++;
    if (seconds >= 60){
      seconds = 0;
      minutes++;
    }
  }
  stopClock.innerText = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." + (centiseconds > 9 ? centiseconds : "0" + centiseconds);

  timer()
}

function timer() {

  t = setTimeout(addTime, 100)

}


//shuffling function, called on an array, or a fetch
function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease i by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}



//sample array for testing
let symbols = ["Heart", "Heart", "Jupiter", "Jupiter", "Io", "Io", "Klaus", "Klaus", "Sunshine", "Sunshine", "Rocket", "Rocket"]

//executes the shuffle function on the collected array, resets the tiles HTML, and iterates over the new array and slaps it on the DOM
function setUpCards(array){
  let doubleArray = [...array, ...array]
  let shuffled = shuffle(doubleArray)
  cards = (shuffled.length) / 2
  tiles.innerHTML = ""
  //shuffle array
  shuffled.forEach(function(img){
    tiles.innerHTML += `
    <span class="cards ${img.name}" data-id="${img.name}">
      <img class="pic" src=${img.img_url} style="opacity: 1">
    </span>`
  })
  //slap it on the DOM
}

// document.addEventListener("DOMContentLoaded", function(e){
//
// })

//begins every start of the game
function refreshGame() {
  const innerCard = document.querySelectorAll(".pic")

  //prevents click events
  doingSomething = "yes"
  //informs the user
  messages.innerHTML = `${user}! Pay Attention!!`
  let i = 0

  //this constant is used to measure how many times the below function should loop
  // Default is to decay the opacity of all of the elements twice, to give a user a chance to see what is on the screen
  // Since the length of the array is not set, this will let the loop run twice
  const double = (2 * innerCard.length) - 1

  // Loop setInterval function that decays the opacity of all of the elements within the spans
  innerCard.forEach(function(card){
    var fadeEffect = setInterval(function () {
      //if we do not have an opacity set on the elements, this gives it one
      //NOTE this is a vestige from the stack overflow that we got this from
      if (!card.style.opacity) {
        card.style.opacity = 1;
        console.log(1)
        // This is the last function
        // once the iterator has run its course, it goes to this elseif statement and clears the interval
      } else if (i > double) {
        card.style.opacity = 0
        // TODO: make the text white instead of transluscent
        clearInterval(fadeEffect)
        console.log(3)
        // Resets the message above
        // Resets the doingSomething variable, so click events can occur
        doingSomething = ""
        messages.innerHTML = ""
        timerHeader.style.opacity = 1

        completedCards = 0
        newRecord = ""

        centiseconds = 0
        seconds = 0
        minutes = 0

        if (t === 0){
          timer()
        } else {
          t = 0
        }
        // Decays the opacity of the cards by 1/100th every iteration
      } else if (card.style.opacity > 0) {
        card.style.opacity -= 0.01;
        console.log(2)
        // Once an element's opacity hits 0, increment the counter, represented by the variable i
      } else if (card.style.opacity == 0) {
        card.style.opacity = 1;
        i++
        console.log(4)
        // Just in case there is an error, it will clear the interval
        // NOTE this is a vestige from the stack overflow that we got this from
      } else {
        clearInterval(fadeEffect);
      }
    }, 10);

  })//end of opacity Fn

}

// If the user wants to play the game again
document.addEventListener("click", function (e){
  e.preventDefault()
  if (e.target.innerText === "Redo!"){

    stopClock.innerHTML = ``

    fetch("http://localhost:3000/api/v1/images")
    .then(res => res.json())
    .then(function(images) {

      setUpCards(images);
      refreshGame()
    })

  }
})

// When a user hits the Start! button, after entering their Name
// NOTE submit does not work for some reason. Must resolve
// TODO Both this function and the above funtion runs concurrently. Must specify and resolve.
document.addEventListener("click", function (e){
  e.preventDefault();
  if ((e.target.nodeName === "BUTTON")&& (e.target.innerText !== "Redo!")){

    user = e.target.previousElementSibling.firstElementChild.value
    e.target.parentElement.innerHTML = `<button type="reset">Redo!</button>`
    fetch("http://localhost:3000/api/v1/images")
    .then(res => res.json())
    .then(function(images) {

      console.log(images)
      setUpCards(images);
      refreshGame()
    })

  }
})



// Main click event
  document.addEventListener("click", function(e){
    // Prevents this event from occurring if doingSomething is set to a variable
    if (doingSomething === ""){
      // prevents clicking on a tile that is already clicked
      if ((e.target.nodeName === "IMG") && (e.target.style.opacity !== "1")){
        // If this is the first click after a match, or a failed match
        if (choice === ""){
          // Grabs target, and binds it to the variable clicked to be compared against on later events
          choice = e.target.parentElement.dataset.id

          //Make it opaque
          e.target.style.opacity = 1

          // If the 2nd clicked card matches the first clicked card
        } else if (e.target.parentElement.dataset.id === choice){
          // Make it opaque
          e.target.style.opacity = 1
          const chosen = document.getElementsByClassName(choice)
          // Turn both of them red
          // NOTE this is a vestige from before we got the backend working
          // Remove or have a separate coditional
          Array.from(chosen).forEach(function(choice){
            choice.style.color = "red"
          })
          // Reset the choice for later clicks
          choice = ""

          ++completedCards
          if (cards === completedCards) {

              clearTimeout(t)


            newRecord = stopClock.innerHTML.toString()

            timerHeader.style.opacity = 0


            messages.innerHTML = `${user}! You win! Your time was ${newRecord}!`
          }

          // More often that not, this is the options chosen
          // This is if the 2nd clicked card does NOT match the 1st clicked card
        } else if (e.target.parentElement.dataset.id !== choice){

         // make it opaque
          e.target.style.opacity = 1
          // Find the cards that are wrong
          // NOTE this is a flawed system. This finds ALL elements that share the name of the already chosen card
          const wrong = document.getElementsByClassName(choice)
          messages.innerHTML = "These do not match"

          //resets the choice option, since it is saved in the wrong variable
          choice = ""
          //prevents click events
          doingSomething = "yes"
          //sets a delay
          // so the user can see the incorrect cards and their positions
          setTimeout(function(){
            //makes all elements transparent

            e.target.style.opacity = 0
            Array.from(wrong).forEach(function(choice){
              choice.firstElementChild.style.opacity  = 0
            })
            //clears the message
            messages.innerHTML = ""
            // allows click events
            doingSomething = ""

            // default timer for the setTimeout function is 1000 milliseconds. Will set this to a variable for harder game modes
          },500);

        }
      }
    }
  })
