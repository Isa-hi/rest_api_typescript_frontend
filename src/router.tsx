import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Products, { loader as ProductsLoader, action as UpdateProductAction} from "./views/Products"
import NewProduct, { action as NewProductAction } from "./views/NewProduct"
import EditProduct, {loader as EditProductLoader, action as EditProductAction} from "./views/EditProduct"
import { action as DeleteProductAction } from "./components/ProductDetails"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: ProductsLoader,
                action: UpdateProductAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: NewProductAction
            },
            {
                path: 'productos/:id/editar',
                element: <EditProduct />,
                loader: EditProductLoader,
                action: EditProductAction
            },
            {
                path: 'productos/:id/eliminar',
                element: <EditProduct />,
                action: DeleteProductAction
            }
        ]

    }
]
)

export default router
