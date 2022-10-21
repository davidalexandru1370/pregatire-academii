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


def visitor_body(text, cm, tm, fontDict, fontSize):
    y = tm[5]
    if y > 100 and y < 1016:
        parts.append(text)


connection = mysql.connector.connect(host='localhost',
                                     database='Academii')

if (connection.is_connected()):
    cursor = connection.cursor()
    for pageNumber in range(0, pdfReader.numPages):
        pageObj = pdfReader.getPage(pageNumber)
        pageObj.extract_text(visitor_text=visitor_body)
        text = formatText("".join(parts))

        # print(get_questions_with_answers_from_pagetext(text))
        for question in get_questions_with_answers_from_pagetext(text):
            # f.write(question.get_question())
            # for answer in question.get_answers():
            #     f.write(answer.get_answer())
        parts.clear()

f.close()
