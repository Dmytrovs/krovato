"use strict";
const maxWidth = +document.querySelector(".menu-footer").dataset.spollersInit || 600;
let documentActions = (e) => {
  const targetElement = e.target;
  if (targetElement.closest(".menu-footer__title")) {
    if (window.innerWidth > maxWidth) {
      e.preventDefault()
    }
  }
};

let spollersInit = (footerSpollers, isOpen) => {
  footerSpollers.forEach(footerSpoller => {
    footerSpoller.classList.toggle('_init', !isOpen)
    footerSpoller.open = isOpen
  })
}

document.addEventListener('click', documentActions)




// Spolers Footer

const footerSpollers = document.querySelectorAll(".menu-footer__item")
if (footerSpollers.length) {
  const matchMedia = window.matchMedia(`(max-width: ${maxWidth}px)`)
  spollersInit(footerSpollers, !matchMedia.matches)
  matchMedia.addEventListener('change', ()=> {
    spollersInit(footerSpollers, !matchMedia.matches)
  })
}