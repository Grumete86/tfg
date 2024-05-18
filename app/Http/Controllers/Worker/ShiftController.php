<?php

namespace App\Http\Controllers\Worker;


use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Company;
use App\Models\User;
use App\Models\Shift;

class ShiftController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $worker = User::with('shifts')->where('id', $user->id)->first();

        return Inertia::render('Worker/Index', ['worker' => $worker]);
    }
    public function show(Shift $shift)
    {
        $shift = Shift::find($shift->id);
        $worker = User::where('id',$shift->user_id)->with('shifts')->first();
        return Inertia::render('Worker/Show', ['shift' => $shift, 'worker'=> $worker]);
    }
    public function startShift(Request $request)
    {   $dashboard = $request->input('dashboard');

        $worker = $request->input('workerId');
        $worker = User::where('id',$worker)->with('shifts')->first();
        $shift = Shift::create([
            'user_id' => $worker->id,
            'start_time' => now(),
        ]);
        // return Inertia::render('Company/Workers/Show', ['worker' => $worker]);
        if ($dashboard == 1){
            return redirect(route('worker.dashboard', ['worker' => $worker]));
        }
        return redirect(route('worker.shifts.index', ['worker' => $worker]));
    }
    
    public function endShift(Request $request)
    {
        $dashboard = $request->input('dashboard');
        
        $shiftId = $request->input('shiftId'); 
        $shift = Shift::find($shiftId);
        $worker = User::where('id',$shift->user_id)->with('shifts')->first();
        // $worker = User::find($shift->user_id);
        $shift->end_time = now();
        $shift->save();
        // return Inertia::render('Company/Workers/Show', ['worker' => $worker]);
        if ($dashboard == 1){
            return redirect(route('worker.dashboard', ['worker' => $worker]));
        }
        return redirect(route('worker.shifts.index', ['worker' => $worker]));
    }
    public function update(Request $request)
    {
        $worker = User::where('id',$request->user_id)->with('shifts')->first();
        $shift = Shift::find($request->id);
        $shift->update($request->all());

        return redirect(route('worker.shifts.index', ['worker'=>$worker]));
    }
    public function destroy(Shift $shift)
    {
        $worker = User::where('id',$shift->user_id)->with('shifts')->first();
        $shift = Shift::find($shift->id);
        $shift->delete();

        return redirect(route('worker.shifts.index', ['worker'=>$worker]));
    }
}
