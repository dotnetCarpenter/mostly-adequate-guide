// Rewrite `safeAdd` from exercise_a to use `liftA2` instead of `ap`.

// solution 1
// safeAdd :: Applicative Maybe => Maybe Number -> Maybe Number -> Maybe Number
// const safeAdd = curry((ma, mb) => liftA2(add, ma, mb))

// solution 2
// safeAdd :: Applicative Maybe => Maybe Number -> Maybe Number -> Maybe Number
const safeAdd = liftA2(add)

// Test solution
// console.log(
// 	safeAdd(Maybe.of(1), Maybe.of(1)),
// 	safeAdd(new Maybe(null), Maybe.of(2)),
// 	safeAdd(Maybe.of(2), new Maybe(null))
// )
