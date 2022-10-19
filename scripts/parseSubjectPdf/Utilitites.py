from copy import copy, deepcopy
import re
from Model.Answer import Answer

from Model.Question import Question


def formatText(text: str):
    diacritics = dict()
    diacritics['ț'] = 't'
    diacritics['ă'] = 'a'
    diacritics['î'] = 'i'
    diacritics['â'] = 'a'
    diacritics['ș'] = 's'
    diacritics['ţ'] = 't'
    index: int = 0
    for letter in text:
        if (letter in diacritics.keys()):
            if (text[index-1] == ' ' and letter == 'ț'):
                text = text[:index] + text[index+1:]
                index -= 1
            text = text[:index] + diacritics[letter] + text[index+1:]
        index += 1
    return text


def is_question(line: str):
    question_regex = "^\\d+[)] "
    if re.match(question_regex, line, flags=re.DOTALL) == None:
        return False
    return True


def get_question_number(line: str):
    return re.findall("^\\d", line)


def is_answer(line: str):
    answer_regex = "^([abcd][)]) "
    if re.match(answer_regex, line) == None:
        return False
    return True


def get_questions_with_answers_from_pagetext(text: str):
    result = []
    questionNumber: int = 0
    questionText: str = ""
    answers = []
    for line in text.splitlines():
        line = line.strip()
        if (len(line) == 0):
            if (len(answers) == 4):
                result.append(
                    Question(questionText + "\n", deepcopy(answers)))
                answers.clear()
                questionText = ""
            continue

        if (is_question(line) == True):
            if (len(answers) == 4):
                result.append(
                    Question(questionText + "\n", deepcopy(answers)))
                answers.clear()
                questionText = ""
            questionText = line + "\n"
        elif is_answer(line) == True:
            answer: Answer = Answer(deepcopy(line), False)
            answers.append(answer)
        else:
            questionText += " " + line + "\n"

    if (len(answers) == 4):
        result.append(
            Question(questionText + "\n", deepcopy(answers)))
        answers.clear()
        questionText = ""
    return result
