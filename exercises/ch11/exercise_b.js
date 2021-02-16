// Using `eitherToTask`, simplify `findNameById` to remove the nested `Either`.
//
//   // eitherToTask :: Either a b -> Task a b
//   const eitherToTask = either(Task.rejected, Task.of);

// findNameById :: Number -> Task Error (Either Error User)
// const findNameById = compose(map(map(prop('name'))), findUserById);

// solution 1
// findNameById :: Number -> Task Error (Either Error User)
const findNameById = compose(
	map(prop('name')),
	chain(eitherToTask),
	findUserById
)

// console.log(findNameById(11))
// findNameById(11).fork(
// 	console.error.bind(console, 'Error:'),
// 	console.log
// )