const renderGifts = async () => {
  const response = await fetch('/gifts')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  if (data) {
    data.map(gift => {
      const card = document.createElement('div')
      card.className = 'card'

      const topContainer = document.createElement('div')
      topContainer.className = 'top-container'

      const bottomContainer = document.createElement('div')
      bottomContainer.className = 'bottom-container'

      topContainer.style.backgroundImage = `url(${gift.image})`

      const name = document.createElement('h3')
      name.textContent = gift.name
      bottomContainer.append(name)

      const pricePoint = document.createElement('p')
      pricePoint.textContent = gift.pricePoint
      bottomContainer.append(pricePoint)

      const audience = document.createElement('p')
      audience.textContent = gift.audience
      bottomContainer.append(audience)

      const readMore = document.createElement('a')
      readMore.textContent = 'Read More >'
      readMore.href = `/gifts/${gift.id}`
      readMore.setAttribute('role', 'button')
      bottomContainer.append(readMore)

      card.append(topContainer, bottomContainer)
      mainContent.append(card)
    })
  }
  else {
    const noGifts = document.createElement('h2')
    noGifts.textContent = 'No Gifts Available 😞'
    mainContent.append(noGifts)
  }
}

const requestedURL = window.location.href.split('/').slice(3).join('/')

if (requestedURL) {
  window.location.href = '../404.html'
}
else {
  renderGifts()
}
