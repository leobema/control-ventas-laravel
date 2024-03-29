<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Design;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::with('designs')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        // Validar datos
        $validated = $request->validate([
            'product' => 'required|string|max:60',
            // Agrega aquí las validaciones necesarias para los otros campos de Product
        ]);
    
        // Crear el nuevo producto
        $product = new Product();
        $product->product = $validated['product'];
        $product->save();
    
        // Verificar si se proporciona un diseño en la solicitud
        if ($request->has('design')) {
            $designData = $request->validate([
                'design' => 'required|string', // Agrega aquí las validaciones necesarias para los otros campos de Design
                'stock' => 'required|integer',
                'price' => 'required|integer',
                'description' => 'required|string',
            ]);
    
            // Crear el nuevo diseño y asociarlo al producto
            $design = new Design();
            $design->design = $designData['design'];
            $design->stock = $designData['stock'];
            $design->description = $designData['description'];
            $design->price = $designData['price'];
            // Completa aquí el resto de asignaciones de atributos para el modelo Design
            $product->designs()->save($design);
        }
    
        // Redireccionar a alguna vista o acción deseada
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
