import asyncio
import re
import time
from fileinput import close
import PyPDF2
from uuid6 import uuid6
from Utilitites import *
import psycopg2
import psycopg2.extras
import tabula
pdfname = "C:\\Users\\David\\Desktop\\pregatire-academii\\subjects\\politie\\2020\\Subiecte-Politie-2020.pdf"
pdffileobject = open(pdfname, 'rb')

pdfReader = PyPDF2.PdfReader(pdffileobject)
#f = open("pdfwrite.txt", "w", 2, encoding='utf8')


loop = asyncio.get_event_loop()

answers = []
parts = []
currentOption = ""
options = dict()
index = 0


def visitor_body(text, cm, tm, fontDict, fontSize):
    x = tm[4]
    global parts, index

    y = tm[5]
    if y > 100 and y < 1016:
        parts.append(text)


def visitor_header(text, cm, tm, fontDict, fontSize):
    y = tm[5]
    global currentOption
    if y > 90 and y <= 100:
        if (len(text.strip()) > 0):
            currentOption = text.strip()


def main():
    connection = psycopg2.connect(
        host="localhost", database="Academii", user='postgres', password='postgres', port="5432")
    psycopg2.extras.register_uuid()
    cursor = connection.cursor()
    # cursor = await connection.cursor()
    # # await cursor.execute("DELETE FROM Quiz")
    # # await cursor.execute("DELETE FROM Question")
    # # await cursor.execute("DELETE FROM Answer")
    cursor.execute('''DELETE FROM "Answer"''', ())
    cursor.execute('''DELETE FROM "Question"''', ())
    cursor.execute('''DELETE FROM "Quiz"''', ())

    currentQuizId = uuid6()
    connection.commit()
    global index
    if (True):
        # cursor = connection.cursor()
        for pageNumber in range(0, len(pdfReader.pages)):
            index = 0
            pageObj = pdfReader.pages[pageNumber]
            pageObj.extract_text(visitor_text=visitor_body)
            pageObj.extract_text(visitor_text=visitor_header)
            text = formatText("".join(parts))
            if currentOption not in options.keys():
                # print(currentOption)
                currentQuizId = uuid6()
                cursor.execute('''INSERT INTO "Quiz" ("Id","Category","Year","Subject") VALUES(%s,%s,%s,%s)''', (
                    currentQuizId, 0, 2021, currentOption))
                options[currentOption] = True
                connection.commit()
            for question in get_questions_with_answers_from_pagetext(text):
                questionId = uuid6()
                cursor.execute('''INSERT INTO "Question" ("Id","Text","QuizId") values(%s,%s,%s)''',
                               (questionId, question.get_question().strip(), currentQuizId))
                connection.commit()
                # f.write(question.get_question())
                for answer in question.get_answers():
                    cursor.execute('''INSERT INTO "Answer" ("Id","QuestionId","IsCorrect","Text") values(%s,%s,%s,%s)''', (uuid6(
                    ), questionId, answer.get_is_correct(), answer.get_answer()))
                    connection.commit()
                    # f.write(answer.get_answer())
            parts.clear()
        connection.close()


def parseBarem():
    pdf_name = "C:\\Users\\David\\Desktop\\Grile-Politie-2020.pdf"
    pdf_file_object = open(pdf_name, 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file_object)
    pageObj = pdf_reader.pages[1]
    pageObj.extract_text(visitor_text=visitor_body)
    text = formatText("".join(parts))
    print(text)


if __name__ == "__main__":
    parseBarem()
    # main()

# f.close()
