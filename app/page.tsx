import BreastCancerPredictionForm from "./components/Form";

export default function Home() {
    return (
        <>
            <nav className="flex justify-center items-center py-5 bg-[#d99ac5]">
                <h1 className="text-2xl font-bold">
                    Breast Cancer Prediction Ai
                </h1>
            </nav>
            <main className="flex min-h-screen flex-col items-center justify-start gap-8 py-4 lg:px-24 md:px-12">
                <section className="text-center flex flex-col gap-2 mx-3 md:mx-0">
                    <p>
                        Our mission is to empower individuals with information
                        about their breast cancer risk. This user-friendly AI
                        application utilizes advanced algorithms to predict the
                        likelihood of breast cancer based on input data.
                    </p>
                    <p>
                        Breast cancer is a significant health concern, and early
                        detection plays a crucial role in successful treatment.
                        By providing key insights, our AI aims to assist you in
                        making informed decisions about your health.
                    </p>
                    <p>
                        To get started, simply fill out the form below with
                        relevant information, and our AI will generate a
                        prediction based on the latest research and medical
                        knowledge. Your privacy is our priority, and all data
                        you provide will be handled securely and confidentially.
                    </p>
                    <p>
                        Let's take a step towards proactive health management.
                        Enter your details, and let the Breast Cancer Prediction
                        AI guide you on your journey to well-being.
                    </p>
                </section>
                <BreastCancerPredictionForm />
            </main>
        </>
    );
}
