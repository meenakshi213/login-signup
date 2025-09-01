// Validation utility functions for the login/signup forms

export const validateName = (name) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!name.trim()) {
    return { isValid: false, message: 'Name is required' };
  }
  if (!nameRegex.test(name)) {
    return { isValid: false, message: 'Name can only contain alphabets and spaces' };
  }
  return { isValid: true, message: '' };
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
  if (!username.trim()) {
    return { isValid: false, message: 'Username is required' };
  }
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: 'Username can contain alphanumeric values and special characters' };
  }
  return { isValid: true, message: '' };
};

export const validatePassword = (password, username = '') => {
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
  
  if (!password.trim()) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (!passwordRegex.test(password)) {
    return { isValid: false, message: 'Password can contain alphanumeric values and special characters' };
  }
  
  if (username && password === username) {
    return { isValid: false, message: 'Password cannot be the same as username' };
  }
  
  return { isValid: true, message: '' };
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword.trim()) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (confirmPassword !== password) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true, message: '' };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.trim()) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  
  if (!phone.trim()) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Please enter a valid phone number with country code' };
  }
  
  return { isValid: true, message: '' };
};

export const validateLoginForm = (username, password) => {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password,username);
  
  return {
    isValid: usernameValidation.isValid && passwordValidation.isValid,
    errors: {
      username: usernameValidation.message,
      password: passwordValidation.message
    }
  };
};

export const validateSignupForm = (formData) => {
  const {
    name,
    username,
    password,
    confirmPassword,
    email,
    phone
  } = formData;
  
  const nameValidation = validateName(name);
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password, username);
  const confirmPasswordValidation = validateConfirmPassword(confirmPassword, password);
  const emailValidation = validateEmail(email);
  const phoneValidation = validatePhone(phone);
  
  const isValid = nameValidation.isValid &&
                  usernameValidation.isValid &&
                  passwordValidation.isValid &&
                  confirmPasswordValidation.isValid &&
                  emailValidation.isValid &&
                  phoneValidation.isValid;
  
  return {
    isValid,
    errors: {
      name: nameValidation.message,
      username: usernameValidation.message,
      password: passwordValidation.message,
      confirmPassword: confirmPasswordValidation.message,
      email: emailValidation.message,
      phone: phoneValidation.message
    }
  };
};
