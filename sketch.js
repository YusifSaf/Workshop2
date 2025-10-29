// MINIMAL VERSION - Mic Level
// No visual feedback - data displayed in debug panel only
// Demonstrates: Reading microphone input level with threshold detection

// Global variables for microphone
let gifPic;
let mic;
let micLevel = 0;
let micMultiplier = 3;  // Increase sensitivity
//For gif version
let threshold = 0.3; 

//For image version
let imgTexture;
let imgAmount = 5;
let thresholds = [0.1, 0.3, 0.5, 0.7, 0.8];
let images = [];              // Threshold for loud sound detection

function preload(){
//   gifPic = loadImage('ezgif.com-animated-gif-maker.gif');
    for (let i=0; i<imgAmount; i++){
        images[i] = loadImage(`img${i}.jpg`);
    }
}

function setup() 
{
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(document.getElementById("p5-container"));
    imgTexture = images[0];
    imageMode(CENTER);
    
    // Show debug panel FIRST
    // showDebug();
    
    // Create microphone input (global variable for library to use)
    mic = new p5.AudioIn();
  
    // Enable microphone with tap permission
    enableMicTap("Press to sing ");
    
    // Lock mobile gestures
    lockGestures();
    
    debug("Mic Level - Minimal Version");
    debug("Tap to enable microphone");
    debug("Threshold: " + threshold);
    debug("Waiting for microphone...");
}

function draw() 
{
    // No visual feedback in minimal version
    
    // Check if microphone is enabled
    if (window.micEnabled) 
    {
        image(imgTexture, width/2, height/2, windowWidth, windowHeight);

        // Get current microphone level (0.0 to 1.0)
        micLevel = mic.getLevel() * micMultiplier;
        
        // Constrain to 0-1 range
        micLevel = constrain(micLevel, 0, 1);
        
        // Output to debug panel
        debug("--- Microphone Level ---");
        debug("Raw Level: " + nf(micLevel, 1, 3));
        debug("Percentage: " + int(micLevel * 100) + "%");
        
        // Gif version of Check against threshold
        // if (micLevel > threshold) 
        // {
        //     gifPic.play();
        //     debug("STATUS: LOUD! (Above threshold)");
        // }
        // else 
        // {
        //     gifPic.pause();  
        //     debug("STATUS: Quiet (Below threshold)");
        // }

        //Image version
        for (let i=0; i<imgAmount; i++){
            if (micLevel > thresholds[i])
            {
                imgTexture = images[i];
            }
            else{ break; }
        }
        
        // Add visual bar representation using text
        let barLength = int(micLevel * 20);
        let bar = "";
        for (let i = 0; i < barLength; i++) 
        {
            bar = bar + "▮";
        }
        debug("Level: " + bar);
    }
    else 
    {
        debug("Waiting for microphone permissions...");
        debug("Tap the screen to enable microphone");
    }
}