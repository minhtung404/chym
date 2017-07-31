

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

var confidStunTwili = {'iceServers':
    [{"url":"stun:global.stun.twilio.com:3478?transport=udp"},
    {"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"0c498ca5e28778a8df0f9c64e9e14725e6a716faa56302a3d171de49b7a65143","credential":"Fe1R00p/o7fesG/EPcgFL4h14yviMkozfHDtkV3uf90="},
    {"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"0c498ca5e28778a8df0f9c64e9e14725e6a716faa56302a3d171de49b7a65143","credential":"Fe1R00p/o7fesG/EPcgFL4h14yviMkozfHDtkV3uf90="},
    {"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"0c498ca5e28778a8df0f9c64e9e14725e6a716faa56302a3d171de49b7a65143","credential":"Fe1R00p/o7fesG/EPcgFL4h14yviMkozfHDtkV3uf90="}]} /* Sample servers, please use appropriate ones */

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


    setTimeout(function(){

                openStream().then(stream=>{
                        playStream('bgvid',stream)
                        // mo duoc camera moi gui yeu cau
                         if(idNguoiChoi){
                                if(idNguoiChoi!=""){
                                    socket.emit("mb-yeu-cau-mo-camera",objThongTinNguoiChoi);
                                }
                             }
              });

    }, 2000);



    //
    socket.on("server-gui-stt-camera-cho-nguoi-choi",function(data){
                if(data.sttCamera=="1"){
                    var codePeer = data.codePeer;
                    console.log(codePeer);
                    openStream().then(stream=>{
                        peer.call(codePeer,stream);
                     });
                    $(".clsAfterVideo").css({"color":"green"});
                    $(".clsAfterVideo").css({"margin-top": "80%"});
                    $(".clsAfterVideo").css({"font-weight": "bold"});
                    $('.clsAfterVideo').html('<i class="fa fa-connectdevelop animated infinite flipOutY" aria-hidden="true"></i>  Trực tiếp...');
                }
                else{
                    $(".clsAfterVideo").css({"color":"red"});
                    $(".clsAfterVideo").css({"font-weight": "bold"});
                    $('.clsAfterVideo').html('<i class="fa fa-connectdevelop animated infinite flipOutY" aria-hidden="true"></i>  Kết nối bị từ chối, bạn chưa được sử dụng tác vụ này!');
                }
    });




    // Disconect
    peer.on('disconnected', function() {
        $(".clsAfterVideo").css({"color":"red"});
        $(".clsAfterVideo").css({"font-weight": "bold"});
        $('.clsAfterVideo').html('<i class="fa fa-connectdevelop animated infinite flipOutY" aria-hidden="true"></i>  Đã dừng kết nối!');
    });


});
