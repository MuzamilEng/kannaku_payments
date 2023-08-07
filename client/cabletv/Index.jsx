import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAddTvCableMutation, useGetTvcableQuery } from "../pages/store/vtpassApi";
import { useGlobalContext } from "../store/authStore";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
// import Select2 from "react-select2-wrapper";
// import dynamic from "next/dynamic";
// import recentinvoices from "../json/recentinvoices";
// import recentestimates from "../json/recentestimates";
// import Header from "../layouts/Header";
// import Sidebar from "../layouts/Sidebar";

// import $ from "jquery";
// import Data from "./components/Data";
// import Airtime from "./components/Airtime";
let SlideToggle;

const Cabletv = () => {
  const [date, setDate] = useState(new Date());
  const [currencyOptions, setcurrencyOptions] = useState([
    { id: 1, text: "--Select Currency--" },
    { id: 2, text: "EUR Euro" },
    { id: 3, text: "INR Indoan Rupee" },
    { id: 4, text: "USD- US Dollar" },
  ]);
  const [cableTvOptions, setOptions] = useState([
    { id: 1, text: "GoTV" },
    { id: 2, text: "DSTV" },
    { id: 3, text: "StarTimes" },
  ]);
  const [tvPlanOptions, setTvPlanOptions] = useState([
    { id: 0, text: "--Select Pakage--" },
    { id: 1, text: "Premium" },
    { id: 2, text: "Basic" },
    { id: 3, text: "Standard" },
  ]);
  // const [countryOptions, setcountryOptions] = useState([
  //   { id: 1, text: "Select Country" },
  //   { id: 2, text: "Afghanistan" },
  //   { id: 3, text: "Albania" },
  //   { id: 4, text: "American Samoa" },
  //   { id: 5, text: "Algeria" },
  //   { id: 6, text: "Andorra" },
  //   { id: 7, text: "Angola" },
  //   { id: 8, text: "Anguilla" },
  //   { id: 9, text: "United States" },
  // ]);
  // const salesOptions = {
  //     colors: ["#7638ff", "#fda600"],
  //     chart: {
  //       type: "bar",
  //       fontFamily: "Poppins, sans-serif",
  //       height: 350,
  //       toolbar: {
  //         show: false,
  //       },
  //     },
  //     series: [
  //       {
  //         name: "Received",
  //         type: "column",
  //         data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50],
  //       },
  //       {
  //         name: "Pending",
  //         type: "column",
  //         data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 80],
  //       },
  //     ],
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: "60%",
  //         endingShape: "rounded",
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ["transparent"],
  //     },
  //     xaxis: {
  //       categories: [
  //         "Jan",
  //         "Feb",
  //         "Mar",
  //         "Apr",
  //         "May",
  //         "Jun",
  //         "Jul",
  //         "Aug",
  //         "Sep",
  //         "Oct",
  //       ],
  //     },
  //     yaxis: {
  //       title: {
  //         text: "$ (thousands)",
  //       },
  //     },
  //     fill: {
  //       opacity: 1,
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function (val) {
  //           return "$ " + val + " thousands";
  //         },
  //       },
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   invoiceOptions = {
  //     colors: ["#7638ff", "#ff737b", "#fda600", "#1ec1b0"],
  //     chart: {
  //       fontFamily: "Poppins, sans-serif",
  //       height: 350,
  //       type: "donut",
  //     },
  //     series: [55, 40, 20, 10],
  //     labels: ["Paid", "Unpaid", "Overdue", "Draft"],
  //     legend: { show: false },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   recentestimates_ = recentestimates,
  //   recentinvoices_ = recentinvoices;
  const [name1, setName1] = useState({ username: "" });
  useEffect(() => {
    const getUsernameFromLocalStorage = () => {
      const username = localStorage.getItem('username');
      return username;
    };

    const initialUsername = getUsernameFromLocalStorage();
    setName1((prevName) => ({ ...prevName, username: initialUsername }));

    console.log(initialUsername, "login user name");
  }, []);
  useEffect(() => {
    if (document) {
      const ApexCharts = require("apexcharts");
    }
  }, []);
const { requestId } = useGlobalContext();
console.log(requestId, "request id");

  const { data, isLoading, error } = useGetTvcableQuery();

  const [state, setState] = useState([])
  const [serviceId, setServiceId] = useState('');
  const [billerCode, setBillerCode] = useState('');
  const [variationCode, setVariationCode] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [addTvCable] = useAddTvCableMutation()

  const submitForm = async (e) => {
    e.preventDefault();
  
    if (!serviceId || !billerCode || !variationCode || !amount || !phone) {
      toast.error('Please fill out all required fields before submitting.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return; // Return early if any required field is missing
    }
  
    try {
      const result = await addTvCable({
          serviceID: serviceId,
          subscription_type: 'change',
          billersCode: billerCode,
          variation_code: variationCode,
          amount: amount,
          phone: phone,
          request_id: requestId,
      });
  
      if (result && (result.status === '200' || 200  || result.status === '201' || 201)) {
        toast.success('Action successful!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      // toast.error('Something went wrong!', {
      //   position: toast.POSITION.TOP_CENTER,
      //   autoClose: 5000,
      // });
      console.error('error', error);
    }
  
    setAmount('');
    setPhone('');
    setBillerCode('');
    setVariationCode('');
    setServiceId('');
  };
  

  const initialToggleStates = state?.map(() => false);
  const [toggleStates, setToggleStates] = useState(initialToggleStates);

  const handleToggle = (index) => {
    // Create a new array by copying the existing toggleStates array
    const newToggleStates = [...toggleStates];
    // Toggle the value for the selected index
    newToggleStates[index] = !newToggleStates[index];
    // Update the state with the new array
    setToggleStates(newToggleStates);
  };
  const handleAmount = (e) => {
    setAmount(e?.target?.value);
  }
  useEffect(() => {
    if (serviceId === "dstv") {
      setVariationCode("dstv-padi");
      setAmount(2500.00)
    } else if (
      serviceId === "gotv"
    ) {
      setVariationCode("gotv-jolli");
      setAmount(3300.00);
    } else if (
      serviceId === "startimes"
    ) {
      setVariationCode("basic");
      setAmount(2100.00);
    } else {
      handleAmount();
    }
  }, [serviceId]);
useEffect(() => {
  if (data) {
    setState((prev) => {
      return [...prev, ...data];
    })
  }
}, [data]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div id="filter_inputs" className="card filter-card">
          <div className="card-body pb-0">
            <div className="row">
              <div className="col-sm-6 col-md-3">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        {/* container */}
        <div className="row">
          <div className="col-xl-4 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <div className="avatar mr-2 mt-4">
                    <img
                      className="avatar-img rounded"
                      alt=""
                      src={
                        "https://res.cloudinary.com/dev-staunty007/image/upload/v1645338943/paymax/icons/ei8wg9ooutt7c5ndr7of.png"
                      }
                    />
                  </div>
                  <div className="dash-count">
                    <div className="dash-title"> Successful Payments </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div
                    className="dropdown text-muted mt-3 mb-0"
                    data-toggle="dropdown"
                  >
                    <span className="text-success me-1">
                      <i className="fas fa-arrow-up me-1"></i>2.37%
                    </span>
                    <a
                      href="#"
                      className="btn btn-white btn-sm dropdown-toggle"
                      role="button"
                      data-toggle="dropdown"
                    >
                      Select
                    </a>
                    <div className="dropdown-menu dropdown-menu-left">
                      <a href="#" className="dropdown-item">
                        Today
                      </a>
                      <a href="#" className="dropdown-item">
                        This Week
                      </a>
                      <a href="#" className="dropdown-item">
                        This Month
                      </a>
                      <a href="#" className="dropdown-item">
                        This Year
                      </a>
                    </div>
                  </div>

                  <div className="input-group-prepend">
                    <span className="nairaSlim input-group-text">₦</span>
                    <div className="dash-counts mt-2">
                      <p>3,642</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <div className="avatar mr-2 mt-4">
                    <img
                      className="avatar-img rounded"
                      alt=""
                      src={
                        "https://res.cloudinary.com/dev-staunty007/image/upload/v1645338942/paymax/icons/lh2uk3vhnov4w7eidees.png"
                      }
                    />
                  </div>
                  <div className="dash-count">
                    <div className="dash-title"> Failed Payments </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div
                    className="dropdown text-muted mt-3 mb-0"
                    data-toggle="dropdown"
                  >
                    <span className="text-success me-1">
                      <i className="fas fa-arrow-up me-1"></i>2.37%
                    </span>
                    <a
                      href="#"
                      className="btn btn-white btn-sm dropdown-toggle"
                      role="button"
                      data-toggle="dropdown"
                    >
                      Select
                    </a>
                    <div className="dropdown-menu dropdown-menu-left">
                      <a href="#" className="dropdown-item">
                        This Week
                      </a>
                      <a href="#" className="dropdown-item">
                        This Month
                      </a>
                      <a href="#" className="dropdown-item">
                        This Year
                      </a>
                    </div>
                  </div>
                  <div className="input-group-prepend">
                    <span className="nairaSlim input-group-text">₦</span>
                    <div className="dash-counts mt-2">
                      <p>3,642</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <div className="avatar mr-2 mt-4">
                    <img
                      className="avatar-img rounded"
                      alt=""
                      src={
                        "https://res.cloudinary.com/dev-staunty007/image/upload/v1645340671/paymax/icons/yidm8jdbyxeljsfluuwm.png"
                      }
                    />
                  </div>
                  <div className="dash-count">
                    <div className="dash-title"> Referral</div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div
                    className="dropdown text-muted mt-3 mb-0"
                    data-toggle="dropdown"
                  >
                    <span className="text-success me-1">
                      <i className="fas fa-arrow-up me-1"></i>2.37%
                    </span>
                    <a
                      href="#"
                      className="btn btn-white btn-sm dropdown-toggle"
                      role="button"
                      data-toggle="dropdown"
                    >
                      Select
                    </a>
                    <div className="dropdown-menu dropdown-menu-left">
                      <a href="#" className="dropdown-item">
                        All
                      </a>

                      <a href="#" className="dropdown-item">
                        This Month
                      </a>
                      <a href="#" className="dropdown-item">
                        This Year
                      </a>
                    </div>
                  </div>
                  <div className="input-group-prepend">
                    <span className="nairaSlim input-group-text">₦</span>
                    <div className="dash-counts mt-2">
                      <p>3,642</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-5 d-flex">
            <div className="card flex-fill">
              <div className="card-header">
                <h5 className="card-title">Cabletv Related Payments</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="ribbon ribbon-primary">
                      Featured Service Providers
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12 ">
                      <div className="avatar m-auto">
                        <img
                          className="avatar-img rounded"
                          alt="User Image"
                          src={
                            "https://res.cloudinary.com/dev-staunty007/image/upload/v1595664160/paymax/cabletv/nq09isd5os4fo9rklg4n.png"
                          }
                        />
                      </div>

                      <div className="avatar mr-2">
                        <img
                          className="avatar-img rounded"
                          alt="GoTV"
                          src={
                            "https://res.cloudinary.com/dev-staunty007/image/upload/v1595664160/paymax/cabletv/rw0mnoxhp6ub3uy7x3bc.png"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <form action="#">
                  <div className="form-group row">
                    <label className="col-lg-5 col-form-label">
                      Cable TV Provider
                    </label>
                    <div className="col-lg-7">
                      <select className="form-control" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                        <option value="">-- Select --</option>
                        <option value="dstv">DSTV Payment</option>
                        <option value="gotv">Gotv Payment</option>
                        <option value="startimes">Startimes Payment</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-5 col-form-label">
                      Smart Card Number
                    </label>
                    <div className="col-lg-7">
                      <input
                        type="text"
                        name="billersCode"
                        value={billerCode}
                        className="form-control"
                        placeholder="Your Card Number"
                        onChange={(e) => setBillerCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-5 col-form-label">
                      Variation Code
                    </label>
                    <div className="col-lg-7">
                      <input
                        type="text"
                        name="variationCode"
                        value={variationCode}
                        className="form-control"
                        placeholder="variation Code"
                        onChange={(e) => setVariationCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-5 col-form-label">
                      Phone Number
                    </label>
                    <div className="col-lg-7">
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        className="form-control"
                        placeholder="Your Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-5 col-form-label">Amount</label>
                    <div className="col-lg-7">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="mySpanClass input-group-text"
                            id="basic-addon1"
                          >
                            ₦
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="amount"
                          value={amount}
                          onChange={(e) => {setAmount(e.target.value); handleAmount(e)}}
                          placeholder="Amount"
                          aria-label="amount"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <button type="submit" className="btn btn-primary" onClick={submitForm}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-7">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title">Recent Invoices</h5>
                  </div>
                  <div className="col-auto">
                    <Link href="/invoices">
                      <a className="btn-right btn btn-sm btn-outline-primary">
                        View All
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="progress progress-md rounded-pill mb-3">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "47%" }}
                      aria-valuenow="47"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "28%" }}
                      aria-valuenow="28"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "15%" }}
                      aria-valuenow="15"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "10%" }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="row">
                    <div className="col-auto">
                      <i className="fas fa-circle text-success mr-1"></i> Paid
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-circle text-warning mr-1"></i> Unpaid
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-circle text-danger mr-1"></i> Overdue
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-circle text-info mr-1"></i> Draft
                    </div>
                  </div>
                </div>

                {/* table  data */}
                <div className="table-responsive" style={{ marginLeft: "-1rem" }}>
                  <div className="flex grid-cols-5 justify-evenly p-1 border-b-2 border-gray-500" style={{ marginLeft: "-5rem" }}>
                    <p className="text-gray-800 text-base">Customer</p>
                    <p className="text-gray-800 text-base">Phone Number</p>
                    <p className="text-gray-800 text-base">Tv Provider</p>
                    <p style={{paddingLeft: "3rem"}} className="text-gray-800 text-base">Amount</p>
                    <p className="text-gray-800 text-base">Action</p>
                  </div>
                  <div className="" style={{ marginLeft: "-5rem" }}>
                    {state?.slice(-6)?.map((item, index) => {

                      return (
                        <div key={index} className="flex p-1 mt-2 justify-evenly border-b-2 border-gray-900">
                          <p>{name1?.username}</p>
                          <p style={{fontSize: ".9rem", width: "5rem", marginLeft: "2rem"}}>{item?.responseData?.content?.transactions?.unique_element}</p>
                          <p>{item?.responseData?.content?.transactions?.product_name}</p>
                          <p>{item?.responseData?.amount}</p>
                          <div className="relative">
                            <p
                              className="text-2xl cursor-pointer"
                              onClick={() => handleToggle(index)}
                              value={index}
                            >
                              ...
                            </p>
                            {toggleStates[index] && ( // Show toggle only if toggleStates[index] is true
                              <div className="text-sm absolute ml-4 pl-4 -right-0 top-0">
                                <ul className="h-fit border-2 border-gray-600 ul_lists text-justify">
                                  <li style={{fontSize: ".8rem", padding: ".3rem"}}>Download Receipt</li>
                                  <li style={{fontSize: ".8rem", padding: ".3rem"}}>Forward Receipt</li>
                                  <li style={{fontSize: ".8rem", padding: ".3rem"}}>Pay another</li>
                                </ul>


                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cabletv;
