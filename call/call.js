


function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}

$(document).ready(function(){
    setTimeout(function(){ 
                openStream().then(stream=>{
            
                        playStream('bgvid',stream)
            
                       
              });
            
    }, 5000);
             
});
