$( document ).ready(function() {

$(".expands.workflow").hover(function () {
    $(".expands.workflow ul").slideDown('slow');
}, function () {
    $(".expands.workflow ul").slideUp('slow');
});
});