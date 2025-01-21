import ShimmerCard from "../../shimmers/Card";

const Shimmer = () => (
  <div className="flex gap-16 p-7">
    {/* Left Card */}
    <ShimmerCard
      className="w-96"
      hasButton={true}
      contentBlocks={[
        { height: 4, width: "w-36", marginBottom: 3 },
        { height: 6, width: "w-28", marginBottom: 2 },
        { height: 4, width: "w-20", marginBottom: 0 },
      ]}
      gridItems={{ count: 1, columns: "space-y-2", width: "w-80" }}
    />

    {/* Right Card */}
    <ShimmerCard
      className="w-96"
      contentBlocks={[
        { height: 4, width: "w-40", marginBottom: 3 },
        { height: 4, width: "w-24", marginBottom: 2 },
        { height: 4, width: "w-24", marginBottom: 0 },
      ]}
      gridItems={{ count: 4, columns: "grid-cols-2", width: "w-40" }}
    />
  </div>
);

export default Shimmer;
