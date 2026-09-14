const header = document.querySelector('header')

const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

const headerLeft = document.createElement('div')
headerLeft.className = 'header-left'

const logo = document.createElement('img')
logo.src = '/logo.png'
logo.alt = 'UnEarthed logo'

const title = document.createElement('h1')
title.textContent = 'UnEarthed'

headerLeft.append(logo, title)

const headerRight = document.createElement('div')
headerRight.className = 'header-right'

const headerButton = document.createElement('button')
headerButton.textContent = 'Home'

headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

headerRight.append(headerButton)

headerContainer.append(headerLeft, headerRight)

header.append(headerContainer)
