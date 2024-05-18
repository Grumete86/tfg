<?php

namespace App\Http\Controllers\Company;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Company;
use App\Models\User;
use App\Models\Shift;

class WorkerController extends Controller
{
    //
    public function index()
    {
        $company = Auth::user()->company;
        $workers = User::companyWorkers($company->id)->with('shifts')->get();
        
        
        return Inertia::render('Company/Workers/Index', ['workers' => $workers]);
    }

    public function show(User $worker)
    {
        $worker = User::where('id',$worker->id)->with('shifts')->first();
        return Inertia::render('Company/Workers/Show', ['worker' => $worker]);
    }

    public function startShift(Request $request)
    {   
        $worker = $request->input('workerId');
        $worker = User::where('id',$worker)->with('shifts')->first();
        $shift = Shift::create([
            'user_id' => $worker->id,
            'start_time' => now(),
        ]);
        // return Inertia::render('Company/Workers/Show', ['worker' => $worker]);
        return redirect(route('company.workers.show', ['worker' => $worker]));
    }
    
    public function endShift(Request $request)
    {
        $shiftId = $request->input('shiftId'); 
        $shift = Shift::find($shiftId);
        $worker = User::where('id',$shift->user_id)->with('shifts')->first();
        // $worker = User::find($shift->user_id);
        $shift->end_time = now();
        $shift->save();
        // return Inertia::render('Company/Workers/Show', ['worker' => $worker]);
        return redirect(route('company.workers.show', ['worker' => $worker]));
    }
    public function showShift(Shift $shift)
    {
        dd($shift);
    }
    
}
