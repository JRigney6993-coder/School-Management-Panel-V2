async function refresh_events() {
    var eventNum = await eel.get_event_num();
    $('tbody').empty();
    console.log('a')
    for (var i = 0; i < eventNum; i++) {
        console.log('b')
        var eventData = await eel.get_event(i);
        console.log('c')
        $(tbody).innerHTML += `
                <tr><td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <div class="flex h-full items-center">
                        <span class="text-sm font-medium text-gray-100">${eventData['Event_Name']}</span>
                      </div>
                    </div>
                  </td>

                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium text-gray-100">${eventData['Event_Type']}</span>
                    </div>
                  </td>

                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium text-gray-100">${eventData['Location']}</span>
                    </div>
                  </td>

                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium text-gray-100">${eventData['Start_Date']}</span>
                    </div>
                  </td>

                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium text-gray-100">${eventData['End_Date']}</span>
                    </div>
                  </td>
      
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium text-gray-100"></span>
                    </div>
                  </td>
      
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium text-gray-100">${eventData['ID']}</span>
                    </div>
                  </td>
                </tr>`
    };
};


$(document).ready(function() {
    refresh_events();

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
                refresh_events();
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
                eel.add_attendees(eventID, studentID);

                $("#SID, #EID").val('');
                refresh_events();
                alert('passed through!');

            } else alert("Make sure ID's are a number");
        } else alert("Please fill in all the fields");
    });
});
