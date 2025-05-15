import { useState, useEffect } from "react";
import {
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function SellerRequests() {
  const [sellerRequests, setSellerRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/user");
        // only get user with isLister is pending
        const pendingRequests = response.data.filter(
          (user) => user.isLister === "pending"
        );
        const rejectedRequests = response.data.filter(
          (user) => user.isLister === "rejected"
        );
        const approvedRequests = response.data.filter(
          (user) => user.isLister === "true"
        );
        const totalRequests =
          pendingRequests.length +
          rejectedRequests.length +
          approvedRequests.length;
        setStats({
          total: totalRequests,
          approved: approvedRequests.length,
          rejected: rejectedRequests.length,
          pending: pendingRequests.length,
        });
        setUsers(pendingRequests);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = (id) => {
    // In a real app, this would be an API call to update the user's status
    setSellerRequests(
      sellerRequests.map((request) =>
        request._id === id ? { ...request, status: "approved" } : request
      )
    );

    // Update stats
    setStats({
      ...stats,
      approved: stats.approved + 1,
      pending: stats.pending - 1,
    });

    // Close modal if open
    if (selectedRequest && selectedRequest._id === id) {
      setShowDocumentModal(false);
      setSelectedRequest(null);
    }
  };

  const handleReject = (id) => {
    // In a real app, this would be an API call to update the user's status
    setSellerRequests(
      sellerRequests.map((request) =>
        request._id === id ? { ...request, status: "rejected" } : request
      )
    );

    // Update stats
    setStats({
      ...stats,
      rejected: stats.rejected + 1,
      pending: stats.pending - 1,
    });

    // Close modal if open
    if (selectedRequest && selectedRequest._id === id) {
      setShowDocumentModal(false);
      setSelectedRequest(null);
    }
  };

  const openDocumentModal = (request) => {
    setSelectedRequest(request);
    setShowDocumentModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Seller Account Requests</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Requests
              </h2>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Approved</h2>
              <p className="text-3xl font-bold mt-2">{stats.approved}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Rejected</h2>
              <p className="text-3xl font-bold mt-2">{stats.rejected}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
              <p className="text-3xl font-bold mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <DocumentTextIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Pending Seller Requests</h2>
        </div>

        {sellerRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pending seller requests at this time.
          </div>
        ) : (
          <div className="table-container">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="table-header-cell">Name</th>
                  <th className="table-header-cell">Email</th>
                  <th className="table-header-cell">Phone</th>
                  <th className="table-header-cell">Date of Birth</th>
                  <th className="table-header-cell">Request Date</th>
                  <th className="table-header-cell">Documents</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sellerRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="table-cell font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="table-cell">{request.email}</td>
                    <td className="table-cell">{request.phone}</td>
                    <td className="table-cell">
                      {formatDate(request.dateOfBirth)}
                    </td>
                    <td className="table-cell">
                      {formatDate(request.requestDate)}
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => openDocumentModal(request)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <EyeIcon className="w-5 h-5 mr-1" />
                        View
                      </button>
                    </td>
                    <td className="table-cell">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : request.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-cell">
                      {request.status === "pending" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(request._id)}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Document Modal */}
      {showDocumentModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Documents for {selectedRequest.name}
                </h2>
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedRequest.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedRequest.phone}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {formatDate(selectedRequest.dateOfBirth)}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                Submitted Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedRequest.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-3 bg-gray-50 border-b">
                      <h4 className="font-medium">{doc.type}</h4>
                    </div>
                    <div className="p-4">
                      <img
                        src={doc.url || "/placeholder.svg"}
                        alt={doc.type}
                        className="w-full h-auto object-contain rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowDocumentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>

              {selectedRequest.status === "pending" && (
                <>
                  <button
                    onClick={() => handleReject(selectedRequest._id)}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
