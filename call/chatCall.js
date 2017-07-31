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
        socket.on('server-gui-chat-camera-nguoi-choi',function(data){
          var stringSend = htmlDecode(data.stringSend);
          if((stringSend==".")||(stringSend==" ")){
            $('.clChat').hide();
          }
          else{
            $('.clChat').show().html(stringSend);
          }


        })


});
