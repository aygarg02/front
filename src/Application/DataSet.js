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
    <a href="https://www.kaggle.com/c/diabetic-retinopathy-detection" className="dataset-link" target="_blank" rel="noopener noreferrer"><center>STARE</center></a>
    <p>The Diabetic Retinopathy Detection dataset on Kaggle contains high-resolution fundus images to aid in detecting diabetic retinopathy.</p>
    <p>The STARE (Structured Analysis of the Retina) dataset is another widely-used collection of retinal images. It is primarily designed for analyzing blood vessel segmentation, optic disc detection, and other retinal abnormalities.</p>
</div>
                <div className="dataset-box">
                    <a href="https://www.kaggle.com/andrewmvd/ocular-disease-recognition-odir5k" className="dataset-link" target="_blank" rel="noopener noreferrer"><center>REVIEW</center></a>
                    <p>The REVIEW (Retinal Vessel Image set for Estimation of Widths) dataset focuses on providing retinal images for the evaluation of vessel width measurement algorithms, which are crucial for assessing the accuracy of vessel segmentation and analysis methods.</p>
                </div>
                <div className="dataset-box">
    <a href="https://www.kaggle.com/datasets/sovitrath/aria-dataset" className="dataset-link" target="_blank" rel="noopener noreferrer">
        <center>ARIA</center>
    </a>
    <p>The ARIA (Ages-Related Eye Disease Study) dataset includes annotated fundus images, designed for detecting and analyzing diabetic retinopathy, age-related macular degeneration, and other retinal conditions. The dataset consists of high-quality images captured under various clinical settings, providing a robust resource for developing models that aid in the early detection of eye diseases.</p>
   
</div>

            </div>
        </>
    );
}

export default DataSet;
