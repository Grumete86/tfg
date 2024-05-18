<?php


use App\Http\Controllers\Company\WorkerController;
use App\Http\Controllers\Company\WorkerShiftsController;
use App\Http\Controllers\Company\ShiftController;
use App\Http\Controllers\Company\DashboardController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\CompanyMiddleware;
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


Route::prefix('company')->name('company.')->middleware(['auth', CompanyMiddleware::class])->group(function() {
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::post('startShift', [WorkerController::class, 'startShift'])->name('startShift');
    Route::post('endShift', [WorkerController::class, 'endShift'])->name('endShift');
    Route::resource('workers', WorkerController::class);
    Route::resource('shifts', ShiftController::class);
});
