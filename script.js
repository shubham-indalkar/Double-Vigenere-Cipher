// Initialising the canvas
var canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d');

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

var fontSize = 10;

function initializeCanvas() {
  // Setting the width and height of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Setting up the columns
  columns = canvas.width / fontSize;

  // Setting up the drops
  drops = [];
  for (var i = 0; i < columns; i++) {
    drops[i] = 1;
  }
}

initializeCanvas(); // Call the function initially

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 33);

// Listen for window resize events
window.addEventListener('resize', function () {
  initializeCanvas(); // Reinitialize the canvas on window resize
});

// Get the dropdown and button elements
var dropdown = document.getElementById('action');
var button = document.getElementById('action-button');

// Add event listener to the dropdown change event
dropdown.addEventListener('change', function () {
  dropdownSelectedAction = dropdown.value;
  // Change the button text based on the selected option
  if (dropdownSelectedAction === 'encrypt') {
    button.textContent = 'Encrypt Text';
  } else if (dropdownSelectedAction === 'decrypt') {
    button.textContent = 'Decrypt Text';
  }
});

let actionButton = document.getElementById('action-button');

actionButton.addEventListener('click', function () {
  console.log('Button clicked');

  // Get the selected action from the dropdown
  let dropdownSelectedAction = document.getElementById('action').value;

  // Validate input fields
  let inputText = document.getElementById('input').value.trim();
  let keyword1 = document.getElementById('keyword1').value.trim();
  let keyword2 = document.getElementById('keyword2').value.trim();

  // Check if input text and both keywords are entered
  if (inputText === '') {
    alert('Please enter text in the input field.');
    return;
  }

  if (keyword1 === '' || keyword2 === '') {
    alert('Please enter both keywords.');
    return;
  }

  // Call the appropriate function based on the selected action
  if (dropdownSelectedAction === 'encrypt') {
    doubleEncrypt();
  } else if (dropdownSelectedAction === 'decrypt') {
    doubleDecrypt();
  }
});

function doubleEncrypt() {
  var plaintext = document.getElementById('input').value.toUpperCase().replace(/[^A-Z]/g, '');
  var keyword1 = document.getElementById('keyword1').value.toUpperCase().replace(/[^A-Z]/g, '');
  var keyword2 = document.getElementById('keyword2').value.toUpperCase().replace(/[^A-Z]/g, '');
  var encryptedText = '';

  for (var i = 0, j = 0, k = 0; i < plaintext.length; i++) {
    var charCode = plaintext.charCodeAt(i) - 65;
    var key1 = keyword1.charCodeAt(j % keyword1.length) - 65;
    var key2 = keyword2.charCodeAt(k % keyword2.length) - 65;
    encryptedText += String.fromCharCode(((charCode + key1) % 26) + 65);
    j++;
    charCode = encryptedText.charCodeAt(i) - 65;
    encryptedText = encryptedText.slice(0, -1);
    encryptedText += String.fromCharCode(((charCode + key2) % 26) + 65);
    k++;
  }

  document.getElementById('output').value = encryptedText;
}

function doubleDecrypt() {
  var ciphertext = document.getElementById('input').value.toUpperCase().replace(/[^A-Z]/g, '');
  var keyword1 = document.getElementById('keyword1').value.toUpperCase().replace(/[^A-Z]/g, '');
  var keyword2 = document.getElementById('keyword2').value.toUpperCase().replace(/[^A-Z]/g, '');
  var decryptedText = '';

  for (var i = 0, j = 0, k = 0; i < ciphertext.length; i++) {
    var charCode = ciphertext.charCodeAt(i) - 65;
    var key1 = keyword1.charCodeAt(j % keyword1.length) - 65;
    var key2 = keyword2.charCodeAt(k % keyword2.length) - 65;
    decryptedText += String.fromCharCode(((charCode - key2 + 26) % 26) + 65);
    k++;
    charCode = decryptedText.charCodeAt(i) - 65;
    decryptedText = decryptedText.slice(0, -1);
    decryptedText += String.fromCharCode(((charCode - key1 + 26) % 26) + 65);
    j++;
  }

  document.getElementById('output').value = decryptedText;
}