const tiles = document.getElementById("tile-container")
const cardText = document.querySelectorAll(".card-text")

let choice = ""



let symbols = ["heart", "star", "moon", "heart", "moon", "star"]
symbols.forEach(function(sym){
  tiles.innerHTML += `<span class="cards ${sym}" data-id="${sym}"><span class="card-text" style="opacity: 1">${sym}</span></span>`
})

// document.addEventListener("DOMContentLoaded", function (e){
//   const cardText = document.querySelectorAll(".card-text")
//   let i = 0
//   const double = (2 * cardText.length) - 1
//   cardText.forEach(function(card){
//     var fadeEffect = setInterval(function () {
//       if (!card.style.opacity) {
//           card.style.opacity = 1;
//           console.log(1)
//       }
//       else if (i > double) {
//         card.style.opacity = 0
// TODO: make the text white instead of transluscent
//         clearInterval(fadeEffect)
//         console.log(3)
//
//       }
//       else if (card.style.opacity > 0) {
//           card.style.opacity -= 0.01;
//           console.log(2)
//
//       }
//       else if (card.style.opacity == 0) {
//         card.style.opacity = 1;
//         i++
//         console.log(4)
//       }
//       else {
//           clearInterval(fadeEffect);
//       }
//   }, 5);
//   //when user clicks the card we remove it
//
// })//end of opacity Fn
//
//
// })//end of DOMContentLoaded

document.addEventListener("click", function(e){
  if (e.target.nodeName === "SPAN"){
    if (choice === ""){
      choice = e.target.dataset.id
    }else if (e.target.dataset.id === choice){
      const chosen = document.getElementsByClassName(choice)
      Array.from(chosen).forEach(function(choice){
        choice.style.color = "red"
      })
      choice = ""
    } else if (e.target.dataset.id !== choice){
      choice = ""
      alert("These don't match!")
    }
  }
})
