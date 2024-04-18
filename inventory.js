class Shoe {
	constructor(name, productCode, quantity, value) {
		// You should check here if the values are correct, and throw an error if they are not.
		// if (typeof name !== "string") {
		// 	throw new Error(`Name "${name}" isn't a string`);
		// }
		// etc.

		this.name = name;
		this.productCode = productCode;
		this.quantity = quantity;
		this.value = value;
	}

	updatePropertyValue(property, value) {
		// throw for problems, instead of using else and drowning in nesting
		if (!["productCode", "quantity", "value"].includes(property)) {
			throw new Error(`Property "${property}" isn't allowed to be updated`);
		}

		// throw seperately instead of one big chain
		if (typeof value !== "number") {
			throw new Error(`Value "${value}" isn't a number`);
		}

		const oldValue = this[property];
		this[property] = value;
		console.log(`The ${property} was changed from ${oldValue} to ${value}`);
	}
}

const shoes = [
	new Shoe("Converse", 6343654365, 10, 19.99),
	new Shoe("Crocs", 53135135, 2, 34.99),
	new Shoe("Birkenstock", 2752752752, 4, 89.99),
	new Shoe("New Balance", 7275725756, 50, 44.99),
	new Shoe("Generic", 52752263, 9, 14.99),
];

// This is very VERY bad.
// 1. You don't know how for..in loop works. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
// 2. Why didn't you just use .find() like seen in docs? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// 3. You are make a double loop, which is not needed and probably bugged.
// 4. You are breaking `Shoe` by redeclaring it (explained in step 1)
// 5. You are not using `found` variable at all.
// 6. You are throwing an error. Why? Wouldn't it be easier to return `undefined` if you don't find anything. It would be easier to use this function. You woulnd't need to wrap it in try..catch all the time.
// 7. You used `==` instead of `===`. Only do that if you know what you are doing.
//
// function findShoe(property, searchInput) {
// 	// Adding this for exception handling
// 	const found = false;

// 	for (Shoes in shoes) {
// 		if (shoes.find((c) => c[property] == searchInput)) {
// 			return shoes[Shoes];
// 		}
// 	}

// 	if (!found) {
// 		// this is where the initial found status is used for exception handling
// 		throw new Error(
// 			`Could not find a shoe with such properties or property values`,
// 		);
// 	}
// }

// // Running the findShoe function with exception handling
// try {
// 	console.table(findShoe("quantity", 2));
// } catch (error) {
// 	console.log("Error finding shoes: ", error.message);
// }

// This is how you should do it.
function findShoe(property, searchInput) {
	return shoes.find((shoe) => shoe[property] === searchInput);
}

const foundShoe = findShoe("quantity", 2);
if (foundShoe) {
	console.table(foundShoe);
} else {
	console.error("Shoe not found");
}

// or even simpler
const pickCheaper = (a, b) => (a.value < b.value ? a : b);
const pickPizon = (a, b) => (a.value > b.value ? a : b);

if (shoes.length !== 0) {
	console.table(shoes.reduce(pickCheaper));
	console.table(shoes.reduce(pickPizon));
}

// NOTE 1: array.sort() mutates the original array, so it's not necessary to return it, or wrap it in a function. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// NOTE 2: if you need to keep original array, use array.toSorted()
//
// function orderPriceIncreasing() {
// 	shoes.sort((a, b) => a.value - b.value);
// 	return shoes;
// }
// console.table(orderPriceIncreasing());

// A function to order the shoes from the cheapest to most expensive
shoes.sort(pickCheaper);

// a function to return a new array with sorted shoes
const shoesSortedByPrice = shoes.toSorted(pickCheaper);
const shoesSortedByPriceDesc = shoes.toSorted(pickPizon);

console.table({ shoes, shoesSortedByPrice, shoesSortedByPriceDesc });

try {
	shoes[1].updatePropertyValue("value", 9.99);
} catch (error) {
	console.log("Error updating shoe property: ", error.message);
}
