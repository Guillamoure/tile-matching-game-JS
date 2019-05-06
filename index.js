const tiles = document.getElementById("tile-container")
const cardText = document.querySelectorAll(".card-text")
const gameContent = document.querySelector(".memory-game")
const messages = document.querySelector(".messages")

let choice = ""



let symbols = ["sky", "heart", "star", "cloud", "moon", "heart", "sky", "moon", "star", "cloud"]
symbols.forEach(function(sym){
  tiles.innerHTML += `<span class="cards ${sym}" data-id="${sym}"><span class="card-text" style="opacity: 1">${sym}</span></span>`
})

document.addEventListener("DOMContentLoaded", function (e){
  const cardText = document.querySelectorAll(".card-text")
  let i = 0
  const double = (2 * cardText.length) - 1
  cardText.forEach(function(card){
    var fadeEffect = setInterval(function () {
      if (!card.style.opacity) {
          card.style.opacity = 1;
          console.log(1)
      }
      else if (i > double) {
        card.style.opacity = 0
// TODO: make the text white instead of transluscent
        clearInterval(fadeEffect)
        console.log(3)

      }
      else if (card.style.opacity > 0) {
          card.style.opacity -= 0.01;
          console.log(2)

      }
      else if (card.style.opacity == 0) {
        card.style.opacity = 1;
        i++
        console.log(4)
      }
      else {
          clearInterval(fadeEffect);
      }
  }, 10);
  //when user clicks the card we remove it

})//end of opacity Fn


})//end of DOMContentLoaded

document.addEventListener("click", function(e){

  if ((e.target.nodeName === "SPAN") && (e.target.firstElementChild.style.opacity !== "1")){
    if (choice === ""){

      choice = e.target.dataset.id
      e.target.firstElementChild.style.opacity = 1
    }else if (e.target.dataset.id === choice){
      e.target.firstElementChild.style.opacity = 1
      const chosen = document.getElementsByClassName(choice)
      Array.from(chosen).forEach(function(choice){
        choice.style.color = "red"
      })
      choice = ""
    } else if (e.target.dataset.id !== choice){

      e.target.firstElementChild.style.opacity = 1
      const wrong = document.getElementsByClassName(choice)
      messages.innerHTML = "These do not match"
      // alert("These don't match!")


      choice = ""
      setTimeout(function(){
        e.target.firstElementChild.style.opacity = 0
        Array.from(wrong).forEach(function(choice){
          choice.firstElementChild.style.opacity  = 0
        })
        messages.innerHTML = ""

      },1000);
    }
  }
})
