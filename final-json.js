import Fs from "node:fs/promises";

const file = await Fs.readFile("./cleaned-json/home-and-garden.json", "utf-8");

const data = JSON.parse(file);

const result = [];

const slugMap = {};

for (let i = 0; i < data.length; i++) {
	let product = data[i];

	if (!slugMap[product.slug]) {
		slugMap[product.slug] = i;
		result.push(product);
	} else {
		let index = slugMap[product.slug];
		let existingProduct = result[index];

		if (
			existingProduct &&
			existingProduct.images &&
			product.images &&
			existingProduct.tags &&
			product.tags
		) {
			existingProduct.images = [...existingProduct.images, ...product.images];
			existingProduct.tags = [...existingProduct.tags, ...product.tags];
			result[index] = existingProduct;
		}
	}
}

await Fs.writeFile(
	"./final-json/home-and-garden.json",
	JSON.stringify(result, null, 2)
);
