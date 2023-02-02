class Student():
    def __init__(self, firstName, lastName, gender, birthDate, parentEmail, studentId):
        self.firstName = firstName
        self.lastName = lastName
        self.gender = gender
        self.studentId = studentId
        self.birthDate = birthDate
        self.studentEmail = firstName + lastName + studentId + "@gmail.com"
        self.parentEmail = parentEmail
        self.grades = {
            "period1": 100,
            "period2": 100,
            "period3": 100,
            "period4": 100,
            "overall": 100
        }
        self.points = 0
        self.notes = []


    def get_name(self):
        return self.firstName + " " + self.lastName

    def get_grade_average(self):
        sum([val for key, val in self.grades.items() if key != "overall"]) / (len(self.grades) - 1)

    def add_grade(self, grade, score):
        if score and grade:
            try:
                self.grades[grade] += score
                self.grades[grade] /= 2
                self.get_grade_average()
                return True
            except:
                return False
        else:
            return False

    def add_note(self, note):
        if note:
            self.notes.append(note)
            return True
        else:
            return False



    