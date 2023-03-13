$(".create-event").on('click', function() {
    let startDate = $("#start-date");
    let endDate = $("#end-date");
    let location = $("#location");
    let desc = $("#name");
    let presets = $('#Presets').find(":selected").val();
    
    if(startDate.val() && endDate.val() && location.val() && desc.val() && presets) {
        if(desc.length <= 15){
            // eel.create_event(startDate, endDate, presets, desc, location);
            alert('passed through!');
            startDate.val(''); endDate.val(''); location.val(''); desc.val('');

        } else alert("Name must be less than 15 characters");
    } else alert("Please fill in all the fields");
});


$(".add-attendee").on('click', function() {
    let studentID = $("#SID");
    let eventID = $("#EID");

    if(studentID.val() && eventID.val()) {
        // eel.add_attendee(eventID, studentID);
        alert('passed through!')
        studentID.val(''); eventID.val('');
    } else alert("Please fill in all the fields");
});