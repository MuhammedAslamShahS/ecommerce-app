import React from "react";
import "./Footer.css";

const Footer = () => {
    return <div className="footer">&copy; Store {new Date().getFullYear()}</div>;
};

export default Footer;
