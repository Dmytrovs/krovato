"use strict";

// Touch Screen?
const isTouchScreen = window.matchMedia("(any-hover:none)").matches

window.addEventListener("load", windowLoaded)

function windowLoaded() {
  const maxWidth = parseInt(
    document.querySelector(".menu-footer").dataset.spollersInit || 600
  );
  const menuFooter = document.querySelector(".menu-footer");

  let keypressActions = (e) => {
    if (e.key === "Escape") {
      document.documentElement.classList.remove("catalog-open");
    }
  };

  let documentActions = (e) => {
    const targetElement = e.target;
    const targetTag = targetElement.tagName;
    if (targetElement.closest(".menu-footer__title")) {
      if (window.innerWidth <= maxWidth) {
        if (!menuFooter.querySelectorAll("._slide").length) {
          const footerActiveSpoller = document.querySelector(
            ".menu-footer__item[open]"
          );
          const footerSpollerTitle = targetElement.closest(
            ".menu-footer__title"
          );
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

    if (isTouchScreen) {
      if (targetElement.closest(".lang-header")) {
        const langHeader = targetElement.closest(".lang-header");
        langHeader.classList.toggle("--active");
      } else {
        document.querySelector(".lang-header").classList.remove("--active");
      }
      if (targetElement.closest(".items-catalog-header__more")) {
        const targetItem = targetElement.closest(".items-catalog-header__item");
        const targetActiveItem = document.querySelector(
          ".items-catalog-header__item.--active"
        );
        targetItem.classList.toggle("--active");

        if (targetItem !== targetActiveItem) {
          targetActiveItem.classList.remove("--active");
        }
      }
    }

    if (targetElement.closest(".icon-menu")) {
      document.documentElement.classList.toggle("menu-open");
    }

    if (targetElement.closest(".contacts-header")) {
      if (targetTag !== "A") {
        const contactsHeader = targetElement.closest(".contacts-header");
        contactsHeader.classList.toggle("--active");
      }
    } else {
      document.querySelector(".contacts-header").classList.remove("--active");
    }

    if (targetElement.closest(".button-catalog-header")) {
      const itemsCatalogMenu = document.querySelector(".items-catalog-header");
      document.documentElement.style.setProperty(
        "--menu-catalog-top",
        `${itemsCatalogMenu.getBoundingClientRect().top + 20}px`
      );
      document.documentElement.classList.toggle("catalog-open");
    } else if (!targetElement.closest(".items-catalog-header__wrapper")) {
      document.documentElement.classList.remove("catalog-open");
    }
    if (targetElement.closest(".search-header__open")) {
      document.documentElement.classList.toggle("search-open");
    } else if (!targetElement.closest(".search-header")) {
      document.documentElement.classList.remove("search-open");
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

  document.addEventListener("click", documentActions);

  document.addEventListener("keydown", keypressActions);

  let spollersAnim = (footerSpollerTitle, action) => {
    const footerSpoller = footerSpollerTitle.closest(".menu-footer__item");
    const footerSpollerBody = footerSpollerTitle.nextElementSibling;

    let spollersAnimClose = () => {
      if (!footerSpollerTitle.classList.contains("_slide")) {
        footerSpollerTitle.classList.add("_slide");
        const footerSpollerBodyHeight = footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`;
        footerSpollerBody.style.overflow = "hidden";
        footerSpollerBody.style.transitionDuration = "0.8s";
        footerSpollerBody.style.paddingTop = "0";
        footerSpollerBody.style.paddingBottom = "0";
        footerSpollerBody.style.paddingLeft = "0";
        footerSpollerBody.style.paddingRight = "0";
        footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = `0px`;
        setTimeout(() => {
          footerSpoller.open = false;
          footerSpollerBody.style.removeProperty("height");
          footerSpollerBody.style.removeProperty("overflow");
          footerSpollerBody.style.removeProperty("transition-duration");
          footerSpollerTitle.classList.remove("_slide");
        }, 800);
      }
    };
    let spollersAnimOpen = () => {
      if (!footerSpollerTitle.classList.contains("_slide")) {
        footerSpollerTitle.classList.add("_slide");
        footerSpoller.open = true;
        const footerSpollerBodyHeight = footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = "0";
        footerSpollerBody.style.overflow = "hidden";
        footerSpollerBody.style.paddingTop = "0";
        footerSpollerBody.style.paddingBottom = "0";
        footerSpollerBody.style.paddingLeft = "0";
        footerSpollerBody.style.paddingRight = "0";
        footerSpollerBody.style.transitionDuration = "0.8s";
        footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`;
        footerSpollerBody.style.removeProperty("padding-top");
        footerSpollerBody.style.removeProperty("padding-bottom");
        footerSpollerBody.style.removeProperty("padding-left");
        footerSpollerBody.style.removeProperty("padding-right");
        setTimeout(() => {
          footerSpollerBody.style.removeProperty("height");
          footerSpollerBody.style.removeProperty("overflow");
          footerSpollerBody.style.removeProperty("transition-duration");
          footerSpollerTitle.classList.remove("_slide");
        }, 800);
      }
    };

    if (action !== undefined) {
      action ? spollersAnimOpen() : spollersAnimClose();
    }
    footerSpoller.open ? spollersAnimClose() : spollersAnimOpen();
  };

  // Spolers Footer

  const footerSpollers = document.querySelectorAll(".menu-footer__item");
  if (footerSpollers.length) {
    const matchMedia = window.matchMedia(`(max-width: ${maxWidth / 16}em)`);
    spollersInit(footerSpollers, !matchMedia.matches);
    matchMedia.addEventListener("change", () => {
      spollersInit(footerSpollers, !matchMedia.matches);
    });
  }

  // Move header elements
  const header = document.querySelector(".header");
  const topHeader = document.querySelector(".top-header");
  const bottomHeader = document.querySelector(".bottom-header");
  const topHeaderContainer = document.querySelector(".top-header__container");
  const actionsTopHeader = document.querySelector(".actions-top-header");
  const bottomHeaderContainer = document.querySelector(
    ".bottom-header__container"
  );
  const bodyHeaderContainer = document.querySelector(".body-header__container");
  const bottomHeaderMenus = document.querySelector(".bottom-header__menus");
  const catalogHeader = document.querySelector(".catalog-header");
  const searchHeader = document.querySelector(".search-header");
  const actionsHeader = document.querySelector(".actions-body-header");
  const contactsHeader = document.querySelector(".contacts-header");

  if (header && bottomHeader && topHeader) {
    const matchMedia = window.matchMedia(`(max-width: ${991.98 / 16}em)`);
    moveHeaderElements();
    matchMedia.addEventListener("change", () => {
      moveHeaderElements();
    });
    function moveHeaderElements() {
      if (matchMedia.matches) {
        topHeaderContainer.insertAdjacentElement(
          "beforeend",
          bottomHeaderMenus
        );
        topHeaderContainer.insertAdjacentElement("beforeend", actionsTopHeader);

        bottomHeaderContainer.insertAdjacentElement("beforeend", catalogHeader);
        bottomHeaderContainer.insertAdjacentElement("beforeend", searchHeader);
        bottomHeaderContainer.insertAdjacentElement("beforeend", actionsHeader);
      } else {
        bottomHeaderContainer.insertAdjacentElement(
          "beforeend",
          bottomHeaderMenus
        );

        bodyHeaderContainer.insertAdjacentElement("beforeend", catalogHeader);
        bodyHeaderContainer.insertAdjacentElement("beforeend", searchHeader);
        bodyHeaderContainer.insertAdjacentElement("beforeend", contactsHeader);
        bodyHeaderContainer.insertAdjacentElement("beforeend", actionsHeader);
      }
    }
  }

  // Footer logo

  const footerLogo = document.querySelector(".social-footer__logo");
  const footerContainer = document.querySelector(".footer__container");
  const footerSocial = document.querySelector(".social-footer");
  if (footerLogo) {
    const matchMedia = window.matchMedia(`(max-width: ${767.98 / 16}em)`);
    moveFooterElements();
    matchMedia.addEventListener("change", () => {
      moveFooterElements();
    });

    function moveFooterElements() {
      matchMedia.matches
        ? footerContainer.insertAdjacentElement("beforeend", footerSocial)
        : footerContainer.insertAdjacentElement("afterbegin", footerSocial);
      matchMedia.matches
        ? footerContainer.insertAdjacentElement("afterbegin", footerLogo)
        : footerSocial.insertAdjacentElement("afterbegin", footerLogo);
    }
  }
}