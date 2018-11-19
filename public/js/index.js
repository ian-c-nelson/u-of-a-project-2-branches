$(window).ready(function(){
  $(".textLeaf").html(function(){
    return $(this).text().replace(/\r\n/g," <br> ").replace(/\n/g," <br> ");
  });
})