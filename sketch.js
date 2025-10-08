// MINIMAL VERSION - Mic Level
// No visual feedback - data displayed in debug panel only
// Demonstrates: Reading microphone input level with threshold detection

// Global variables for microphone
let gifPic;
let mic;
let micLevel = 0;
let micMultiplier = 3;  // Increase sensitivity
let threshold = 0.3;    // Threshold for loud sound detection

function preload(){
  gifPic = loadImage('ezgif.com-animated-gif-maker.gif');
}

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    
    // Show debug panel FIRST
    showDebug();
    
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
        image(gifPic, 0, 0, 200, 200);

        // Get current microphone level (0.0 to 1.0)
        micLevel = mic.getLevel() * micMultiplier;
        
        // Constrain to 0-1 range
        micLevel = constrain(micLevel, 0, 1);
        
        // Output to debug panel
        debug("--- Microphone Level ---");
        debug("Raw Level: " + nf(micLevel, 1, 3));
        debug("Percentage: " + int(micLevel * 100) + "%");
        
        // Check against threshold
        if (micLevel > threshold) 
        {
            gifPic.play();
            debug("STATUS: LOUD! (Above threshold)");
        }
        else 
        {
            gifPic.pause();  
            debug("STATUS: Quiet (Below threshold)");
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