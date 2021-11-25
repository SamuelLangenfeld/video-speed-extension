chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ speed: 2 });
  console.log('Default speed set to 2');
});