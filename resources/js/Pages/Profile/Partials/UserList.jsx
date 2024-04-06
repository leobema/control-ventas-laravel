import React from 'react';

const UserList = () => {
  return (
    <>
      <div className='flex flex-col'>
        <h3 className='text-2xl'>Lista de Usuarios Registrados</h3>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol Actual</th>
              <th>Asignar Nuevo Rol</th>
            </tr>
          </thead>
          <tbody>
          
        <tr>
                <td className='text-center'>prueba</td>
                <td className='text-center'>
                  'Sin rol asignado'
                  
                </td>
                <td className='text-center'>
                  <select>
                    <option value="">Seleccionar Rol</option>
                  </select>
                  <button> ✖ </button>
                </td>
              </tr>

          </tbody>
        </table>
        <div>

        </div>
      </div>
    </>
  );
};

export default UserList;
