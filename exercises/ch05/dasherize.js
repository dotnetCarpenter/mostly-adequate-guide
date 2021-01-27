'use strict'

let {
	compose,
	intercalate,
	map,
	toLowerCase,
	trace,
  split,
  replace,
// } = require('../support')
} = require('@mostly-adequate/support')

if (typeof trace !== 'function' ) {
	const { curry } = require("@mostly-adequate/support");
	trace = curry((tag, x) => (console.log(tag, x), x));
}

const dasherize = compose(
	trace('result:'),
  intercalate('-'),
	map(toLowerCase),
	trace('after split'),
  split(' '),
	trace('before split'),
  replace(/\s{2,}/ig, ' '),
);

dasherize('The world is a vampire');
