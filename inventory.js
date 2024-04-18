// A function describing the shoe object contructor and it's properties
function Shoe(name, productCode, quantity, value) {
	this.name = name;
	this.productCode = productCode;
	this.quantity = quantity;
	this.value = value;
}

// This is where five instances of Shoe are created
const shoe1 = new Shoe("Converse", 6343654365, 10, 19.99);
const shoe2 = new Shoe("Crocs", 53135135, 2, 34.99);
const shoe3 = new Shoe("Birkenstock", 2752752752, 4, 89.99);
const shoe4 = new Shoe("New Balance", 7275725756, 50, 44.99);
const shoe5 = new Shoe("Generic", 52752263, 9, 14.99);

// This is where all the shoe instances are pushed into an array
const shoeArray = [];
shoeArray.push(shoe1, shoe2, shoe3, shoe4, shoe5);

// A function to search for any Shoe in the array. Expects a property and a seach input
function findShoe(property, searchInput) {
	// Adding this for exception handling
	const found = false;

	for (Shoes in shoeArray) {
		if (shoeArray.find((c) => c[property] == searchInput)) {
			return shoeArray[Shoes];
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
	shoeArray.sort((a, b) => a.value - b.value);
	return shoeArray[0];
}
console.table(findCheapestShoe());

// A function to look for the most expensive shoe in the list
function findMostExpensiveShoe() {
	shoeArray.sort((a, b) => b.value - a.value);
	return shoeArray[0];
}
console.table(findMostExpensiveShoe());

// A function to edit shoe's properties. Expects shoeArray[index], properties name and a new value
function editShoeInformation(shoeArrayInstance, property, newProperty) {
	// setting up some exception handling with the following if statement
	if (
		shoeArray.includes(shoeArrayInstance) &&
		// if (shoeArrayInstance instanceof Shoes)

		// for some reason this breaks if "shoeArrayInstance instanceof Shoes" is put
		// instead and the array conditional version. This ONLY happens if findShoe function is running too.
		// Bizzare. Please provie some ideas why that would ever happen?
		typeof shoeArrayInstance[property] != "undefined" &&
		typeof newProperty === "number"
	) {
		const oldProperty = shoeArrayInstance[property];
		shoeArrayInstance[property] = newProperty;
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
	editShoeInformation(shoeArray[1], "value", 9.99);
} catch (error) {
	console.log("Error editing shoe information: ", error.message);
}

// A function to order the shoes from the cheapest to most expensive
function orderPriceIncreasing() {
	shoeArray.sort((a, b) => a.value - b.value);
	return shoeArray;
}
console.table(orderPriceIncreasing());
