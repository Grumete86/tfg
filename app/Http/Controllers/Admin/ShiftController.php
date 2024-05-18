<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\WorkerUpdateRequest;

use App\Models\User;
use App\Models\Company;
use App\Models\Shift;

class ShiftController extends Controller
{
    //
    public function index()
    {
        $shifts = Shift::with('worker.works_at')->get();
        // dd($shifts);

        // $shifts = Shift::with('worker')->get();
        $companies = Company::all();
        $workers = User::workers()->get();
        // dd($companies);
        // return Inertia::render('Admin/Shifts/Index', ['shifts' => $shifts, 'companies'=> $companies, 'workers'=> $workers]);
        return Inertia::render('Admin/Shifts/Index', ['shifts' => $shifts, 'companies' => $companies, 'workers'=>$workers]);
    }


    public function store(Request $request)
    {
        // dd($request);
        Shift::create([
            'user_id' => $request->user_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time
        ]);
        // Shift::create($request);
    }

    public function show(Shift $shift)
    {
        
        $shift = Shift::with('worker.works_at')->where('id','=',$shift->id)->first();
        
        return Inertia::render('Admin/Shifts/Show', ['shift' => $shift]);
    }
    public function update(Request $request)
    {
        $shift = Shift::find($request->id);
        $shift->update($request->all());
    }
}
