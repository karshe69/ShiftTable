chrome.runtime.onInstalled.addListener(() =>{
    chrome.action.onClicked.addListener(function() {
        chrome.tabs.create({url: './index.html', selected: true, active: true});
    });
})

