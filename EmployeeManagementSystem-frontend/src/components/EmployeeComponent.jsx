import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const {id} = useParams();
    // Validation Errors
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    // Validation Function
    function validateForm() {

        let valid = true;

        const errorsCopy = {
            firstName: "",
            lastName: "",
            email: ""
        };

        if (firstName.trim()) {
            errorsCopy.firstName = "";
        } else {
            errorsCopy.firstName = "First Name is required";
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = "";
        } else {
            errorsCopy.lastName = "Last Name is required";
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            
            const employee = {
                firstName,
                lastName,
                email,
            };

            if(id){
                updateEmployee(id, employee).then((response) =>{
                    console.log(response.data);
                    navigator("/employees")
                }).catch((error) => {
                    console.error(error);
                });
            }else{
                createEmployee(employee)
                    .then((response) => {
                        console.log(response.data);
                        navigator("/employees");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

            
        }
    }

    function pageTitle(){
        if(id){
            return (<div
                    className="card-header text-white text-center py-3 rounded-top-4"
                    style={{
                        background: "linear-gradient(90deg, #232526, #414345)",
                    }}
                >
                    <h3 className="mb-0 fw-bold">Update Employee</h3>
                </div>
            );
        }else{
            return (<div
                    className="card-header text-white text-center py-3 rounded-top-4"
                    style={{
                        background: "linear-gradient(90deg, #232526, #414345)",
                    }}
                >
                    <h3 className="mb-0 fw-bold">Add Employee</h3>
                </div>
            );
        }
    }
    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
        >
            <div
                className="card shadow-lg border-0 rounded-4"
                style={{ width: "600px" }}
            >
                {
                    pageTitle()
                }

                <div className="card-body p-4">

                    <form onSubmit={saveOrUpdateEmployee}>

                        {/* First Name */}

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                First Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                            />

                            <div className="invalid-feedback">
                                {errors.firstName}
                            </div>
                        </div>

                        {/* Last Name */}

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Last Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                            />

                            <div className="invalid-feedback">
                                {errors.lastName}
                            </div>
                        </div>

                        {/* Email */}

                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            />

                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2">

                            <button
                                type="reset"
                                className="btn btn-outline-secondary"
                            >
                                Clear
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success px-4"
                            >
                                Save Employee
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;