objectInput = "";
Status = "";
objects = [];
objectdetector = "";

function setup() {
    canvas = createCanvas(450, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectInput = document.getElementById("objectname").value;
}

function modelLoaded() {
    console.log("Model Is Loaded");
    Status = "True"
}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 450, 350);
    if (Status == "True") {
        objectdetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++) {
            fill("red");
            text(objects[i].label + " " + Math.floor(objects[i].confidence * 100) + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objectInput == objects[i].label) {
                video.stop();
                objectdetector.detect(gotResult);
                document.getElementById("result").innerHTML = "Object Mentioned Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("result").innerHTML = "Object Mentioned Not Found";
            }
        }
    }
}