type PricingCardProps = {
    price: string | number;
    date: string;
    benefits: string[];
  };
  
  const PricingCard: React.FC<PricingCardProps> = ({ price, date, benefits }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-7 sm:flex-1">
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Next Invoice</h4>
          <p className="text-2xl font-bold text-gray-800 mb-1">₹{price}</p>
          <p className="text-xs text-gray-500 mb-3">On {date}</p>
          {/* <button className="bg-purple-600 text-white text-sm px-4 py-1 rounded-lg shadow-md hover:bg-purple-700 transition">
            Pay Now →
          </button> */}
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Current Plans Benefits</h4>
          <p className="text-xs text-gray-500 mb-3">
          Your journey to convenience begins now!.
          </p>
          <ul className="grid grid-cols-2 gap-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-600 text-sm">
                <span className="text-purple-600 mr-1">✔</span> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default PricingCard;
  