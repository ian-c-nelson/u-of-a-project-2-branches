$(window).ready(function(){
  console.log("page loaded");
  $(".textLeaf").html(function(){
    return $(this).text().replace(/\r\n/g," <br> ").replace(/\n/g," <br> ");
  });

  $(".like").on("click", function(event){
    
    
    var data = $(this).data();
    var $badge = $(this).find(".badge-likes");
    
    data.likes = parseInt(data.likes);
    
    data.likes++;
    
    $.ajax({
      url: "/api/leaves",
      method: "PUT",
      data: data
    }).then(function(){
      $.get("/api/leaves/" + data.id).then(function(newData){
        $badge.html(newData[0].likes);
      });
    });
  });

  $(".postButton").on("click", function(event){
    var textLeaf = $(".postText").val();

    var data = {
      text: textLeaf
    }

    var obj = {
      url: "/api/leaves",
      method: "POST",
      data: data
    }
    $.ajax(obj).then(function(resData){
      location.reload();
    });
  });

});