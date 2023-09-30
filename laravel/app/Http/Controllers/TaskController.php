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
     * List all the tasks
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
     * Create a new task
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

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required',
            'state' => Rule::in($states),
            'created_by' => 'required|max:255'
        ]);

        // Validate input
        if ($validator->fails()) {
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
     * Delete the task.
     */
    public function destroy(string $id)
    {
        $validatedID = $this->readAndValidateID($id);

        $task = Task::find($validatedID);

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
        $validatedID = $this->readAndValidateID($id);

        $task = Task::find($validatedID);

        // The task not exists
        if (!$task) {
            return response([
                'message' => "the task with the ID '" . $id . "' not exists",
            ], Response::HTTP_BAD_REQUEST);
        }

        $task['likes'] = $task['likes'] + 1;
        $task->save();

        return response()->noContent(Response::HTTP_CREATED);
    }

    /**
     * Read the ID parameter and satinize it
     */
    private function readAndValidateID($id)
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

        return $validated['id'];
    }
}
