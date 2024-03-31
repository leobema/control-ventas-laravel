<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'product', 
        'design', 
        'client', 
        'description', 
        'methodpay', 
        'saleschannel', 
        'price', 
        'stock', 
        'date'
    ];

/*     // Definir la relación "sales" correctamente
    public function saleItems()
{
    return $this->hasMany(SaleItem::class, 'sale_id');
}  */
}
