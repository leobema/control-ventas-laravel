<?php

namespace App\Http\Controllers;

use App\Models\Dbpriceitem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DbitemspriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dbpriceitems = Dbpriceitem::latest()->get();
        return Inertia::render('Dbpriceitems/Index', ['dbpriceitems' => $dbpriceitems]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required',
        ]);

        Dbpriceitem::create($validatedData);
        return redirect()->route('dbpriceitems.index')->with('success', 'Item creado exitosamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dbpriceitem $dbpriceitem)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required',
        ]);

        $dbpriceitem->update($validatedData);
        return redirect()->route('dbpriceitems.index')->with('success', 'Item actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dbpriceitem $dbpriceitem)
    {
        //Dbpriceitem::delete($validatedData);
        $dbpriceitem->delete();
        return redirect()->route('dbpriceitems.index');
        //return redirect()->route('dbpriceitems.index')->with('success', 'Item eliminado exitosamente.');
    }
}