/**
 * Function for Menu button
 * Enables the sidebar element to be toggled when pressing the Menu button
 */
$(document).ready(function () {

    $('#toggleSidebar').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

