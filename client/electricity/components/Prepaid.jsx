import React, { useEffect, useState } from "react";
import { useAddElectricityMutation } from "../../pages/store/vtpassApi";
import { useGlobalContext } from "../../store/authStore";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Electricity = ({ onSuccess = () => { }, meterNumbers, amounts }) => {
  const [telcoOptions, setTelcoOptions] = useState([
    { id: 1, text: "MTN" },
    { id: 2, text: "GLO" },
    { id: 3, text: "9Mobile" },
    { id: 4, text: "Airtel" },
  ]);


  // const [data, setData] = useState([])
  const [serviceId, setServiceId] = useState('');
  const [billerCode, setBillerCode] = useState('');
  const [variationCode, setVariationCode] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState()

  const [addElectricity] = useAddElectricityMutation();
  const [responseData, setResponseData] = useState(null); // State to store the response data

  const {requestId, setAirTimeData} = useGlobalContext()
  const submitForm = async (e) => {
    e.preventDefault();
    console.log("submitted");
  
    // Check if any field is missing
    if (!serviceId || !billerCode || !phone) {
      toast.error('Please fill out all fields before submitting.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return; // Return early if any field is missing
    }
  
    try {
      const result = await addElectricity({
          serviceID: serviceId,
          request_id: requestId,
          billersCode: billerCode,
          variation_code: variationCode,
          amount: amount,
          phone: phone,
      });
  
      // Assuming your mutation returns a status field
      if (result && (result.status === '200' || 200  || result.status === '201' || 201)) {
        toast.success('Action successful!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        window.location.reload();
      }
  
      // Other logic here
  
    } catch (error) {
      // toast.error('Something went wrong!', {
      //   position: toast.POSITION.TOP_CENTER,
      //   autoClose: 5000,
      // });
      console.error('Error occurred:', error);
    }
  };
  

  return (
    <>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Bill Type</label>
        <div className="col-lg-7">
          <select className="form-control" value={variationCode} onChange={(e) => setVariationCode(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="prepaid">Prepaid</option>
            <option value="postpaid">PostPaid</option>
          </select>
        </div>
      </div>
      <ToastContainer />

      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Disco </label>
        <div className="col-lg-7">
          <select className="form-control" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="jos-electric">Jos Electric</option>
            <option value="eko-electric">Eko Electric</option>
            <option value="ikeja-electric">Ikeja Electric</option>
            <option value="portharcourt-electric">Port Harcourt Electric</option>
            <option value="kaduna-electric">Kaduna Electric</option>
            <option value="ibadan-electric">Ibadan Electricity</option>
            <option value="kano-electric">Kano Electric</option>
            <option value="abuja-electric">Abuja Electricity</option>
            <option value="enugu-electric">Enugu Electric</option>
            <option value="benin-electric">Benin Electricity</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Meter Number</label>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Meter Number"
            value={billerCode}
            onChange={(e) => setBillerCode(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Phone Number</label>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Amount</label>
        <div className="col-lg-7">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="mySpanClass input-group-text" id="basic-addon1">
                ₦
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="Amount"
              aria-label="amount"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="text-right">
        <button type="submit" className="btn btn-primary" onClick={submitForm}>
          Submit
        </button>
      </div>
    </>
  );
};
export default Electricity;
