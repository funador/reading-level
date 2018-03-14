const syllable = require('syllable')

exports.readingLevel = (text, full) => {
  const err = 'Either no sentences or words, please enter valid text'

  const result = {
    sentences: 0, words: 0, syllables: 0, unrounded: NaN, rounded: NaN
  }

  if (!/[a-z]/i.test(text)) {
    if (full == 'full') {
      result.error = err
      return result
    }
    return err
  }

  const tokenSentences = text
    .replace('\0', '')
	.replace(/(mr|mrs|dr|ms|prof|rev|col|cmdr|flt|lt|brgdr|hon|wng|capt|rt|revd|gen|cdre|admrl|herr|hr|frau|alderman|alhaji|brig|cdr|cik|consul|datin|dato|datuk|seri|dhr|dipl|ing|dott|sa|dra|drs|en|encik|eng|eur|exma|sra|exmo|sr|lieut|fr|fraulein|fru|graaf|gravin|grp|hajah|haji|hajim|hra|ir|lcda|lic|maj|mlle|mme|mstr|nti|sri|rva|sig|na|ra|sqn|ldr|srta|wg)\./gi, '$1')
	.replace(/(((^|\w).*?[^\w\s,]+)(?=\s+[A-Z])|:|;)/g, '$1\0')
    .split(/\s*\0\s*/)

  const tracker = {
    syllables: 0,
    words: 0
  }

  const counts = tokenSentences.reduce((obj, sentence) => {
    
    // strip all punctuation and numbers from the sentence
    const words = sentence
                    .replace(/[^\w\s]|_/g, "")
                    .replace(/\s+/g, " ")
                    .split(' ')
                    .filter(letter => letter)

    obj.syllables += words.reduce((total, word) => total += syllable(word), 0)
    obj.words += words.length
    
    return obj

  }, tracker)

  const { words, syllables } = counts
  const sentences = tokenSentences.length
  const unrounded = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
  const rounded = Math.round(isNaN(unrounded) ? NaN : unrounded)

  Object.assign(result, {
    sentences, words, syllables, unrounded, rounded
  })

  const nan = isNaN(result.rounded)

  if (nan) {
    result.error = err
  }

  if (full == 'full') {
    return result
  }

  if (nan) {
    return err
  }

  return result.rounded
}