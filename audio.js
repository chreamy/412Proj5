const audio = new Audio("assets/audio.mp3");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

analyser.fftSize = 128;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let isAnimating = false;

// Function to initialize the visualizer
function initializeVisualizer(docID) {
  const canvas = document.getElementById(docID);
  const context = canvas.getContext("2d");
  const barWidth = canvas.width / bufferLength;
  let x;

  function animate() {
    x = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] - 150 + i * 1.5) ^ 3;
      const r = 255,
        g = 255,
        b = 255;

      context.fillStyle = `rgb(${r},${g},${b})`;
      context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 5;
    }
    requestAnimationFrame(animate);
  }

  return animate;
}

// Function to scale canvas up and down
function applyScaleEffect(docID) {
  const div = document.getElementById(docID);
  div.style.transition = "all 0.05s ease";
  const scale = docID.includes("rainbow")
    ? 1.45
    : docID.includes("speaker")
    ? 1.35
    : 1.05;
  setInterval(() => {
    div.style.scale = scale;
    setTimeout(() => {
      div.style.scale = 1;
    }, 100); // Back to original size after 0.5s
  }, 468.75); // Scaling interval every 1/128th of a minute
}

function applyRyEffect() {
  const boxy = document.getElementById("ry");
  boxy.style.transition = "transform 0.3s ease-in-out"; // Smooth rotation transition

  setInterval(() => {
    boxy.style.transform = "rotateX(360deg)";
    setTimeout(() => {
      boxy.style.transform = "rotateX(0deg)";
    }, 300);
  }, 7500);
  setTimeout(() => {
    boxy.style.transition = "none";
  }, 31000);
}

function applyLaserEffect() {
  const img = document.getElementById("laser");
  setTimeout(() => {
    img.style.display = "block";
  }, 200);
  img.style.transition = "all 0.05s ease";
  setInterval(() => {
    img.style.opacity = 0.3;
    setTimeout(() => {
      img.style.opacity = 0.1;
    }, 100); // Back to original size after 0.5s
  }, 468.75); // Scaling interval every 1/128th of a minute
}

// Initialize visualizers for both canvases
const visualizerAnimate = initializeVisualizer("visualizer");
const visualizerLeftAnimate = initializeVisualizer("visualizerleft");
const visualizerRightAnimate = initializeVisualizer("visualizerright");

// Start the visualizer when the user clicks anywhere on the page
document.getElementById("vinyl").addEventListener("click", () => {
  if (!isAnimating) {
    isAnimating = true;

    audioContext.resume().then(() => {
      audio.play().then(() => {
        visualizerAnimate();
        visualizerLeftAnimate();
        visualizerRightAnimate();
        document.body.style.overflow = "hidden";
        const stars = document.getElementById("stars");
        stars.style.display = "block";
        ["rainbow", "rainbow2"].forEach((docID) => {
          const img = document.getElementById(docID);
          img.style.display = "block";
        });
        const box = document.getElementById("box");
        document.getElementById("change").style.display = "none";
        box.style.animation = "rotate 5s linear infinite";
        const movie = document.getElementById("movie");
        movie.style.opacity = 1;
        const vinyl = document.getElementById("vinyl");
        vinyl.style.animation = "spin 3s linear infinite";
        // Apply the scaling effect after 20 seconds
        setTimeout(() => {
          document.getElementById("hands").style.opacity = 1;
        }, 15890);
        setTimeout(() => {
          document.getElementById("in").style.opacity = 1;
          document.getElementById("hands").style.opacity = 0;
        }, 16360);
        setTimeout(() => {
          document.getElementById("the").style.opacity = 1;
          document.getElementById("in").style.opacity = 0;
        }, 16830);
        setTimeout(() => {
          document.getElementById("air").style.opacity = 1;
          document.getElementById("the").style.opacity = 0;
        }, 17300);

        setTimeout(() => {
          document.getElementById("air").style.opacity = 0;
        }, 17770);

        setTimeout(() => {
          ["container", "rainbow", "rainbow2", "speaker", "speaker2"].forEach(
            (docID) => {
              applyScaleEffect(docID);
            }
          );
          applyLaserEffect();
          const textElements = document.querySelectorAll(
            "p, h1, h2, h3, h4, h5, h6"
          );

          textElements.forEach((element) => {
            setTimeout(() => {
              element.style.animation = "glitch 1.88s steps(100) infinite";
            }, 450);
            setTimeout(() => {
              element.style.animation = "none";
              const customCursor = document.getElementById("custom-cursor");
              customCursor.style.display = "none";
              document.body.style.cursor = "default";
            }, 30000);
          });

          const movie = document.getElementById("moviegif");
          setTimeout(() => {
            let opacity = 0.4;
            setInterval(() => {
              opacity -= (50 / 5000) * 0.4; // Gradually reduce opacity
              if (opacity <= 0) {
                opacity = 0;
                clearInterval(interval); // Stop the interval once opacity is 0
              }
              box.style.opacity = opacity;
            }, 50);
            setTimeout(() => {
              document.getElementById("pic1").src = "assets/miku.gif";
              document.getElementById("pic2").src = "assets/miku.gif";
              document.getElementById("pic3").src = "assets/miku.gif";
              document.getElementById("pic4").src = "assets/miku.gif";
              setInterval(() => {
                opacity += 50 / 5000;
                box.style.opacity = opacity;
              }, 50);
            }, 5000);
            movie.src = "assets/dj.gif";
            const customCursor = document.getElementById("custom-cursor");
            customCursor.style.display = "block";
            document.body.style.cursor = "none";
            ["speaker", "speaker2"].forEach((docID) => {
              const img = document.getElementById(docID);
              img.style.display = "block";
            });
          }, 250);

          movie.style.opacity = 1;
          applyRyEffect();
        }, 17400); // 20 seconds delay before scaling starts
      });
    });
  }
});
