import React from 'react'
const fakeCategories = [
    {
        name: "Electronics",
        image: "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&w=400&q=80"
    },
    {
        name: "Books",
        image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&w=400&q=80"
    },
    {
        name: "Clothing",
        image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&w=400&q=80"
    },
    {
        name: "Home",
        image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&w=400&q=80"
    },
    {
        name: "Toys",
        image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&w=400&q=80"
    },
    {
        name: "Sports",
        image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&w=400&q=80"
    },
    {
        name: "Beauty",
        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400&q=80"
    },
    {
        name: "Automotive",
        image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400&q=80"
    }
];
export default function Category() {
  return (
    <div className="">
      <div className="grid grid-cols-8 ">
        {fakeCategories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center border  p-3 hover:shadow transition"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <span className="text-sm font-medium text-center">{category.name}</span>
          </div>
        ))}
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="category" className="w-full h-24 object-cover" />
      </div>
    </div>
  )
}
