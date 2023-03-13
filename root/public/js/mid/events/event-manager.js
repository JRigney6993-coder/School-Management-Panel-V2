$(".create-event").on('click', function() {
    let start = $("#start-date");
    let end = $("#end-date");
    let location = $("#location");
    let name;

    if($("#name").val() == "")name = $("#Presets");
    else name = $("#name");
    
    if(start.val() && end.val() && location.val() && name.val()) {
        if(name.length <= 15){
            alert(start.val() + " " + end.val() + " " + name.val() + " " + location.val());
            // eel.create_event(start, end, name, location);
            start.val(""); end.val(""); location.val(""); name.val("");
        }else alert("Name must be less than 15 characters");

    }else alert("Please fill in all the fields");
});


$(".add-attendee").on('click', function() {
    let student_id = $("#SID");
    let event_id = $("#EID");

    if(student_id.val() && event_id.val()) {
        alert(student_id.val() + " " + event_id.val());
        // eel.add_attendee(event_id, student_id);
        student_id.val(""); event_id.val("");
    }else alert("Please fill in all the fields");
});