/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAllPaymentHistory } from "../../api/subcriptionApi";

const PaymentHistoryAdmin = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const filterInvoiceData = (invoices: any[]) => {
    return invoices.map((invoice) => ({
      id: invoice.id,
      date: new Date(invoice.created * 1000).toLocaleString(),
      status: invoice.status,
      payment_method: invoice.payment_method,
      subscription: invoice.subscription,
      amount: (invoice.amount_paid / 100).toFixed(2),
      currency: invoice.currency,
      invoice_pdf: invoice.invoice_pdf,
      customer_email:invoice.customer_email,
      customer_name:invoice.customer_name
    }));
  };

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      try {
        const res = await getAllPaymentHistory();
        console.log(res, "from admin histrory");

        if (res) {
          const filteredInvoices = filterInvoiceData(res.invoices);
          setHistory(filteredInvoices);
        } else {
          setError("No data found.");
        }
      } catch (err) {
        setError("Failed to fetch payment history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">All Payment History</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th scope="col" className="px-4 py-2">
                  No.
                </th>
                <th scope="col" className="px-4 py-2">
                  Invoice Date
                </th>
                <th scope="col" className="px-4 py-2">
                  Status
                </th>
                <th scope="col" className="px-4 py-2">
                  Subscription ID
                </th>
                <th scope="col" className="px-4 py-2">
                  Customer Name
                </th>
                <th scope="col" className="px-4 py-2">
                  Customer Email
                </th>
                <th scope="col" className="px-4 py-2">
                  Amount
                </th>
                <th scope="col" className="px-4 py-2">
                  Action
                </th>{" "}
                {/* For download */}
              </tr>
            </thead>
            <tbody>
              {history.map((invoice: any, index: number) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{invoice.date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        invoice.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{invoice.subscription}</td>
                  <td className="px-4 py-2">{invoice.customer_name}</td>
                  <td className="px-4 py-2">{invoice.customer_email}</td>
                  <td className="px-4 py-2">
                    {invoice.currency.toUpperCase()} {invoice.amount}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={invoice.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Download Invoice
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No payment history found.</div>
      )}
    </div>
  );
};

export default PaymentHistoryAdmin;
