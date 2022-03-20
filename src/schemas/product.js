import * as yup from "yup";

const imageSchema = yup.object({
    name: yup.string(),
    size: yup.number(),
    type: yup.string(),
    webkitRelativePath: yup.string(),
    lastModified: yup.string(),
    lastModifiedDate: yup.string()
})

const schema = yup.object({
    title: yup.string().min(8).max(80).required("Please provide product title"),
    description: yup.string().min(15).max(1000).required("Please provide product description"),
    price: yup.string().required("Please provide product price"),
    owner: yup.string().required(),
    category: yup.string().required("Please provide product category"),
    subCategory: yup.string().required("Please provide sub-category for product"),
    location: yup.string().required(),
    picture: yup.object({
        image1: imageSchema.nullable(),
        image2: imageSchema.nullable(),
        image3: imageSchema.nullable(),
        image4: imageSchema.nullable(),
        image5: imageSchema.nullable(),
    }).nullable(),
    lat: yup.string().nullable(true),
    lng: yup.string().nullable(true)
});

const validateProduct = (product) => {
    return schema.validate(product);
}

export default validateProduct;