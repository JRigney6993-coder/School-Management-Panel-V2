$('#submit').click(function () {
    let email = $('#email').val();
    let password = $('#password').val();
    // login stuff yes
    if (eel.login(email, password)) {
        alert("aaaaaa")
    } else {
        alert("eeee")
    }
})