<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rule;

use Illuminate\Support\Facades\Validator;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = [];
        if ($request->state) {
            $filters['state'] = filter_var(strip_tags(trim($request->state)), FILTER_SANITIZE_SPECIAL_CHARS);
        }
        if ($request->created_by) {
            $filters['created_by'] = filter_var(strip_tags(trim($request->created_by)), FILTER_SANITIZE_SPECIAL_CHARS);
        }

        $total = Task::count();

        // Fetch the filtered tasks
        $filteredTasks = Task::where($filters)->get();

        return response()->json([
            'total' => $total,
            'payload' => $filteredTasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $states = [
            'MX-AGU',
            'MX-BCN',
            'MX-BCS',
            'MX-CAM',
            'MX-CHP',
            'MX-CHH',
            'MX-CMX',
            'MX-COA',
            'MX-COL',
            'MX-DUR',
            'MX-GUA',
            'MX-GRO',
            'MX-HID',
            'MX-JAL',
            'MX-MEX',
            'MX-MIC',
            'MX-MOR',
            'MX-NAY',
            'MX-NLE',
            'MX-OAX',
            'MX-PUE',
            'MX-QUE',
            'MX-ROO',
            'MX-SLP',
            'MX-SIN',
            'MX-SON',
            'MX-TAB',
            'MX-TAM',
            'MX-TLA',
            'MX-VER',
            'MX-YUC',
            'MX-ZAC',
        ];

        print_r($request->all());

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required',
            'state' => Rule::in($states),
            'created_by' => 'required|max:255'
        ]);

        // Validate input
        if ($validator->fails()) {
            print_r($validator->errors());
            return response([
                'message' => 'the data is not valid',
            ], Response::HTTP_BAD_REQUEST);
        }

        $validated = $validator->safe()->only([
            'title',
            'description',
            'state',
            'created_by',
        ]);

        // Create the task
        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'state' => $validated['state'],
            'created_by' => $validated['created_by'],
        ]);

        return response([
            'id' => $task['id'],
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $validator = Validator::make([
            'id' => $id
        ], [
            'id' => 'required|uuid',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'the ID is not valid',
            ], Response::HTTP_BAD_REQUEST);
        }

        $validated = $validator->safe()->only([
            'id',
        ]);

        $task = Task::find($validated['id']);

        // The task not exists
        if (!$task) {
            return response([
                'message' => "the task with the ID '" . $id . "' not exists",
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $validator = Validator::make([
            'id' => $id
        ], [
            'id' => 'required|uuid',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'the ID is not valid',
            ], Response::HTTP_BAD_REQUEST);
        }

        $validated = $validator->safe()->only([
            'id',
        ]);

        $task = Task::find($validated['id']);

        // The task not exists
        if (!$task) {
            return response([
                'message' => "the task with the ID '" . $id . "' not exists",
            ], Response::HTTP_NOT_FOUND);
        }

        // The task only can be deleted if the task has no likes
        if ($task['likes'] > 0) {
            // The task cannot be deleted
            return response([
                'message' => "the task with the ID '" . $id . "' cannot be deleted",
            ], Response::HTTP_BAD_REQUEST);
        }

        $task->delete();

        return response([
            'message' => "the task with the ID '" . $id . "' was deleted",
        ], Response::HTTP_OK);
    }

    /**
     * Add a vote to a task
     */
    public function vote(string $id)
    {
        $validator = Validator::make([
            'id' => $id
        ], [
            'id' => 'required|uuid',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'the ID is not valid',
            ], Response::HTTP_BAD_REQUEST);
        }

        $validated = $validator->safe()->only([
            'id',
        ]);

        $task = Task::find($validated['id']);

        // The task not exists
        if (!$task) {
            return response([
                'message' => "the task with the ID '" . $id . "' not exists",
            ], Response::HTTP_NOT_FOUND);
        }

        $task['likes'] = $task['likes'] + 1;
        $task->save();

        return response()->noContent(201);
    }
}