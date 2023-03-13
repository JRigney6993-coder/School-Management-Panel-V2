$(".create-event").on('click', function() {
    let startDate = $("#start-date").val();
    let end = $("#end-date").val();
    let location = $("#location").val();
    let name = $("#name").val();
    let presets = $('#Presets').find(":selected").val();
    
    if(startDate && end && location && name && presets) {
        if(name.length <= 15){
            // eel.create_event(startDate, end, name, location);
            alert('passed through!')

        } else alert("Name must be less than 15 characters");
    } else alert("Please fill in all the fields");
});


$(".add-attendee").on('click', function() {
    let studentID = $("#SID").val();
    let eventID = $("#EID").val();

    if(studentID && eventID) {
        // eel.add_attendee(eventID, studentID);
        alert('passed through!')
        
    } else alert("Please fill in all the fields");
});