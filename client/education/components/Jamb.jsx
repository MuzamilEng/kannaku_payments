import React, { useEffect, useState } from 'react';
import { useAddDuesMutation } from '../../pages/store/vtpassApi';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Jamb = ({ onSuccess }) => {
  // feeType, wacepkg, amount, phone
  const [feeType, setFeeType] = useState("");
  const [wacepkg, setWacepkg] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");


  const submitForm = async (e) => {
    e.preventDefault();
  
    // Check if any required field is missing
    if (!wacepkg || !amount || !phone) {
      toast.error('Please fill out all required fields before submitting.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return; // Return early if any required field is missing
    }
  
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
  
      const data = {
        feeType,
        wacepkg,
        amount,
        phone,
      };
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
      };
  
      const response = await fetch('http://localhost:3000/api/v1/jambfee/', requestOptions);
  
      if (response.ok || response.status === 200) {
        toast.success('Action successful!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        window.location.reload("/education"); // Redirect to the specified URL
        onSuccess();
      } else {
        const result = await response.json();
        // Handle the response error here
        // toast.error('Something went wrong!', {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 5000,
        // });
      }
    } catch (error) {
      // toast.error('Something went wrong!', {
      //   position: toast.POSITION.TOP_CENTER,
      //   autoClose: 5000,
      // });
      console.log('error', error);
    }
  
    setFeeType('');
    setWacepkg('');
    setPhone('');
    setAmount('');
  };
  return (
    <>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Jamb Package  </label>
        <div className="col-lg-7">
          <select className="form-control" value={wacepkg} onChange={(e) => setWacepkg(e.target.value)}>
            <option>-- Select --</option>
            <option value={'Jamb PIN'}>Jamb PIN</option>
            <option value={'Jamb CBT'}>Jamb CBT</option>
            <option value={'UTME Reg PIN'}>UTME Reg PIN</option>
          </select>
        </div>
      </div>
      <ToastContainer />
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Phone Number</label>
        <div className="col-lg-7">
          <input type="text" className="form-control" placeholder="Your Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-lg-5 col-form-label">Amount</label>
        <div className="col-lg-7">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">₦</span>
            </div>
            <input type="text" className="form-control" placeholder="Amount" aria-label="amount" aria-describedby="basic-addon1" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
  )
}
export default Jamb;