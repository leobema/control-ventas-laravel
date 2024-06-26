import React, { useState, useEffect } from "react";
import AddProduct from "@/Components/AddProduct";
import { usePage } from '@inertiajs/react'
import UpdateProduct from "@/Components/UpdateProduct"; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, Transition } from "@headlessui/react"; 
import { router } from '@inertiajs/react' 


const Index = ({products}) => {
  const {auth} = usePage().props
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductDeleteId, setSelectedProductDeleteId] = useState(null);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [totalStock, setTotalStock] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => { 
    const filtered = products.filter(product =>
      product.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  useEffect(() => {
    // Calcula la suma total del stock al actualizar la lista de productos
    const sumStock = filteredProducts.reduce((accumulator, product) => {
      if (product.designs && product.designs.length > 0) {
        product.designs.forEach(design => {
          accumulator += design.stock;
        });
      }
      return accumulator;
    }, 0);
    setTotalStock(sumStock);
  }, [filteredProducts]);

  useEffect(() => {
    // Calcula la suma total del stock al actualizar la lista de productos
    const sumPrice = filteredProducts.reduce((accumulator, product) => {
      if (product.designs && product.designs.length > 0) {
        product.designs.forEach(design => {
          accumulator += design.price * design.stock;
        });
      }
      return accumulator;
    }, 0);
    setTotalPrice(sumPrice);
  }, [filteredProducts]);

   // Modal de confirmación para eliminar un ítem
  const showDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setSelectedProductDeleteId(id); // Set the selected product ID
  }; 

  const deleteProduct = () => {
    router.delete(`/products/${selectedProductDeleteId}`)
    setShowDeleteModal(false);
  }; 
  
  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(prevState => !prevState);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false); // Establece el estado en false al cerrar el modal
  };

   // Modal for Product UPDATE
  const updateProductModalSetting = (productId) => {
    setSelectedProductId(productId);
    setShowUpdateModal(true);
    
    // Lógica para mostrar el modal aquí
  }; 

  const handleSearchTerm = (e) => {
    const term = e.target.value.trim(); // Asegurar que term no tenga espacios en blanco al inicio y al final
    setSearchTerm(term); // Establecer el término de búsqueda en el estado
  
    // Verificar que searchTerm no sea undefined antes de llamar a toLowerCase()
    if (term !== undefined) {
      // Filtrar productos basados en el término de búsqueda
      const filteredProducts = products.filter(product =>
        product.product.toLowerCase().includes(term.toLowerCase())
      );
  
      // Actualizar la lista de productos filtrados
      setFilteredProducts(filteredProducts);
    }
  };

  // Contar productos con stock bajo o sin stock
const countLowStockAndOutOfStockProducts = () => {
  const lowStockProducts = filteredProducts.filter(product => {
    return product.designs.some(design => design.stock > 0 && design.stock <= 3);
  });

  const outOfStockProducts = filteredProducts.filter(product => {
    return product.designs.every(design => design.stock <= 0);
  });

  const countLowStock = lowStockProducts.length;
  const countOutOfStock = outOfStockProducts.length;

  return {
    countLowStock,
    countOutOfStock
  };
};

// Luego, puedes llamar a esta función donde necesites mostrar la cantidad de productos con stock bajo y sin stock.
const { countLowStock, countOutOfStock } = countLowStockAndOutOfStockProducts();

  
  

  return (
    <div>
    <AuthenticatedLayout user={auth.user}>
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
            <div className="flex flex-col gap-3 p-7   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-green-600 text-base">
                Stock Total
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {totalStock}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                      {(totalPrice).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
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
                  {countLowStock}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock Bajo
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-600 text-base">
                  {countOutOfStock}
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


        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
          />
        )}
        {showUpdateModal && (
           <UpdateProduct
            productId={selectedProductId}
            productData={updateProduct}
            updateModalSetting={updateProductModalSetting}
            closeUpdateModal={closeUpdateModal}
          /> 
          )}

          {/* Modal de confirmación para eliminar */} 
        {showDeleteModal && (
                    <Transition.Root show={true}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 overflow-y-auto flex items-center justify-center"
                        onClose={() => setShowDeleteModal(false)}
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4"
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-4"
                        >
                        <div className="relative top-20 mx-auto w-full max-w-lg">
                            <div className="bg-white rounded-lg shadow-xl p-6">
                            <div className="text-center">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Confirmar eliminación
                                </Dialog.Title>
                                <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    ¿Estás seguro de que deseas eliminar este item? Esta acción no se puede deshacer.
                                </p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                                onClick={() => deleteProduct(selectedProductId)}
                                >
                                Eliminar
                                </button>
                                <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => setShowDeleteModal(false)}
                                >
                                Cancelar
                                </button>
                            </div>
                            </div>
                        </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>
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
                  Costo
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Valor/Total
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  $ Utilidad
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Margen % 
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
                {filteredProducts.map(product => (
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
                            ${design.cost}
                        </div>
                    ))
                ) : (
                    'No Cost'
                )}
                    </td>
                   
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.designs && product.designs.length > 0 ? (
                    product.designs.map(design => (
                        <div key={design.id}>
                            ${design.price}
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
                            ${design.price * design.stock}
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
                            ${(design.price * design.stock)-(design.cost * design.stock)} 
                        </div>
                    ))
                ) : (
                    'No Utilidad'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-green-600">
                    {product.designs && product.designs.length > 0 ? (
                    product.designs.map(design => (
                        <div key={design.id}>
                            {((design.price * design.stock)/(design.cost * design.stock) * 100)-100}% 
                        </div>
                    ))
                ) : (
                    'No % Utilidad'
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
                    'No Status'
                )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">

                      <button
                        className="text-green-700 cursor-pointer"
                        onClick={() => {
                          
                          setSelectedProductId(product.id);
                          setShowUpdateModal(true);
                          setUpdateProduct(product); 
                        }}
                      >
                        📝{" "}
                      </button>
                    
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => showDeleteConfirmation(product.id)}
                      >
                        🗑
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
