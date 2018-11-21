$(window).ready(function(){
    $(".searchBranchesBTN").on("click", function(event){
        event.preventDefault();
        var searchBranch = $(".searchBranches").val();

        let url = "/index?filterByName=" + searchBranch;

        window.location.href = url;
        
    });
});