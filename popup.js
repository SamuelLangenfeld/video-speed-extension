let changeSpeed = document.getElementById("changeSpeed");
let setSpeed = document.getElementById("setSpeed");


chrome.storage.sync.get("speed", ({ speed }) => {
    changeSpeed.value = speed;
});

const storeSpeed = async () => {
  let speed = document.getElementById("changeSpeed").value
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });  
  chrome.storage.sync.set({speed})
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageVideoSpeed,
    args: [Number(speed)]
  });
}

storeSpeed()

setSpeed.addEventListener("click", async () => {
  storeSpeed()
});

changeSpeed.addEventListener("keypress", async (e) => {
  if (e.code === 'Enter') {
    storeSpeed()
  }
});
  
function setPageVideoSpeed(speed) {
  var video = document.querySelector('video')
  var audio = document.querySelector('audio')
  if (video){
    video.playbackRate = speed
  }
  if (audio) {
    audio.playbackRate = speed
  }
}