import asyncio
import re
import time
from fileinput import close
import aioodbc
import PyPDF2
from uuid6 import uuid6
from Utilitites import *

pdfName = "C:\\Users\\David\\Desktop\\pregatire-academii\\subjects\\politie\\2021\\Subiecte-Politie-2021.pdf"
pdfFileObject = open(pdfName, 'rb')

pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
f = open("pdfwrite.txt", "w", 2, encoding='utf8')

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


async def main():
    connection = await aioodbc.connect(
        dsn='DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost;DATABASE=Academii;Trusted_Connection=yes;', loop=loop)
    cursor = await connection.cursor()
    # await cursor.execute("DELETE FROM Quiz")
    # await cursor.execute("DELETE FROM Question")
    # await cursor.execute("DELETE FROM Answer")
    currentQuizId = uuid6()
    connection.commit()
    global index
    if (True):
        # cursor = connection.cursor()
        for pageNumber in range(0, pdfReader.numPages):
            index = 0
            pageObj = pdfReader.getPage(pageNumber)
            pageObj.extract_text(visitor_text=visitor_body)
            pageObj.extract_text(visitor_text=visitor_header)
            text = formatText("".join(parts))
            if currentOption not in options.keys():
                # print(currentOption)
                currentQuizId = uuid6()
                await cursor.execute(
                    """INSERT INTO Quiz(Id,Category,Year,Subject) VALUES(?,?,?,?)""", currentQuizId, 0, 2021, currentOption)
                options[currentOption] = True
                await connection.commit()
            for question in get_questions_with_answers_from_pagetext(text):
                questionId = uuid6()
                await cursor.execute("""INSERT INTO Question(Id,Text,QuizId) values(?,?,?)""",
                                     questionId, question.get_question().strip(), currentQuizId)
                await connection.commit()
                # f.write(question.get_question())
                for answer in question.get_answers():
                    await cursor.execute("""INSERT INTO Answer(Id,QuestionId,IsCorrect,Text) values(?,?,?,?)""", uuid6(
                    ), questionId, answer.get_is_correct(), answer.get_answer())
                    await connection.commit()
                    # f.write(answer.get_answer())
            parts.clear()
        await connection.close()


loop.run_until_complete(main())

f.close()
