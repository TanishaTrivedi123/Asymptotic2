import React, { useEffect, useState } from 'react'
import { getQuestionsByTopic } from '../../services/aiService'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from "../Home/Navbar"
import Footer from "../Home/Footer"

const PracticeQuestionsList = () => {
    const { topic } = useParams()
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestionsByTopic(topic)
                console.log(data.questions);
                setQuestions(data.questions)
            } catch (error) {
                console.error(error)
            }
        }

        fetchQuestions()
    }, [topic])

    const handleClick = (customId) => {
        navigate(`/ide/practice/${topic}/${customId}`)
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full relative overflow-hidden bg-black px-6 py-28">
                <div className="relative max-w-4xl mx-auto z-10">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-inter font-semibold text-white tracking-wide mb-4
                                       drop-shadow-[0_0_10px_rgba(0,0,255,0.8)]">
                            {topic.toUpperCase()} PRACTICE QUESTIONS
                        </h2>
                        <p className="text-gray-400 font-roboto font-normal text-lg">
                            Strengthen your concepts with curated questions
                        </p>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-8">
                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className="group transition duration-300"
                            >
                                <div className="flex items-center justify-between
                                                bg-white/5 backdrop-blur-lg
                                                border border-white/10
                                                rounded-xl p-5
                                                shadow-md shadow-redColor/20
                                                hover:shadow-redColor/40
                                                transition">

                                    {/* LEFT SIDE */}
                                    <div className="flex items-start gap-4">

                                        <span className="text-skyBlue font-bold text-lg mt-1">
                                            {index + 1}.
                                        </span>

                                        <div>
                                            <h3 className="text-white text-lg font-inter font-semibold 
                                                           group-hover:text-skyBlue transition">
                                                {question.title}
                                            </h3>

                                            {question.difficulty && (
                                                <span className={`inline-block mt-3 font-roboto font-normal text-xs px-3 py-1 rounded-full backdrop-blur-md
                                ${question.difficulty === "Easy" && "bg-green-500/20 text-green-400"}
                                ${question.difficulty === "Medium" && "bg-yellow-500/20 text-yellow-400"}
                                ${question.difficulty === "Hard" && "bg-red-500/20 text-red-400"}
                            `}>
                                                    {question.difficulty}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE BUTTON */}
                                    <button
                                        onClick={() => handleClick(question.customId)}
                                        className="px-5 py-2 rounded-xl bg-redColor text-white text-sm font-roboto font-medium
                                                   hover:bg-red-600 hover:scale-105
                                                   transition duration-300 shadow-md shadow-redColor/30"
                                    >
                                        Solve →
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default PracticeQuestionsList