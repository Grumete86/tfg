<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\User;
use App\Models\Shift;


class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        $company = Company::where('user_id', Auth::user()->id)->with('manager')->first();
        $workers = User::companyWorkers($company->id)->with('shifts')->get();
        // dd($workers);
        return Inertia::render('Company/Dashboard', ['company' => $company, 'workers' => $workers]);
    }
}
