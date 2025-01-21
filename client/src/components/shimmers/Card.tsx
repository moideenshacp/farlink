import React from "react";

// Define types for contentBlocks and gridItems
interface ContentBlock {
  height: number; // Block height
  width: string;  // Tailwind width class
  marginBottom: number; // Tailwind marginBottom class
}

interface GridItems {
  count: number;       // Number of items in the grid
  columns: string;     // Tailwind column class, e.g., "grid-cols-2"
  width: string;       // Tailwind width class for each grid item, e.g., "w-24"
}

interface ShimmerCardProps {
  contentBlocks: ContentBlock[]; // Array of content block configurations
  gridItems: GridItems;          // Grid item configuration
  className?: string;            // Optional additional CSS classes
  hasButton?:boolean
}

const ShimmerCard: React.FC<ShimmerCardProps> = ({ contentBlocks, gridItems, className,hasButton = false  }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 animate-pulse ${className}`}>
    <div className="mb-4">
      {contentBlocks.map((block, index) => (
        <div
          key={index}
          className={`h-${block.height} bg-gray-300 rounded ${block.width} mb-${block.marginBottom}`}
        ></div>
      ))}
    </div>
    <div>
      <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-40 mb-3"></div>
      <ul className={`grid ${gridItems.columns} gap-2`}>
        {Array(gridItems.count)
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className={`h-4 bg-gray-300 rounded ${gridItems.width}`}
            ></li>
          ))}
      </ul>
    </div>
    {hasButton && <div className="h-10 mt-3 bg-gray-300 rounded-lg w-full"></div>}

  </div>
);

export default ShimmerCard;
