<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
//use App\Http\Requests\UserUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use Spatie\Permission\Models\Role;


use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $users = User::with('roles')->get();
    
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'users' => $users,
        ]);
    }

        public function adminIndex()
    {
        $profileController = new ProfileController();
        $users = $profileController->filterAdminRoles(User::with('roles')->get());
        $roles = $profileController->getAllRoles();

        return Inertia::render('Admin', [
            'users' => $users,
            'roles' => $roles
        ]);
    }


    public function filterAdminRoles($users)
        {
            return $users->map(function($user) {
                $user->filteredRoles = $user->roles->reject(function($role) {
                    return $role->name === 'admin';
                });
                return $user;
            });
        }

        public function getAllRoles()
        {
            $roles = Role::all()->except('admin');
            return response()->json($roles);
        }
    
        public function updateRoleUser(Request $request, $userId): RedirectResponse
        {
            // Validar los datos recibidos si es necesario
            if (!Auth::user()->hasRole('admin')) {
                abort(403, 'No tienes permisos para realizar esta acción.');
            }
        
            // Obtener el usuario
            $user = User::findOrFail($userId);

        
            // Obtener el ID del nuevo rol desde la solicitud
            $newRoleId = $request->role_id;
        
            // Verificar si el valor de role_id se recibió correctamente
            if ($newRoleId) {
        
                // Asignar el nuevo rol al usuario
                $user->roles()->sync([$newRoleId]); // Aquí pasas el ID del nuevo rol
            } else {
                // Si no se recibe correctamente el valor de role_id, registra un mensaje de error
                \Log::error('No se recibió el valor de role_id correctamente.');
            }
        
            // Redireccionar o realizar cualquier otra acción necesaria
            return redirect()->back()->with('status', 'Rol actualizado exitosamente');
        }
        

        
        

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateByAdmin(ProfileUpdateRequest $request, User $user): RedirectResponse
{
    // Validar los datos recibidos si es necesario
     // Verificar que el usuario autenticado tenga permisos de administrador
     if (!Auth::user()->hasRole('admin')) {
        abort(403, 'No tienes permisos para realizar esta acción.');
    }

    // Llenar el modelo de usuario con los datos validados
    $user->fill($request->validated());

    // Si el email ha sido modificado, establecer email_verified_at en null para que el usuario tenga que verificar su correo nuevamente
    if ($user->isDirty('email')) {
        $user->email_verified_at = null;
    }

    // Guardar los cambios en el usuario
    $user->save();

    // Redirigir a donde sea necesario, por ejemplo, a la página de edición de perfil
    return redirect()->back()->with('status', 'Usuario actualizado exitosamente');
}

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
    
        $user = $request->user();
    
        Auth::logout();
    
        $user->delete();
    
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    
        return Redirect::to('/');
    }
    

/**
     * Delete another user's account.
     */
    public function destroyOtherUser(Request $request, User $user): RedirectResponse
    {
        // Verificar que el usuario autenticado tenga permisos de administrador
        if (!Auth::user()->hasRole('admin')) {
            abort(403, 'No tienes permisos para realizar esta acción.');
        }
        
        // Validar que el usuario que se va a eliminar no sea el usuario autenticado
        if ($user->id === Auth::id()) {
            abort(403, 'No puedes eliminar tu propia cuenta.');
        }
    
        // Validar que el usuario que se va a eliminar tenga un rol diferente a 'admin'
        if ($user->hasRole('admin')) {
            abort(403, 'No puedes eliminar la cuenta de un administrador.');
        }
    
        // Eliminar el usuario
        $user->delete();
    
        return redirect()->back()->with('status', 'El usuario ha sido eliminado exitosamente.');
    }

}
