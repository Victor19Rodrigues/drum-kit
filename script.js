document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase())
})

document
  .querySelector('.composer button')
  .addEventListener('click', (event) => {
    const song = document.querySelector('#input').value.toLocaleLowerCase()

    if (song !== '') {
      const songArray = song.split('')
      playComposition(songArray)
    }
  })

const playSound = (sound) => {
  const audioElement = document.querySelector(`#s_${sound}`)
  const keyElement = document.querySelector(`div[data-key="${sound}"]`)

  if (audioElement) {
    audioElement.currentTime = 0
    audioElement.play()
  }

  if (keyElement) {
    keyElement.classList.add('active')

    setTimeout(() => {
      keyElement.classList.remove('active')
    }, 300)
  }
}

const playComposition = (songArray) => {
  let wait = 0

  for (const songItem of songArray) {
    if (filterKeyboardButtons(songItem)) {
      setTimeout(() => {
        playSound(`key${songItem}`)
      }, wait)

      wait += 250
    }
  }
}

const filterKeyboardButtons = (songItem) => {
  if (
    songItem === '.' ||
    songItem === ',' ||
    songItem === '?' ||
    songItem === '/'
  ) {
    return false
  }

  return true
}
