<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\CompanyUpdateRequest;
use App\Models\User;
use App\Models\Company;

class CompanyController extends Controller
{
    //
    public function index()
    {
        $companies = Company::with('manager')->get();
        
        // dd($companies);
        // $companyUsers = User::companies()->get();
        return Inertia::render('Admin/Companies/Index', ['companies' => $companies]);
    }
    public function show(Company $company)
    {   
        $manager = $company->manager;
        $workers = User::companyWorkers($company->id)->get();
        return Inertia::render('Admin/Companies/Show', ['company' => $company,'manager'=>$manager, 'workers' => $workers]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'company_name' =>'required|string|max:255|unique:companies,name',
            'company_cif' =>'required|string|max:9|unique:companies,cif',
            'company_phone' =>'required|string|max:255',
            'company_address' =>'required|string|max:255',
            'company_city' =>'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_company' => true,
        ]);
        $company = Company::create([
            'name' => $request->company_name,
            'cif' => $request->company_cif,
            'phone' => $request->company_phone,
            'address' => $request->company_address,
            'city' => $request->company_city,
            'user_id' => $user->id,
        ]);
        

        // return redirect(route('admins.index', absolute: false));
    }
    public function update(CompanyUpdateRequest $request)
    {
        
        
        $company = Company::find($request->id);
        
        $user = User::find($company->user_id);
        
        $formData= $request->validated();
        $userData = [];
        $userData['name']=$formData['manager_name'];
        unset($formData['manager_name']);
        $userData['email']=$formData['email'];
        unset($formData['email']);
        $companyData = $formData;
        $user->fill($userData);
        $company->fill($companyData);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();
        $company->save();
        return redirect(route('admin.companies.index', absolute: false));
    }

    public function destroy(Company $company)
    {

        $company->delete();

        // return redirect(route('admins.index', absolute: false));
    }
}

