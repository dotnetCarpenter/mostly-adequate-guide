'use strict'

const {
  IO,
  compose,
  map,
  split,
  last,
  Maybe,
  find,
  eq,
  head,
} = require('../support')

const window = {}
window.location = {}
window.location.href = 'https://www.example.com/foo?bar=yes&searchTerm=wafflehouse&wedonot=care'

// url :: IO String
const url = new IO(() => window.location.href);

// toPairs :: String -> [[String]]
const toPairs = compose(map(split('=')), split('&'));

// params :: String -> [[String]]
const params = compose(toPairs, last, split('?'));

// findParam :: String -> IO Maybe [String]
const findParam = key => map(compose(Maybe.of, find(compose(eq(key), head)), params), url);

// -- Impure calling code ----------------------------------------------

// run it by calling .unsafePerformIO()!
// findParam('searchTerm').unsafePerformIO();
const result = findParam('searchTerm').unsafePerformIO();
console.log(result) // Just(['searchTerm', 'wafflehouse'])
