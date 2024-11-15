const PAUSE_THRESHOLD = 1000; // 1 second

// Array to store interaction logs
const interactionLog = [];

// Reference to the log display element
const logOutput = document.getElementById('log-output');

// Function to update the log display
function updateLogDisplay() {
  logOutput.textContent = JSON.stringify(interactionLog, null, 2);
}

// Function to handle mouse pause over an image
function handleMousePause(img) {
  const imgId = img.id;
  console.log(`Mouse paused over ${imgId}`);

  // Record the pause interaction
  interactionLog.push({
    type: 'mouse_pause',
    imageId: imgId,
    timestamp: new Date().toISOString(),
  });
  updateLogDisplay();
}

// Function to handle image click
function handleImageClick(event) {
  const img = event.target;
  const imgId = img.id;
  console.log(`Image ${imgId} clicked`);

  // Record the click interaction
  interactionLog.push({
    type: 'click',
    imageId: imgId,
    timestamp: new Date().toISOString(),
  });
  updateLogDisplay();
}

// Function to initialize interaction tracking on images
function initInteractionTracking() {
  const images = document.querySelectorAll('.image-container img');

  images.forEach((img) => {
    let mouseMoveTimeout;

    // Mouse move event handler
    function onMouseMove() {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        handleMousePause(img);
      }, PAUSE_THRESHOLD);
    }

    // Mouse leave event handler
    function onMouseLeave() {
      clearTimeout(mouseMoveTimeout);
    }

    // Attach event listeners
    img.addEventListener('mousemove', onMouseMove);
    img.addEventListener('mouseleave', onMouseLeave);
    img.addEventListener('click', handleImageClick);
  });
}

// Initialize interaction tracking when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initInteractionTracking);