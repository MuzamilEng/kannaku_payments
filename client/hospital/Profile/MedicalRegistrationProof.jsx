import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import ContinueButton from './components/ContinueButton';
import BackButton from './components/BackButton';
import Idea from './components/Idea';
import Progress from './components/Progress';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];


const MedicalRegistrationProof = (props) => {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    const [menu, setMenu] = useState(false)

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    return (

        <>
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

                <Header onMenuClick={(value) => toggleMobileMenu()} />
                <Sidebar />
                {/* Page Wrapper */}
                <div className="page-wrapper">
                    <div className="content container-fluid">

                        {/* Page Header */}
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Profile</h3>
                                </div>

                            </div>
                        </div>
                        {/*  /Page Header */}
                        <div className="row mb-5" style={{ marginLeft: "-50px", marginTop: "-10px", height: "1px", color: "#28328C", width: "1200px" }}>
                            <Progress progress={60} />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="row mb-5">
                                    <div className="col-8">
                                        <h5><b>Medical Registration Proof</b></h5>
                                        <small>Jamhur Ghifari</small>
                                    </div>
                                    <div className="col-4">
                                        <small>Step 1/3</small>
                                    </div>
                                </div>
                                <form action="">

                                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                                    <div className="row pt-3" style={{ color: "gray" }}>
                                        <p>
                                            Please upload your medical registration proof. Only licensed and genuine doctors are listed on Practo.
                                        </p>
                                        <p>Acceptable documents</p>
                                        <p>Medical Registration Certification</p>
                                        <p>d12333123222132 Delhi State Dental Council</p>
                                        <br />
                                        <hr />
                                        <span>Extra proofs required to be uploaded:</span><br />
                                        <span>1. Establishment Proof</span>

                                    </div>
                                    <br />
                                    <br />
                                    <hr />
                                    <div className="row ps-1 mt-3">
                                        <div className="col-6">
                                            <Link href="/profile/IdentityProof">
                                                <a>
                                                    <div className="row p-2">
                                                        <BackButton />

                                                    </div>
                                                </a>
                                            </Link>

                                        </div>
                                        <div className="col-6">
                                            <Link href="/profile/establishmentproof">
                                                <a>
                                                    <div className="row p-2">
                                                        <ContinueButton />

                                                    </div>
                                                </a>
                                            </Link>

                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-6 p-4">
                                <div className="row align-items-center justify-content-center">
                                    <Idea message="2.5M patients are looking for a doctor on Practo. Verify your credentials and reach out to them" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>


    );

}
export default MedicalRegistrationProof;
