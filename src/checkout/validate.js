export function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  const phone = values.phone.trim();
  const digitsCount = phone.replace(/\D/g, "").length;
  if (phone === "") {
    errors.phone = "Enter your phone number";
  } else if (!/^[\d\s+-]+$/.test(phone)) {
    errors.phone = "Phone can contain only digits, spaces, + and -";
  } else if (digitsCount < 7 || digitsCount > 15) {
    errors.phone = "Phone must contain from 7 to 15 digits";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email, for example name@example.com";
  }

  if (values.address.trim().length < 10) {
    errors.address = "Address must be at least 10 characters";
  }

  return errors;
}