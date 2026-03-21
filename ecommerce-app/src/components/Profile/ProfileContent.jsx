import React from "react";
import "./ProfileContent.css";
import { RiPencilLine } from "react-icons/ri";

const ProfileContent = () => {
  return (
    <section className="profile-content">
      <div className="profile-breadcrumb">
        <span>Home</span>
        <span className="breadcrumb-arrow">{">"}</span>
      </div>

      <h1 className="profile-main-title">Hello, Muhammed Aslam Shah S!</h1>

      {/* Personal Information */}
      <div className="content-section">
        <div className="content-section-header">
          <h2>PERSONAL INFORMATION</h2>
          <button className="edit-btn">
            <RiPencilLine />
            EDIT
          </button>
        </div>

        <div className="info-card">
          <div className="info-grid">
            <div className="info-item">
              <p className="label">Name</p>
              <h4>Muhammed Aslam Shah S</h4>
            </div>

            <div className="info-item">
              <p className="label">Gender</p>
              <h4>Male</h4>
            </div>

            <div className="info-item">
              <p className="label">Date Of Birth</p>
              <h4>01.01.2001</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="content-section">
        <div className="content-section-header">
          <h2>CONTACT INFORMATION</h2>
          <button className="edit-btn">
            <RiPencilLine />
            EDIT
          </button>
        </div>

        <div className="info-card">
          <div className="info-grid two-column">
            <div className="info-item">
              <p className="label">Primary Mobile Number</p>
              <h4>+91 9746739163</h4>
            </div>

            <div className="info-item">
              <p className="label">Email Id</p>
              <h4>
                muhammedaslamshahofficial@gmail.com{" "}
                <span className="verify-link">Verify your Email</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;