$(".add-teacher").on("click", function () {
    let firstName = $("#first-name").val();
    let lastName = $("#last-name").val();
    let email = $("#email-add").val();
    let password = $("#password").val();

    if(firstName && lastName && email && password) {

        alert('passed through!');
        eel.create_teacher(firstName, lastName, email, password);
        $("#first-name, #last-name, #email-add, #password").val('');

    }else alert("Please fill in all the fields"); 
})

$(".remove-teacher").on("click", function () {
    let teacherID = parseInt($("#teacher-id").val());
    let email = $("#email-remove").val();

    if(teacherID && email) {

        alert('passed through!');
        eel.remove_document('teachers', teacherID, email);
        $("#teacher-id, #email-remove").val('');

    }else alert("Please fill in all the fields"); 
})