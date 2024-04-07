import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react'
import { UserIcon, ArrowLongUpIcon } from "@heroicons/react/24/outline";
import { useForm } from '@inertiajs/react'; 
import InputError from '@/Components/InputError';
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import AddUserByAdmin from "@/Components/AddUserByAdmin";

const Admin = ({ users, roles}) => {

    const {auth} = usePage().props
    const [showChangeRolModal, setShowChangeRolModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [updateUser, setUpdateUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedsaleDeleteId, setSelectedSaleDeleteId] = useState(null);

    const { data, setData, patch, processing, reset, errors } = useForm({
        name: '',
        email: '',
    });

    // Modal de confirmación para eliminar un ítem
  const showDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setSelectedSaleDeleteId(id); // Set the selected sale ID
  }; 

    // Modal for sale User
    const addUserModalSetting = () => {
        setShowUserModal(prevState => !prevState);
      };


  const deleteUser = (id) => {
    router.delete(`/admin/${id}`)
    setShowDeleteModal(false); 
};

    useEffect(() => {
        if (updateUser) {
            setData({
                name: updateUser.name || '',
                email: updateUser.email || '',
            });
        }
    }, [updateUser]);

    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);

    const update = (e) => {
        e.preventDefault();
        console.log('prueba', updateUser)
        console.log('prueba con ID', updateUser.id)
         patch(route('admin.users.updateByAdmin', { user: updateUser.id }), {
            onSuccess: () => {
                reset();
                setOpen(false);
                setUpdateUser(null);
            },
        });  
    };


    const updateRol = (e) => {
        e.preventDefault();    
        patch(route('admin.users.updateRole', { userId: selectedUserId,  role_id: selectedRoleId }), {
            onSuccess: () => {
                setShowChangeRolModal(false);
            }
        });
        
    };
    
    
    return (
        <>
         {showUserModal && (
          <AddUserByAdmin
          addUserModalSetting={addUserModalSetting}
            users={users}
            roles={roles}
          />
        )}


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
                                onClick={() => deleteUser(selectedsaleDeleteId)}
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

        {showEditModal && (
    <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
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
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="flex min-h-screen items-end justify-center sm:items-center sm:pt-32 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ArrowLongUpIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Editar Usuario
                                    </Dialog.Title>
                                    <form onSubmit={update}>
                                        <div className="mt-5">
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div className="col-span-2">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                        Nombre
                                                    </label>
                                                    <InputError message={errors.name} className='mt-2'/> 
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className="mt-1 p-2 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                                                        value={data.name}
                                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <InputError message={errors.email} className='mt-2'/> 
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="mt-1 p-2 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                                                        value={data.email}
                                                        onChange={(e) => setData({ ...data,  email: e.target.value })}
                                                    />
                                                </div>
                                                {/* Agrega los campos adicionales según sea necesario */}
                                            </div>
                                        </div>
                                        <div className="px-4 mt-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <PrimaryButton
                                                type="submit"
                                                disabled={processing}
                                                className=" inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                            >
                                                Guardar Cambios
                                            </PrimaryButton>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
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
        </Dialog>
    </Transition.Root>
)}

{showChangeRolModal && (
    <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
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
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="flex min-h-screen items-end justify-center sm:items-center sm:pt-32 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <UserIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Cambiar Rol
                                    </Dialog.Title>
                                    <form onSubmit={updateRol}>
                                        <div className="mt-5">
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                 <div className="col-span-2">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className=" text-center mt-1 p-2 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                                                        value={updateUser ? updateUser.name : ''}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="email" className="text-center block text-sm font-medium text-gray-700">
                                                        Asignar Rol
                                                    </label>
                                                    <select
                                                    value={selectedRoleId}
                                                    onChange={(e) => setSelectedRoleId(e.target.value)}
                                                    className="text-center block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="">Seleccionar Rol</option>
                                                    {roles.original.filter(role => role.name).map(role => (
                                                        <option key={role.id} value={role.id}>{role.name}</option>
                                                    ))}
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 mt-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <PrimaryButton
                                                type="submit"
                                                disabled={processing}
                                                className=" inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                            >
                                                Guardar cambio de rol
                                            </PrimaryButton>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setShowChangeRolModal(false)}
                                                ref={cancelButtonRef}
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
        </Dialog>
    </Transition.Root>
)}




    <AuthenticatedLayout user={auth.user}>
        <div className="mt-4 col-span-12 lg:col-span-10  flex justify-center">
            <div className=" flex flex-col gap-5 w-11/12">
                 <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
                    <div className="flex flex-col pt-5 pb-3 px-3">
                        <div className="bg-white rounded p-3">
                            <div className="flex justify-between pt-5 pb-3 px-3">
                                <div className="flex gap-4 justify-center items-center ">
                                    <span className="font-bold">Lista de Usuarios</span>
                                    <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                                        <svg 
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" 
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                                         onClick={addUserModalSetting}
                                    >
                                        Agregar Usuario
                                    </button>
                                </div>
                            </div>
                            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Nombre</th>
                                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Email</th>
                                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Actions</th>
                                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Rol Actual</th>
                                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Cambiar Rol</th> 
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-900">{user.name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-900">{user.email}</td>
                                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
                                                <button
                                                    className="text-green-700 cursor-pointer"
                                                    
                                                    onClick={() => {
                                                    //setSelectedPriceId(dbprice.id);
                                                    setShowEditModal(true);
                                                    setUpdateUser(user); 
                                                    }} 
                                                >
                                                    📝 {" "} 
                                                </button>
                                                 <span
                                                    className="text-red-600 px-2 cursor-pointer"
                                                    onClick={() => {
                                                    showDeleteConfirmation(user.id)
                                                    }}
                                                >
                                                🗑
                                                </span> 
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-900">
                                                {user.roles && user.roles.length > 0 ? (
                                                    user.roles.map(role => (
                                                        <span key={role.id}>{role.name}</span>
                                                    ))
                                                ) : (
                                                    <span>sin rol ⚠</span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-900">
                                            <button
                                                    className="text-green-700 cursor-pointer"
                                                    
                                                    onClick={() => {
                                                    setShowChangeRolModal(true);
                                                    setUpdateUser(user); // Establecer el usuario seleccionado
                                                    setSelectedRoleId(user.roles && user.roles.length > 0 ? user.roles[0].id : '');
                                                    setSelectedUserId(user.id);

                                                }} 
                                                >
                                                     💱 {" "} 
                                                </button>
                                             
                                            </td>
                                        </tr>  
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
        </>
    )
}

export default Admin
