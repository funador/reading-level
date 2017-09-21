# reading-level

Reading-level returns the numeric reading level of a sample text based on the [Flesch-Kincaid Grade Level Readability Formula](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests). 

```js
const { readingLevel } = require('reading-level')

const text1 = 'this is a simple sentence'
const text2 = 'the perpendicular platypus perused the panoramic pyramid'
const text3 = '0120131908 74123987419823'
const text4 = ''

readingLevel(text1) // 3 
readingLevel(text2) // 21
readingLevel(text3) // 'Either no sentences or words, please enter valid text'
readingLevel(text4) // 'Either no sentences or words, please enter valid text'

readingLevel(text2, 'full') // { sentences: 1,
                            //   words: 7,
                            //   syllables: 20,
                            //   unrounded: 20.854285714285712,
                            //   rounded: 21 }

```


- all numeric values and punctuation are stripped out before analysis
- pass `'full'` as a second argument to get the breakdown
- this seems to work with languages besides english, however I have no idea about the accuracy of the results

### test

``` npm run test```