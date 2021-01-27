// Write a function that adds two possibly null numbers together using `Maybe` and `ap`.

const traceAdd = compose(trace, add)

// safeAdd :: Maybe Number -> Maybe Number -> Maybe Number
const safeAdd = curry((a, b) => Maybe.of(add).ap(a).ap(b))

// safeAdd :: Maybe Number -> Maybe Number -> Maybe Number
// const safeAdd = curry((a, b) => liftA2(add, a, b));
