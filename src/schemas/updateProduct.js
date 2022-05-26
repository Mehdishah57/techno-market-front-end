import * as yup from "yup";

const schema = yup.object({
    title: yup
        .string()
        .min(8, "Title should have at least 8 characters")
        .max(80, "Title can't be longer than 80 Characters")
        .required("You haven't entered Product Title"),
    description: yup
        .string()
        .min(15, "Description should contain at least 15 characters")
        .max(1000, "Description can't be longer than 1000 characters")
        .required("You haven't entered Product Description"),
    price: yup
        .number("Price must be a number")
        .min(10, "Rs 10 should be the minimum price")
        .max(10000000000, "Price can't be more than Rs 10000000000")
        .required("You haven't provided Product Price"),
    lat: yup.string().nullable(true),
    lng: yup.string().nullable(true)
});

const validateUpdateProduct = (product) => {
    return schema.validate(product);
}

export default validateUpdateProduct;
export {schema as updateProductSchema}