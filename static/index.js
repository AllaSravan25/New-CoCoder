
const h1forpython = document.getElementById('h1forPython')
const pythonButton = document.querySelector('.pythonButton')

pythonButton.addEventListener('click', ()=>{
  innertext = "learner"
  socket2.emit('userType', innertext)
  displayMessage();
})


function displayMessage() {

  
  const customDiv = document.createElement('div');
    customDiv.innerHTML = "<h1>hello from open source</h1>";
    document.getElementById('openSource').append(customDiv);

}


/* hello */

document.addEventListener("DOMContentLoaded", function() {
  // your JavaScript code here
  
const letsgo = document.querySelector('.letsgo')
letsgo.addEventListener('click', ()=>{
  const intro = document.getElementById('intro');
  const hero = document.querySelector('.main-hero');
  hero.style.display = 'block'
  hero.classList.add('hero');
  intro.parentNode.removeChild(intro);
  return true;
})
});

