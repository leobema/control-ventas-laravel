import React, { useState, useEffect } from "react";  
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
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filteredSales, setFilteredSales] = useState([]);
  const [mostUsedPaymentMethod, setMostUsedPaymentMethod] = useState('');
  const [mostUsedSalesChannel, setMostUsedSalesChannel] = useState('');


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
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    // Filtrar ventas basadas en el término de búsqueda
    const filteredSales = sales.filter(sale =>
      sale.product.toLowerCase().includes(searchTerm)
    );
    setFilteredSales(filteredSales);

    // Encontrar el método de pago más utilizado
    const paymentMethods = {};
    filteredSales.forEach(sale => {
      paymentMethods[sale.methodpay] = (paymentMethods[sale.methodpay] || 0) + 1;
    });
    const mostUsedPayment = Object.keys(paymentMethods).length > 0 ? Object.keys(paymentMethods).reduce((a, b) => paymentMethods[a] > paymentMethods[b] ? a : b) : 'sin ventas';
    setMostUsedPaymentMethod(mostUsedPayment);

    // Encontrar el canal de venta más utilizado
    const salesChannels = {};
    filteredSales.forEach(sale => {
      salesChannels[sale.saleschannel] = (salesChannels[sale.saleschannel] || 0) + 1;
    });
    const mostUsedChannel = Object.keys(salesChannels).length > 0 ? Object.keys(salesChannels).reduce((a, b) => salesChannels[a] > salesChannels[b] ? a : b) : 'sin ventas';
    setMostUsedSalesChannel(mostUsedChannel);
  }, [searchTerm, sales]);

  // Agrupar ventas por producto y sumar su stock
  const salesByProduct = sales && sales.length > 0 ? sales.reduce((acc, sale) => {
    const { product, stock } = sale;
    if (acc[product]) {
      acc[product].stock += stock;
    } else {
      acc[product] = { ...sale };
    }
    return acc;
  }, {}) : {};

// Calcular el valor total de cada venta y encontrar la venta con el mayor valor
let maxSaleValue = 0;
let maxSaleProduct = 'sin ventas';

filteredSales.forEach(sale => {
  const saleValue = sale.price * sale.stock;
  if (saleValue > maxSaleValue) {
    maxSaleValue = saleValue;
    maxSaleProduct = sale.product;
  }
});

// Calcular el valor total de cada venta y encontrar la venta con el menor valor
let minSaleValue = filteredSales.length > 0 ? Infinity : 0;
let minSaleProduct = 'sin ventas';

filteredSales.forEach(sale => {
  const saleValue = sale.price * sale.stock;
  if (saleValue < minSaleValue) {
    minSaleValue = saleValue;
    minSaleProduct = sale.product;
  }
});


// Convertir las ventas agrupadas en un array
const salesArray = Object.values(salesByProduct);

