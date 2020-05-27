$(document).ready(function () {
    $("#submit").click(function () {

        let email = $('#email_address')
        let fullName = $('#full_name')
        let message = $('#message')
        let subject = $('#subject')
        console.log(email.val())
        if (email.val() === '' || fullName.val() === '' ||
            message.val() === '' || subject.val() === '') {
            alert("Please fill all fields.")

        } else {
            window.open('mailto:' + email.val() + '?subject=' + subject.val().toUpperCase() + ' From: ' + fullName.val() + ' &body=' + message.val());
        }


    });
});
