// element
const players = document.querySelector('.player')
const video = document.querySelector('.viewer')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const skipButtons = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')

// function
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
  
  // if (video.paused) {
  //   video.play()
  // } else {
  //   video.pause()
  // }
}

function updateButton() {
  const icon = this.paused ? '▶':'▮▮'
  // textContent는 <script>와 <style> 요소를 포함한 모든 요소의 콘텐츠를 가져오는 반면 innerText는 "사람이 읽을 수 있는" 요소만 처리
  toggle.textContent = icon
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

// event
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false
progress.addEventListener('click', scrub)
// mousedown이 true이면 scrub까지 확인하면서 함수 호출, false이면 단축 평가로 호출되지 않음
progress.addEventListener('mousemove', () => mousedown && scrub(event))
progress.addEventListener('mousedown', () => mousedown = true)
// progressBar에서 마우스를 클릭한 채로 이동하다가 영역을 벗어나서 마우스를 놓으면 mousedown이 false로 바뀌지 않는 문제가 있어서
// 아무데서나 클릭을 놓으면 false로 변경되도록 수정
// 여전히 일부 경우에 false로 변경되지 않는데 이유를 모르겠다.
document.addEventListener('mouseup', () => mousedown = false)
