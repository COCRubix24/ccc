import ExcelJS from 'exceljs';

import mongoose from 'mongoose';
import Sales from "../models/Sales.js"; // Import the Mongoose model
import User from "../models/User.js";

async function readExcelAndSaveToMongo(filePath, id) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // assuming data is in the first sheet

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    // Assuming columns in the Excel sheet are in the same order as defined in the model
    const userData = {
        invoiceID: row.getCell(1).value,
        branch: row.getCell(2).value,
        city: row.getCell(3).value,
        customerType: row.getCell(4).value,
        gender: row.getCell(5).value,
        productLine: row.getCell(6).value,
        unitPrice: row.getCell(7).value,
        quantity: row.getCell(8).value,
        tax: row.getCell(9).value,
        total: row.getCell(10).value,
        date: row.getCell(11).value,
        time: row.getCell(12).value,
        payment: row.getCell(13).value,
        cogs: row.getCell(14).value,
        grossMarginPercentage: row.getCell(15).value,
        grossIncome: row.getCell(16).value,
        rating: row.getCell(17).value,
        createdBy: id
        // Add more fields as needed
      };

    const user = new Sales(userData);
    user.save()
      .then(() => console.log(`User saved successfully from row ${rowNumber}`))
      .catch((error) => console.error(`Error saving user from row ${rowNumber}: ${error.message}`));
  });
}

// Example usage
export const postData = async (req,res) => {
    const {id} = req.body;
    const user = await User.findOne({_id: id});
    console.log(user.file);
    readExcelAndSaveToMongo(user.file, user._id);
    res.send("here");
}