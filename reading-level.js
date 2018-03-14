const syllable = require('syllable')
const Tokenizer = require('sentence-tokenizer')

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

  const tokenizer = new Tokenizer('ChuckNorris')
  tokenizer.setEntry(text)
  
  const tokenSentences = tokenizer.getSentences()
             
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