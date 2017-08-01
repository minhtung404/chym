function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}



$(document).ready(function(){
    $('.clChat').hide();
      $('#pHideChat').click(function(){
            $('.clsChatBox, .clsAfterVideo').toggle();
      })

      $('#btnGuiTin').click(function(){
            var stringSend = $('#txtChatSub').val();
            //HTML encode roi gui
            stringSend = htmlEncode(stringSend);
            var socketId = getUrlParameter('socketId');
            var objPeerCnn = {socketId:socketId,stringSend:stringSend};
            socket.emit("subadmin-send-chat-camera",objPeerCnn);
            if((stringSend==".")||(stringSend==" ")){
              $('.clChat').hide();
            }
            else{
              // HTML decode de hien thi
              //console.log(htmlEncode(stringSend));
              $('.clChat').show().html(htmlDecode(stringSend));
            }
      })

});
