<?php

namespace App\Http\Controllers; 

use App\Models\Purchase;
use App\Models\Dbpriceitem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia; 
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


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
        $today = Carbon::today()->format('Y-m-d');
        $validatedData = $request->validate([
            'name' => 'required',
            'proveedor' => 'required',
            'medida' => 'required',
            'price' =>[
                'required',
                Rule::notIn(['-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9']),
            ],
            'stock' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) {
                    if ($value < 0) {
                        $fail('El stock no puede ser un número negativo.');
                    }
                },
            ],
            'date' => [
                'required',
                'date', 
            function ($attribute, $value, $fail) use ($today) {
                if ($value > $today) {
                    $fail('La fecha no puede ser superior a la fecha actual.');
                }
            },
        ],
            'description' => '',
        ]);
    
        $request->user()->purchases()->create($validatedData);
        return redirect()->route('purchases.index');
    }

    /**
     * Update the specified resource in storage. 
     */
    public function update(Request $request, Purchase $purchase)
    {

        $today = Carbon::today()->format('Y-m-d');
        $validatedData = $request->validate([
            'name' => 'required',
            'proveedor' => 'required',
            'medida' => 'required',
            'price' => [
                'required',
                Rule::notIn(['-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9']),
            ],
            'stock' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) {
                    if ($value < 0) {
                        $fail('El stock no puede ser un número negativo.');
                    }
                },
            ],
            'date' => [
                'required',
                'date', 
            function ($attribute, $value, $fail) use ($today) {
                if ($value > $today) {
                    $fail('La fecha no puede ser superior a la fecha actual.');
                }
            },
        ],
        'description' => '',
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
