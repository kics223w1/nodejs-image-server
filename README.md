## Installation

```bash
# Clone or download this repository, then:
cd nodejs-image-server
npm install
```

## Running the server

```bash
node index.js
```

The server starts on `http://localhost:3000`.

> ℹ️ The port is currently hard-coded to **3000** in `index.js`. Feel free to change the `PORT` constant if you need a different port.

## Available endpoints

### 1. `GET /image`

Creates a **760 × 456** blue image and embeds a full EXIF block, including orientation.

```bash
curl -o output.jpg http://localhost:3000/image
```

### 2. `GET /image/orientation`

Creates a green image of the same size and writes **only** the orientation tag.

```bash
curl -o output_orientation.jpg http://localhost:3000/image/orientation
```

### 3. `GET /image/exif`

Creates a red image and writes the same EXIF block as `/image` **except** for the orientation tag.

```bash
curl -o output_exif.jpg http://localhost:3000/image/exif
```
