<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Models\Company;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyUpdateRequest extends FormRequest
{
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    
    {

        return [
            'manager_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user_id)],
            'name' =>['required','string','max:255', Rule::unique(Company::class)->ignore($this->id)],
            'cif' =>['required','string','max:9',Rule::unique(Company::class)->ignore($this->id)],
            'phone' =>['required','string','max:255'],
            'address' =>['required','string','max:255'],
            'city' =>['required','string','max:255'],
        ];
        
    }
}