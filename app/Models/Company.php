<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Company extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'cif',
        'phone',
        'address',
        'city',
        'user_id',
    ];

    public function manager():BelongsTo{
        return $this->belongsTo(User::class, 'user_id', 'id');
    } 
    public function workers():HasMany{
        return $this->hasMany(User::class);
    }
}
