import React, { useEffect, useState } from 'react';
import { useAddDuesMutation, useAddEducationMutation } from '../../pages/store/vtpassApi';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Jamb = ({onSuccess}) => {
   const [feeType, setFeeType] = useState("");
   const [schoolType, setSchoolType] = useState("")
   const [schoolName, setSchoolName] = useState("")
   const [adSeccion, setAdSession] = useState("");
   const [semester, setSemester] = useState("");
   const [matric, setMatric] = useState("");
   const [name, setName] = useState("");
   const [phone, setPhone] = useState();
   const [amount, setAmount] = useState();
     
   
   const submitForm = async (e) => {
    e.preventDefault();
    
    // Check if any required field is missing
    if (
      !schoolType ||
      !schoolName ||
      !adSeccion ||
      !semester ||
      !matric ||
      !name ||
      !phone ||
      !amount
    ) {
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
        schoolType,
        schoolName,
        adSeccion,
        semester,
        matric,
        name,
        phone,
        amount,
      };
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
      };
  
      const response = await fetch('http://localhost:3000/api/v1/education/', requestOptions);
  
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
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
    //   toast.error('Something went wrong!', {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 5000,
    //   });
      console.log('error', error);
    }
  
    setAmount('');
    setMatric('');
    setPhone('');
    setFeeType('');
    setSchoolType('');
    setSchoolName('');
    setAdSession('');
    setSemester('');
    setName('');
  };
    return (
        <>
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">School Type </label>
                <div className="col-lg-7">
                    <select className="form-control" value={schoolType} onChange={(e) => setSchoolType(e.target.value)}>
                        <option>-- Select --</option>
                        <option value={'Tertiary'}>Tertiary</option>
                        <option value={'College'}>College</option>
                        <option value={'KG'}>KG</option>


                    </select>
                </div>
            </div>
            <ToastContainer />
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">School Name </label>
                <div className="col-lg-7">
                <select className="form-control" value={schoolName} onChange={(e) => setSchoolName(e.target.value)}>
                        <option>-- Select --</option>
                        <option value={'ABC College'}>ABC College</option>
                        <option value={'Base School'}>Base School</option>
                    </select>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Academic Session</label>
                <div className="col-lg-7">
                    <select className="form-control" value={adSeccion} onChange={(e) => setAdSession(e.target.value)}>
                        <option>-- Select --</option>
                        <option value={'2020/2021'}>2021/2022</option>
                        <option value={'2021/2022'}>2022/2023</option>
                        <option value={'2022/2023'}>2023/2024</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Semester/Term</label>
                <div className="col-lg-7">
                    <select className="form-control" value={semester} onChange={(e) => setSemester(e.target.value)}>
                        <option>-- Select --</option>
                        <option value={'1st'}>1st</option>
                        <option value={'2nd'}>2nd</option>
                        <option value={'3rd'}>3rd</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Reg Or Matric Number</label>
                <div className="col-lg-7">
                    <input type="text" className="form-control" placeholder="Your Reg or Matric Number" value={matric} onChange={(e) => setMatric(e.target.value)} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Student Name</label>
                <div className="col-lg-7">
                    <div className="input-group">
                        <div className="input-group-prepend">

                        </div>
                        <input type="text" className="form-control" aria-describedby="basic-addon1" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
            </div>
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