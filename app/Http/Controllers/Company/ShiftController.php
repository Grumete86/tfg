<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\User;

class ShiftController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Company/Shifts/Index');
    }

    public function show(Shift $shift)
    {
   
        $shift = Shift::find($shift->id);
        $worker = User::where('id',$shift->user_id)->with('shifts')->first();
        return Inertia::render('Company/Workers/ShowShift', ['shift' => $shift, 'worker'=> $worker]);
    }

    public function update(Request $request)
    {
        $worker = User::where('id',$request->user_id)->with('shifts')->first();
        $shift = Shift::find($request->id);
        $shift->update($request->all());

        return redirect(route('company.workers.show', ['worker'=>$worker]));
    }
    public function destroy(Shift $shift)
    {
        $worker = User::where('id',$shift->user_id)->with('shifts')->first();
        $shift = Shift::find($shift->id);
        $shift->delete();

        return redirect(route('company.workers.show', ['worker'=>$worker]));
    }


}
