const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res,next) => {
  {
    res.json(data.employees);
  }
};
const createNewEmployee = (req, res) => {
  {
    const newEmployee = {
      id: data.employees?.length
        ? data.employees[data.employees.length - 1].id + 1
        : 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    };

    if (!newEmployee.firstname || !newEmployee.lastname) {
      return res
        .status(400)
        .json({ message: "first nd last names are required" });
    }

    data.setEmployees([...data.employees, newEmployee]); //nahi samajla..something like employees is added at end of the array
    res.status(201).json(data.employees); //201 : new record created
  }
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    emp => emp.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res.status(400).json({
      message: `Employee Id no. ${req.body.id} not found`,
    });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.firstname = req.body.lastname;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res.status(400).json({
      message: `Employee Id no. ${req.body.id} not found`,
    });
  }

  const filteredArray = data.employees.filter(
    emp => emp.id !== parseInt(req.body.id));

    data.setEmployees([...filteredArray]),
    res.json(data.employees)
  
};

const getEmployee = (req, res) => {
  //params=parameter

  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );

  if (!employee) {
    return res.status(400).json({
      message: `Employee Id no. ${req.params.id} not found`,
    });
  }

  res.json(employee); //and not data.employee coz there's only one not an arrray
};

module.exports = {
  getAllEmployees,
  updateEmployee,
  createNewEmployee,
  deleteEmployee,
  getEmployee,
};
