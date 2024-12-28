const SuccessPayment = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
    <div className="bg-blue-500 text-white px-8 py-6 rounded-lg shadow-lg max-w-md">
      <h1 className="text-2xl font-bold mb-4">Payment Successful! 🎉</h1>
      <p className="mb-6">
        Thank you for your purchase! Your payment has been processed successfully.
      </p>
      <a
        href="/admin/billing"
        className="bg-white text-blue-500 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-100 transition"
      >
        Go to Home
      </a>
    </div>
  </div>
  );
};

export default SuccessPayment;
