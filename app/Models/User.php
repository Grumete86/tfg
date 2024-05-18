<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'is_company',
        'is_worker',
        'contracted_by',
        'dni',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'is_company' => 'boolean',
            'is_worker' => 'boolean',
        ];
    }

    public function scopeAdmins($query)
    {
        $query->where('is_admin', true);
    }
    public function scopeWorkers($query)
    {
        $query->where('is_worker', true);
    }
    public function scopeCompanies($query)
    {
        $query->where('is_company', true);
    }
    public function scopeCompanyWorkers($query, $companyId)
    {
        $query->where('contracted_by', $companyId);
    }
    public function company(): HasOne
    {
        return $this->hasOne(Company::class);
    }
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }
    public function works_at():BelongsTo
    {
        return $this->belongsTo(Company::class, 'contracted_by', 'id');
    } 

}
