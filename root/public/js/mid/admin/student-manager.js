$(".add-student").on("click", function() {
    let studentName = $("#name").val();
    let studentEmail = $("#email").val();

    if(studentEmail && studentName){

        eel.add_student(studentName, studentEmail);
        alert('passed through!');
        $("#name, #email").val("");
        
    } else alert("Please fill in all fields");
});

$(".add-to-class").on("click", function() {
    let studentID = parseInt($("#student-id-add").val());
    let teacherID = $("#teacher-id-add").val();
    let period = $("input[name='inline-radio']:checked");

    if(studentID && teacherID && period){

            eel.update_document('teachers', {"ID": parseInt(teacherID)}, {"$push": {["Classes." + period.val()]: studentID}})
            $('#student-id-add, #teacher-id-add').val('');
            alert('passed through!')
    } else alert("Please fill in all fields");
});

$(".remove-from-class").on("click", function() {
    let studentID = parseInt($("#student-id-remove").val());
    let teacherID = $("#teacher-id-remove").val();
    let period = $("input[name='inline-radio']:checked");

    if(studentID && teacherID && period.val()){
       eel.update_document('teachers', {"ID": parseInt(teacherID)}, {"$pull": {["Classes." + period.val()]: studentID}});
        $('#student-id-remove, #teacher-id-remove').val('');
        alert('passed through!');

    } else alert("Please fill in all fields");
});