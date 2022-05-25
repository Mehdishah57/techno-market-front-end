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
    category: yup
        .string()
        .required("You haven't provided Product Category"),
    subCategory: yup
        .string()
        .required("You haven't provided sub-category for product"),
    location: yup
        .string()
        .required("Please select a \"City\""),
    lat: yup.string().nullable(true),
    lng: yup.string().nullable(true)
});

const validateProduct = (product) => {
    return schema.validate(product);
}

export default validateProduct;
export {schema as productSchema}