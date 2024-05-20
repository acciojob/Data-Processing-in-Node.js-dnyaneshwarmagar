const fs = require("fs").promises;

async function processData(inputFilePath, outputFilePath) {
  try {
    const data = await fs.readFile(inputFilePath, "utf8");
    const upperCasedData = data.toUpperCase();
    await fs.writeFile(outputFilePath, upperCasedData);
  } catch (error) {
    console.error("Error processing data:", error);
    process.exit(1); 
  }
}

if (require.main === module) {

  const [inputFilePath, outputFilePath] = process.argv.slice(2);
  processData(inputFilePath, outputFilePath);
}