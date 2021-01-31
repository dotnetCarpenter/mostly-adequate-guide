// @ts-check
"use strict"

const mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass || class {};
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}

const Container = (superclass) => class extends superclass {
	#value

	/** @param {unknown} n */
	constructor (n) {
		super(n)
		this.#value = n
	}

	valueOf () { return this.#value }

	[Symbol.for('nodejs.util.inspect.custom')] () {
		return `${this.constructor.name} (${this.#value || ''})`
	}
}

const Left = (superclass) => class extends superclass {
	map () {
		return this
	}
}
const Right = (superclass) => class extends superclass {
	map (f) {
		return new Right(f(this.valueOf()))
	}
}


/**
 * @param {{ valueOf: () => any; }} m
 */
const show = m => m.valueOf()

// data DivisionResult = DivisionByZero | Success Double
class DivisionByZero extends mix().with(Container, Left) {
	static of () { return new DivisionByZero }
}

class Success extends mix().with(Container, Right) {
	/** @param {number} n */
	static of (n) { return new Success(n) }
}

// safeDivide :: Double -> Double -> DivisionResult
/**
 * @param {number} x
 * @param {number} y
 */
const safeDivide = (x, y) => (y === 0)
	? new DivisionByZero
	: new Success(x / y)

// -- show
// divisionToString :: DivisionResult -> String
/**
 * @param {Success | DivisionByZero} r
 */
const divisionToString = r => {
	console.log(r instanceof Left)
	switch (r.constructor) {
		case DivisionByZero: return "Division failed"
		case Success: return Number(r)
	}
}

console.log(divisionToString( safeDivide (4, 2)))
console.log(safeDivide (4, 2))

console.log(divisionToString( safeDivide (4, 0)))
console.log(safeDivide (4, 0))

class not {
	#value
	/** @param {boolean} bool */
	constructor (bool) {
		this.#value =! bool
	}

	valueOf () {
		return this.#value
	}

	/** @param {boolean} bool */
	static of (bool) { return new not(bool) }

	[Symbol.for('nodejs.util.inspect.custom')] () {
		return `${this.constructor.name} {${this.#value}}`
	}
}

console.log(not.of(true))

let f = not.of(true)
let t = not.of(false)
if (t) console.log(`you know, ${f.valueOf()} is not true?`)