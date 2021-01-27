// For this exercise, we consider helpers with the following signatures:
//
//   validateEmail :: Email -> Either String Email
//   addToMailingList :: Email -> IO([Email])
//   emailBlast :: [Email] -> IO ()
//
// Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function
// which adds a new email to the mailing list if valid, and then notify the whole
// list.

// joinMailingList :: Email -> Either String (IO ())
const joinMailingList = compose( // return the Either with an error message (String) or emailBlast IO
	// trace('emailBlast'),
	map(chain(emailBlast)), // unwrap the IO inside the Either by using chain inside a map (the ap works inside the Either)
	// trace('addToMailingList'),
	map(addToMailingList), // keep the Either and map addToMailingList on it, creating an IO inside the Either
	// trace('validateEmail'),
	validateEmail) // get Either

/****** Optimized and official solution (only 1 map)  ******/
// const joinMailingList = compose(
//   map(compose(chain(emailBlast), addToMailingList)),
//   validateEmail,
// );