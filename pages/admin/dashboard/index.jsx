import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import DefaultLayout from "@/layouts/Default";
import { getError } from "@/utils/error";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
const AdminDashboardPage = () => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <div className="grid  md:grid-cols-4 md:gap-5">
      <div>
        <ul>
          <li>
            <Link href="/admin/dashboard">
              <a className="font-bold">Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/products">Products</Link>
          </li>
          <li>
            <Link href="/admin/users">Users</Link>
          </li>
        </ul>
      </div>
      <div className="md:col-span-3">
        <h1 className="mb-4 text-xl">Admin Dashboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4">
            <h2 className="text-xl">This is Admin Dashboard</h2>
          </div>
        )}
      </div>
    </div>
  );
};

AdminDashboardPage.auth = { adminOnly: true };
AdminDashboardPage.Layout = DefaultLayout;
export default AdminDashboardPage;
