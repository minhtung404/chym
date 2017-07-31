

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

//
  //Ham xu ly record video
var recordRTC;
        function successCallback(stream) {
          // RecordRTC usage goes here
          
          var options = {
            mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 128000,
            bitsPerSecond: 128000 // if this line is provided, skip above two
          };
          recordRTC = RecordRTC(stream, options);
          recordRTC.startRecording();
      }



//


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
    var recordRTC;

    var confidStunTwili = {'iceServers':
    [{"url":"stun:global.stun.twilio.com:3478?transport=udp"},
    {"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"0c498ca5e28778a8df0f9c64e9e14725e6a716faa56302a3d171de49b7a65143","credential":"Fe1R00p/o7fesG/EPcgFL4h14yviMkozfHDtkV3uf90="},
    {"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"0c498ca5e28778a8df0f9c64e9e14725e6a716faa56302a3d171de49b7a65143","credential":"Fe1R00p/o7fesG/EPcgFL4h14yviMkozfHDtkV3uf90="},
    {"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"0c498ca5e28778a8df0f9c64e9e14725e6a716faa56302a3d171de49b7a65143","credential":"Fe1R00p/o7fesG/EPcgFL4h14yviMkozfHDtkV3uf90="}]} /* Sample servers, please use appropriate ones */

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
          $(".clsAfterVideo").css({"color":"green"});
          $(".clsAfterVideo").css({"margin-top": "80%"});
          $('.clsAfterVideo').html('<i class="fa fa-connectdevelop animated infinite flipOutY" aria-hidden="true"></i>'+tenNguoiChoi+' ('+ tenTeam +') đang trực tiếp.');

          // Ghi lai video
            successCallback(dataStream);

          });

        });
    });

          $('#pHideChat').onclick = function () {
                  recordRTC.stopRecording(function (audioVideoWebMURL) {
                      video.src = audioVideoWebMURL;

                      var recordedBlob = recordRTC.getBlob();
                      recordRTC.getDataURL(function(dataURL) { });
                  });
      };




});
