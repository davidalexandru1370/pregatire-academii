from copy import deepcopy
import re

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
    print(line)
    return re.findall("^\\d", line)


def is_answer(line: str):
    answer_regex = "^[abcd][)] "
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
        if (is_question(line) == True):
            index = get_question_number(line)
            if (index != questionNumber):
                result.append(Question(questionText, deepcopy(answers)))
                answers.clear()
            questionText = line
            print(str(get_question_number(line)[0]))
            questionNumber = int(str(get_question_number(line)[0]))
        elif is_answer(line) == True:
            answers.append(deepcopy(line))
        else:
            questionText += "\n" + line
    return result
