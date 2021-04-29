import {previewText, formatDate} from '../util/stringFormatting'

const allowedChar = 50

describe('Testing Preview Text', () => {
  const tests = [
    {
      testText: 'Formatting strings shorter then allowed character count',
      inputString: 'Det var en gang',
      expectedString: 'Det var en gang...',
    },
    {
      testText: 'Formatting strings with a lot of text works',
      inputString:
        'Det var en gang en bamse som skulle ut och aka ner for en backe',
      expectedString: 'Det var en gang en bamse som skulle ut och aka ner...',
    },
    {
      testText: 'Passing empty string should work',
      inputString: '',
      expectedString: '...',
    },
    {
      testText: 'If space is last char, it should be removed',
      inputString:
        'Det var en gang en bamse som skulle ut och aka ne for en backe',
      expectedString: 'Det var en gang en bamse som skulle ut och aka ne...',
    },
  ]

  tests.forEach(({testText, inputString, expectedString}) => {
    test(testText, () => {
      const result = previewText(inputString, allowedChar)

      expect(result.length).toBe(expectedString.length)
      expect(result).toBe(expectedString)
    })
  })
})

describe('Testing format Date function', () => {
  const tests = [
    {
      testText: 'Can pass the date as a string',
      dateInput: '2021-04-20T15:40:00-07:00',
      expectedString: '20th April 2021',
    },
    {
      testText: 'Can just pass day, month and year',
      dateInput: new Date('2011-09-24T00:00:00'),
      expectedString: '24th September 2011',
    },
  ]

  tests.forEach(({testText, dateInput, expectedString}) => {
    test(testText, () => {
      const result = formatDate(dateInput, allowedChar)

      expect(result).toBe(expectedString)
    })
  })
})
