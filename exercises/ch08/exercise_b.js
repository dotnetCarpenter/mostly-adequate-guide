// Given the following User object:
//
//   const user = { id: 2, name: 'Albert', active: true };
//
// Use `safeProp` and `head` to find the first initial of the user.

// safeProp :: String -> Maybe String
// head :: [a] -> a

// initial :: User -> Maybe String
// const initial = undefined;
// const safeProp = compose(Maybe.of, prop('name'))

// console.log(
// 	compose(map(head), safeProp('name'))(albert/* { id: 2, name: 'Albert', active: true } */)
// )


const initial = compose(map(head), safeProp('name'));

// console.log(initial(albert).$value === 'A')
