

// Lấy bien tren trinh duyet
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


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
    
    
    var confidStunTwili = {'iceServers': [
    {"url":"stun:global.stun.twilio.com:3478?transport=udp"},
    {"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="},{"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="},
    {"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="}

    ]} /* Sample servers, please use appropriate ones */


        //openCamera();
        var peer = new Peer({
        
           host:'peerservermemo.herokuapp.com',
           secure:true,
           port:443,
           debug:3,
           config: confidStunTwili
        });

     var socketId = getUrlParameter('socketId');
     var  sttCamera = getUrlParameter('stt');
     var  tenNguoiChoi = getUrlParameter('tenNguoiChoi');
     var  tenTeam = getUrlParameter('tenTeam');
     
     
     
    peer.on('open',function(codePeer){
         var codePeer = codePeer;
         console.log(codePeer);
          console.log(socketId);
          console.log(sttCamera);
          var objPeerCnn = {socketId:socketId,sttCamera:sttCamera,codePeer:codePeer};  
          socket.emit("subadmin-status-camera",objPeerCnn);   
             
            
    });
    
    // Nguoi nhan
    peer.on("call",call=>{
        openStream().then(stream=>{
          call.answer(stream);
          // Tong dai khong can stream chinh minh
          //playStream('localStream',stream)
        //  console.log(stream);
          call.on('stream',dataStream=>{
            playStream('traLoi',dataStream)
          //  console.log("dataSteam"+dataStream);
          });

        });
    });
    
        
});
