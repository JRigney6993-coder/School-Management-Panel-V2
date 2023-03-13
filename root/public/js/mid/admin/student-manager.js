$(".add-student").on("click", function() {
    let student_name = $("#name");
    let student_email = $("#email");

    if(student_email.val() && student_name.val()){
        alert(student_name.val() + " " + student_email.val());
        // eel.add_student(student_name.val(), student_email.val());
        student_email.val(""); student_name.val("");
    }
    else alert("Please fill in all fields");
});

$(".add-to-class").on("click", function() {
    let student_id = $("#student-id-add");
    let teacher_id = $("#teacher-id-add");
    let period = $("input[name='inline-radio']:checked");

    if(student_id.val() && teacher_id.val() && period.val()){
        alert(student_id.val() + " " + teacher_id.val() + " " + period.val());
        // eel.add_student(student_id.val(), teacher_id.val(), period.val());
        student_id.val(""); teacher_id.val(""); period.prop('checked', false);
    }else  alert("Please fill in all fields");
});

$(".remove-from-class").on("click", function() {
    let student_id = $("#student-id-remove");
    let teacher_id = $("#teacher-id-remove");
    let period = $("input[name='inline-radio']:checked");

    if(student_id.val() && teacher_id.val() && period.val()){
        alert(student_id.val() + " " + teacher_id.val() + " " + period.val());
        // eel.remove_student(student_id.val(), teacher_id.val(), period.val());
        student_id.val(""); teacher_id.val(""); period.prop('checked', false);
    }else  alert("Please fill in all fields");
});