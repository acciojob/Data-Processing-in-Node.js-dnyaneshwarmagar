const fs = require("fs").promises;

async function processData(inputFilePath, outputFilePath) {
  try {
    const data = await fs.readFile(inputFilePath, "utf8");
    const upperCasedData = data.toUpperCase();
    await fs.writeFile(outputFilePath, upperCasedData);
  } catch (error) {
    console.error("Error processing data:", error);
    process.exit(1); // Exit with error code 1 in case of failure hog atb
  }
}

if (require.main === module) {
  // This will only be true if the script is executed directly from the command line kai lie only 
  const [inputFilePath, outputFilePath] = process.argv.slice(2);
  processData(inputFilePath, outputFilePath);
}