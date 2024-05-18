<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::get('/', [WelcomeController::class, 'welcome']);

// function () {
    
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// }

Route::get('/dashboard', function () {
    $user = Auth::user();
    if ($user->is_admin ) {
        return redirect(route('admin.dashboard', absolute: false));
    }else if ($user->is_company ) {
        return redirect(route('company.dashboard', absolute: false));
    }else {
        return redirect(route('worker.dashboard', absolute: false));
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/admin.php';
require __DIR__.'/company.php';
require __DIR__.'/worker.php';
require __DIR__.'/auth.php';
