<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Dbpriceitem;
use Illuminate\Http\Request;
use Inertia\Inertia; 

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $purchases = Purchase::latest()->get();
        $dbpriceitems = Dbpriceitem::latest()->get();
        return Inertia::render('Purchases/Index', ['purchases' => $purchases, 'dbpriceitems' => $dbpriceitems]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'date' => 'required',
            'description' => 'required'
        ]);
    
        Purchase::create($validatedData);
        return redirect()->route('purchases.index')->with('success', 'Compra creada exitosamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Purchase $purchase)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'date' => 'required',
            'description' => 'required'
        ]);
    
        $purchase->update($validatedData);
        return $purchase;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        $purchase->delete();
        return redirect(route('purchases.index'));
    }
}
