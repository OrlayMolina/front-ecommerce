import { useEffect, useState } from "react";

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
    alert("Producto eliminado del carrito");
    loadCart();
  };

  return (
    <div className="p-4 page">
      <div className="flex">
        <div className="w-7/12">
          {products.map((product) => (
            <div className="mb-3" key={product._id}>
              <div className="flex">
                <div className="w-4/12">
                  <img
                    src={product.image}
                    className="rounded-start h-full"
                    alt="test"
                  />
                </div>
                <div className="w-8/12">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <h5 style={{ color: "black" }}>${product.price}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        Cantidad: {product.quantity}
                      </small>
                    </p>
                    <div className="text-start">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        type="button"
                        onClick={() => eliminarProducto(product._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-5/12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen de compra</h5>
              <p className="card-text">
                Tenemos envíos gratuitos, aprovecha y compra nuestros productos.
              </p>
              <div className="flex">
                <div className="w-6/12">
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
              <div className="text-end">
                <p>Aquí pondremos el botón de PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
