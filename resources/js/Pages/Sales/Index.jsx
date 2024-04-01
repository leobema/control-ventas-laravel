import React, { useState  } from "react";  
import AddSale from "@/Components/AddSale";
import { usePage } from '@inertiajs/react'
import UpdateSale from "@/Components/UpdateSale"; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, Transition } from "@headlessui/react";
import { router } from '@inertiajs/react'   


const Index = ({sales, products}) => {
  const {auth} = usePage().props
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [selectedsaleDeleteId, setSelectedSaleDeleteId] = useState(null);
  const [updateSale, setUpdateSale] = useState([]);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

 

   // Modal de confirmación para eliminar un ítem
  const showDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setSelectedSaleDeleteId(id); // Set the selected sale ID
  }; 

  const deleteSale = () => {
    router.delete(`/sales/${selectedsaleDeleteId}`)
    setShowDeleteModal(false);
  }; 
  
  


  // Modal for sale ADD
  const addSaleModalSetting = () => {
    setShowSaleModal(prevState => !prevState);
  };

   // Modal for sale UPDATE
  const updateSaleModalSetting = (saleId) => {
    setSelectedSaleId(saleId);
    setShowUpdateModal(true);
    
    // Lógica para mostrar el modal aquí
  }; 



// Handle Search Term
const handleSearchTerm = (e) => {
  const term = e.target.value ? e.target.value.toLowerCase() : ''; // Convertir el término de búsqueda a minúsculas
  setSearchTerm(term); // Establecer el término de búsqueda en el estado

  // Filtrar saleos basados en el término de búsqueda
  const filteredSales = sales.filter(sale =>
    sale.toLowerCase().includes(term)
  );

  // Actualizar la lista de sales filtrados
  setFilteredSales(filteredSales);
};

  return (
    <div>
    <AuthenticatedLayout user={auth.user}>
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
            <span className="font-bold px-4">Control de Ventas</span>
            <div className=" flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col p-10  w-full  md:w-3/12  ">
                <span className="font-semibold text-blue-600 text-base">
                    Top 10 Últimos 30 días 
                </span>
                <span className="font-semibold text-gray-600 text-2xl">
                #1 Remeras
                </span>
                <span className="font-semibold text-gray-600 text-xl">
                #2 Gorras
                </span>
                <span className="font-semibold text-gray-600 text-lg">
                #3 Almohadones
                </span>
                <span className="font-semibold text-gray-600 text-base">
                #4 Parches
                </span>
                <span className="font-semibold text-gray-600 text-xs">
                #5 Otro, #6 Otro, #7 Otro, <br/>
                #8 Otro, #9 Otro, #10 Otro.
                </span>
                
                <span className="font-thin text-gray-400 text-xs">
                    Productos más vendidos del Mes
                </span>
                </div>
                <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
                <span className="font-semibold text-green-600 text-base">
                    Stock Total
                </span>
                <div className="flex gap-8">
                    <div className="flex flex-col">
                    <span className="font-semibold text-gray-600 text-base">
                    {/* {totalStockUp}  */}
                    </span>
                    <span className="font-thin text-gray-400 text-xs">
                        Suma de stock
                    </span>
                    </div>
                    <div className="flex flex-col">
                    <span className="font-semibold text-gray-600 text-base">
                        {/* ${totalPriceUp}  */}
                    </span>
                    <span className="font-thin text-gray-400 text-xs">
                        Valor Total
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
                    {/* {countProductsLowStock}  */}
                    </span>
                    <span className="font-thin text-gray-400 text-xs">
                        Stock Bajo
                    </span>
                    </div>
                    <div className="flex flex-col">
                    <span className="font-semibold text-red-600 text-base">
                    {/* {countProductsNoStock}  */}
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


        {showSaleModal && (
          <AddSale
            addSaleModalSetting={addSaleModalSetting}
            products={products}
          />
        )}
        {showUpdateModal && (
           <UpdateSale
            saleId={selectedSaleId}
            saleData={updateSale}
            updateModalSetting={updateSaleModalSetting}
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
                                onClick={() => deleteSale(selectedSaleId)}
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
                onClick={addSaleModalSetting}
               
                
              >
                Agregar Venta
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
                  Cliente
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Canal de Venta
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Método de Pago
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Und
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total $
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Fecha
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Observación
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {sales.map(sale => (                    
                  <tr key={sale.id}> 
                     <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                     {sale.product}
                     {products.find(product => product.id === sale.product)?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.design}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.client}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.saleschannel}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.methodpay}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${sale.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${sale.price * sale.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => {
                          setSelectedSaleId(sale.id);
                          setShowUpdateModal(true);
                          setUpdateSale(sale);
                        }}
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => showDeleteConfirmation(sale.id)}
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
