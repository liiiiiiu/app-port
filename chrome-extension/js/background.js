function setTabView(tabId) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, async function(tabs) {
    const url = tabs[0].url
    const id = tabs[0].id
    let _tabId = typeof tabId === 'object' ? tabId.tabId : tabId

    // console.log('tabs', tabs, id, _tabId)

    if (url && id === _tabId) {
      const rurl = url.match(new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/))
      const port = rurl && rurl.length ? rurl[3] : null
      if (port) {
        chrome.action.setBadgeText({ text: 'port' })
        chrome.action.setBadgeBackgroundColor({ color: '#DC143C' })
        chrome.action.setPopup({ popup: '../pages/popup-new.html' })
      } else {
        chrome.action.setBadgeText({ text: '' })
        chrome.action.setPopup({ popup: '../pages/popup.html' })
      }
    }
  })
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onCreated.addListener(function (tabId) {
    setTabView(tabId)
  })

  chrome.tabs.onUpdated.addListener(function (tabId) {
    setTabView(tabId)
  })

  chrome.tabs.onActivated.addListener(function (tabId) {
    setTabView(tabId)
  })
})