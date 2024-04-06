<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;



class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

     public function rolesAll()
{
    return $this->belongsToMany(Role::class);
}
protected $with = ['roles']; 


    public function dbpriceitems() {
        return $this->hasMany(Dbpriceitem::class);
    }

    public function products() {
        return $this->hasMany(Product::class);
    }

    public function designs() {
        return $this->hasMany(Design::class);
    }

    public function sales() {
        return $this->hasMany(Sale::class);
    }

    public function purchases() {
        return $this->hasMany(Purchase::class);
    }

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
