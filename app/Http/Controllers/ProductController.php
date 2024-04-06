<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Design;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{

    public function index(Request $request)
    {

        // Obtener el ID del usuario autenticado actualmente
        $userId = Auth::id();

        // Obtener los productos asociados al usuario autenticado
        $products = $request->user()->products()->with('designs')->latest()->get();
        
        // Retornar la vista con los productos y sus relaciones
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        // Validar datos del producto
        $validatedProduct = $request->validate([
            'product' => 'required|string|max:60',
            // Agrega aquí las validaciones necesarias para los otros campos de Product
        ]);
    
        // Crear el nuevo producto asociado al usuario autenticado
        $product = $request->user()->products()->create($validatedProduct);
    
        // Verificar si se proporciona un diseño en la solicitud
        if ($request->has('design')) {
            $designData = $request->validate([
                'design' => 'required|string', // Agrega aquí las validaciones necesarias para los otros campos de Design
                'stock' => 'required|integer',
                'price' => 'required|numeric', // Cambiado a 'numeric' para aceptar números decimales
                'description' => 'required|string',
            ]);
    
            // Crear el nuevo diseño y asociarlo al producto
            $design = new Design();
            $design->fill($designData);
            $design->user_id = $request->user()->id; // Asignar el ID del usuario autenticado al diseño
            $product->designs()->save($design);
        }
    
        // Redireccionar a la página de índice de productos
        return redirect()->route('products.index');
    }
    

    
    
    


    public function update(Request $request, Product $product)
    {
        // Validar datos
        $validated = $request->validate([
            'product' => 'required|string|max:60',
            // Agrega aquí las validaciones necesarias para los otros campos de Product
        ]);
    
        // Actualizar el producto
        $product->update($validated); 
    
        // Verificar si se proporciona un diseño en la solicitud
        if ($request->has('design')) {
            $designData = $request->validate([
                'design' => 'required|string', // Agrega aquí las validaciones necesarias para los otros campos de Design
                'stock' => 'required|integer',
                'price' => 'required|integer',
                'description' => 'required|string',
            ]);
    
            // Obtener el diseño asociado al producto o crear uno nuevo si no existe
            $design = $product->designs->first();
    
            // Si no hay un diseño existente, creamos uno nuevo
            if (!$design) {
                $design = new Design();
                // Asignar el ID del producto al diseño
                $design->product_id = $product->id;
            }
    
            // Actualizar los datos del diseño
            $design->fill($designData);
            $design->save();
        }
    
        // Redireccionar a alguna vista o acción deseada
        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect(route('products.index'));
    }


    
}
