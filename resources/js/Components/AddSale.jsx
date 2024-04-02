import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InputError from '@/Components/InputError'
import { useForm } from '@inertiajs/react'
import { PlusIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "./PrimaryButton";

const AddSale = ({products}) => {
  const [selectedProductName, setSelectedProductName] = useState('');
  const [availableDesigns, setAvailableDesigns] = useState([]);
  const [selectedAvailableDesign, setSelectedAvailableDesign] = useState(null);
  const [selectedDesignName, setSelectedDesignName] = useState('');
  const uniqueProductNames = [...new Set(products.map(product => product.product))]; 
  
  const initialFormData = {
    product: selectedProductName,
    design: selectedDesignName,
    client: '',
    stock: 0,
    saleschannel: '',
    methodpay: '',
    price: '',
    date: '',
    description: '',
}

const {data, setData, post, processing, reset, errors} = useForm(initialFormData);

useEffect(() => {
  if (selectedAvailableDesign) {
    setData('design', selectedAvailableDesign ? selectedAvailableDesign.id : '');
  }
}, [selectedAvailableDesign]);

useEffect(() => {
  if (selectedAvailableDesign) {
    setData(prevData => ({
      ...prevData,
      design: selectedAvailableDesign.design,
      stock: selectedAvailableDesign.stock,
    }));
    setSelectedAvailableDesign(selectedAvailableDesign);
  }
}, [selectedAvailableDesign]);


const handleProductChange = (e) => {
  const selectedProductName = e.target.value;
  setSelectedProductName(selectedProductName);
  setData('product', selectedProductName);
  const productsWithSameName = products.filter(product => product.product === selectedProductName);
  const allDesigns = productsWithSameName.flatMap(product => product.designs || []);
  setAvailableDesigns(allDesigns);
};

const handleDesignChange = (e) => {
  const selectedDesignId = parseInt(e.target.value);
  const selectedDesign = availableDesigns.find(design => design.id === selectedDesignId);
  setSelectedAvailableDesign(selectedDesign);
  setSelectedDesignName(selectedDesign ? selectedDesign.design : '');
  setData('design', selectedDesign ? selectedDesign.design : '');
  setData('stock', selectedDesign ? selectedDesign.stock : 0);
  setData('price', selectedDesign ? selectedDesign.price : '');
  console.log('selectedDesign', selectedDesign.stock);
};

const [open, setOpen] = useState(true);
const cancelButtonRef = useRef(null);


const submit = (e) => {
  e.preventDefault();
  console.log('data', data)
    post(route('sales.store'), {onSuccess: ()=> {
      reset(); 
      setOpen(false);
    }
  }); 
};

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
                       <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      /> 
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        Agregar Venta
                      </Dialog.Title>
                      <form onSubmit={submit}>
                        <div className="grid grid-flow-row gap-4 mb-4 mt-4 sm:grid-cols-2">
                          <div className="col-span-2">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Producto
                            </label>
                            <InputError message={errors.product}  className='mt-2'/> 
                            <select
                              value={data.product}
                              //value={selectedProductName}
                              onChange={handleProductChange} 
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                               <option value="">Seleccione un producto</option>
                                {uniqueProductNames.map((productName, index) => (
                                  <option key={index} value={productName}>
                                    {productName}
                                  </option>
                              ))}
                            </select>
                            
                          </div>
                        </div>
                        <div className="grid grid-flow-row gap-4 my-4 grid-cols-2">
                          <div className="col-span-2">
                              <div className="grid gap-4 my-2 grid-cols-2">
                                 <div className="col-span-2">
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Diseño 
                                  </label>
                                   <InputError message={errors.design}  className='mt-2'/> 
                                  <select
                                    value=""
                                    onChange={handleDesignChange}  
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  >
                                    <option value="">Seleccione un diseño</option>
                                    {availableDesigns.map(designItem => (
                                      // Verificar si design es definido antes de renderizar la opción
                                      
                                        <option key={designItem.id} value={designItem.id} >
                                          {designItem.design}
                                        </option>
                                    ))}
                                  </select>
                                  
                                </div> 
                                  <div className="col-span-2">
                                      <input 
                                      readOnly
                                      value={data.design}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      />
                                  </div> 
                                  <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Precio Sugerido
                                  </label>
                                  <InputError message={errors.price} className='mt-2'/>
                                  <input
                                    type="number"
                                    value={data.price}
                                    onChange={ (e)=> setData('price', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="$299"
                                  />
                                </div>  
                                <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Cant
                                  </label>
                                   <InputError message={errors.stock} className='mt-2'/> 
                                   <input
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) => {
                                      const newValue = parseInt(e.target.value);
                                      const maxStock = selectedAvailableDesign ? selectedAvailableDesign.stock : 999; // Valor máximo de stock si no se ha seleccionado ningún diseño
                                      const clampedValue = Math.min(newValue, maxStock); // Limitar el valor máximo al stock disponible
                                      setData('stock', clampedValue);
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="0 - 999"
                                  />
                                </div>
                                <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Canal de Venta 
                                  </label>
                                   <InputError message={errors.saleschannel} className='mt-2'/> 
                                   <select
                                    value={data.saleschannel}
                                    onChange={(e) => setData('saleschannel', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  >
                                     <option value="Mercadolibre">Mercadolibre</option>
                                      <option value="Pág Web">Pág Web</option>
                                      <option value="Facebook">Facebook</option>
                                      <option value="Instagram">Instagram</option>
                                      <option value="Referencia">Referencia</option>
                                      <option value="Cliente Recurrente">Cliente Recurrente</option>
                                  </select>
                                </div>
                                <div>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Método de Pago 
                                  </label>
                                   <InputError message={errors.methodpay} className='mt-2'/> 
                                   <select
                                    value={data.methodpay}
                                    onChange={(e) => setData('methodpay', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  >
                                     <option value="Efectivo">Efectivo</option>
                                      <option value="Transferencia">Transferencia</option>
                                      <option value="MercadoPago">MercadoPago</option>
                                      <option value="MP Venta de ML">MP Venta de ML</option>
                                      <option value="MP Venta Pág Web">MP Venta Pág Web</option>
                                      <option value="Uala Venta Pág Web">Uala Venta Pág Web</option>
                                  </select>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Cliente 
                              </label>
                                <InputError message={errors.client} className='mt-2'/> 
                              <input
                                type="text"
                                value={data.client}
                                onChange={ (e)=> setData('client', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nombre"
                              />
                            </div>
                           
                          <div>
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
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Observación
                            </label>
                            <InputError message={errors.description} className='mt-2'/>
                            <textarea
                              rows="5"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Descripción breve de la venta..."
                              value={data.description}
                              onChange={ (e)=> setData('description', e.target.value)}
                              maxLength={60}
                            >
                              Standard glass, 3.8GHz 8-core 10th-generation
                              Intel Core i7 processor, Turbo Boost up to 5.0GHz,
                              16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with
                              8GB of GDDR6 memory, 256GB SSD storage, Gigabit
                              Ethernet, Magic Mouse 2, Magic Keyboard - US
                            </textarea>
                          </div>
                        </div>
                        <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <PrimaryButton
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            disabled = {processing}
                          >
                            Agregar Venta
                          </PrimaryButton>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => setOpen(false)}
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

export default AddSale
