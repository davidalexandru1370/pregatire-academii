from cmath import log
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


def get_answer(line: str):
    return re.findall("^[abcd]", line)


def is_answer(line: str):
    answer_regex = "^([abcd][)]) "
    if re.match(answer_regex, line) == None:
        return False
    return True


def get_questions_with_answers_from_pagetext(text: str):
    result = []
    questionText: str = ""
    answers = []
    currentAnswer = -1
    for line in text.splitlines():
        bkt = line
        line = line.strip()
        if (len(line) == 0):
            if (len(answers) == 4):
                for index in range(0, len(answers)):
                    answers[index].set_answer(
                        answers[index].get_answer().rstrip()+"\n")
                result.append(
                    Question(questionText + "\n", deepcopy(answers)))
                answers.clear()
                currentAnswer = -1
                questionText = ""
            continue

        if (is_question(line) == True):
            if (len(answers) == 4):
                result.append(
                    Question(questionText + "\n", deepcopy(answers)))
                answers.clear()
                currentAnswer = -1
                questionText = ""
            questionText = line + "\n"
        elif is_answer(line) == True:
            answer: Answer = Answer(line + "\n", False)
            currentAnswer = ord(get_answer(line)[0]) - ord('a')
            if (currentAnswer == 3 and (line.endswith('.') or line.endswith(';') or "\n" in bkt)):
                currentAnswer = -1
            answers.append(answer)
            continue
        elif currentAnswer >= 0 and currentAnswer <= 3:
            answers[currentAnswer].set_answer(
                answers[currentAnswer].get_answer() + line)
        else:
            questionText += " " + line + "\n"

    if (len(answers) == 4):
        result.append(
            Question(questionText + "\n", deepcopy(answers)))
        answers.clear()
        questionText = ""
    return result


def is_forbid(text: str):
    if len(text.strip()) == 0:
        return True
    if re.match(".*Academia.*", text) != None:
        return True
    if re.match("Ministerul.*", text) != None:
        return True
    if re.match("CONCURS DE ADMITERE.*", text) != None:
        return True
    if re.match("Sesiunea [0-9]+", text) != None:
        return True
    if re.match("ISTORIA.*|LIMBA.*", text) != None:
        return True
    return False
