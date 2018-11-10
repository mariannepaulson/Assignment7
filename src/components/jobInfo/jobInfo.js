import React, { Component } from 'react';
import './jobInfo.css'
class JobInfo extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jobInfo">
                <p><b>{this.props.jobID}). Job Type:</b> {this.props.jobType}, <b>Location:</b> {this.props.jobLocation}</p>
                <p><b>Job Description:</b> {this.props.jobDesc}</p>

            </div>
        )
    }


};

export default JobInfo;