async function refresh_events() {
    var eventNum = await eel.get_event_num()();
    $("tbody").empty();

    for (var i = 0; i < eventNum; i++) {
        var eventData = await eel.load_events(i)();

        var $row = $("<tr>").append(
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<div>")
                                .addClass("flex h-full items-center")
                                .append(
                                    $("<span>")
                                        .addClass(
                                            "text-sm font-medium text-gray-100"
                                        )
                                        .text(eventData[0]["Event_Name"])
                                )
                        )
                ),
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<span>")
                                .addClass("text-sm font-medium text-gray-100")
                                .text(eventData[0]["Event_Type"])
                        )
                ),
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<span>")
                                .addClass("text-sm font-medium text-gray-100")
                                .text(eventData[0]["Location"])
                        )
                ),
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<span>")
                                .addClass("text-sm font-medium text-gray-100")
                                .text(eventData[0]["Start_Date"])
                        )
                ),
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<span>")
                                .addClass("text-sm font-medium text-gray-100")
                                .text(eventData[0]["End_Date"])
                        )
                ),
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<span>")
                                .addClass("text-sm font-medium text-gray-100")
                                .text(eventData[0]["Attendees"].length)
                        )
                ),
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<span>")
                                .addClass("text-sm font-medium text-gray-100")
                                .text(eventData[0]["ID"])
                        )
                ),
            $("<td>")
                .addClass("p-0")
                .append(
                    $("<div>")
                        .addClass("flex items-center h-16 px-6")
                        .append(
                            $("<button>")
                                .addClass(
                                    "inline-flex h-9 py-1 px-4 mb-2 items-center text-center text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 rounded-lg add-attendee button-center"
                                )
                                .attr("id", "remove")
                                .text("Remove")
                        )
                )
        );

        $("tbody").append($row);
    }
}
refresh_events();

$(document).on("load", function () {
    $("#remove").on("click", function () {
        var row = $(this).closest("tr");
        var eventID = row.find("td:nth-child(7)").text();

        if (confirmation) {
            eel.remove_event(eventID);
            row.remove();
        }
    });

    $(".create-event").on("click", function () {
        let startDate = $("#start-date").val();
        let endDate = $("#end-date").val();
        let location = $("#location").val();
        let name = $("#name").val();
        let presets = $("#presets").find(":selected").val();

        if (startDate && endDate && location && name && presets) {
            if (name.length <= 15) {
                eel.create_event(startDate, endDate, name, presets, location);
                $("#start-date, #end-date, #location, #name, #presets").val("");

                refresh_events();
                alert("The " + name + " event has been created!");
            } else alert("Name must be less than 15 characters");
        } else alert("Please fill in all the fields");
    });

    $(".add-attendee").on("click", function () {
        let studentID = parseInt($("#SID").val());
        let eventID = parseInt($("#EID").val());

        if (studentID && eventID) {
            if (
                Number.isInteger(parseInt(studentID)) &&
                Number.isInteger(parseInt(eventID))
            ) {
                eel.add_attendees(eventID, studentID);
                $("#SID, #EID").val("");

                refresh_events();
                alert(
                    "The student with the ID " +
                        studentID +
                        "has been added to the attendee list."
                );
            } else alert("Make sure ID's are a number");
        } else alert("Please fill in all the fields");
    });

    $("#messagesInput1-1").on("keyup", function () {
        var inputVal = $(this).val().toLowerCase();

        $("tbody tr").each(function () {
            var rowText = $(this).text().toLowerCase();

            if (rowText.indexOf(inputVal) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

$(".remove").on("click", function () {
    var row = $(this).closest("tr");
    var eventID = row.find("td:nth-child(7)").text();

    if (confirmation) {
        eel.remove_event(eventID);
        row.remove();
    }
});
