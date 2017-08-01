

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
  //video: { facingMode: { exact: "environment" } }
    //const config = { audio: true, video: true };
    const config = { audio: true, video: { facingMode: { exact: "environment" } } };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}

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


var peer = new Peer({

   host:'peerservermemo.herokuapp.com',
   secure:true,
   port:443,
   debug:3,
   config: {'iceServers':confidStunTwili}
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
