<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Plan;

class PlansController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function index(): Response
    {

        $plans = Plan::all();

        return Inertia::render('Plans', [
            'status' => session('status'), 'plans' => $plans
        ]);
    }
}
