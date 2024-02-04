import { useEffect, useState } from "react";
import { getProducts } from "../../services/Ecommerce.service";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

function ListaProductos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let addProductToCart = (product) => {
    console.log(product);

    let cart = window.localStorage.getItem('cart') ? JSON.parse( window.localStorage.getItem('cart')) : [];

    let existingProduct = cart.find(item => item._id === product._id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        window.localStorage.setItem('cart', JSON.stringify(cart));
        toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Productos
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative shadow-2xl rounded-xl bg-indigo-300"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 rounded-t-xl lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between bg-indigo-300 rounded-b-xl">
                  <div>
                    <p className="text-lg text-gray-700 p-2">{product.name}</p>
                    <small className="text-sm text-gray-700 p-2">
                      {product.sku}
                    </small>
                    <p className="text-sm text-gray-700 p-2">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-md font-medium text-gray-900 p-2">
                    ${product.price}
                  </p>
                </div>

                <div className="d-grid gap-2 ">
                  <button
                    type="button"
                    className="bg-white hover:bg-gray-300 m-2 mb-3 px-3 py-1 rounded-lg cursor-pointer"
                    onClick={() => addProductToCart(product)}
                  >
                    Agregar al carrito
                  </button>
                  <Link
                    to={`/producto/${product._id}`}
                    className="bg-red-100 hover:bg-red-300 m-2 mb-3 px-6 py-1 rounded-lg cursor-pointer"
                  >
                    Detalle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProductos;
