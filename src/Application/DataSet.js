import React from 'react';
import './Dataset.css';

function DataSet() {
    return (
        <>
            <div>
                <h1><center>Details of DataSet</center></h1>
            </div>
            <div className="dataset-container">
                <div className="dataset-box">
                    <a href="#" className="dataset-link"><center>RFMID Dataset</center></a>
                    <p>
                        <b>Content</b>: The dataset consists of high-quality fundus images of the retina, primarily used for research in ophthalmology.
                    </p>
                    <p>
                        <b> Purpose</b>: It is utilized for training and evaluating machine learning algorithms focused on detecting and diagnosing eye diseases such as diabetic retinopathy and glaucoma.
                        </p>
                    <p>
                    
                       <b> Importance</b>: The dataset plays a crucial role in developing accomated analysis of retinal scans</p>
                </div>
                <div className="dataset-box">
                    <a href="#" className="dataset-link">Dataset Link 2</a>
                    <p>Additional details about Dataset Link 2.</p>
                </div>
                <div className="dataset-box">
                    <a href="#" className="dataset-link">Dataset Link 3</a>
                    <p>Additional details about Dataset Link 3.</p>
                </div>
                <div className="dataset-box">
                    <a href="#" className="dataset-link">Dataset Link 4</a>
                    <p>Additional details about Dataset Link 4.</p>
                </div>
            </div>
        </>
    );
}

export default DataSet;
