$(".create-event").on('click', function() {
    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    let location = $("#location").val();
    let desc = $("#name").val();
    let presets = $('#Presets').val();
    
    if(startDate && endDate && location && desc && presets) {
        if(desc.length <= 15){
            // eel.create_event(startDate, endDate, presets, desc, location);
            alert('passed through!');
            $("#start-date, #end-date, #location, #name").val('');

        } else alert("Name must be less than 15 characters");
    } else alert("Please fill in all the fields");
});


$(".add-attendee").on('click', function() {
    let studentID = parseInt($("#SID").val());
    let eventID = parseInt($("#EID").val());

    if(studentID && eventID) {
        // eel.add_attendee(eventID, studentID);
        alert('passed through!')
        $("#SID, #EID").val('');
    } else alert("Please fill in all the fields");
});