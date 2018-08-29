
const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hrHand = document.querySelector('.hour-hand');
const allHands = document.querySelectorAll('.hand')

function setDate () {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  const minDegrees = ((minutes / 60) * 360) + 90;
  const hourDegrees = ((hours / 12) * 360) + 90;
  if(secondsDegrees === 90) {
    allHands.forEach(hand => hand.style.transition = 'none')
    // function (hand) {hand.style.transition = 'none'}
  } else {
    allHands.forEach(hand => hand.style.transition = 'all 0.05s cubic-bezier(0.18, 0.38, 0.76, 1.88)')
  }

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minHand.style.transform = `rotate(${minDegrees}deg)`;
  hrHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
