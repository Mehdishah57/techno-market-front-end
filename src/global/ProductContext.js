import { createContext } from "react";

export const ProductContext = createContext(null);

const ProductProvider = ({children, value}) => (
    <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
)

export default ProductProvider;