const express = require("express");
const sharp = require("sharp");
const { exiftool } = require("exiftool-vendored");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/image", async (req, res) => {
  const outputPath = path.join(__dirname, "output.jpg");

  // Create blank image (760x456, blue background)
  const imageBuffer = await sharp({
    create: {
      width: 760,
      height: 456,
      channels: 3,
      background: { r: 0, g: 0, b: 255 },
    },
  })
    .jpeg()
    .toBuffer();

  // Save temp file
  await fs.promises.writeFile(outputPath, imageBuffer);

  // Add EXIF metadata
  await exiftool.write(outputPath, {
    AllDates: "2025:06:03 11:11:54",
    ExposureTime: "1/160",
    FNumber: 3.5,
    FocalLength: "61mm",
    ISO: 1250,
    Orientation: "Horizontal (normal)",
    DPI: "240",
  });

  const finalBuffer = await fs.promises.readFile(outputPath);
  res.set("Content-Type", "image/jpeg");
  res.send(finalBuffer);
});

// New endpoint: Only orientation metadata
app.get("/image/orientation", async (req, res) => {
  const outputPath = path.join(__dirname, "output_orientation.jpg");

  // Create blank image (760x456, green background)
  const imageBuffer = await sharp({
    create: {
      width: 760,
      height: 456,
      channels: 3,
      background: { r: 0, g: 255, b: 0 },
    },
  })
    .jpeg()
    .toBuffer();

  await fs.promises.writeFile(outputPath, imageBuffer);

  // Add only Orientation metadata
  await exiftool.write(outputPath, {
    Orientation: "Horizontal (normal)",
  });

  const finalBuffer = await fs.promises.readFile(outputPath);
  res.set("Content-Type", "image/jpeg");
  res.send(finalBuffer);
});

// New endpoint: Only EXIF metadata (without orientation)
app.get("/image/exif", async (req, res) => {
  const outputPath = path.join(__dirname, "output_exif.jpg");

  // Create blank image (760x456, red background)
  const imageBuffer = await sharp({
    create: {
      width: 760,
      height: 456,
      channels: 3,
      background: { r: 255, g: 0, b: 0 },
    },
  })
    .jpeg()
    .toBuffer();

  await fs.promises.writeFile(outputPath, imageBuffer);

  // Add EXIF metadata except Orientation
  await exiftool.write(outputPath, {
    AllDates: "2025:06:03 11:11:54",
    ExposureTime: "1/160",
    FNumber: 3.5,
    FocalLength: "61mm",
    ISO: 1250,
    DPI: "240",
  });

  const finalBuffer = await fs.promises.readFile(outputPath);
  res.set("Content-Type", "image/jpeg");
  res.send(finalBuffer);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
