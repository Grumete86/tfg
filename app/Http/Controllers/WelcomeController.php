<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class WelcomeController extends Controller
{
    //
    public function welcome(Request $request) {
        $users = User::count();
        $workers = User::workers()->get()->count();
        $companies = User::companies()->get()->count();
        if ($users==0){
            return Inertia::render('Welcome', [
                        'canLogin' => Route::has('login'),
                        'canRegister' => Route::has('register'),
                        'laravelVersion' => Application::VERSION,
                        'phpVersion' => PHP_VERSION,
                        'workers' => $workers,
                        'companies' => $companies
                    ]);
                }
        return Inertia::render('Welcome', [
                    'canLogin' => Route::has('login'),
                    'canRegister' => false,
                    'laravelVersion' => Application::VERSION,
                    'phpVersion' => PHP_VERSION,
                    'workers' => $workers,
                    'companies' => $companies
                ]);
    }
    public function seller(Request $request) {
        $users = User::count();
        if ($users==0){
            return Inertia::render('About', [
                        'canLogin' => Route::has('login'),
                        'canRegister' => Route::has('register'),
                        'laravelVersion' => Application::VERSION,
                        'phpVersion' => PHP_VERSION,
                        
                    ]);
                }
        return Inertia::render('About', [
                    'canLogin' => Route::has('login'),
                    'canRegister' => false,
                    'laravelVersion' => Application::VERSION,
                    'phpVersion' => PHP_VERSION,
                    
                ]);
    }
}
