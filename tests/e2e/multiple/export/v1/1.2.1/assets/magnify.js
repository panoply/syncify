// src/scripts/dawn/magnify.js
function createOverlay(image) {
  const overlayImage = document.createElement("img");
  overlayImage.setAttribute("src", `${image.src}`);
  overlay = document.createElement("div");
  prepareOverlay(overlay, overlayImage);
  image.style.opacity = "50%";
  toggleLoadingSpinner(image);
  overlayImage.onload = () => {
    toggleLoadingSpinner(image);
    image.parentElement.insertBefore(overlay, image);
    image.style.opacity = "100%";
  };
  return overlay;
}
function prepareOverlay(container, image) {
  container.setAttribute("class", "image-magnify-full-size");
  container.setAttribute("aria-hidden", "true");
  container.style.backgroundImage = `url('${image.src}')`;
  container.style.backgroundColor = "var(--gradient-background)";
}
function toggleLoadingSpinner(image) {
  const loadingSpinner = image.parentElement.parentElement.querySelector(`.loading-overlay__spinner`);
  loadingSpinner.classList.toggle("hidden");
}
function moveWithHover(image, event, zoomRatio) {
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (image.clientWidth / 100)}%`;
  const yPercent = `${yPosition / (image.clientWidth * ratio / 100)}%`;
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
}
function magnify(image, zoomRatio) {
  const overlay2 = createOverlay(image);
  overlay2.onclick = () => overlay2.remove();
  overlay2.onmousemove = (event) => moveWithHover(image, event, zoomRatio);
  overlay2.onmouseleave = () => overlay2.remove();
}
function enableZoomOnHover(zoomRatio) {
  const images = document.querySelectorAll(".image-magnify-hover");
  images.forEach((image) => {
    image.onclick = (event) => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };
  });
}
enableZoomOnHover(2);
//# sourceMappingURL=magnify.js.map
