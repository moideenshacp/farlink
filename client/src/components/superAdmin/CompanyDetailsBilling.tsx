/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getPaymentHistory, getSubcriptionPlans } from "../../api/subcriptionApi";


interface Organization {
    admin: {
      email: string;
      phone: string;
      isActive: boolean
    };
    _id:string
    name: string;
    description: string;
    city: string;
    country: string;
    industry: string;
    state: string;
    street: string;
    subscriptionType: string;
    zipcode: string;
  }
  
  interface CompanyDetailsProfileProps {
    organization: Organization;
  }
  

const PaymentHistory: React.FC<CompanyDetailsProfileProps>= ({ organization }) => {
  const [history, setHistory] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);


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
    }));
  };
 
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!organization?._id) return;
      try {
        const res = await getSubcriptionPlans(organization._id);
        if (res.data) {
          setSubscriptionDetails(res.data.companyDetails);
        }
      } catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    };

    fetchSubscription();
  }, [organization?._id]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!subscriptionDetails?.customerId) return;

      setLoading(true);
      try {
        const res = await getPaymentHistory(subscriptionDetails.customerId);

        if (res?.data) {
          const filteredInvoices = filterInvoiceData(res.data.invoices);
          setHistory(filteredInvoices);
        } else {
          setError("No payment history found.");
        }
      } catch (err) {
        setError("Failed to fetch payment history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [subscriptionDetails?.customerId]);

  return (
    <div className="p-6  rounded-lg ">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      {loading && <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>}
      {error && <div className="text-red-500">{error}</div>}
      {history ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th scope="col" className="px-4 py-2">No.</th>
                <th scope="col" className="px-4 py-2">Invoice Date</th>
                <th scope="col" className="px-4 py-2">Status</th>
                <th scope="col" className="px-4 py-2">Subscription ID</th>
                <th scope="col" className="px-4 py-2">Amount</th>
                <th scope="col" className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((invoice:any, index: number) => (
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
        <div></div>
      )}
    </div>
  );
};

export default PaymentHistory;
