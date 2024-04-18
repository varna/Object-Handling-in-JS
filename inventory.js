// A function describing the shoe object contructor and it's properties
function Shoe(name, productCode, quantity, value) {
	this.name = name;
	this.productCode = productCode;
	this.quantity = quantity;
	this.value = value;
}

// Don't overcomplicate, name things as they are. Keep it short and simple.
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

// A function to edit shoe's properties. Expects shoes[index], properties name and a new value
function editShoeInformation(shoe, property, value) {
	// setting up some exception handling with the following if statement
	if (
		shoes.includes(shoe) &&
		// if (shoe instanceof Shoes)

		// for some reason this breaks if "shoe instanceof Shoes" is put
		// instead and the array conditional version. This ONLY happens if findShoe function is running too.
		// Bizzare. Please provie some ideas why that would ever happen?
		typeof shoe[property] != "undefined" &&
		typeof value === "number"
	) {
		const oldProperty = shoe[property];
		shoe[property] = value;
		return console.log(
			`The ${property} was changed from ${oldProperty} to ${value}`,
		);
		//I'd like to add the Shoe array index to output too, but I'm struggling with reference errors. Advice welcome
	} else {
		throw new Error(`Could not find a shoe with such properties`);
	}
}

// running the editShoeInformation function with exception handling
try {
	editShoeInformation(shoes[1], "value", 9.99);
} catch (error) {
	console.log("Error editing shoe information: ", error.message);
}
