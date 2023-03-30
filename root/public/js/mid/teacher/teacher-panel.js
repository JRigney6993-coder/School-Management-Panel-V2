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
                                    eel.remove_document('admins', parseInt(eventID, 10));
                                    refresh_events();
                                })
                        )
                )
        );

        $("tbody").append($row);
    }
}

refresh_events();

$('.add-absence').on('click', function () {
    let studentID = $('#student-id').val();
    let absence = $('#absence').val();

    if (studentID && absence) {
        if (Number.isInteger(parseInt(studentID))) {
            if (absence === '1' || absence === '-1') {

                eel.update_document('students', { "ID": studentID }, { "$inc": { "Absences": absence } })
                $('#student-id, #absence').val('');
                alert('passed through!');

            } else alert('Absence value must be either 1 or -1');
        } else alert('Student ID must be an integer');
    } else alert('Make sure textfield is not empty');
});

// ----------------------------------------------------------------

$('.add-grade').on('click', function () {
    let studentID = $('#student-id').val();
    let period = $('#period').val();
    let grade = $('#grade').val();

    if (studentID && period && grade) {
        if (Number.isInteger(parseInt(studentID))) {
            if (period <= 4 && period >= 1) {
                if (grade <= 100 && grade >= 0) {

                    eel.update_document('students', { "ID": studentID }, { "$set": { "Grades": { period: grade } } })
                    $('#student-id, #grade').val('');
                    alert('passed through!');

                } else alert('Grade must be between 0 and 100');
            } else alert('Period must be between 1 and 4');
        } else alert('Student ID must be an integer');
    } else alert('Make sure textfield is not empty');
});

// ----------------------------------------------------------------

$('.add-referral').on('click', function () {
    let studentID = $('#student-id').val();
    let referral = $('#referral').val();

    if (studentID && period && referral) {
        if (period <= 4 && period >= 1) {
            if (referral.length <= 200) {

                eel.update_document('students', { "ID": studentID }, { "$set": { "Referrals": referral } })
                $('#student-id, #referral').val('');
                alert('passed through!');

            } else alert('Referral exceeds 200 characters');
        } else alert('Period must be between 1 and 4');
    } else alert('Make sure textfield is not empty');
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