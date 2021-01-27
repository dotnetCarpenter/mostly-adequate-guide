// Use `add` and `map` to make a function that increments a value inside a functor.

// incrF :: Functor f => f Int -> f Int
// const incrF = compose(trace, curry((F, n) => map(add(n), F)))
// const incrF = F => F.map(add(1))
// const incrF = F => map (add(1), F)
// const incrF = compose(trace, F => F.map (add(1)))
const incrF = map(add(1));
