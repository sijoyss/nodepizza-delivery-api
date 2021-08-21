const fs = require("fs");

// const upload = require("../uploads/");

// const readMe = fs.readFile("./uploads/sample.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// const copiedFile = fs.copyFile(
//   "./uploads/sample.txt",
//   "./pdfFiles/copied.txt",
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       fs.writeFileSync(
//         "./pdfFiles/copied.txt",
//         "Hi Sijoy Here we writted in file DONE"
//       );
//       const readingCopiedFile = fs.readFileSync(
//         "./pdfFiles/copied.txt",
//         "utf8"
//       );
//       console.log(readingCopiedFile);
//     }
//   }
// );

const readableStream = fs.createReadStream("./uploads/sample2.txt", "utf8");
const writeableStream = fs.createWriteStream("./pdfFiles/copied2.txt");

readableStream.pipe(writeableStream);
