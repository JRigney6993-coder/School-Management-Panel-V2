async function refresh_events() {
    var eventData = await eel.load_document('teachers')();
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
                                .text("100%")
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
                                .text("0/0/0000")
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
                                    var eventID = row.find("td:nth-child(6)").text();
                                    eel.remove_document('teachers', parseInt(eventID, 10));
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

    $(".add-teacher").on("click", function () {
        let firstName = $("#first-name").val();
        let lastName = $("#last-name").val();
        let email = $("#email-add").val();
        let password = $("#password").val();

        if (firstName && lastName && email && password) {

            alert('passed through!');
            eel.create_teacher(firstName, lastName, email, password);
            refresh_events();
            $("#first-name, #last-name, #email-add, #password").val('');

        } else alert("Please fill in all the fields");
    });

    $(".add-break-days").on("click", function () {
        let teacherID = parseInt($("#teacher-id").val());
        let days = parseInt($("#break-days").val());

        if (teacherID && days) {

            alert('passed through!');
            eel.update_document('teachers', { "ID": teacherID }, { "$inc": { "Breaks": days } });
            refresh_events();
            $("#teacher-id, #break-days").val('');

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
})