<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Product;
use App\Models\Design;
use Illuminate\Http\Request;
use Inertia\Inertia; 
use Illuminate\Support\Facades\Auth;


class SaleController extends Controller
{

    public function index(Request $request)  
    {
        // Obtener el ID del usuario autenticado actualmente
        $userId = Auth::id();
    
        // Obtener todas las ventas y todos los productos con sus diseños
        $sales = Sale::where('user_id', $userId)->latest()->get();
        $products = Product::where('user_id', $userId)->with('designs')->latest()->get();
        
        // Retornar la vista con las ventas, productos y sus relaciones
        return Inertia::render('Sales/Index', [
            'sales' => $sales, 
            'products' => $products
        ]);
    }
    
    public function store(Request $request)
{
    // Validar datos de la venta
    $validatedData = $request->validate([
        'product' => 'required',
        'design' => 'required',
        'client' => 'required',
        'stock' => 'required|integer',
        'saleschannel' => 'required',
        'methodpay' => 'required',
        'price' => 'required|numeric',
        'date' => 'required|date',
        'description' => 'required',
    ]);

    // Crear la venta asociada al usuario autenticado
    $sale = $request->user()->sales()->create($validatedData);

    // Buscar el diseño por nombre
    $design = Design::where('design', $request->design)->first();

    // Verificar si se encontró el diseño
    if ($design) {
        // Restar la cantidad vendida del stock del diseño
        $design->stock -= $request->stock;
        $design->save();
    }

    // Redireccionar a la página de ventas con un mensaje de éxito
    return redirect()->route('sales.index');
}

    


public function update(Request $request, Sale $sale)
{
    $validatedData = $request->validate([
        'product' => 'required',
        'design' => 'required',
        'client' => 'required',
        'stock' => 'required|integer',
        'saleschannel' => 'required',
        'methodpay' => 'required',
        'price' => 'required|numeric',
        'date' => 'required|date',
        'description' => 'required',
    ]);

    $sale->update($validatedData);
    return redirect()->route('sales.index')->with('success', 'Venta actualizada exitosamente.');
}


    public function destroy(Sale $sale)
    {
        $sale->delete();
        return redirect(route('sales.index'));
    }
}
