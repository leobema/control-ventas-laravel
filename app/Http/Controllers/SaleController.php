<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia; 

class SaleController extends Controller
{

    public function index()  
    {
        $sales = Sale::latest()->get();
        $products = Product::with('designs')->latest()->get();
        return Inertia::render('Sales/Index', ['sales' => $sales, 'products' => $products]);
    }



    public function store(Request $request)
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

    Sale::create($validatedData);

    return redirect()->route('sales.index')->with('success', 'Venta creada exitosamente.');
}


    public function update(Request $request, Sale $sale)
    {
        $sale->product = $request->product;
        $sale->design = $request->design;
        $sale->client = $request->client;
        $sale->stock = $request->stock;
        $sale->price = $request->price;
        $sale->saleschannel = $request->saleschannel;
        $sale->methodpay = $request->methodpay;
        $sale->date = $request->date;
        $sale->description = $request->description;
        
        $sale->save();
        return $sale;
    }

    public function destroy(Sale $sale)
    {
        $sale->delete();
        return redirect(route('sales.index'));
    }
}
