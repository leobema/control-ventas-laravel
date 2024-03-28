import React, { useState } from "react";
import AddProduct from "@/Components/AddProduct";
import { usePage } from '@inertiajs/react'
import UpdateProduct from "@/Components/UpdateProduct"; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
//import DeleteProduct from "../components/DeleteProduct";
import PrimaryButton from "@/Components/PrimaryButton";

const Index = ({products}) => {
  //const {auth} = usePage().props
  //const { products } = usePage().props;
  const [editingProductId, setEditingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const {auth} = usePage().props
    //const [editing, setEditing] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null);
 // const [ products, setProducts ] = useState ([]);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
  };

  const handleDeleteProduct = (productId) => {
    setDeletingProductId(productId);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  const handleCancelDelete = () => {
    setDeletingProductId(null);
  };


/*   const getAllProducts = (e) => {
    e.preventDefault()
    console.log(data)
    post(route('products.index'), {onSuccess: ()=> reset()})
  } */

/*   // Modal de confirmación para eliminar un ítem
  const showDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setSelectedProductId(id); // Set the selected product ID
  }; */

/*   const setItemToDelete = (id) => {
    setSelectedProductId(id); 
  }; */
  console.log('probndo', products.id)

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(prevState => !prevState);
  };

   // Modal for Product UPDATE
  const updateProductModalSetting = (productId) => {
    setSelectedProductId(productId);
    setShowUpdateModal(true);
    
    // Lógica para mostrar el modal aquí
  }; 



  const handlePageUpdate = () => {
    getAllProducts();
  };

// Handle Search Term
const handleSearchTerm = (e) => {
  const term = e.target.value.toLowerCase(); // Convertir el término de búsqueda a minúsculas
  setSearchTerm(term); // Establecer el término de búsqueda en el estado

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(term)
  );

  // Actualizar la lista de productos filtrados
  setFilteredProducts(filteredProducts);
};

/* // Función para calcular la suma total del valor de stock
const calcularValorTotalStock = () => {
  let total = 0;

  // Iterar sobre cada producto y sumar el valor de su stock
  products.forEach(product => {
    if (product.designs.length > 0) {
      total += product.designs[0].stock * product.designs[0].price;
    }
  });

  return total;
};
 */
/* // Función para calcular la suma total de unidades de stock
const calcularUnidadesTotalesStock = () => {
  let totalUnidades = 0;

  // Iterar sobre cada producto y sumar la cantidad de stock de cada diseño
  products.forEach(product => {
    if (product.designs.length > 0) {
      totalUnidades += product.designs.reduce((acc, curr) => acc + curr.stock, 0);
    }
  });

  return totalUnidades;
}; */

/* // Función para calcular la cantidad de unidades de stock con diferentes estados
const contarUnidadesPorEstado = (estado) => {
  let count = 0;

  // Iterar sobre cada producto y sumar la cantidad de stock con el estado dado
  products.forEach(product => {
    if (product.designs.length > 0) {
      count += product.designs.filter(design => {
        if (estado === "Stock Bajo") {
          return design.stock > 0 && design.stock <= 3;
        } else if (estado === "Sin Stock") {
          return design.stock === 0;
        }
        return false;
      }).length;
    }
  });

  return count;
}; */


  return (
    <div>
    <AuthenticatedLayout auth={auth}>
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-bold px-4">Inventario General</span>
          <div className=" flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Productos
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {products.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Todos los productos
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-green-600 text-base">
                Stock Total
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                   {/* {calcularUnidadesTotalesStock()}  */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                     {/* ${calcularValorTotalStock()}   */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Valor
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Stock Bajo
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-yellow-600 text-base">
                  {/* {contarUnidadesPorEstado("Stock Bajo")}  */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock Bajo
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-600 text-base">
                  {/* {contarUnidadesPorEstado("Sin Stock")} */}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Sin Stock
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Sin Definir
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ordenado
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Sin Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {console.log('aqui', selectedProductId)}
        

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
           <UpdateProduct
            productId={selectedProductId}
            productData={updateProduct}
            updateModalSetting={updateProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          /> 
          )}

        {showDeleteModal && (
          <DeleteProduct 
            productId={selectedProductId}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            endpoint={endpoint}
            setProducts={setProducts}
            products={products}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
            showDeleteConfirmation={showDeleteConfirmation}
            setItemToDelete={setItemToDelete}
          />
        )}


       
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Productos</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <svg 
                width="12"
                height="12"
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" 
                    />
                    </svg>
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="buscar producto"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addProductModalSetting}
              >
                {/*<Link to="/addProduct">Add Product</Link>*/}
                Agregar Producto
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Producto
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Diseño
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Valor/total
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Observación
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Disponible?
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id}> 
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                     {product.product}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs && product.designs.length > 0 ? (
                      product.designs.map(design => (
                        <div key={design.id}>
                            {design.design}
                        </div>
                    ))
                ) : (
                    'No Design'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs && product.designs.length > 0 ? (
                    product.designs.map(design => (
                        <div key={design.id}>
                            {design.stock}
                        </div>
                    ))
                ) : (
                    'No Stock'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs && product.designs.length > 0 ? (
                    product.designs.map(design => (
                        <div key={design.id}>
                            {design.price}
                        </div>
                    ))
                ) : (
                    'No Price'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs && product.designs.length > 0 ? (
                    product.designs.map(design => (
                        <div key={design.id}>
                            {design.price * design.stock}
                        </div>
                    ))
                ) : (
                    'N/A'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs && product.designs.length > 0 ? (
                    product.designs.map(design => (
                        <div key={design.id}>
                            {design.description}
                        </div>
                    ))
                ) : (
                    'No Description'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs && product.designs.length > 0 ? (
                    product.designs.map(design => (
                        <div key={design.id}>
                            {design.stock > 0 && design.stock <= 3 ? "Stock Bajo 🔰" : design.stock > 3 ? "Stock ✅" : 'Sin Stock ❗'}
                        </div>
                    ))
                ) : (
                    'No Stock Status'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">

                      <button
                        className="text-green-700 cursor-pointer"
                        onClick={() => {
                          
                          setSelectedProductId(product.id);
                          console.log(product.id)
                          setShowUpdateModal(true);
                          setUpdateProduct(product); 
                        }}
                      >
                        Editar{" "}
                      </button>
                    
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => showDeleteConfirmation(product.id)}
                      >
                        Borrar
                      </span>
                      
                    </td>
                  </tr>
                  
             ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
    </AuthenticatedLayout>
    </div>

  )
}

export default Index;
