  // Function to calculate CRC16 checksum (based on the PIX specification)
  function calculateCRC16(payload: string): string {
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }

function addAmountToPixCode(pixCode: string, amount: number): string {
  // Ensure the amount is within the valid range (0.01 to 9999999999.99)
  if (amount < 0.01 || amount > 9999999999.99) {
      throw new Error("Amount must be between 0.01 and 9999999999.99");
  }

  // Convert the amount to a string with 2 decimal places
  const amountStr = amount.toFixed(2);

  // Create the amount field (ID 54) in the PIX payload
  const amountField = `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`;

  // Find the position where the amount field should be inserted
  // The amount field (54) should be inserted before the "5303986" (ID 53, currency field)
  const currencyFieldIndex = pixCode.indexOf("5303986");

  // Construct the new PIX code with the amount field
  const pixCodeWithoutChecksum =
      pixCode.slice(0, currencyFieldIndex) + // Part before the currency field
      amountField + // Add the amount field
      pixCode.slice(currencyFieldIndex, -4); // Part including and after the currency field, excluding the checksum

  // Calculate the new CRC16 checksum
  const checksum = calculateCRC16(pixCodeWithoutChecksum);

  // Append the checksum to the PIX code
  const newPixCode = pixCodeWithoutChecksum + checksum;

  return newPixCode;
}

export default addAmountToPixCode;