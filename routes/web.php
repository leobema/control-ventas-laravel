<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DbitemspriceController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Inertia\Inertia;

 
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    } else {
        return Inertia::render('Welcome', [
            //'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('products', ProductController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('sales', SaleController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('purchases', PurchaseController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('dbpriceitems', DbitemspriceController::class)
        ->only(['index', 'store', 'update', 'destroy']);

        Route::middleware('auth')->group(function () {
            Route::get('/admin', function () {
                $profileController = new ProfileController();
                $users = $profileController->filterAdminRoles(User::with('roles')->get());
                $roles = $profileController->getAllRoles();
                
                return Inertia::render('Admin', [
                    'users' => $users,
                    'roles' => $roles
                ]);
            })->name('admin.index');
        
            // Utiliza la ruta /admin/users/{userId}/updateRole para la actualización del rol del usuario
            Route::patch('/admin/users/{userId}/updateRole', [ProfileController::class, 'updateRoleUser'])->name('admin.users.updateRole');
        });
        
    //Route::get('/usersadmin')->name('usersadmin.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::delete('/admin/{user}', [ProfileController::class, 'destroyOtherUser'])->name('admin.destroy');
   
    Route::get('/roles', [ProfileController::class, 'getAllRoles'])->name('roles.all');

    Route::patch('/admin/users/{userId}/updateRole', [ProfileController::class, 'updateRoleUser'])->name('admin.users.updateRole');
    Route::patch('/admin/users/{user}/update', [ProfileController::class, 'updateByAdmin'])->name('admin.users.updateByAdmin');


    //Route::patch('/users/{userId}/updateRole', [UserController::class, 'updateRoleUser'])->name('users.updateRole');



    
    //Route::put('/users/{userId}/updateRole', [UserController::class, 'updateRole'])->name('users.updateRole');
   // Route::get('/profile/assign-role', [ProfileController::class, 'indexRole'])->name('profile.assignRole');
   // Route::post('/profile/{user}/assign-role', [ProfileController::class, 'assignRole'])->name('profile.assignRole');
    //Route::post('/profile/{user}/remove-role', [ProfileController::class, 'removeRole'])->name('profile.removeRole');
});

require __DIR__.'/auth.php';