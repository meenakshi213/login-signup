import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateLoginForm } from "../utils/validation";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateLoginForm(formData.username, formData.password);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      alert("Login successful!");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Login</h1>
          <p>Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            error={errors.username}
            placeholder="Username"
            required
          />

          <Input
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            placeholder="Password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="btn-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Login"}
          </Button>
        </form>

        <div className="login-footer">
          <p>
            Don't have Account?{" "}
            <Link to="/signup" className="link">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
