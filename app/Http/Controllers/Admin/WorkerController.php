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

class WorkerController extends Controller
{
    //
    public function index()
    {
        $companies = Company::all();
        $workers = User::workers()->with('works_at')->get();
        return Inertia::render('Admin/Workers/Index', ['workers' => $workers, 'companies' => $companies]);
    }

    public function store(WorkerUpdateRequest $request)
    {
        
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'dni' => $request->dni,
            'contracted_by' => $request->contracted_by,
            'is_worker' => true,
        ]);
    }

    public function show(User $worker)
    {
        $worker = User::workers()->with('works_at','shifts')->where('id','=',$worker->id)->get()->first();
        // dd($worker);
        // $company = Company::find($worker->contracted_by);
        // $shifts = Shift::byWorker($worker->id)->get();
        $companies = Company::all();
        // $worker = User::workers()->with('works_at')->where('id', '=', $worker->id)->first();

        // return Inertia::render('Admin/Workers/Show', ['company' => $company,'worker'=>$worker, 'shifts' => $shifts, 'companies'=>$companies]);
        return Inertia::render('Admin/Workers/Show', ['worker'=>$worker, 'companies'=>$companies]);
    }

    public function update(WorkerUpdateRequest $request){
        $user = User::find($request->id);
        $user->fill($request->validated());
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();
    }

    public function destroy(User $worker)
    {
        $worker->delete();
    }
}
