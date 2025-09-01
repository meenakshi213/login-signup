import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateSignupForm } from "../utils/validation";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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

    const validation = validateSignupForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Account created successfully! Please sign in.");
      navigate("/");
    } catch (error) {
      alert("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create new Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-column">
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={errors.name}
                placeholder="Name"
                required
              />

              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
                placeholder="Email"
                required
              />
              <div className="input-container">
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  error={errors.password}
                  placeholder="New Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="toggle-visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-column">
              <Input
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                error={errors.username}
                placeholder="Username"
                required
              />

              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={errors.phone}
                placeholder="Phone No."
                required
              />
              <div className="input-container">
                <Input
                  type={showPassword2 ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  error={errors.confirmPassword}
                  placeholder="Confirm New Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2((prev) => !prev)}
                  className="toggle-visibility"
                >
                  {showPassword2 ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="signup-footer">
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ borderRadius: "8px" }}
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
