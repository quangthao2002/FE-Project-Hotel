import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegistration = async (e) => {
    try {
      const result = await registration(registration);
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      if (result) {
        toast.success("Registration successful");
      } else {
        toast.error("Registration failed");
      }
      setTimeout;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="container col-6 mt-5 mb-5">
        <h2>Registration</h2>
        <form onSubmit={handleRegistration}>
          <div className="row mb-3">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">
              firstName
            </label>
            <div className="col-sm-10">
              <input
                type="firstName"
                className="form-control"
                id="firstName"
                name="firstName"
                value={registration.firstName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="lastName" className="col-sm-2 col-form-label">
              lastName
            </label>
            <div className="">
              <input
                type="lastName"
                className="form-control"
                id="lastName"
                name="lastName"
                value={registration.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={registration.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={registration.password}
                onChange={handleInputChange}
              />
            </div>
            </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary mr-3">
              Registration
            </button>
            <span className="ml-3">
              Already have an account? <Link to={"/login"} className="text-decoration-none">Login</Link> 
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;
