<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\Ad;
use Illuminate\Support\Facades\Redirect;

class AdsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;

        if ($search) {
            $ads = Ad::where('title', 'like', "%$search%")->paginate();
        } else {
            $ads = Ad::paginate();
        }

        return Inertia::render('Ads', [
            'ads' => $ads
        ]);
    }
}