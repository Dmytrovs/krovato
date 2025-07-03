"use strict";
const maxWidth = parseInt(document.querySelector(".menu-footer").dataset.spollersInit || 600)
const menuFooter = document.querySelector(".menu-footer");
let documentActions = (e) => {
  const targetElement = e.target;
  if (targetElement.closest(".menu-footer__title")) {
    if (window.innerWidth <= maxWidth) {
      if (!menuFooter.querySelectorAll("._slide").length) {
        const footerActiveSpoller = document.querySelector(
          ".menu-footer__item[open]"
        );
        const footerSpollerTitle = targetElement.closest(".menu-footer__title");
        if (
          footerActiveSpoller &&
          footerActiveSpoller !== targetElement.closest(".menu-footer__item")
        ) {
          spollersAnim(
            footerActiveSpoller.querySelector(".menu-footer__title"),
            false
          );
        }
        spollersAnim(footerSpollerTitle);
      }
    }
    e.preventDefault();
  }
};

let spollersInit = (footerSpollers, isOpen) => {
  footerSpollers.forEach((footerSpoller) => {
    const footerSpollerTitle = footerSpoller.querySelector(
      ".menu-footer__title"
    );
    footerSpoller.classList.toggle("_init", !isOpen);
    isOpen
      ? footerSpollerTitle.setAttribute("tabindex", "-1")
      : footerSpollerTitle.removeAttribute("tabindex");
    footerSpoller.open = isOpen;
  });
};

document.addEventListener('click', documentActions)

let spollersAnim = (footerSpollerTitle, action) => {
	const footerSpoller = footerSpollerTitle.closest('.menu-footer__item')
	const footerSpollerBody = footerSpollerTitle.nextElementSibling

	let spollersAnimClose = () => {
		if (!footerSpollerTitle.classList.contains('_slide')) {
			footerSpollerTitle.classList.add('_slide')
			const footerSpollerBodyHeight = footerSpollerBody.offsetHeight
			footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`
			footerSpollerBody.style.overflow = "hidden"
			footerSpollerBody.style.transitionDuration = "0.8s"
			footerSpollerBody.style.paddingTop = "0"
			footerSpollerBody.style.paddingBottom = "0"
			footerSpollerBody.style.paddingLeft = "0"
			footerSpollerBody.style.paddingRight = "0"
			footerSpollerBody.offsetHeight
			footerSpollerBody.style.height = `0px`
			setTimeout(() => {
				footerSpoller.open = false
				footerSpollerBody.style.removeProperty('height')
				footerSpollerBody.style.removeProperty('overflow')
				footerSpollerBody.style.removeProperty('transition-duration')
				footerSpollerTitle.classList.remove('_slide')
			}, 800)
		}
	}
	let spollersAnimOpen = () => {
		if (!footerSpollerTitle.classList.contains('_slide')) {
			footerSpollerTitle.classList.add('_slide')
			footerSpoller.open = true
			const footerSpollerBodyHeight = footerSpollerBody.offsetHeight
			footerSpollerBody.style.height = "0"
			footerSpollerBody.style.overflow = "hidden"
			footerSpollerBody.style.paddingTop = "0"
			footerSpollerBody.style.paddingBottom = "0"
			footerSpollerBody.style.paddingLeft = "0"
			footerSpollerBody.style.paddingRight = "0"
			footerSpollerBody.style.transitionDuration = "0.8s"
			footerSpollerBody.offsetHeight
			footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`
			footerSpollerBody.style.removeProperty('padding-top')
			footerSpollerBody.style.removeProperty('padding-bottom')
			footerSpollerBody.style.removeProperty('margin-top')
			footerSpollerBody.style.removeProperty('margin-bottom')
			setTimeout(() => {
				footerSpollerBody.style.removeProperty('height')
				footerSpollerBody.style.removeProperty('overflow')
				footerSpollerBody.style.removeProperty('transition-duration')
				footerSpollerTitle.classList.remove('_slide')
			}, 800)
		}
	}

	if (action !== undefined) {
		action ? spollersAnimOpen() : spollersAnimClose()
	}
	footerSpoller.open ? spollersAnimClose() : spollersAnimOpen()

}



// Spolers Footer

const footerSpollers = document.querySelectorAll(".menu-footer__item")
if (footerSpollers.length) {
  const matchMedia = window.matchMedia(`(max-width: ${maxWidth / 16}em)`)
  spollersInit(footerSpollers, !matchMedia.matches)
  matchMedia.addEventListener('change', ()=> {
    spollersInit(footerSpollers, !matchMedia.matches)
  })
}

// Footer logo

const footerLogo = document.querySelector(".social-footer__logo")
const footerContainer = document.querySelector('.footer__container')
const footerSocial = document.querySelector(".social-footer");
if (footerLogo) {
  const matchMedia = window.matchMedia(`(max-width: ${767.98 / 16}em)`)
  moveFooterElements()
  matchMedia.addEventListener('change', () => {
    moveFooterElements()
  })

  function moveFooterElements() {
    matchMedia.matches ? footerContainer.insertAdjacentElement('beforeend', footerSocial) : 
    footerContainer.insertAdjacentElement('afterbegin', footerSocial)
    matchMedia.matches ? footerContainer.insertAdjacentElement('afterbegin', footerLogo) :
    footerSocial.insertAdjacentElement('afterbegin', footerLogo)
  }
}