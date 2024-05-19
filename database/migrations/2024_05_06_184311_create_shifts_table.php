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
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->dateTime('start_time', precision: 0)->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('end_time', precision: 0)->nullable()->default(null);
            $table->timestamps();
            $table->foreign('user_id', 'users_shifts_by_foreign')
            ->references('id')->on('users')
      ->onUpdate('cascade')
      ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
