$(".create-event").on('click', function() {
    let startDate = $("#start-date").val();
    let endDate = $("#end-date").val();
    let location = $("#location").val();
    let name = $("#name").val();
    let presets = $('#presets').find(":selected").val();

    if(startDate && endDate && location && name && presets) {
        if(name.length <= 15){
            eel.create_event(startDate, endDate, name, presets, location);

            $('#start-date, #end-date, #location, #name, #presets').val('');
            alert('passed through!');

        } else alert("Name must be less than 15 characters");
    } else alert("Please fill in all the fields");
});

// ----------------------------------------------------------------

$(".add-attendee").on('click', function() {
    let studentID = parseInt($("#SID").val());
    let eventID = parseInt($("#EID").val());

    if(studentID && eventID) {
        if (Number.isInteger(parseInt(studentID)) && Number.isInteger(parseInt(eventID))) {
            eel.add_attendee(eventID, studentID);

            $("#SID, #EID").val('');
            alert('passed through!');

        } else alert("Make sure ID's are a number");
    } else alert("Please fill in all the fields");
});
