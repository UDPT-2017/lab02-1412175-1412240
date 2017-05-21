//user add newfriend
function addfriend(fr) {
  $(document).ready(function(){
      $.get('/users/addfriend',{friend: fr},function(data){
        var id = "#btn_"+fr;
        $(id).empty();
        $(id).append("<button type=\"button\" name=\"button\" class=\"btn btn-primary\" onclick=\"removefriend('"+fr+"')\" >Remove</button>");
      });
  });
}
//user remove a friend
function removefriend(fr) {
  $(document).ready(function(){
      $.get('/users/removefriend',{friend: fr},function(data){
        var id = "#btn_"+fr;
        $(id).empty();
        $(id).append("<button type=\"button\" name=\"button\" class=\"btn btn-primary\" onclick=\"addfriend('"+fr+"')\" >Add</button>");
      });
  });
}

$(document).ready(function(){

  //when click New Message button
  $("#send_msg1").click(function(){
    //get id to send message
    var id ='';
        id  = $("#newMsg").val();
    console.log(id);
    //get date send message
    var now = new Date().getTime();
    var parameters = {text: $('#comment').val() ,send_time: now}

    $.post('/messages/'+ id+'/send',parameters,function(data){
      if(!data){
        alert("Can not send message");
      }
    })
  });
});
