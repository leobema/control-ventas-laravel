<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DbitemspriceController;
use App\Http\Controllers\UserByAdminController;
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

    Route::middleware(['admin'])->group(function () {
    Route::get('/admin', [ProfileController::class, 'adminIndex'])->name('admin.index');
        
    });        
        
    Route::prefix('admin','role:admin')->group(function () {

    Route::get('users', [UserByAdminController::class, 'index'])->name('admin.users.index');
    Route::get('users/create', [UserByAdminController::class, 'create'])->name('admin.users.create');
    Route::post('users/store', [UserByAdminController::class, 'store'])->name('admin.users.store');
    
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::middleware(['auth', 'admin', 'role:admin'])->group(function () {
    Route::delete('/admin/{user}', [ProfileController::class, 'destroyOtherUser'])->name('admin.destroy');
    Route::get('/roles', [ProfileController::class, 'getAllRoles'])->name('roles.all');
    Route::patch('/admin/users/{userId}/updateRole', [ProfileController::class, 'updateRoleUser'])->name('admin.users.updateRole');
    Route::patch('/admin/users/{user}/update', [ProfileController::class, 'updateByAdmin'])->name('admin.users.updateByAdmin');
    });
    

});

require __DIR__.'/auth.php';