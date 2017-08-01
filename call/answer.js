

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


function openStream() {
    const config = { audio: true, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}



// Xu ly recored

//-----------------------





$(document).ready(function(){


  var confidStunTwili;

  $.ajax({
                url: "https://sturnservertwioli.herokuapp.com/",
                                  type:"GET",
           dataType: "JSON",
           async:false,
           success: function(data) {

                 confidStunTwili = data;
             },
           error: function(jqXHR, textStatus, errorThrown) {
                 console.log(jqXHR + "tex: "+textStatus + "err:"+ errorThrown);
             }

      });
      
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



          });

        });
    });





});
