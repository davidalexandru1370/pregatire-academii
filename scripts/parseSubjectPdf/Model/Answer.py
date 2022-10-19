from operator import is_


class Answer:
    def __init__(self, answer: str, is_correct: bool = False) -> None:
        self._answer = answer
        self._is_correct = is_correct

    def get_answer(self):
        return self._answer

    def get_is_correct(self):
        return self._is_correct

    def set_is_correct(self, value: bool):
        self._is_correct = value
