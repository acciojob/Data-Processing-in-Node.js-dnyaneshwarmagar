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
      // Example processing: Convert the chunk to uppercase
      const processedChunk = chunk;
      callback(null, processedChunk);
    }
  });

  // Pipe the read stream to the transform stream and then to the write stream
  readStream.pipe(transformStream).pipe(writeStream);

  // Handle errors
  readStream.on('error', (err) => {
    console.error('Error reading from input file:', err);
  });

  writeStream.on('error', (err) => {
    console.error('Error writing to output file:', err);
  });

  transformStream.on('error', (err) => {
    console.error('Error processing data:', err);
  });

  writeStream.on('finish', () => {
    console.log('Processing complete. Output written to', outputFilePath);
  });
}

processData('input.txt', 'output.txt');
