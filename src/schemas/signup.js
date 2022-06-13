import * as yup from "yup";

const schema = yup.object({
    name: yup
        .string()
        .min(5, "Name should be more than 5 characters")
        .max(255, "Name cannot be more than 255 characters")
        .required("Please provide a name"),
    email: yup
        .string()
        .email()
        .min(7, "Email should be more than 7 characters")
        .max(100, "Email cannot be more than 100 characters")
        .required("Please provide an email"),
    password: yup
        .string()
        .min(5)
        .max(28)
        .required("Please provide a password")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
            "Password must contain One Uppercase, One Lowercase and one Digit i:e Kitty547"),
    countryCode: yup
        .number()
        .min(92, "Country code must be 2 digits")
        .max(92, "Country code must be 2 digits")
        .required("Country code is required"),
    phoneNumber: yup
        .string()
        .min(11, "Phone Number must be 11 Characters")
        .max(11, "Phone Number must be 11 Characters")
        .required("Please Provide a phone Number")
});

export { schema as signupSchema }