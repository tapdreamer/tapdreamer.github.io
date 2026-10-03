const videos = [...document.querySelectorAll('video')];
const playButton = document.querySelector('#play-both');
const status = document.querySelector('#video-status');
function updateLabel() {
  playButton.textContent = videos.some(v => !v.paused && !v.ended) ? 'Pause both' : 'Play both';
}
async function playBoth() {
  const results = await Promise.allSettled(videos.map(v => v.play()));
  status.textContent = results.some(r => r.status === 'rejected') ? 'Use the video controls to start playback.' : '';
  updateLabel();
}
playButton.addEventListener('click', () => {
  if (videos.some(v => !v.paused && !v.ended)) videos.forEach(v => v.pause());
  else { videos.filter(v => v.ended).forEach(v => { v.currentTime = 0; }); playBoth(); }
  updateLabel();
});
document.querySelector('#replay-both').addEventListener('click', () => {
  videos.forEach(v => { v.currentTime = 0; });
  playBoth();
});
videos.forEach(v => ['play', 'pause', 'ended'].forEach(event => v.addEventListener(event, updateLabel)));
