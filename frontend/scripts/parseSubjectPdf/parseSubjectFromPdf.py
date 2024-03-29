import asyncio
from re import match
import time
from fileinput import close
import PyPDF2
from uuid6 import uuid6
from Utilitites import *
import psycopg2
import psycopg2.extras
import tabula
pdfname = "/home/david/Desktop/pregatire-academii/subjects/politie/2021/Subiecte-Politie-2021.pdf"
pdffileobject = open(pdfname, 'rb')

pdfReader = PyPDF2.PdfReader(pdffileobject)
#f = open("pdfwrite.txt", "w", 2, encoding='utf8')
f = open("/home/david/Desktop/pregatire-academii/scripts/parseSubjectPdf/barem2021.txt","r")

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
    correct_answers = dict()
    categories = dict()
    categories[0]='LIMBA ROMÂNĂ'
    categories[1]='ISTORIA ROMÂNILOR'
    categories[2]='LIMBA ENGLEZĂ'
    categories[3]='LIMBA FRANCEZĂ'
    categories[4]='LIMBA GERMANĂ'
    categories[5]='LIMBA RUSĂ'
    categories[6]='LIMBA SPANIOLĂ'
    category=0
    for line in f:
        dict_with_answers_for_category=dict()
        line_answers = line.split(' ')
        current_answer_index=1
        for ans in line_answers:
            dict_with_answers_for_category[current_answer_index]=ans.strip()
            current_answer_index+=1
        correct_answers[categories[category]]=deepcopy(dict_with_answers_for_category)
        category+=1

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
                    question_number=re.match("^[1-9]+",str(question.get_question().strip()))
                    if question_number:
                        question_number=int(question_number[0])
                    #print(question_number)
                    correct_answers_dict = correct_answers[currentOption]
                    answer_letter=re.match("^[abcd]",str(answer.get_answer()))
                    if answer_letter:
                        answer_letter=answer_letter[0]
                    if(correct_answers_dict[question_number]==answer_letter):
                        answer.set_is_correct(True)
                    
                    cursor.execute('''INSERT INTO "Answer" ("Id","QuestionId","IsCorrect","Text") values(%s,%s,%s,%s)''', (uuid6(
                    ), questionId, answer.get_is_correct(), answer.get_answer()))
                    connection.commit()
                    # f.write(answer.get_answer())
            parts.clear()
        connection.close()


def parseBarem():
    # pdf_name = "C:\\Users\\David\\Desktop\\Grile-Politie-2020.pdf"
    # pdf_file_object = open(pdf_name, 'rb')
    # pdf_reader = PyPDF2.PdfReader(pdf_file_object)
    # pageObj = pdf_reader.pages[1]
    # pageObj.extract_text(visitor_text=visitor_body)
    # text = formatText("".join(parts))
    pass
        

if __name__ == "__main__":
    #parseBarem()
    main()

# f.close()
