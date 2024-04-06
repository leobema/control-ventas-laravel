<?php

namespace App\Http\Controllers; 

use App\Models\Purchase;
use App\Models\Dbpriceitem;
use Illuminate\Http\Request;
use Inertia\Inertia; 
use Illuminate\Support\Facades\Auth;


class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Obtener el ID del usuario autenticado actualmente
        $userId = Auth::id();
    
        $purchases = Purchase::where('user_id', $userId)->latest()->get();
        $dbpriceitems = Dbpriceitem::where('user_id', $userId)->latest()->get();
    
        // Retornar la vista con las compras y elementos de precio
        return Inertia::render('Purchases/Index', [
            'purchases' => $purchases,
            'dbpriceitems' => $dbpriceitems
        ]);
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
    
        $request->user()->purchases()->create($validatedData);
        return redirect()->route('purchases.index');
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
        return redirect(route('purchases.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        $purchase->delete();
        return redirect()->route('purchases.index');
    }
}
