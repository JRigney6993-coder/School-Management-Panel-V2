$(".add-student").on("click", function() {
    let studentName = $("#name").val();
    let studentEmail = $("#email").val();

    if(studentEmail && studentName){
        // eel.add_student(studentName, studentEmail);
        alert('passed through!');
        $("#name, #email").val("");
    } else alert("Please fill in all fields");
});

$(".add-to-class").on("click", function() {
    let studentID = parseInt($("#student-id-add").val());
    let teacherID = parseInt($("#teacher-id-add").val());
    let period = $("input[name='inline-radio']:checked");

    if(studentID && teacherID && period.val()){
        // eel.add_student(studentID, teacherID, period);
        alert('passed through!')
        $("#student-id-add, #teacher-id-add").val("");
    } else alert("Please fill in all fields");
});

$(".remove-from-class").on("click", function() {
    let studentID = parseInt($("#student-id-remove").val());
    let teacherID = parseInt($("#teacher-id-remove").val());
    let period = $("input[name='inline-radio']:checked");

    if(studentID && teacherID && period.val()){
        // eel.remove_student(studentID, teacherID, period);
        alert('passed through!')
        $("#student-id-remove, #teacher-id-remove").val("");
    } else alert("Please fill in all fields");
});