async function refresh_events() {
    var eventData = await eel.load_document('admins')();
    $("tbody").empty();

    for (var i = 0; i < eventData.length; i++) {
        let data = Object.values(eventData[i]);

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
                                .text(data[5])
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
                                    var eventID = row.find("td:nth-child(5)").text();
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



    $('.add-admin').on('click', function () {
        let firstName = $('#first-name').val();
        let lastName = $('#last-name').val();
        let email = $('#email-add').val();
        let password = $('#password').val();

        if (firstName && lastName && email && password) {
            if (password.length >= 12) {

                eel.create_admin(firstName, lastName, email, password);
                refresh_events();
                $('#first-name, #last-name, #email-add, #password').val('');

                alert('Admin: ' + firstName + ' ' + lastName + ' | ' + email + ' has been added.');
            } else alert('Password must be at least 12 characters.');
        } else alert('Make sure textfield is not empty.');
    });


    $('.add-break-days').on('click', function () {
        let adminID = parseInt($('#admin-id').val());
        let days = parseInt($('#break-days').val());

        if (Number.isInteger(adminID)) {

            eel.update_document('admins', { "ID": teacherID }, { "$inc": { "Breaks": days } });
            refresh_events();
            $('#admin-id, #break-days').val('');

            alert('Admin: ' + adminID + ' has taken ' + days + ' days off.');
        } else alert('Please fill in all fields or make sure AID/Days is a number.');
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


    $('.end-quarter').on("click", async function () {
        console.log(await eel.quarter_report()());
    });
//         let report = $('#report')
//             .val(`
// [Report Number - {reportNum}]
// Total Students: {studentNum}
// Total Teachers: {teacherNum}
// Total Admins: {adminNum}
// Total Events: {eventsNum}

// -------------------------------

// (Quarter Winners)

// Point winner:
// Student ID / Name / Points / Gpa / Prize
// {studentID} / {studentName} / {studentPoints} / {studentGPA} / {studentPrize}

// Random Grade Winners:
// Student ID / Name / Points / Gpa / Prize
// {studentID} / {studentName} / {studentPoints} / {studentGPA} / {studentPrize}

// -------------------------------

// (Events)

// Event ID / Name / Type / Location / Start Date / End Date / Attendees
// {eventID} / {eventName} / {eventType} / {eventLocation} / {eventStartDate} / {eventEndDate} / {eventAttendees}

// -------------------------------

// (Students)

// Student ID / Name / Email / GPA / Points / Absences / Referrals
// {studentID} / {studentName} / {studentEmail} / {studentGPA} / {studentPoints} / {studentAbsences} / {studentReferrals}

// -------------------------------
//     `);