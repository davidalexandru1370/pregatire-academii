import PyPDF2
from Utilitites import *

pdfName = "C:\\Users\\David\\Desktop\\pregatire-academii\\subjects\\politie\\2021\\Subiecte-Politie-2021.pdf"
pdfFileObject = open(pdfName, 'rb')

pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
f = open("pdfwrite.txt", "w", 2, encoding='utf8')

for pageNumber in range(0, pdfReader.numPages):
    pageObj = pdfReader.getPage(pageNumber)
    text = pageObj.extract_text()
    f.write(formatText(str(text)))
