import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAddAirTimeMutation } from '../../pages/store/vtpassApi';
import { useGlobalContext } from '../../store/authStore';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
const Airtime = () => {
  const [select, setSelect] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [billerCode, setBillerCode] = useState('');
  const [variationCode, setVariationCode] = useState('');
  const [phone, setPhone] = useState(null);
  const [amount, setAmount] = useState(0);


  const [addAirTime] = useAddAirTimeMutation();
  
const {requestId, setAirTimeData} = useGlobalContext()
  const handleAmount = (e) => {
    setAmount(e?.target?.value);
  };
  // console.log(requestId);
  const submitForm = async (e) => {
    e.preventDefault();
  
    if (!serviceId || !phone) {
      toast.error('Please fill out all required fields before submitting.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return; // Return early if any required field is missing
    }
  
    try {
      let result = null;
  
      if (select === 'Airtime') {
        result = await addAirTime({
          serviceID: serviceId,
          amount: amount,
          phone: phone,
          request_id: requestId,
        });
      } else if (select === 'Data') {
        result = await addAirTime({
          serviceID: serviceId,
          billersCode: billerCode,
          variation_code: variationCode,
          amount: amount,
          phone: phone,
          request_id: requestId,
        });
      }
  
      // console.log('API Response:', result); // Check the response in the console
  
      if (result && (result.status === '200' || 200  || result.status === '201' || 201)) {
        // console.log('Action successful:', result); // Check if this log is displayed
  
        toast.success('Action successful!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
  
        // Reload the page or navigate to the specified URL
        // window.location.reload();
        window.location.href = '/internet';
      }
    } catch (error) {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      console.error('Error:', error);
    }
  
    setSelect('');
    setAmount('');
    setPhone('');
    setBillerCode('');
    setVariationCode('');
    setServiceId('');
  };
  
  
  useEffect(() => {
    if (variationCode === "airt-50") {
      setAmount(50);
    } else if (
      variationCode === "airt-100" ||
      variationCode === "mtn-10mb-100" ||
      variationCode === "glo100" ||
      variationCode === "eti-100"
    ) {
      setAmount(100);
    } else if (
      variationCode === "airt-1000" ||
      variationCode === "glo1000" ||
      variationCode === "eti-1000"
    ) {
      setAmount(1000);
    } else if (
      variationCode === "airt-1500-2" ||
      variationCode === "mtn-20hrs-1500"
    ) {
      setAmount(1500);
    } else if (
      variationCode === "mtn-750mb-500" ||
      variationCode === "glo500" ||
      variationCode === "eti-500"
    ) {
      setAmount(500);
    } else if (variationCode === "mtn-xtra-10000") {
      setAmount(10000);
    } else if (variationCode === "glo2000") {
      setAmount(2000);
    } else if (variationCode === "eti-4000") {
      setAmount(4000);
    } else {
      handleAmount();
    }
  }, [variationCode]);


  return (
    <>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Select Service</label>
        <div className="col-lg-7">
          <select className="form-control" value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Airtime">Airtime</option>
            <option value="Data">Data</option>
          </select>
          <ToastContainer />
          <br />
        </div>
        <label className="col-lg-5 col-form-label">Telco Provider</label>
        <div className="col-lg-7">
          <select
            className="form-control"
            onChange={(e) => setServiceId(e.target.value)}
            name='select'
            value={serviceId}
          >
            {select == 'Airtime' ? <>
              <option value="">-- Select --</option>
              <option value="mtn">MTN</option>
              <option value="glo">GLO</option>
              <option value="etisalat">9Mobile</option>
              <option value="airtel">Airtel</option>
            </> : select == 'Data' ? <>
              <option value="">-- Select --</option>
              <option value="airtel-data">Airtel</option>
              <option value="mtn-data">MTN</option>
              <option value="glo-data">GLO</option>
              <option value="etisalat-data">9Mobile</option>
            </> : <>''</>}
          </select>
        </div>
      </div>
      {/* <div className="form-group row">
        <label className="col-lg-5 col-form-label">Meter Number</label>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            value={requestId}
            placeholder="Meter Number"
            onChange={(e) => setRequestId(e.target.value)}
          />
        </div>
      </div> */}
      
      {select == 'Data' && <>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Mobile Number</label>
        <div className="col-lg-7">
        <select
            className="form-control"
            onChange={(e) => setVariationCode(e.target.value)}
            name='billerCode'
            value={variationCode}
          >
            {serviceId == 'airtel-data' ? <>
            <option value="">-- Select --</option>
              <option value="airt-50">Airtel Data - 50 Naira-50MB</option> \\50.00
              <option value="airt-100">Airtel Data - 100 Naira-100MB</option>\\100.00
              <option value="airt-1000">Airtel Data - 1GB Naira-1GB</option>\\1000.00
              <option value="airt-1500-2">Airtel Data - 6GB Naira-6GB</option>\\1500.00
            </> : serviceId == 'mtn-data' ? <>
            <option value="">-- Select --</option>
              <option value="mtn-10mb-100">MTN N50 500MB</option> \\100.00
              <option value="mtn-750mb-500">MTN N300 1GB</option>\\500.00
              <option value="mtn-20hrs-1500">MTN N500 1GB</option> \\1500.00
              <option value="mtn-xtra-10000">MTN N500 Xtradata</option>\\10000.00
            </> : serviceId == 'glo-data' ? <>
            <option value="">-- Select --</option>
              <option value="glo100">GLO N50 500MB</option>\\100.00
              <option value="glo500">GLO N300 1GB</option>\\500.00.
              <option value="glo1000">GLO N500 1GB</option>\\1000.00
              <option value="glo2000">GLO N500 Xtradata</option>\\20000.00
             </>: serviceId == 'etisalat-data' ? <>
             <option value="">-- Select --</option>
              <option value="eti-100">9Mobile N50 500MB</option>\\100.00
              <option value="eti-500">9Mobile N300 1GB</option>\\500.00
              <option value="eti-1000">9Mobile N500 1GB</option>\\1000.00
              <option value="eti-4000">9Mobile N500 Xtradata</option>\\4000.00
             </> : <>''</>}
          </select>
        </div>
      </div>
      </>
      }
        <div className="form-group row">
          <label className="col-lg-5 col-form-label">Telephone Number</label>
          <div className="col-lg-7">
            <input
              type="number"
              className="form-control"
              value={phone}
              placeholder="Mobile Number"
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
              type="number"
              className="form-control"
              onChange={(e)=> {
                handleAmount(e);
                //       if (variationCode === "airt-50") {
                //   setAmount(50);
                // } else if (
                //   variationCode === "airt-100" ||
                //   variationCode === "mtn-10mb-100" ||
                //   variationCode === "glo100" ||
                //   variationCode === "eti-100"
                // ) {
                //   setAmount(100);
                // } else if (
                //   variationCode === "airt-1000" ||
                //   variationCode === "glo1000" ||
                //   variationCode === "eti-1000"
                // ) {
                //   setAmount(1000);
                // } else if (
                //   variationCode === "airt-1500-2" ||
                //   variationCode === "mtn-20hrs-1500"
                // ) {
                //   setAmount(1500);
                // } else if (
                //   variationCode === "mtn-750mb-500" ||
                //   variationCode === "glo500" ||
                //   variationCode === "eti-500"
                // ) {
                //   setAmount(500);
                // } else if (variationCode === "mtn-xtra-10000") {
                //   setAmount(10000);
                // } else if (variationCode === "glo2000") {
                //   setAmount(2000);
                // } else if (variationCode === "eti-4000") {
                //   setAmount(4000);
                // } else {
                //   handleAmount(e);
                // }
              }}
              value={amount}
              placeholder="Amount"
              aria-label="amount"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <button type='submit' className="btn btn-primary" onClick={submitForm}>
        Submit
      </button>
    </>
  );
};

export default Airtime;
