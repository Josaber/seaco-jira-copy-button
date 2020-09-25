;(() => {
  'use strict'

  $(() => {
    chrome.windows.getCurrent(currentWindow =>
      chrome.tabs.query({ active: true, windowId: currentWindow.id }, activeTabs =>
        chrome.tabs.executeScript(activeTabs[0].id, { file: 'scripts/buttons.js' }, () => close())
      )
    )
  })
})()
