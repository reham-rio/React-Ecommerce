interface BrandInterface {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandsResponse {
  results: number;
  data: BrandInterface[];
}

async function getBrands(): Promise<BrandInterface[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch brands");
  const payload: BrandsResponse = await res.json();
  return payload.data;
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="px-4 py-6">
      <h2 className="my-5 text-2xl font-bold">
        All <span className="text-green-500 underline">Brands</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-5">
        {brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function BrandCard({ brand }: { brand: BrandInterface }) {
  return (
    <div className="rounded-lg border border-border-color p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
      <img
        src={brand.image}
        alt={brand.name}
        className="w-24 h-24 object-contain mx-auto"
        width={96}
        height={96}
      />
      <p className="text-center font-medium text-sm">{brand.name}</p>
    </div>
  );
}
