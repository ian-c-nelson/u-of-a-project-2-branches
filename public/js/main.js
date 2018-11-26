$(window).ready(function(){
    $(".searchBranchesBTN").on("click", function(event){
        event.preventDefault();
        var searchBranch = $(".searchBranches").val();

        let url = "/index?filterByHandle=" + searchBranch;

        window.location.href = url;
        
    });
});