def formatText(text: str):
    diacritics = dict()
    diacritics['ț'] = 't'
    diacritics['ă'] = 'a'
    diacritics['î'] = 'i'
    diacritics['â'] = 'a'
    index: int = 0
    for letter in text:
        if (letter in diacritics.keys()):
            if (text[index-1] == ' ' and letter == 'ț'):
                text = text[:index] + text[index+1:]
                index -= 1
            text = text[:index] + diacritics[letter] + text[index+1:]
        index += 1
    return text
