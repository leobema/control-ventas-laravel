import React, { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react'
import AddPriceMp from "@/Components/AddPriceMp";
import { router } from '@inertiajs/react'
import UpdatePriceMp from "@/Components/UpdatePriceMp";
import { Dialog, Transition } from "@headlessui/react";


const Index = ({dbpriceitems}) => {
  const {auth} = usePage().props
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [selectedProductDeleteId, setSelectedProductDeleteId] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [updatePrice, setUpdatePrice] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

     // Modal de confirmación para eliminar un ítem
     const showDeleteConfirmation = (id) => {
      setShowDeleteModal(true);
      setSelectedProductDeleteId(id); // Set the selected product ID
    }; 

   const deletePrice = () => {
    router.delete(`/dbpriceitems/${selectedProductDeleteId}`)
    console.log('id', selectedProductDeleteId)
  setShowDeleteModal(false);
};  

   // Modal for Product UPDATE
    const updateProductModalSetting = (id) => {
      setSelectedPriceId(id);
      setShowUpdateModal(true);
    } 


 /*  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    //filterPrices(event.target.value);
  }; */

     // Modal for Item ADD
    const addItemModalSetting = () => {
      setShowItemModal(prevState => !prevState);
    };  

    function formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', options);
  }

  return (

  <AuthenticatedLayout user={auth.user}>
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">

          {showItemModal && (
          <AddPriceMp
          addItemModalSetting={addItemModalSetting}
          />
        )}
         {showUpdateModal && (
           <UpdatePriceMp
            priceId={selectedPriceId}
            updatePricetData={updatePrice}
            updateModalSetting={updateProductModalSetting}
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
                                onClick={() => deletePrice(selectedPriceId)}
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
              <span className="font-bold">Items</span>
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
      {/*           <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="buscar item"
                  value=""
                  //onChange={}
                /> */}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addItemModalSetting}
                
              >
                Agregar Item
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Item
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Precio
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Última Actualización
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acción
                </th>
              </tr>
            </thead>

             <tbody className="divide-y divide-gray-200">    
              {dbpriceitems.map(dbprice => (   
                  <tr key={dbprice.id}> 
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                     {dbprice.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${dbprice.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {formatDate(dbprice.updated_at)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <button
                        className="text-green-700 cursor-pointer"
                        
                         onClick={() => {
                          setSelectedPriceId(dbprice.id);
                          setShowUpdateModal(true);
                          setUpdatePrice(dbprice); 
                        }} 
                      >
                        Editar{" "}
                      </button>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => {
                          showDeleteConfirmation(dbprice.id)
                          //router.delete(`/dbpriceitems/${dbprice.id}`)
                          //console.log('dbprice.id', dbprice.id)
                        }}
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
  )
}

export default Index
