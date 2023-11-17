import { HTMLInputTypeAttribute } from "react";
import { FormData } from "./Form";

interface Props {
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    id: string;
    placeholder: string;
    label: string;
    dataType: HTMLInputTypeAttribute;
}

const BreastCancerPredictionFormInput = ({
    setFormData,
    id,
    placeholder,
    label,
    dataType,
}: Props) => {
    // Event handler for input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log({ name, value });
        // Update the form data state based on user input
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: [value],
        }));
    };
    return (
        <div>
            <label
                htmlFor={id}
                className="block mb-2 text-md font-medium text-gray-900"
            >
                {label}
            </label>
            <input
                type={dataType}
                step="any"
                id={id}
                name={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 md:p-3"
                placeholder={placeholder}
                onChange={handleInputChange}
                required
            />
        </div>
    );
};

export default BreastCancerPredictionFormInput;
