import React, { Component } from 'react';
import JobInfo from '../jobInfo/jobInfo'

class ReturnJobs extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="returnJobs">

                {/*<p> I am in return jobs </p>*/}
                {
                    // this.showJobs()
                    this.props.data.map((eachJob) =>

                        <JobInfo key={eachJob.id}
                                 jobID={eachJob.id}
                                 jobType={eachJob.type}
                                 jobDesc={eachJob.desc}
                                 jobLocation={eachJob.location}

                        />
                    )
                }

            </div>
        )
    }
}

export default ReturnJobs;