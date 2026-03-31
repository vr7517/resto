<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::with('category')->latest()->get();

            return response()->json([
                'status'  => true,
                'message' => 'Products fetched successfully',
                'data'    => $products
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
                'name'           => 'required|string|max:255|unique:products,name',
                'category_id'    => 'required|exists:categories,id',
                'description'    => 'nullable|string',
                'price'          => 'required|numeric|min:0',
                'selling_price'  => 'nullable|numeric|min:0',
                'discount'       => 'nullable|numeric|min:0',
                'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_available'   => 'boolean',
            ]);

            // 🔥 Handle discount logic (optional smart logic)
            if (!empty($data['price']) && !empty($data['selling_price'])) {
                $data['discount'] = $data['price'] - $data['selling_price'];
            }

            // 🔥 Image upload
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('products', 'public');
            }

            $product = Product::create($data);

            return response()->json([
                'status'  => true,
                'message' => 'Product created successfully',
                'data'    => $product
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
            $product = Product::with('category')->findOrFail($id);

            return response()->json([
                'status'  => true,
                'message' => 'Product fetched successfully',
                'data'    => $product
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Product not found',
            ], 404);
        }
    }

    // ✅ UPDATE
    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $data = $request->validate([
                'name'           => 'required|string|max:255|unique:products,name,' . $id,
                'category_id'    => 'required|exists:categories,id',
                'description'    => 'nullable|string',
                'price'          => 'required|numeric|min:0',
                'selling_price'  => 'nullable|numeric|min:0',
                'discount'       => 'nullable|numeric|min:0',
                'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_available'   => 'boolean',
            ]);

            // 🔥 Discount logic
            if (!empty($data['price']) && !empty($data['selling_price'])) {
                $data['discount'] = $data['price'] - $data['selling_price'];
            }

            // 🔥 Image update
            if ($request->hasFile('image')) {

                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }

                $data['image'] = $request->file('image')->store('products', 'public');
            }

            $product->update($data);

            return response()->json([
                'status'  => true,
                'message' => 'Product updated successfully',
                'data'    => $product
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
            $product = Product::findOrFail($id);

            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $product->delete();

            return response()->json([
                'status'  => true,
                'message' => 'Product deleted successfully'
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
