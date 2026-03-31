<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::latest()->get();

            return response()->json([
                'status'  => true,
                'message' => 'Categories fetched successfully',
                'data'    => $categories
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    // ✅ STORE
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name'  => 'required|string|max:255|unique:categories,name',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // 🔥 handle image upload
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('categories', 'public');
            }

            $category = Category::create($data);

            return response()->json([
                'status'  => true,
                'message' => 'Category created successfully',
                'data'    => $category
            ], 201);

        } catch (ValidationException $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $e->errors()
            ], 422);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    // ✅ SHOW
    public function show($id)
    {
        try {
            $category = Category::findOrFail($id);

            return response()->json([
                'status'  => true,
                'message' => 'Category fetched successfully',
                'data'    => $category
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Category not found',
            ], 404);
        }
    }

    // ✅ UPDATE
    public function update(Request $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $data = $request->validate([
                'name'  => 'required|string|max:255|unique:categories,name,' . $id,
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // 🔥 image update
            if ($request->hasFile('image')) {

                // delete old image
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }

                $data['image'] = $request->file('image')->store('categories', 'public');
            }

            $category->update($data);

            return response()->json([
                'status'  => true,
                'message' => 'Category updated successfully',
                'data'    => $category
            ], 200);

        } catch (ValidationException $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $e->errors()
            ], 422);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    // ✅ DELETE
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);

            // delete image
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $category->delete();

            return response()->json([
                'status'  => true,
                'message' => 'Category deleted successfully'
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong',
                'error'   => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
