// @ts-check
"use strict"

/**
 * @param {{ valueOf: () => any; }} m
 */
const show = m => m.valueOf()

// data DivisionResult = DivisionByZero | Success Double
class DivisionByZero {}
// function DivisionByZero () {}

class Success {
	#value
	/** @param {number} n */
	constructor (n) {
		this.#value = n
	}

	/** @param {number} n */
	static of (n) { return new Success(n) }

	valueOf () { return this.#value }

	[Symbol.for('nodejs.util.inspect.custom')] () {
		return `${this.constructor.name} {${this.#value}}`
	}
}
// function Success (n) {
// 	return Object.create(Success.prototype, {
// 		toString: {
// 			value: () => n
// 		}
// 	})
// }

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
	switch (r.constructor) {
		case DivisionByZero: return "Division failed"
		case Success: return Number(r)
		// case Success: return show(r)
	// divisionToString r = case r of
	//     DivisionByZero -> "Division failed"
	//     Success x      -> show x
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
		debugger
		return `${this.constructor.name} {${this.#value}}`
	}
}

console.log(not.of(true))

let f = not.of(true)
let t = not.of(false)
if (t) console.log(`you know, ${f.valueOf()} is not true?`)
