import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import recentinvoices from "../json/recentinvoices";
import recentestimates from "../json/recentestimates";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Select2 from "react-select2-wrapper";
import $ from "jquery";
import Prepaid from "./components/Prepaid";
import PostPaid from "./components/Postpaid";
import { useGetDataQuery, useGetElectricityQuery } from "../pages/store/vtpassApi";
let SlideToggle;

const Electricity = ({onSuccess=()=>{}}) => {
  const [date, setDate] = useState(new Date());
  const [currencyOptions, setcurrencyOptions] = useState([
    { id: 1, text: "Select Currency" },
    { id: 2, text: "EUR Euro" },
    { id: 3, text: "INR Indoan Rupee" },
    { id: 4, text: "USD- US Dollar" },
  ]);
  const [countryOptions, setcountryOptions] = useState([
    { id: 1, text: "Select Country" },
    { id: 2, text: "Afghanistan" },
    { id: 3, text: "Albania" },
    { id: 4, text: "American Samoa" },
    { id: 5, text: "Algeria" },
    { id: 6, text: "Andorra" },
    { id: 7, text: "Angola" },
    { id: 8, text: "Anguilla" },
    { id: 9, text: "United States" },
  ]);
  const salesOptions = {
      colors: ["#7638ff", "#fda600"],
      chart: {
        type: "bar",
        fontFamily: "Poppins, sans-serif",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "Received",
          type: "column",
          data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50],
        },
        {
          name: "Pending",
          type: "column",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 80],
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    invoiceOptions = {
      colors: ["#7638ff", "#ff737b", "#fda600", "#1ec1b0"],
      chart: {
        fontFamily: "Poppins, sans-serif",
        height: 350,
        type: "donut",
      },
      series: [55, 40, 20, 10],
      labels: ["Paid", "Unpaid", "Overdue", "Draft"],
      legend: { show: false },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    recentestimates_ = recentestimates,
    recentinvoices_ = recentinvoices;

  useEffect(() => {
    if (document) {
      const ApexCharts = require("apexcharts");
      console.log(ApexCharts);
    }
  }, []);

  const { data } = useGetElectricityQuery();
  const [state, setState] = useState([]);
  const [formType, setFormType] = useState("");
  const [showData, setShowData] = useState(true);
  const formHandler = (e) => {};
  function changeForm(event) {
    setFormType(event.target.value);
    console.log("Hi there, user!", event.target.value);
  }
  const handleShowData = () => {
    {state?.map((item, index)=> {
      if (item?.responseData?.content?.errors){
        setShowData(false);
      }
    })}
  }
  // const {data, isLoading, error} = useGetDataQuery();
  const serviceId = 'jos-electric' || 'eko-electric';
  const serviceData = data
  ?.filter((item) => item[0]?.service_id === "jos-electric" || "eko-electric" || "benin-electric" || "ikeja-electric" || "protharcourt-electric" || "kaduna-electric" || "ibadan-electric" || "kano-electric" || "abuja-electric" || "enugu-electric");
  // console.log(serviceData, "serviceData");

  // // Then filter the mapped data
  // const filteredServiceData = serviceData?.filter(
  //   (item) => item.service_id.toLowerCase() === serviceId.toLowerCase()
  // );

  // console.log(filteredServiceData, "filteredServiceData");
  const [name1, setName1] = useState("")
  useEffect(() => {
    if (data) {
      setState(prevState => [...prevState, ...data]);
    }
    handleShowData()
  }, [data]);
  useEffect(() => {
    const getUsernameFromLocalStorage = () => {
      const username = localStorage.getItem('username');
      return username;
    };

    const initialUsername = getUsernameFromLocalStorage();
    setName1((prevName) => ({ ...prevName, username: initialUsername }));

    // console.log(initialUsername, "login user name");
  }, []);
  // const [data, setData] = useState([])
  const getRequest = async()=>{
    try {
      const response = await fetch('http://localhost:3000/api/v1/electricity/')
      const data = await response.json()
      setData(data);
      console.log(data, "data from server");
    } catch (error) {
      console.log(error);
    }
  }
  
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

    // const [data, setData] = useState([]);
   useEffect(() => {
    // console.log(data, "data from server");
    // getRequest();
   }, [data, serviceData]);

  function renderSwitch(param) {
    switch (param) {
      case "1":
        return <Prepaid />;
      case "2":
        return <PostPaid />;

      default:
        return <Prepaid />;
    }
  }
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
                <h5 className="card-title">Electricity Related Payments</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="ribbon ribbon-primary">
                      Featured Service Providers
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12 mb-4">
                      <div className="avatar mr-2">
                        <img
                          className="avatar-img rounded"
                          alt="MTN"
                          src={
                            "https://res.cloudinary.com/dev-staunty007/image/upload/v1595664211/paymax/internet/fhdivxrpvizdvcbzxdfz.png"
                          }
                        />
                      </div>

                      <div className="avatar mr-2">
                        <img
                          className="avatar-img rounded"
                          alt=""
                          src={
                            "https://res.cloudinary.com/dev-staunty007/image/upload/v1595664214/paymax/internet/uo5xg3fbmea1aqm9urr4.png"
                          }
                        />
                      </div>

                      <div className="avatar mr-2">
                        <img
                          className="avatar-img rounded"
                          alt="Airtel"
                          src={
                            "https://res.cloudinary.com/dev-staunty007/image/upload/v1595664206/paymax/internet/vfsuv5y5rg72lympqvqg.png"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <form action="#">

                  {renderSwitch(formType)}
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
                    <p className="text-gray-800 text-base">Disco</p>
                    <p className="text-gray-800 text-base">Amount</p>
                    <p className="text-gray-800 text-base">Meter Number</p>
                    <p className="text-gray-800 text-base">Action</p>
                  </div>
                  <div className="" style={{ marginLeft: "-5rem" }}>
                  {showData && state?.slice(-6)?.map((item, index)=> {
                        return (
                          <div key={index} className="flex p-1 mt-2 w-8 items-center justify-evenly border-b-2 border-gray-900">
                            <p>{name1?.username}</p>
                           <p>{item?.responseData?.amount}</p>
                           <p style={{fontSize: ".9rem", width: "8rem"}} className="max-w-xs text-sm whitespace-normal">{item?.responseData?.content?.transactions?.product_name}</p>
                           <p style={{marginLeft: "-3rem"}} className="-ml-2">{item?.responseData?.content?.transactions?.unique_element}</p>
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
export default Electricity;
