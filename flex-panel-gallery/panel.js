const panels = document.querySelectorAll('.panel')
// const panelsChildren = panels.querySelector()
function toggleOpen () {
  this.classList.toggle('open');
}
function transWords (e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active')
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', transWords));
