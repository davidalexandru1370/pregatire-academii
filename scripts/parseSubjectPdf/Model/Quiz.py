from Model.Question import Question


class Quiz:

    def __init__(self, subject: str, year: int, question=list()) -> None:
        self._subject = subject
        self._year = year
        self._question = question

    def get_subject(self):
        return self._subject

    def get_year(self):
        return self._year

    def get_question(self):
        return self._question

    def add_question(self, question: Question):
        self._question.append(question)
