<?php

namespace App\Http\Controllers;

use App\Models\Dbpriceitem;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DbitemspriceController extends Controller  
{

    public function index(Request $request)
    {
        $dbpriceitems = $request->user()->dbpriceitems()->latest()->get();
        return Inertia::render('Dbpriceitems/Index', ['dbpriceitems' => $dbpriceitems]);

    }

    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'proveedor' => 'required',
            'price' => [
                'required',
                'numeric', // Asegura que el valor sea numérico
                'gt:0', // Asegura que el valor sea mayor que cero
            ],
            'medida' => 'required',
        ]);

        // Registro del mensaje
        info('Datos validados:', $validatedData);
        
        $request->user()->dbpriceitems()->create($validatedData);


        return redirect()->route('dbpriceitems.index')->with('success', 'Item creado exitosamente.');
    }

    public function update(Request $request, Dbpriceitem $dbpriceitem)
    {

        //$this->authorize('update', $dbpriceitem);

        $validatedData = $request->validate([
            'name' => 'required',
            'proveedor' => 'required',
            'price' => [
                'required',
                'numeric', // Asegura que el valor sea numérico
                'gt:0', // Asegura que el valor sea mayor que cero
            ],
            'medida' => 'required',
        ]);

        
        $dbpriceitem->update($validatedData);
        return redirect()->route('dbpriceitems.index')->with('success', 'Item actualizado exitosamente.');
    }

    public function destroy(Dbpriceitem $dbpriceitem)
    {

        $dbpriceitem->delete();
        return redirect()->route('dbpriceitems.index');
    }
}