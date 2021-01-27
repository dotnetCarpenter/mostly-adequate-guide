'use strict'

const { curry, compose, filter, indexOf, lt, map, keys, prop, head	 } = require("ramda")

const trace = curry((tag, x) => (console.log(tag, x), x))
const options = {
	tableName: ['--table','-t'],
	json: ['--json', '-j'],
	a: ['-a'],
	b: ['-b'],
	c: ['-c'],
}

const isInList = subject => compose(lt(-1), indexOf(subject))
const findIn = curry((options, argument) =>	filter(isInList(argument), options))
const getOptions = compose(
	map(keys),
	trace('after findIn'),
	map(findIn(options))
)


console.log('findArgument',
	getOptions(['--json', '-t', 'foobar.txt']),
	// getOptions(['-t']),
	// getOptions(['--table']),
	// getOptions(['--foo', 'bar']),
)

/*
// head :: [a] -> a
compose(f, head) === compose(head, map(f));

// filter :: (a -> Bool) -> [a] -> [a]
compose(map(f), filter(compose(p, f))) === compose(filter(p), map(f));
*/

// You don't need any code to get these theorems, they follow directly from the types. The first one says that if we get the head of our array,
// then run some function f on it, that is equivalent to, and incidentally, much faster than, if we first map(f) over every element then take the head of the result.

// You might think, well that's just common sense. But last I checked, computers don't have common sense.
// Indeed, they must have a formal way to automate these kind of code optimizations.
// Maths has a way of formalizing the intuitive, which is helpful amidst the rigid terrain of computer logic.

// The filter theorem is similar.
// It says that if we compose f and p to check which should be filtered, then actually apply the f via map
// (remember filter will not transform the elements - its signature enforces that a will not be touched), it will always be equivalent to mapping our f then
//  filtering the result with the p predicate.