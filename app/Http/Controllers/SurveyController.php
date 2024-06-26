<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();

        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request): SurveyResource
    {
        $data = $request->validated();

        $result = Survey::create($data);

        return new SurveyResource($result);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request): SurveyResource
    {
        $user = $request->user();
        return $user->id !== $survey->user_id ? abort(403, 'unauthorized action.') : new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $survey->update($request->validated());

        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();

        if($user->id !== $survey->user_id) {
            abort(403, 'unauthorized action.');
        }
        $survey->delete();
        return response('', 204);
    }
}
