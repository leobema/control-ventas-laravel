import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InputError from '@/Components/InputError'
import { useForm } from '@inertiajs/react'
import { ArrowLongUpIcon } from "@heroicons/react/24/outline"; 
import PrimaryButton from "./PrimaryButton";

const UpdateSale = ({purchaseData, closeUpdateModal}) => {
  const { data, setData, patch, processing, reset, errors } = useForm({
    name: purchaseData.name,
    proveedor: purchaseData.proveedor,
    medida: purchaseData.medida,
    price: purchaseData.price,
    stock: purchaseData.stock,
    date: purchaseData.date,
    description: purchaseData.description,  
  });

const [open, setOpen] = useState(true);
const cancelButtonRef = useRef(null);

const submit = (e) => {
    e.preventDefault()
    patch(route('purchases.update', { purchase: purchaseData.id }), { 
      onSuccess: () => {
        reset(); 
        setOpen(false);
        closeUpdateModal();
      }
    });  
} 

function getCurrentDate() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // Enero es 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }

  return yyyy + '-' + mm + '-' + dd;
}

  return (
    // Modal
    <>
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                       <ArrowLongUpIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      /> 
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        Editar Compra
                      </Dialog.Title>
                      <form onSubmit={submit}>
                        <div className="grid grid-flow-row gap-4 mb-4 mt-4 sm:grid-cols-2">
                          <div className="col-span-2">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Item
                            </label>
                            <input
                              disabled
                              value={data.name}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            <InputError message={errors.name} className='mt-2'/> 
                          </div>
                          <div className="col-span-2">
                            <div className="grid gap-4 my-2 grid-cols-2">
                              <div className="col-span-1">
                                <label
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Proveedor
                                </label>
                                <input
                                  disabled
                                  value={data.proveedor}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                <InputError message={errors.name} className='mt-2'/> 
                              </div>
                              <div className="col-span-1">
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Precio/Medida
                                  </label>
                                  <input
                                      disabled
                                      value={`$${data.price}/${data.medida}`}
                                      className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    <InputError message={errors.price} className='mt-2'/> 
                              </div> 
                              <div className="col-span-1">
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Cant
                                  </label>
                                   <InputError message={errors.stock} className='mt-2'/> 
                                  <input
                                    type="number"
                                    value={data.stock}
                                    onChange={ (e)=> setData('stock', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="0 - 999"
                                  />
                              </div> 
                              <div className="col-span-1">
                                <label 
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Fecha
                                </label>
                                <InputError message={errors.date} className='mt-2'/> 
                                <input
                                  type="date"
                                  value={data.date}
                                  onChange={ (e)=> setData('date', e.target.value)}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder=" - / - / -"
                                  max={getCurrentDate()}
                                />
                              </div>
                            </div>  
                        </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Observación
                            </label>
                             {/* <InputError message={errors.description} className='mt-2'/>  */}
                            <textarea
                              rows="5"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Descripción breve de la venta..."
                              value={data.description}
                              onChange={ (e)=> setData('description', e.target.value)}
                              maxLength={60}
                            >
                              
                            </textarea>
                          </div>
                        </div>
                        <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <PrimaryButton
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            disabled = {processing}
                          >
                            Guardar Cambios
                          </PrimaryButton>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={closeUpdateModal}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}

export default UpdateSale
