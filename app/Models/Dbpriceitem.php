<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dbpriceitem extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'name', 
        'price',
        'proveedor',
        'medida'
    ];
}
