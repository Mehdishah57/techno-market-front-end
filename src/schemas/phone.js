import * as yup from "yup";

const schema = yup.object({
    countryCode: yup
        .number("Country code must be a 2 digit number without \"+\" preceding it")
        .min(10, "Country code must be 2 digits")
        .max(99, "Country code must be 2 digits")
        .required("Fill in the country code to update"),
    phoneNumber: yup
        .number("Phone number must be 10 digits")
        .min(1000000000,"Phone number must be 10 digits")
        .max(9999999999,"Phone number must be 10 digits")
        .required("Fill in the phone number to update")
})

export { schema as phoneSchema };