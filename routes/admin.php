<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\WorkerController;
use App\Http\Controllers\Admin\ShiftController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


//  Route::resource('photos', PhotoController::class)
//  Verb	    URI	                        Action	    Route Name
//  GET	        /photos	                    index	    photos.index
//  GET	        /photos/create	            create	    photos.create
//  POST	    /photos	                    store	    photos.store
//  GET	        /photos/{photo}	            show	    photos.show
//  GET	        /photos/{photo}/edit	    edit	    photos.edit
//  PUT/PATCH	/photos/{photo}	            update	    photos.update
//  DELETE	    /photos/{photo}	            destroy	    photos.destroy


Route::prefix('admin')->name('admin.')->middleware(['auth', AdminMiddleware::class])->group(function() {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
    Route::resource('admins', AdminController::class);
    Route::resource('companies', CompanyController::class);
    Route::resource('workers', WorkerController::class);
    Route::resource('shifts', ShiftController::class);
});
