$('.add-absence').on('click', function () {
    let studentID = $('#student-id').val();
    let absence = $('#absence').val();

    if (studentID && absence) {
        if (Number.isInteger(parseInt(studentID))) {
            if (absence === '1' || absence === '-1') {
                // eel.add_absence(studentID, absence)
                $('#student-id, #absence').val('');
                alert('passed through!');
                
            } else alert('Absence value must be either 1 or -1');
        } else alert('Student ID must be an integer');
    } else alert('Make sure textfield is not empty');
});

// ----------------------------------------------------------------

$('.add-grade').on('click',function () {
    let studentID = $('#student-id').val();
    let period = $('#period').val();
    let grade = $('#grade').val();

    if (studentID && period && grade) {
        if (Number.isInteger(parseInt(studentID))) {
            if (period <= 4 && period >= 1) {
                if (grade <= 100 && grade >= 0) {
                    // eel.add_grade(studentID, period, grade);
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
                // eel.add_referrals(studentID, referral)

                $('#student-id, #referral').val('');
                alert('passed through!');

            } else alert('Referral exceeds 200 characters');
        } else alert('Period must be between 1 and 4');
    } else alert('Make sure textfield is not empty');
});