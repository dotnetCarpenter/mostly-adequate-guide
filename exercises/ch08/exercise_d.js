// We now consider the following functions:
//
//   // validateUser :: (User -> Either String ()) -> User -> Either String User
//   const validateUser = curry((validate, user) => validate(user).map(_ => user));
//
//   // save :: User -> IO User
//   const save = user => new IO(() => ({ ...user, saved: true }));
//
// Write a function `validateName` which checks whether a user has a name longer than 3 characters
// or return an error message. Then use `either`, `showWelcome` and `save` to write a `register`
// function to signup and welcome a user when the validation is ok.
//
// Remember the `either` function's two arguments must return the same type.


// Bonus: write `validateName` so you do not get a run-time error if
// the `name` property is null or missing from User.
// Hint: Use `safeProp` but beware that `validateName` must return an `Either`

// delete gary.name // uncomment this check bonus implementation
// trace('gary', gary)

// validateName :: User -> Either String ()
// const validateName = compose(trace('validateName'), map(user => user.length > 3), safeProp('name'));

/********* Official Correct Solution **********/
// const validateName = user => user.name.length > 3
// 	? Either.of(null)
// 	: left('user.name is shorter than 4 letters')
/********* Official Correct Solution **********/

// const validateName = compose(trace('map(name'),
// 	F => {
// 		let b = false
// 		F.map(name => name.length > 3 && (b = true))
// 		return b
// 			? Either.of(null)
// 			: left('user.name is shorter than 4 letters')},
// 	safeProp('name'))


// // right :: a -> Either a b
// const right = a => new Right(a)
// // maybeToEither :: Functor F => (a -> Bool) -> F a -> Either a a
// const maybeToEither = curry((p, F) =>
// 	F.isNothing
// 		? left('empty')
// 		: F.map(x => p(x)
// 			? right(x)
// 			: left(x)).join())
// const validateName = compose(
// 	either(
// 		name => name === 'empty' ? left('name property not found') : left(`${name} is shorter than 4 letters`),
// 		Either.of),
// 	maybeToEither(name => name.length > 3),
// 	safeProp('name')
// )

const validateName = compose(
	chain(name => name.length > 3
		? Either.of(null)
		: left(`Your name (${name}) need to be > 3`)
	),
	// can not parse
	F => F.isNothing
		? left('can not parse name')
		: F,
	safeProp('name')
)

// register :: User -> IO String
const register = compose(
	either(IO.of, compose(map(showWelcome), save)),
	validateUser(validateName));


trace('','\n')
trace('****************************************************************','\n')
trace('Output:','\n')

trace('validateName', validateName(gary))
trace('validateName', validateName({ name: "Jon" }))

trace('register', register(gary).unsafePerformIO())
trace('register', register({ name: "Jon" }).unsafePerformIO())
trace('register', register({ missing: "Jon" }).unsafePerformIO())

trace('****************************************************************','\n')
trace('','\n')

	// Very difficult to understand the problem...
