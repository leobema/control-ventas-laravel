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
        $dbitems = Dbpriceitem::latest()->get();
        return Inertia::render('Dbpriceitems/Index', ['dbpriceitems' => $dbitems]);
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
    public function update(Request $request, Dbpriceitem $dbitem)
    {
        $dbitem->name = $request->name;
        $dbitem->price = $request->price;
         
        $dbitem->save();
        return $dbitem;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dbitems $dbitem)
    {
        $dbitem->delete();
        return redirect(route('dbpriceitems.index'));
    }
}