// Ordenar las ventas por stock
const sortedSales = salesArray.sort((a, b) => b.stock - a.stock);
   const topSaleWithStock = sortedSales[0];
   const secondTopSaleWithStock = sortedSales[1];
   const thirdTopSaleWithStock = sortedSales[2];
   const fourthTopSaleWithStock = sortedSales[3];
   const fifthTopSaleWithStock = sortedSales[4];
   const sixthTopSaleWithStock = sortedSales[5];
   const seventhTopSaleWithStock = sortedSales[6];
   const eighthTopSaleWithStock = sortedSales[7];
   const ninthTopSaleWithStock = sortedSales[8];
   const tenthTopSaleWithStock = sortedSales[9];

  return (
    <div>
    <AuthenticatedLayout user={auth.user}>
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
            <span className="font-bold px-4">Control de Ventas</span>
            <div className=" flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col p-2  w-full  md:w-3/12  ">
                <span className="font-semibold text-center text-blue-600 text-base">
                    Top 10 Más Vendidos
                </span>
                <span className="font-semibold text-black text-base">
                #1 {topSaleWithStock && topSaleWithStock.product ? (`${topSaleWithStock.product} `) : "Realiza tu primera venta"}
                </span>
                <span className="font-semibold text-gray-800 text-base">
                #2 {secondTopSaleWithStock && secondTopSaleWithStock.product ? (`${secondTopSaleWithStock.product} `) : "Faltan más ventas"}
                </span>
                <span className="font-semibold text-gray-600 text-base">
                #3 {thirdTopSaleWithStock && thirdTopSaleWithStock.product ? (`${thirdTopSaleWithStock.product} `) : "Faltan más ventas"}
                </span>
                <span className="font-semibold text-gray-600 text-sm">
                #4 {fourthTopSaleWithStock && fourthTopSaleWithStock.product ? (`${fourthTopSaleWithStock.product} `) : "Faltan más ventas "}
                </span>
                 <span className="font-semibold text-gray-600 text-xs">
                #5 {fifthTopSaleWithStock && fifthTopSaleWithStock.product ? (`${fifthTopSaleWithStock.product}, `) : "N/a, "}
                #6 {sixthTopSaleWithStock && sixthTopSaleWithStock.product ? (`${sixthTopSaleWithStock.product}, `) : "N/a, "}
                #7 {seventhTopSaleWithStock && seventhTopSaleWithStock.product ? (`${seventhTopSaleWithStock.product}, `) : "N/a, "} <br/>
                #8 {eighthTopSaleWithStock && eighthTopSaleWithStock.product ? (` ${eighthTopSaleWithStock.product}, `) : "N/a, "}  
                #9 {ninthTopSaleWithStock && ninthTopSaleWithStock.product ? (` ${ninthTopSaleWithStock.product}, `) : "N/a, "} 
                #10 {tenthTopSaleWithStock && tenthTopSaleWithStock.product ? (` ${tenthTopSaleWithStock.product}. `) : "N/a."} 
                </span> 
                
                <span className="font-thin text-center text-gray-400 text-xs">
                    Productos más vendidos del Mes
                </span>
                </div>
                <div className="flex flex-col gap-2 items-center  w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
                <span className="font-semibold text-center text-green-600 text-base">
                    Mejor Venta
                </span>
                <span className="text-center font-light text-teal-600 text-xs">
                    🔥
                </span>
                <div className="flex gap-2 ">
                    <div className="flex flex-col">
                    <span className="font-semibold text-gray-600 text-center text-sm">
                     {maxSaleProduct}
                    </span>
                    <span className=" text-center font-thin text-gray-400 text-xs">
                        Ganador
                    </span>
                    </div>
                    <div className="flex flex-col">
                    <span className="text-center font-semibold text-green-600 text-base">
                        ${maxSaleValue} 
                    </span>
                    <span className="text-center font-thin text-gray-400 text-xs">
                        Valor Total
                    </span>
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-2 items-center  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
                <span className="font-semibold text-yellow-600 text-base">
                  Venta más Baja
                </span>
                <span className="text-center font-light text-amber-400 text-xs">
                    ✍
                </span>
                <div className="flex gap-2">
                    <div className="flex flex-col">
                    <span className="font-semibold text-center text-gray-600 text-sm">
                    {minSaleProduct}  
                    </span>
                    <span className="text-center font-thin text-gray-400 text-xs">
                        Revisar
                    </span>
                    </div>
                    <div className="flex flex-col">
                    <span className="text-center font-semibold text-yellow-600 text-base">
                    ${minSaleValue}
                    </span>
                    <span className=" text-center font-thin text-gray-400 text-xs">
                    Valor Total
                    </span>
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-2 items-center w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
                <span className="font-semibold text-red-600 text-base">
                    Más usados
                </span>
                <span className="text-center font-light text-amber-400 text-xs">
                    🛒
                </span>
                <div className="flex gap-2">
                    <div className="flex flex-col">
                    <span className="font-semibold text-center text-gray-600 text-sm">
                        {mostUsedSalesChannel}
                    </span>
                    <span className="font-thin text-center text-gray-400 text-xs">
                        Canal de ventas
                    </span>
                    </div>
                    <div className="flex flex-col">
                    <span className="font-semibold text-center text-gray-600 text-sm">
                        {mostUsedPaymentMethod}
                    </span>
                    <span className="font-thin text-center text-gray-400 text-xs">
                        Método de pago
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
                {filteredSales.map(sale => (                    
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
                        📝{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => showDeleteConfirmation(sale.id)}
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
