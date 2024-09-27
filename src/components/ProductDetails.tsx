import { deleteProduct } from "../services/ProductService";
import { ProductType } from "../types";
import { formatCurrency } from "../utils";
import { Link, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";

type ProductDetailsProps = {
  product: ProductType;
};

export const action = async ({params} : ActionFunctionArgs) => {
  if(params.id !== undefined){
    await deleteProduct(+params.id);
  }

  return redirect("/");
}

export default function ProductDetails({ product }: ProductDetailsProps) {

  const fetcher = useFetcher();
  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`p-2 text-white border border-black rounded-lg text-sm font-bold w-full text-center ${
              isAvailable ? "bg-green-400" : "bg-red-400"
            }`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <Link
            to={`/productos/${product.id}/editar`}
            className="bg-indigo-600 p-2 text-white rounded-lg text-sm font-bold w-full text-center"
          >
            Editar
          </Link>
          <Form
          method="post"
          className="w-full"
          action={`productos/${product.id}/eliminar`}
          >
            <input
              type="submit"
              className="bg-red-600 p-2 text-white rounded-lg text-sm font-bold w-full text-center"
              value="Eliminar"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
