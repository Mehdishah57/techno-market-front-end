import * as yup from "yup";

const schema = yup.object({
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
});

export { schema as loginSchema }