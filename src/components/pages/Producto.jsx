import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/Ecommerce.service";

function Producto() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        console.log(res.data)
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="col-span-12">
        <div className="card mb-4">
          <img src={product.image} className="w-full h-auto" alt="test" />
            {console.log(product.image)}
          <div className="card-body">
            <h3 className="text-lg font-bold">${product.price}</h3>
            <h4 className="text-xl font-bold">{product.name}</h4>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Producto;
