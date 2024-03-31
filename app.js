// const fs = require("fs");
// const qr = require("qrcode");

// const data = "Hello, World!"; // Data to encode in the QR code
// const filePath = "qr-code.png"; // File path to save the QR code

// qr.toFile(
//   filePath,
//   data,
//   {
//     errorCorrectionLevel: "H", // Error correction level (L, M, Q, H)
//     margin: 2, // Margin size (integer, default is 4)
//     scale: 4 // Scaling factor (integer, default is 4)
//   },
//   err => {
//     if (err) {
//       console.error("Error generating QR code:", err);
//     } else {
//       console.log("QR code generated successfully");
//     }
//   }
// );
const fs = require("fs");
const { Image } = require("image-js");
const jsQR = require("jsqr");

const filePath = "qr-code.png"; // Path to the QR code image

// Read the image file
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Create Image object
  Image.load(data)
    .then(image => {
      // Get image data
      const imageData = {
        data: new Uint8ClampedArray(image.data),
        width: image.width,
        height: image.height
      };

      // Decode QR code from image data
      const qrCode = jsQR(imageData.data, image.width, image.height);

      if (qrCode) {
        console.log("QR code data:", qrCode.data);
      } else {
        console.log("No QR code found");
      }
    })
    .catch(error => {
      console.error("Error reading image:", error);
    });
});
