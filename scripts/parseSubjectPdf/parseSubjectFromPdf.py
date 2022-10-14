import PyPDF2

pdfName = "C:\\Users\\David\\Desktop\\subiectepompieri2021.pdf"
pdfFileObject = open(pdfName, 'rb')
diacritics = dict()
diacritics['ț'] = 't'
diacritics['ă'] = 'a'
diacritics['î'] = 'i'
diacritics['â'] = 'a'

pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
f = open("pdfwrite.txt", "w", 2, encoding='utf8')

pageObj = pdfReader.getPage(0)

text = pageObj.extract_text()


def formatText(text: str):
    index: int = 0
    for letter in text:
        if (letter in diacritics.keys()):
            if (text[index-1] == ' ' and letter == 'ț'):
                text = text[:index] + text[index+1:]
                index -= 1
            text = text[:index] + diacritics[letter] + text[index+1:]
        index += 1
    return text


f.write(formatText(str(text)))
