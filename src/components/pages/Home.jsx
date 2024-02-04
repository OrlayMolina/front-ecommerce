import ListaProductos from "./ListaProductos";

function HomePage() {
  return (
    <>
      <div className="bg-gray-800 py-6 m-6 rounded-xl shadow-sm">
        <p className="text-white text-center text-2xl">Encuentra las mejores marcar tecnologicas </p>
      </div>
      <ListaProductos />
    </>
  );
}

export default HomePage;
