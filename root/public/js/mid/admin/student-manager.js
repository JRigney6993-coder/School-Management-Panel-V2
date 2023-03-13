$(".add-student").on("click", function() {
    let studentName = $("#name").val();
    let studentEmail = $("#email").val();

    if(studentEmail && studentName){
        // eel.add_student(studentName, studentEmail);
        alert('passed through!')

    } else alert("Please fill in all fields");
});

$(".add-to-class").on("click", function() {
    let studentID = $("#student-id-add").val();
    let teacherID = $("#teacher-id-add").val();
    let period = $("input[name='inline-radio']:checked");

    if(studentID && teacherID && period.val()){
        // eel.add_student(studentID, teacherID, period);
        alert('passed through!')

    } else alert("Please fill in all fields");
});

$(".remove-from-class").on("click", function() {
    let studentID = $("#student-id-remove").val();
    let teacherID = $("#teacher-id-remove").val();
    let period = $("input[name='inline-radio']:checked");

    if(studentID && teacherID && period.val()){
        // eel.remove_student(studentID, teacherID, period);
        alert('passed through!')
        
    } else alert("Please fill in all fields");
});