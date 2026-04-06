import { CategoryInterface, getCategories } from '@/apis/categories.api';
import Image from 'next/image';
import React from 'react'

export default async function Categories() {
      const data = await getCategories();
      console.log(data);
  return (
    <>
    <h2 className='my-5'>Shop by <span className='text-green-500 underline'>Categories</span></h2>
    <div className='gap-5 my-5 grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2'>
      {data.map(cat=><CatItem cat={cat} key={cat._id}></CatItem>)}
    </div>
      </>
  )
}

function CatItem({cat}:{cat:CategoryInterface}) {
return <div className="rounded-[8px] text-center border border-border-color p-3">
  <img src={cat.image} alt="" className="rounded-full size-25 mx-auto my-4" width={100} height={100}/>
<p>{cat.name}</p>
</div>
}