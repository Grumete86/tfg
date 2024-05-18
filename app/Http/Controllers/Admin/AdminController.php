<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;

class AdminController extends Controller
{
    //
    public function index()
    {
        $admins = User::admins()->get();
        return Inertia::render('Admin/Admins/Index', ['admins' => $admins]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => true,
        ]);

        // return redirect(route('admins.index', absolute: false));
    }
    public function update(UserUpdateRequest $request)
    {
        // dd($request);
        $user = User::find($request->id);
        // dd($user);
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // return redirect(route('admins.index', absolute: false));
    }

    public function destroy(User $admin)
    {

        $admin->delete();

        // return redirect(route('admins.index', absolute: false));
    }
}
