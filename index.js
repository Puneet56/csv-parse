const Fs = require("fs");
const CsvReadableStream = require("csv-reader");

let inputStream = Fs.createReadStream("./csv/jewelery.csv", "utf8");

let data = [];

let product = {};

inputStream
	.pipe(
		new CsvReadableStream({
			parseNumbers: true,
			parseBooleans: true,
			trim: true,
		})
	)
	.on("data", function (row) {
		data.push(row);
	})
	.on("end", function () {
		let titleRow = data[0];

		let parsedData = [];

		for (let i = 1; i < data.length; i++) {
			let row = data[i];
			let product = {};
			for (let j = 0; j < row.length; j++) {
				product[titleRow[j]] = row[j];
			}
			parsedData.push(product);
		}

		console.log(parsedData);

		Fs.writeFile(
			"./json/jewelery.json",
			JSON.stringify(parsedData),
			function (err) {
				if (err) {
					console.log(err);
				}
			}
		);
	});
