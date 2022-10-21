from fileinput import close
import PyPDF2
import re
from Utilitites import *
import pyodbc
from uuid6 import uuid6
pdfName = "C:\\Users\\David\\Desktop\\pregatire-academii\\subjects\\politie\\2021\\Subiecte-Politie-2021.pdf"
pdfFileObject = open(pdfName, 'rb')

pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
f = open("pdfwrite.txt", "w", 2, encoding='utf8')

answers = []
parts = []
currentOption = ""
options = dict()
connection = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost;DATABASE=Academii;Trusted_Connection=yes;')


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
        if currentOption not in options.keys():
            cursor = connection.cursor()
            cursor.execute(
                """INSERT INTO Quiz(Id,Category,Year,Subject) VALUES(?,?,?,?)""", uuid6(), 0, 2021, currentOption)
            options[currentOption] = True
            connection.commit()
        for question in get_questions_with_answers_from_pagetext(text):
            pass
        parts.clear()

connection.close()

f.close()
