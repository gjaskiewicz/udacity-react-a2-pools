import React from "react";
import "./PageTitle.css";

const PageTitle = ({ text }) => {
    return (
        <React.Fragment>
            <div className="pageTitle">
                <span>{text}</span>
            </div>
            <hr />
        </React.Fragment>
    );
};

export default PageTitle;