import Fs from "node:fs/promises";

const file = await Fs.readFile("./json/jewelery.json", "utf-8");

const data = JSON.parse(file);

const result = data.map((item) => {
	let product = {};

	product.slug = item.Handle;
	product.title = item.Title;
	product.description = item["Body (HTML)"];
	product.price = item["Variant Price"];
	product.images = [];

	if (item["Image Src"]) {
		product.images.push(item["Image Src"]);
	}

	if (product["Variant Image"]) {
		product.images.push(item["Variant Image"]);
	}

	product.tags = [];

	if (item["Tags"]) {
		product.tags.push(item["Tags"]);
	}

	return product;
});

await Fs.writeFile(
	"./cleaned-json/jewelery.json",
	JSON.stringify(result, null, 2)
);
