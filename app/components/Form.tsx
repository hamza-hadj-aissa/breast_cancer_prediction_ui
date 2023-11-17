"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import BreastCancerPredictionInput from "@/app/components/Input";

// Define a type for your form data
export interface FormData {
    radius_mean: number;
    texture_mean: number;
    smoothness_mean: number;
    symmetry_mean: number;
    fractal_dimension_mean: number;
    texture_se: number;
    smoothness_se: number;
    symmetry_se: number;
}

const BreastCancerPredictionForm: React.FC = () => {
    // State to manage form data
    const [formData, setFormData] = useState<FormData>({
        radius_mean: 0,
        texture_mean: 0,
        smoothness_mean: 0,
        symmetry_mean: 0,
        fractal_dimension_mean: 0,
        texture_se: 0,
        smoothness_se: 0,
        symmetry_se: 0,
    });

    // State to manage prediction result
    const [benignResult, setBenignResult] = useState<number | null>(null);
    const [malignantResult, setMalignantResult] = useState<number | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Event handler for form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Make API call using fetch
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Handle non-successful response (e.g., display an error message)
                console.error("API Error:", response.statusText);
                return;
            }

            // Parse the JSON response
            let responseData = await response.json();
            responseData = JSON.parse(responseData);
            // Handle API response as needed
            let benign_pourcentage =
                responseData["prediction"][0]["Benign"] * 100;
            let malignant_pourcentage =
                responseData["prediction"][1]["Malignant"] * 100;

            setBenignResult(benign_pourcentage);
            setMalignantResult(malignant_pourcentage);
            // Optionally, you can update state or perform other actions based on the API response
        } catch (error) {
            // Handle errors
            console.error("API Error:", error);
        } finally {
            // Hide loading spinner
            setIsLoading(false);
        }
    };

    return (
        <>
            <section
                className="min-h-min flex flex-col gap-4 justify-center items-center bg-transparent border rounded-md pb-8 my-2 shadow-sm self-stretch mx-3 md:mx-0"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center text-xl font-bold self-stretch bg-[#d99ac5] py-3 rounded-md rounded-br-none rounded-bl-none shadow-md shadow-pink-200">
                    Patient's information
                </h2>
                <form className="flex flex-col justify-center md:grid md:justify-center items-center gap-4 sm:px-1 md:px-5">
                    <div className=" flex flex-col gap-4 md:grid md:grid-flow-row md:grid-cols-4 md:gap-4 md:justify-center">
                        <BreastCancerPredictionInput
                            id="radius_mean"
                            label="Radius Mean"
                            placeholder="Enter Radius Mean. Ex: 12.00"
                            dataType="number"
                            setFormData={setFormData}
                        />

                        <BreastCancerPredictionInput
                            id="texture_mean"
                            label="Texture Mean"
                            placeholder="Enter Texture Mean. Ex: 15.00"
                            dataType="number"
                            setFormData={setFormData}
                        />

                        <BreastCancerPredictionInput
                            id="smoothness_mean"
                            label="Smoothness Mean"
                            placeholder="Enter Smoothness Mean. Ex: 0.1"
                            dataType="number"
                            setFormData={setFormData}
                        />

                        <BreastCancerPredictionInput
                            id="symmetry_mean"
                            label="Symmetry Mean"
                            placeholder="Enter Symmetry Mean. Ex: 0.5"
                            dataType="number"
                            setFormData={setFormData}
                        />

                        <BreastCancerPredictionInput
                            id="fractal_dimension_mean"
                            label="Fractal Dimension Mean"
                            placeholder="Enter Fractal Dimension Mean. Ex: 0.03"
                            dataType="number"
                            setFormData={setFormData}
                        />

                        <BreastCancerPredictionInput
                            id="texture_se"
                            label="Texture SE"
                            placeholder="Enter Texture SE. Ex: 0.002"
                            dataType="number"
                            setFormData={setFormData}
                        />

                        <BreastCancerPredictionInput
                            id="smoothness_se"
                            label="Smoothness SE"
                            placeholder="Enter Smoothness SE. Ex: 0.008"
                            dataType="number"
                            setFormData={setFormData}
                        />

                        <BreastCancerPredictionInput
                            id="symmetry_se"
                            label="Symmetry SE"
                            placeholder="Enter Symmetry SE. Ex: 0.02"
                            dataType="number"
                            setFormData={setFormData}
                        />
                    </div>
                    <button
                        className="text-lg mx-auto my-3 bg-[#d99ac5] rounded-md h-12 w-1/4 transition duration-300 hover:bg-opacity-75"
                        type="submit"
                    >
                        {isLoading ? <LoadingSpinner /> : "Submit"}
                    </button>
                </form>
            </section>
            <section>
                {(malignantResult || benignResult) && (
                    <div className="bg-red grid justify-center items-center">
                        <h3 className="text-center">Prediction Result</h3>
                        <div className="flex justify-between">
                            <h5 className="p-5 bg-violet-500">
                                Malignant: {malignantResult} %
                            </h5>
                            <h5 className="p-5 bg-cyan-400">
                                Benign: {benignResult} %
                            </h5>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default BreastCancerPredictionForm;

const LoadingSpinner: React.FC = () => {
    return (
        <div
            className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-[#F8FFF7] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
        ></div>
    );
};
