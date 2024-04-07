<?php

namespace Database\Seeders;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /*
        Admin => All
        Colaborador =>
        Usuario =>
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $colaborador = Role::create(['name' => 'colaborador']);
        $usuario = Role::create(['name' => 'usuario']);

        Permission::create(['name' => 'dashboard'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'products.index'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'products.store'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'products.update'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'products.destroy'])->syncRoles([$admin, $colaborador, $usuario]);

        Permission::create(['name' => 'sales.index'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'sales.store'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'sales.update'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'sales.destroy'])->syncRoles([$admin, $colaborador, $usuario]);

        Permission::create(['name' => 'purchases.index'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'purchases.store'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'purchases.update'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'purchases.destroy'])->syncRoles([$admin, $colaborador, $usuario]);

        Permission::create(['name' => 'dbpriceitems.index'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'dbpriceitems.store'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'dbpriceitems.update'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'dbpriceitems.destroy'])->syncRoles([$admin, $colaborador, $usuario]);

        Permission::create(['name' => 'profile.edit'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'profile.update'])->syncRoles([$admin, $colaborador, $usuario]);
        Permission::create(['name' => 'profile.destroy'])->syncRoles([$admin, $colaborador, $usuario]);

        Permission::create(['name' => 'admin.destroy'])->assignRole([$admin]);
        Permission::create(['name' => 'admin.users.updateRole'])->assignRole([$admin]);
        Permission::create(['name' => 'admin.users.updateByAdmin'])->assignRole([$admin]);

        Permission::create(['name' => 'admin.users.index'])->assignRole([$admin]);
        Permission::create(['name' => 'admin.users.create'])->assignRole([$admin]);
        Permission::create(['name' => 'admin.users.store'])->assignRole([$admin]);
        Permission::create(['name' => 'admin.index'])->assignRole([$admin]);













    }
}
