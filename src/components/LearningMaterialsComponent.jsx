import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import FilterComponent from "./FilterComponent";
import { learningMaterials as initMaterials } from "../data/learningMaterials";

export default function LearningMaterialsComponent() {
  const [materials, setMaterials] = useState(initMaterials);
  const [sortOption, setSortOption] = useState(""); // State for sorting option

  const toggleFavorite = (id) => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((material) =>
        material.id === id
          ? { ...material, isFavorite: !material.isFavorite }
          : material
      )
    );
  };

  // Handle the sorting logic based on selected sort option
  useEffect(() => {
    let sortedMaterials = [...initMaterials]; // Start with initial materials

    if (sortOption === "A-Z") {
      sortedMaterials.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Z-A") {
      sortedMaterials.sort((a, b) => b.title.localeCompare(a.title));
    }

    setMaterials(sortedMaterials);
  }, [sortOption]); // Only depend on sortOption

  return (
    <div className="bg-white drop-shadow-lg rounded-2xl ">
      {/* calling filter component */}
      <FilterComponent onSortChange={setSortOption} />

      {/* title */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Learning Materials</h2>
        <img src="/more.svg" alt="three dot" width={30} height={30} />
      </div>

      {/* materials list */}
      <div className="space-y-3 overflow-auto h-[70vh]">
        {materials.map((material) => (
          <div
            key={material.id}
            className="bg-light-gray px-4 py-2 flex gap-5 items-center"
          >
            <img
              src={material.image}
              alt={material.title}
              width={50}
              height={50}
              className="rounded-xl"
            />

            <div className="w-full">
              <div className="flex justify-between">
                <p className="text-base font-medium">{material.title}</p>
                <Star
                  size={20}
                  className={`cursor-pointer transition-colors ${
                    material.isFavorite
                      ? "text-amber-500 fill-amber-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => toggleFavorite(material.id)}
                />
              </div>
              <p className="text-gray-400 text-sm">
                Posted at: {material.postedAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
