<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserByAdminController extends Controller
{
 /**
     * Display the user creation form.
     */
    public function index(): Response
    {
        //return Inertia::render('Admin/Users/Create');
        return Inertia::render('Admin');

    }

/*     public function menuLayout()
{
    $isAdmin = Auth::user()->hasRole('admin');
    return Inertia::render('Dashboard', ['isAdmin' => $isAdmin]);
} */

    /**
     * Handle an incoming user creation request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            // Puedes agregar más validaciones aquí según tus requisitos
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // Puedes asignar roles o cualquier otro dato necesario aquí
        ]);

        // Asignar el rol de usuario al nuevo usuario
        $user->assignRole('usuario');

        // Puedes agregar lógica adicional aquí, como asignar roles específicos al usuario creado

        return redirect()->back()->with('success', 'Usuario creado exitosamente.');
    }

}
