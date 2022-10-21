from fileinput import close
import PyPDF2
import re
from Utilitites import *
import mysql.connector

pdfName = "C:\\Users\\David\\Desktop\\pregatire-academii\\subjects\\politie\\2021\\Subiecte-Politie-2021.pdf"
pdfFileObject = open(pdfName, 'rb')

pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
f = open("pdfwrite.txt", "w", 2, encoding='utf8')

answers = []
parts = []
header2 = set()
currentOption = ""


def visitor_body(text, cm, tm, fontDict, fontSize):
    y = tm[5]
    if y > 100 and y < 1016:
        parts.append(text)


def visitor_header(text, cm, tm, fontDict, fontSize):
    y = tm[5]
    global currentOption
    if y > 90 and y <= 100:
        if (len(text.strip()) > 0):
            currentOption = text.strip()


# connection = mysql.connector.connect(host='localhost',
#                                      database='Academii')

if (True):
    # cursor = connection.cursor()
    for pageNumber in range(0, pdfReader.numPages):
        pageObj = pdfReader.getPage(pageNumber)
        pageObj.extract_text(visitor_text=visitor_body)
        pageObj.extract_text(visitor_text=visitor_header)
        text = formatText("".join(parts))
        #category = formatText(" ".join(header2))
        print(currentOption)
        # print(get_questions_with_answers_from_pagetext(text))
        for question in get_questions_with_answers_from_pagetext(text):
            # f.write(question.get_question())
            # for answer in question.get_answers():
            #     f.write(answer.get_answer())
            pass
        parts.clear()

f.close()
