<?php


use App\Http\Controllers\Worker\ShiftController;
use App\Http\Controllers\Worker\DashboardController;
use App\Http\Middleware\WorkerMiddleware;
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


Route::prefix('worker')->name('worker.')->middleware(['auth', WorkerMiddleware::class])->group(function() {
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::post('startShift', [ShiftController::class, 'startShift'])->name('startShift');
    Route::post('endShift', [ShiftController::class, 'endShift'])->name('endShift');
    Route::resource('shifts', ShiftController::class);
});
