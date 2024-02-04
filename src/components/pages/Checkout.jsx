import { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

function Checkout() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  let loadCart = () => {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      setTotal(
        cart.reduce((total, item) => total + item.price * item.quantity, 0)
      );
      setProducts(cart);
    }
  };

  useEffect(() => {
    document.title = "Checkout";
    loadCart();
  }, []);

  let eliminarProducto = (id) => {
    console.log("El id es: ", id);
    // Delete product from cart in local storage if quantity is 1

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.quantity === 1) {
          let newCart = cart.filter((item) => item._id !== id);
          localStorage.setItem("cart", JSON.stringify(newCart));
        } else {
          item.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    });
    toast.success("Producto eliminado del carrito");
    loadCart();
  };

  let eliminar = (id) => {
    console.log("El id es: ", id);
  
    // Get cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart"));
  
    // Filter out products with the specified id
    let newCart = cart.filter((item) => item._id !== id);
  
    // Update local storage with the new cart
    localStorage.setItem("cart", JSON.stringify(newCart));
  
    toast.success("Productos eliminados del carrito");
    loadCart();
  };

  return (
    <div className="p-4 page">
      <div className="flex py-8">
        <div className="w-7/12 shadow-lg rounded-xl mr-5 flex-shrink-0">
          {products.map((product) => (
            <div className="mb-3" key={product._id}>
              <div className="flex">
                <div className="w-5/12 mr-10">
                  <img
                    src={product.image}
                    className="rounded-start h-full"
                    alt="test"
                  />
                </div>
                <div className="w-7/12 mr-2 px-3 py-8">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <h5 style={{ color: "black" }}>${product.price}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        Cantidad: {product.quantity}
                      </small>
                    </p>
                    <div className="text-center mt-2">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded-md mt-3"
                        type="button"
                        onClick={() => eliminarProducto(product._id)}
                      >
                        Restar Cantidad
                      </button>

                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md mt-3 m-4"
                        type="button"
                        onClick={() => eliminar(product._id)}
                      >
                        Eliminar Producto
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-4/12 rounded-lg px-5 py-3">
          <div className="card">
            <div className="card-body">
              <h5 className="text-xl mb-6 font-bold">Resumen de compra</h5>
              <p className="card-text">
                Tenemos envíos gratuitos, aprovecha y compra nuestros productos.
              </p>
              <div className="flex">
                <div className="w-8/12">
                  <p>
                    Subtotal <b>{total} USD</b>
                  </p>
                  <p>
                    Envío <b>0.00</b>
                  </p>
                  <p>
                    Total <b>{total} USD</b>
                  </p>
                </div>
              </div>
              <div className="text-end mt-4">
                <PayPalButtons
                  forceReRender={[total, "USD", { layout: "vertical" }]}
                  fundingSource={undefined}
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: total,
                            },
                          },
                        ],
                      })
                      .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                      });
                  }}
                  onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                      // Your code here after capture the order
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
