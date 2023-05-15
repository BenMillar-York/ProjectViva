const colours = {
    waveform1: "#238636",
    waveform2: "#38a6ff",
    summation: "#EF633F",
    axes: "#ffffff"
}

const wave1Values = {
    amplitude: 50,
    frequency: 0.01,
    phase: 5,
    velocity: 2,
}

const wave2Values = {
    amplitude: 40,
    frequency: 0.0035,
    phase: 0,
    velocity: 0.5,
}

function showAxes(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var xMin = 0;
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    
    // X-Axis
    ctx.moveTo(xMin, height/2);
    ctx.lineTo(width, height/2);
    
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    
    ctx.stroke();
}

function sineWave(omega, x, time, phaseAngle) {
    return Math.sin(x*omega - time - (2*Math.PI-phaseAngle));
}

function plotFunction(ctx, time, waveNumber) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 2;
    
    if (waveNumber == 1) {
        ctx.strokeStyle = colours.waveform1;
        amplitude = wave1Values.amplitude;
        frequency = wave1Values.frequency;
        phaseAngle = wave1Values.phase;
        colour = colours.waveform1;
    }
    if (waveNumber == 2){
        ctx.strokeStyle = colours.waveform2;
        amplitude = wave2Values.amplitude;
        frequency = wave2Values.frequency;
        phaseAngle = wave2Values.phase;
        colour = colours.waveform2;
    }
    
    
    var y = 0;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        omega = 2*Math.PI*frequency

        y = - amplitude *  sineWave(omega, x-width/2, time*frequency, phaseAngle);

        ctx.lineTo(x, y + (height/2));
    }

    ctx.stroke();
    ctx.save();

}

function plotSummation(ctx, time1, time2) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineWidth = 3;
    ctx.strokeStyle = colours.summation;

    isSummationDashed= false;
    if (isSummationDashed) {
        ctx.setLineDash([15, 20]);
    } else {
        ctx.setLineDash([]);
    }
    

    frequency1 = wave1Values.frequency;
    frequency2 = wave2Values.frequency;

    amplitude1 = wave1Values.amplitude;
    amplitude2 = wave2Values.amplitude;

    phaseAngle1 = wave1Values.phase;
    phaseAngle2 = wave2Values.phase;
    
    var y = 0;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        omega1 = 2*Math.PI*frequency1
        omega2 = 2*Math.PI*frequency2

        wave1 = amplitude1 *  sineWave(omega1, x-width/2, time1*frequency1, phaseAngle1)
        wave2 = amplitude2 *  sineWave(omega2, x-width/2, time2*frequency2, phaseAngle2)

        y = - (wave1 + wave2) * 1.1;

        ctx.lineTo(x, y + (height/2));
    }
    ctx.stroke();
    ctx.save();
}

function drawFrame() {
    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight/2;
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    //showAxes(context);
    context.save();
    
    wave1_direction = "forward";
    wave2_direction = "forward";

    let wave1_velocity, wave2_velocity = 3;
    wave1_velocity = wave1Values.velocity;
    wave2_velocity = wave2Values.velocity;
    
    if (wave1_direction == "forward"){
        wave1_time += wave1_velocity;
    }
    if (wave1_direction == "reverse"){
        wave1_time -= wave1_velocity;
    }
    if (wave1_direction == "stationary"){
        wave1_time = 0;
    }

    if (wave2_direction == "forward"){
        wave2_time += wave2_velocity;
    }
    if (wave2_direction == "reverse"){
        wave2_time -= wave2_velocity;
    }
    if (wave2_direction == "stationary"){
        wave2_time = 0;
    }

    plotFunction(context, wave1_time, 1);
    plotFunction(context, wave2_time, 2);

    isSummationEnabled = true;

    if (isSummationEnabled) {
        plotSummation(context, wave1_time, wave2_time);
    }

    context.restore();
    


    window.requestAnimationFrame(drawFrame);
}   

function init() {
    window.requestAnimationFrame(drawFrame);
}

var wave1_time = 0;
var wave2_time = 0;