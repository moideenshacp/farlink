const ShimmerTable = ({ rows = 5, columns = 6, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-md p-6 animate-pulse ${className}`}
  >
    <div className="overflow-x-auto">
      <table className="table-auto w-full  border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-200">
            {Array(columns)
              .fill(0)
              .map((_, index) => (
                <th
                  key={index}
                  className="h-6 bg-gray-300 rounded w-24 mt-3"
                ></th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {Array(columns)
                  .fill(0)
                  .map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className={`h-6 bg-gray-300 rounded ${
                        colIndex === columns - 1 ? "w-32" : "w-24"
                      }`}
                    ></td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ShimmerTable;
