async function refresh_events() {
    var eventData = await eel.load_document('students')();
    $("tbody").empty();

    for (var i = 0; i < eventData.length; i++) {
        let data = Object.values(eventData[i]);
        console.log(data);

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
                                        .text(data[1] + " " + data[2])
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
                                .text(data[3])
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
                                .text("0.0")
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
                                .text(data[5])
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
                                .text(data[6])
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
                                .text(data[7].length)
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
                                .text(data[4])
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
                                .on('click', function () {
                                    var row = $(this).closest("tr");
                                    var eventID = row.find("td:nth-child(7)").text();
                                    eel.remove_document('students', parseInt(eventID, 10));
                                    refresh_events();
                                })
                        )
                )
        );

        $("tbody").append($row);
    }
}

$(document).ready(function () {
    refresh_events();

    $(".add-student").on("click", function () {
        let studentName = $("#name").val();
        let studentEmail = $("#email").val();

        if (studentEmail && studentName) {

            eel.add_student(studentName, studentEmail);
            refresh_events();
            alert('passed through!');
            $("#name, #email").val("");

        } else alert("Please fill in all fields");
    });

    $(".add-to-class").on("click", function () {
        let studentID = parseInt($("#student-id-add").val());
        let teacherID = $("#teacher-id-add").val();
        let period = $("input[name='inline-radio']:checked");

        if (studentID && teacherID && period) {

            eel.update_document('teachers', { "ID": parseInt(teacherID) }, { "$push": { ["Classes." + period.val()]: studentID } })
            refresh_events();
            $('#student-id-add, #teacher-id-add').val('');
            alert('passed through!')
        } else alert("Please fill in all fields");
    });

    $(".remove-from-class").on("click", function () {
        let studentID = parseInt($("#student-id-remove").val());
        let teacherID = $("#teacher-id-remove").val();
        let period = $("input[name='inline-radio']:checked");

        if (studentID && teacherID && period.val()) {
            eel.update_document('teachers', { "ID": parseInt(teacherID) }, { "$pull": { ["Classes." + period.val()]: studentID } });
            refresh_events();
            $('#student-id-remove, #teacher-id-remove').val('');
            alert('passed through!');

        } else alert("Please fill in all fields");
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