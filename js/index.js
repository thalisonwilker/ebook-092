var btn = document.getElementById('button'),
    tracker = document.getElementById('tracker'),
    trackerOffset = 0,
    page = document.getElementById('page'),
    water = document.getElementById('water'),
    cnt = document.getElementById('count'),
    percent = cnt.innerHTML,
    random, diff, interval, isInProgress;

btn.addEventListener('click', update);

function update() {

  if (isInProgress) return;
  btn.removeEventListener('click', update);
  isInProgress = true;
  
  page.classList.add('page_animated');
  setTimeout(function(){
    page.classList.remove('page_animated');
  }, 1000);
  
  rotateTracker();
  
  random = parseInt(Math.random() * 100);
  
  diff = percent - random;
  random = Math.abs(random);

  interval = setInterval(function(){
    
    if (diff === 0 || percent === random) { 
      btn.addEventListener('click', update);
      clearInterval(interval);
      isInProgress = false;
      return;
    }
    
    if (diff < 0) {
      percent++;
    } else {
      percent--;
    }
    
    cnt.innerHTML = percent;
    water.style.transform = 'translate(0, ' + (100 - percent) + '%)';
    water.querySelector('.water__inner').style.height = percent + '%';

    isInProgress = false;
  }, 16);  
}

function getTime() {
  var time = new Date(Math.random() * 1000000000000),
      hours = time.getHours(),
      minutes = time.getMinutes();
  
  if (hours < 10) hours = '0' + hours
  if (minutes < 10) minutes = '0' + minutes
  
  time = hours + ':' + minutes;
  
  return time;
}

function rotateTracker() {
  var time = getTime(),
      firstElem = tracker.firstElementChild,
      computedStyle = getComputedStyle(firstElem),
      step = computedStyle.height,
      node = document.createElement('div');
  
  node.className = 'tracker__item tracker__item_active';
  node.innerHTML = time;
  
  tracker.querySelector('.tracker__item_active').className = 'tracker__item';

  trackerOffset = trackerOffset - parseInt(step);
  console.log(trackerOffset);
  
  tracker.style.transform = 'translate( 0, ' + trackerOffset + 'px)';
    
  tracker.appendChild(node);
}