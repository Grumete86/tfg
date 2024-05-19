<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('cif');
            $table->string('phone');
            $table->string('address');
            $table->string('city');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->foreignId('user_id')
      ->constrained(table: 'users', indexName: 'id')
      ->onUpdate('cascade')
      ->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
