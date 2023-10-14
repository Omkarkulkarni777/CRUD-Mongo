//A schema is a JSON object that defines the structure and contents of your data.
//Object ID is treated as the primary key within any MongoDB collection. It is a unique identifier for each document or record.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Employee',employeeSchema) // but mongoose will set 'Employee' as 'employees' that is lowercase and plural
