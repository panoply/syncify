// src/scripts/dawn/animations.js
var SCROLL_ANIMATION_TRIGGER_CLASSNAME = "scroll-trigger";
var SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = "scroll-trigger--offscreen";
var SCROLL_ZOOM_IN_TRIGGER_CLASSNAME = "animate--zoom-in";
var SCROLL_ANIMATION_CANCEL_CLASSNAME = "scroll-trigger--cancel";
function onIntersection(elements, observer) {
  elements.forEach((element, index) => {
    if (element.isIntersecting) {
      const elementTarget = element.target;
      if (elementTarget.classList.contains(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME)) {
        elementTarget.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
        if (elementTarget.hasAttribute("data-cascade"))
          elementTarget.setAttribute("style", `--animation-order: ${index};`);
      }
      observer.unobserve(elementTarget);
    } else {
      element.target.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
      element.target.classList.remove(SCROLL_ANIMATION_CANCEL_CLASSNAME);
    }
  });
}
function initializeScrollAnimationTrigger(rootEl = document, isDesignModeEvent = false) {
  const animationTriggerElements = Array.from(rootEl.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME));
  if (animationTriggerElements.length === 0)
    return;
  if (isDesignModeEvent) {
    animationTriggerElements.forEach((element) => {
      element.classList.add("scroll-trigger--design-mode");
    });
    return;
  }
  const observer = new IntersectionObserver(onIntersection, {
    rootMargin: "0px 0px -50px 0px"
  });
  animationTriggerElements.forEach((element) => observer.observe(element));
}
function initializeScrollZoomAnimationTrigger() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const animationTriggerElements = Array.from(document.getElementsByClassName(SCROLL_ZOOM_IN_TRIGGER_CLASSNAME));
  if (animationTriggerElements.length === 0)
    return;
  const scaleAmount = 0.2 / 100;
  animationTriggerElements.forEach((element) => {
    let elementIsVisible = false;
    const observer = new IntersectionObserver((elements) => {
      elements.forEach((entry) => {
        elementIsVisible = entry.isIntersecting;
      });
    });
    observer.observe(element);
    element.style.setProperty("--zoom-in-ratio", 1 + scaleAmount * percentageSeen(element));
    window.addEventListener(
      "scroll",
      throttle(() => {
        if (!elementIsVisible)
          return;
        element.style.setProperty("--zoom-in-ratio", 1 + scaleAmount * percentageSeen(element));
      }),
      { passive: true }
    );
  });
}
function percentageSeen(element) {
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const elementPositionY = element.getBoundingClientRect().top + scrollY;
  const elementHeight = element.offsetHeight;
  if (elementPositionY > scrollY + viewportHeight) {
    return 0;
  } else if (elementPositionY + elementHeight < scrollY) {
    return 100;
  }
  const distance = scrollY + viewportHeight - elementPositionY;
  let percentage = distance / ((viewportHeight + elementHeight) / 100);
  return Math.round(percentage);
}
window.addEventListener("DOMContentLoaded", () => {
  initializeScrollAnimationTrigger();
  initializeScrollZoomAnimationTrigger();
});
if (Shopify.designMode) {
  document.addEventListener("shopify:section:load", (event) => initializeScrollAnimationTrigger(event.target, true));
  document.addEventListener("shopify:section:reorder", () => initializeScrollAnimationTrigger(document, true));
}
//# sourceMappingURL=animations.js.map
