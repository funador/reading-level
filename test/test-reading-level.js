const assert = require('assert')
const { readingLevel } = require('../reading-level')

const text1 = 'this, is a simple sentence'
const text2 = 'the perpendicular platypus perused the panoramic pyramid'
const text3 = ''
const text4 = '0120131908 7412398741982374192847382947198374139847'

describe('readingLevel', () => {
  
  describe('simple sentence', () => {
    it('should return reading level 3 on a simple sentence', () => {
      assert.equal(3, readingLevel(text1))
    })
  })

  describe('complex sentence', () => {
    it('should return reading level 21 on a complex sentence', () => {
      assert.equal(21, readingLevel(text2))
    })
  })

  describe('empty string', () => {
    it('should return error message on empty string', () => {
      assert.equal('Either no sentences or words, please enter valid text', readingLevel(text3))
    })
  })

  describe('numeric values', () => {
    it('should return error message on string with all numeric values', () => {
      assert.equal('Either no sentences or words, please enter valid text', readingLevel(text4))
    })
  })

  describe('full return values', () => {
    it('should return an object with all the values', () => {
      const result = readingLevel(text2, 'full')
      
      assert.equal(1, result.sentences)
      assert.equal(7, result.words)
      assert.equal(20, result.syllables)
      assert.equal(20.854285714285712, result.unrounded)
      assert.equal(21, result.rounded)
      assert.equal(undefined, result.error)
    })
  })

  describe('full return values with error', () => {
    it('should return an object with all the values', () => {
      const result = readingLevel(text3, 'full')

      assert.equal(0, result.sentences)
      assert.equal(0, result.words)
      assert.equal(0, result.syllables)
      assert.equal(isNaN(NaN), isNaN(result.full))
      assert.equal(isNaN(NaN), isNaN(result.rounded))
      assert.equal('Either no sentences or words, please enter valid text', result.error)
    })
  })

})