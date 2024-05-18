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

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        $user = Auth::user();
        $worker = User::with('shifts')->where('id', $user->id)->first();

        return Inertia::render('Worker/Dashboard', ['worker' => $worker]);
    }
}
