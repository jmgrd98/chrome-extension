let timer = null;

function updateTime() {
  chrome.runtime.sendMessage({ type: 'getElapsedTime' }, function(response) {
    const elapsedTime = response.elapsedTime;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    const hours = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;
    document.getElementById('time').innerHTML = `${hours}:${minutes}:${seconds}`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateTime();
  timer = setInterval(updateTime, 1000);

  document.getElementById('reset-button').addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'resetTime' }, function(response) {
      updateTime();
    });
  });
});