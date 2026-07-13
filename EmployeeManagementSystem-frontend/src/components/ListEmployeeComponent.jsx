import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees(){
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function removeEmployee(id){
        deleteEmployee(id).then((response) =>{
           getAllEmployees()
        }).catch(error => {
            console.error(error);
        })
    }
    return (
        <div
            className="container py-4"
            style={{ backgroundColor: "#f8f9fa" }}
        >
            <div className="card border-0 shadow-lg rounded-4">

                {/* Header */}
                <div
                    className="card-header text-white py-3"
                    style={{
                        background: "linear-gradient(90deg, #232526, #414345)"
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">

                        <button
                            className="btn btn-success fw-semibold"
                            onClick={() => navigate('/add-employee')}
                        >
                            + Add Employee
                        </button>

                        <h2 className="mb-0 fw-bold flex-grow-1 text-center">
                            List of Employees
                        </h2>

                        <div style={{ width: "150px" }}></div>

                    </div>
                </div>

                {/* Table */}
                <div className="card-body p-4">

                    <table className="table table-hover align-middle mb-0">

                        <thead
                            style={{
                                backgroundColor: "#212529",
                                color: "white"
                            }}
                        >
                            <tr>
                                <th className="py-3">Employee ID</th>
                                <th className="py-3">First Name</th>
                                <th className="py-3">Last Name</th>
                                <th className="py-3">Email Address</th>
                                <th className="py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {employees.map((employee) => (

                                <tr key={employee.id}>

                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>

                                    <td className="text-center">

                                        <button
                                            className="btn btn-warning btn-sm me-2 fw-semibold"
                                            onClick={() => navigate(`/edit-employee/${employee.id}`)}
                                        >
                                            Update
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm fw-semibold"
                                            onClick={() => removeEmployee(employee.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Footer */}
                <div className="card-footer bg-white border-0 text-end">

                    <span className="text-muted">
                        Total Employees :
                        <span className="fw-bold text-dark">
                            {" "}
                            {employees.length}
                        </span>
                    </span>

                </div>

            </div>
        </div>
    );
};

export default ListEmployeeComponent;