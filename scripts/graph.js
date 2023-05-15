const colours = {
    waveform1: "#23863688",
    waveform2: "#38a6ff88",
    waveform3: "#9003fc88",
    summation: "#FFFFFF",
    axes: "#ffffff"
}

const wave1Values = {
    amplitude: 50,
    frequency: 0.01,
    phase: 5,
    velocity: 1.75,
}

const wave2Values = {
    amplitude: 40,
    frequency: 0.003,
    phase: 0,
    velocity: -1.4,
}

const wave3Values = {
    amplitude: 40,
    frequency: 0.005,
    phase: 0,
    velocity: -0.5,
}

const oldWave2Values = {
    amplitude: 40,
    frequency: 0.0035,
    phase: 0,
    velocity: 0.5,
}

const oldWave3Values = {
    amplitude: 50,
    frequency: 0.0015,
    phase: 0,
    velocity: -3,
}

function showAxes(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var xMin = 0;
    
    ctx.beginPath();
    ctx.strokeStyle = "rgba(128,128,128)";
    
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
    if (waveNumber == 3){
        ctx.strokeStyle = colours.waveform3;
        amplitude = wave3Values.amplitude;
        frequency = wave3Values.frequency;
        phaseAngle = wave3Values.phase;
        colour = colours.waveform3;
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


function plotHeartRate(ctx, time) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    let term1, term2, term3, sum;

    const xScaling = 50;
    const period = (6* Math.PI / 2 ) * xScaling;

    ctx.lineWidth = 3;


    isSummationDashed= false;
    if (isSummationDashed) {
        ctx.setLineDash([15, 20]);
    } else {
        ctx.setLineDash([]);
    }
    
    
    var y = 0;
    
    let pattern = [];
    for (let x = 1; x < 2000; x++) {
        t = x/xScaling;
        
        term1 = (Math.sin(((t)*4)) + Math.sin(16*t) / 4);
        term2 = 3;
        term3 = (-(Math.floor(Math.sin(2*t)) + 0.1));

        term4 = 1 - Math.round((x%period) / period);

        sum = term1 * term2 * term3 * term4;

        pattern.push(sum * 40);
        
    }

    let relativeTime = (time-1000) % 2000;
    let relativeTime2 = (time) % 2000;
    console.log(relativeTime/2000);

    let position = relativeTime/2000;
    let position2 = relativeTime2/2000;

    //ctx.rect(relativeTime, 0, 1, height);


    //let gradient = ctx.createLinearGradient(-500, height/2, width+500, height/2);

    //if(position > 0 && position < 1) {
    //    gradient.addColorStop(position, "rgb(255,255,255,0)");
    //}
    //if(position > 0 && position < 1) {
    //    gradient.addColorStop(position2, "rgb(255,255,255,255)");
    //}
    //gradient.addColorStop(0, "rgb(255,255,255,0)");
    //gradient.addColorStop(0.5, "rgb(255,255,255,255)");
    //gradient.addColorStop(1, "rgb(255,255,255,0)");
    
    //gradient.addColorStop(1, "rgb(255,255,255,255)");
    //gradient.addColorStop(position4, "rgb(255,255,255,255)");
    //gradient.addColorStop(position5, "rgb(255,255,255,0)");*/

    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.fillStyle = "rgb(255,255,255)";

    for (x = 0; x < width; x++) {
        ctx.lineTo(x, pattern[x] + height/2);
    }

    ctx.stroke();
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = '#0d1117';
    ctx.strokeStyle = '#0d1117';
    //ctx.rect(time-1500, 0, 1000, canvas.height);
    ctx.clearRect(time, 0, 10000, canvas.height);

    for (let i = 0; i < 500; i++){
        ctx.fillRect(time-(i*2500), 0, 1000, canvas.height);
    }

    ctx.stroke();
    ctx.save();

    ctx.fillStyle = '#0d1117cc';

    for (let i = 0; i < 500; i++){

        ctx.fillRect(time-(i*2500), 0, 1300, canvas.height);
    }

    ctx.fillStyle = '#0d1117bb';

    for (let i = 0; i < 500; i++){

        ctx.fillRect(time-(i*2500), 0, 1250, canvas.height);
    }

    ctx.stroke();
    ctx.save();


    ctx.fillStyle = '#0d111777';

    for (let i = 0; i < 500; i++){

        ctx.fillRect(time-(i*2500), 0, 1150, canvas.height);
    }

    ctx.stroke();
    ctx.save();


    ctx.fillStyle = '#0d111755';

    for (let i = 0; i < 500; i++){

        ctx.fillRect(time-(i*2500), 0, 1100, canvas.height);
    }

    ctx.stroke();
    ctx.save();

    
    ctx.fillStyle = '#0d111711';

    for (let i = 0; i < 500; i++){

        ctx.fillRect(time-(i*2500), 0, 1050, canvas.height);
    }

    ctx.stroke();
    ctx.save();

    ctx.fillStyle = '#0d111705';

    for (let i = 0; i < 500; i++){

        ctx.fillRect(time-(i*2500), 0, 1025, canvas.height);
    }

    ctx.stroke();
    ctx.save();

    ctx.fillStyle = '#0d111701';

    for (let i = 0; i < 500; i++){

        ctx.fillRect(time-(i*2500), 0, 1010, canvas.height);
    }

    ctx.stroke();
    ctx.save();

    

    
    /*pattern.forEach((term, index) => {

        if ((index < time && index > time - 1000)){

            ctx.lineTo(index, term + height/2);
            
        }
        
    })*/
}

function plotSummation(ctx, time1, time2, time3) {
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
    frequency3 = wave3Values.frequency;

    amplitude1 = wave1Values.amplitude;
    amplitude2 = wave2Values.amplitude;
    amplitude3 = wave3Values.amplitude;

    phaseAngle1 = wave1Values.phase;
    phaseAngle2 = wave2Values.phase;
    phaseAngle3 = wave3Values.phase;
    
    var y = 0;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        omega1 = 2*Math.PI*frequency1;
        omega2 = 2*Math.PI*frequency2;
        omega3 = 2*Math.PI*frequency3;

        wave1 = amplitude1 *  sineWave(omega1, x-width/2, time1*frequency1, phaseAngle1)
        wave2 = amplitude2 *  sineWave(omega2, x-width/2, time2*frequency2, phaseAngle2)
        wave3 = amplitude2 *  sineWave(omega3, x-width/2, time3*frequency3, phaseAngle3)

        y = - (wave1 + wave2 + wave3) * 1.1;

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

    //context.clearRect(0, 0, canvas.width, canvas.height);
    //showAxes(context);
    //context.save();
    
    wave1_direction = "forward";
    wave2_direction = "forward";
    wave3_direction = "forward";

    let wave1_velocity, wave2_velocity, wave3_velocity = 3;
    wave1_velocity = wave1Values.velocity;
    wave2_velocity = wave2Values.velocity;
    wave3_velocity = wave3Values.velocity;
    
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
    
    if (wave3_direction == "forward"){
        wave3_time += wave3_velocity;
    }
    if (wave3_direction == "reverse"){
        wave3_time -= wave3_velocity;
    }
    if (wave3_direction == "stationary"){
        wave3_time = 0;
    }

    //plotFunction(context, wave1_time, 1);
    //plotFunction(context, wave2_time, 2);
    //plotFunction(context, wave3_time, 3);

    isSummationEnabled = true;

    if (isSummationEnabled) {
        //plotSummation(context, wave1_time, wave2_time, wave3_time);
    }
    
    plotHeartRate(context, wave1_time);

    //context.restore();
    


    window.requestAnimationFrame(drawFrame);
}



function init() {
    window.requestAnimationFrame(drawFrame);
}

var wave1_time = 0;
var wave2_time = 0;
var wave3_time = 0;