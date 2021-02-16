// Write a natural transformation that converts `Either b a` to `Maybe a`

// solution 1
// eitherToMaybe :: Either b a -> Maybe a
// const eitherToMaybe = x => x.isLeft
// 	? Maybe.of(null)
// 	: Maybe.of(x.join())

// solution 2
// const eitherToMaybe = compose(
// 	chain(Maybe.of),
// 	x => x.isRight ? x : Maybe.of(null)
// )

// solution 3 - cheated
const eitherToMaybe = either(always(nothing), Maybe.of)
