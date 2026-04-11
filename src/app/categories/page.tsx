interface CategoryInterface {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface SubcategoryInterface {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface CategoriesResponse {
  results: number;
  data: CategoryInterface[];
}

interface SubcategoriesResponse {
  results: number;
  data: SubcategoryInterface[];
}

async function getCategories(): Promise<CategoryInterface[]> {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  const payload: CategoriesResponse = await res.json();
  return payload.data;
}

async function getSubcategories(
  categoryId: string
): Promise<SubcategoryInterface[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const payload: SubcategoriesResponse = await res.json();
  return payload.data ?? [];
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  const categoriesWithSubs = await Promise.all(
    categories.map(async (cat) => {
      const subcategories = await getSubcategories(cat._id);
      return { ...cat, subcategories };
    })
  );

  return (
    <div className="px-4 py-6">
      <h2 className="my-5 text-2xl font-bold">
        Shop by <span className="text-green-500 underline">Categories</span>
      </h2>

      <div className="flex flex-col gap-8 my-5">
        {categoriesWithSubs.map((cat) => (
          <div
            key={cat._id}
            className="border border-border-color rounded-xl p-5"
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={cat.image}
                alt={cat.name}
                className="rounded-full w-16 h-16 object-cover border border-border-color"
                width={64}
                height={64}
              />
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </div>

            {/* Subcategories */}
            {cat.subcategories.length > 0 && (
              <div className="pl-4 border-l-2 border-green-400">
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  Subcategories
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub._id}
                      className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm hover:bg-green-100 cursor-pointer transition-colors"
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}