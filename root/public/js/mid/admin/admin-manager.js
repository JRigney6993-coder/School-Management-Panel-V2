$('.add-admin').on('click', function () {
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    let email = $('#email-add').val();
    let password = $('#password').val();

    if (firstName && lastName && email && password) {
        if (password.length >= 12) {
            
            eel.create_admin(firstName, lastName, email, password);
            $('#first-name, #last-name, #email-add, #password').val('');
            alert('passed through!');

        } else alert('Password must be at least 12 characters');
    } else alert('Make sure textfield is not empty');
});

$('.remove-admin').on('click',function () {
    let adminID = $('#admin-id').val();
    let email = $('#email-remove').val();

    if (adminID && email) {
        if (Number.isInteger(parseInt(adminID))) {
            // Code here

            eel.remove_document('admins', adminID, email)
            $('#admin-id, #email-remove').val('');
            alert('passed through!');

        } else alert('Student ID must be an integer');
    } else alert('Make sure textfield is not empty');
});
