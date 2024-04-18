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

// A function to search for any Shoe in the array. Expects a property and a seach input
function findShoe(property, searchInput) {
	// Adding this for exception handling
	const found = false;

	for (Shoes in shoes) {
		if (shoes.find((c) => c[property] == searchInput)) {
			return shoes[Shoes];
		}
	}

	if (!found) {
		// this is where the initial found status is used for exception handling
		throw new Error(
			`Could not find a shoe with such properties or property values`,
		);
	}
}

// Running the findShoe function with exception handling
try {
	console.table(findShoe("quantity", 2));
} catch (error) {
	console.log("Error finding shoes: ", error.message);
}

// A function to look for the cheapest shoe in the list
function findCheapestShoe() {
	shoes.sort((a, b) => a.value - b.value);
	return shoes[0];
}
console.table(findCheapestShoe());

// A function to look for the most expensive shoe in the list
function findMostExpensiveShoe() {
	shoes.sort((a, b) => b.value - a.value);
	return shoes[0];
}
console.table(findMostExpensiveShoe());

// A function to edit shoe's properties. Expects shoes[index], properties name and a new value
function editShoeInformation(shoesInstance, property, newProperty) {
	// setting up some exception handling with the following if statement
	if (
		shoes.includes(shoesInstance) &&
		// if (shoesInstance instanceof Shoes)

		// for some reason this breaks if "shoesInstance instanceof Shoes" is put
		// instead and the array conditional version. This ONLY happens if findShoe function is running too.
		// Bizzare. Please provie some ideas why that would ever happen?
		typeof shoesInstance[property] != "undefined" &&
		typeof newProperty === "number"
	) {
		const oldProperty = shoesInstance[property];
		shoesInstance[property] = newProperty;
		return console.log(
			`The ${property} was changed from ${oldProperty} to ${newProperty}`,
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

// A function to order the shoes from the cheapest to most expensive
function orderPriceIncreasing() {
	shoes.sort((a, b) => a.value - b.value);
	return shoes;
}
console.table(orderPriceIncreasing());
