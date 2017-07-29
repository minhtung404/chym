

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

var confidStunTwili = {'iceServers': [
    {"url":"stun:global.stun.twilio.com:3478?transport=udp"},
    {"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="},{"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="},
    {"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="}

    ]} /* Sample servers, please use appropriate ones */


var peer = new Peer({

   host:'peerservermemo.herokuapp.com',
   secure:true,
   port:443,
   debug:3,
   config: confidStunTwili
});



$(document).ready(function(){
    
    
    // Index.html
    var idNguoiChoi = getUrlParameter('idNguoiChoi');
    var tenNguoiChoi = getUrlParameter('tenNguoiChoi');
    var tenTeam = getUrlParameter('tenTeam');
    
    var socketId;
    
    var objThongTinNguoiChoi={idNguoiChoi:idNguoiChoi,tenNguoiChoi:tenNguoiChoi,tenTeam:tenTeam};
    if(idNguoiChoi.length>0){
     socket.emit("mb-yeu-cau-mo-camera",objThongTinNguoiChoi);
     }
    
    setTimeout(function(){ 
               
                openStream().then(stream=>{
                        playStream('bgvid',stream)           
              });
            
    }, 2000);
    
    
    
    //
    socket.on("server-gui-stt-camera-cho-nguoi-choi",function(data){
                if(data.stt=="1"){
                    var codePeer = data.codePeer;
                    openStream().then(stream=>{
                        peer.call(codePeer,stream);    
                     });
                } 
                else{
                    $('.clsAfterVideo').html('<i class="fa fa-connectdevelop animated infinite flipOutY" aria-hidden="true"></i>  Kết nối bị từ chối, bạn chưa được sử dụng tác vụ này!');
                }
    });
    
    
    
    // video.team.html
    
             
});
