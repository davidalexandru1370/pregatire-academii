from Model.Answer import Answer


class Question:
    def __init__(self, question: str, answers=[]) -> None:
        self._question = question
        self._answers = answers

    def get_question(self):
        return self._question

    def get_answers(self):
        return self._answers

    def add_answer(self, answer: Answer):
        self._answers.append(answer)
