const fs = require('fs');
const { Transform } = require('stream');

function processData(inputFilePath, outputFilePath) {
  // Create a readable stream
  const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });

  // Create a writable stream
  const writeStream = fs.createWriteStream(outputFilePath);

  // Create a transform stream to process the data
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      try {
        // Example processing: Convert the chunk to uppercase
        const processedChunk = chunk.toUpperCase();
        callback(null, processedChunk);
      } catch (error) {
        callback(error);
      }
    }
  });

  // Pipe the read stream to the transform stream and then to the write stream
  readStream.pipe(transformStream).pipe(writeStream);

  // Handle read stream errors
  readStream.on('error', (err) => {
    console.error('Error reading from input file:', err.message);
  });

  // Handle write stream errors
  writeStream.on('error', (err) => {
    console.error('Error writing to output file:', err.message);
  });

  // Handle transform stream errors
  transformStream.on('error', (err) => {
    console.error('Error processing data:', err.message);
  });

  // Log a message when the writing is complete
  writeStream.on('finish', () => {
    console.log('Processing complete. Output written to', outputFilePath);
  });
}

// Ensure the script is called with the correct number of arguments
if (process.argv.length !== 4) {
  console.error('Usage: node app.js <inputFilePath> <outputFilePath>');
  process.exit(1);
}

// Get the input and output file paths from command-line arguments
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

processData(inputFilePath, outputFilePath);
