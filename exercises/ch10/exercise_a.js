// Write a function that adds two possibly null numbers together using `Maybe` and `ap`.

// const add = (a, b) => a + b

// solution 1
// const maybeAp = curry((f, m1, m2) => Maybe.of(f).ap(m1).ap(m2))
// // safeAdd :: Applicative Maybe => Maybe Number -> Maybe Number -> Maybe Number
// const safeAdd = maybeAp(add)

// solution 2
// safeAdd :: Applicative Maybe => Maybe Number -> Maybe Number -> Maybe Number
const safeAdd = curry((ma, mb) => ma.map(add).ap(mb))

// solution 3
// const ap = curry((f, m1, m2) => m1.constructor.of(f).ap(m1).ap(m2))
// safeAdd :: Applicative Maybe => Maybe Number -> Maybe Number -> Maybe Number
// const safeAdd = ap(add)

// Test solution
// console.log(
// 	safeAdd(Maybe.of(1), Maybe.of(1)),
// 	safeAdd(new Maybe(null), Maybe.of(2)),
// 	safeAdd(Maybe.of(2), new Maybe(null)),
// )
