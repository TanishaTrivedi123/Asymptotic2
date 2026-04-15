import React from 'react'

const Cards = () => {
 const cardsData = [
  {
    title: "Pattern-Based Practice",
    description: "Practice carefully selected pattern-based questions designed from real interview trends, helping you recognize and solve problems faster."
  },
  {
    title: "Real Interview Experience",
    description: "No hints, no shortcuts—write complete code on your own just like in actual interviews using notepad or custom IDE environments."
  },
  {
    title: "Last-Minute Preparation",
    description: "Revise efficiently with 4-5 focused questions per topic, helping you quickly evaluate your understanding and readiness before interviews."
  },
  {
    title: "Instant Doubt Solving",
    description: "Stuck on a concept? Use the AI chatbot to get clear explanations and resolve your DSA doubts instantly without breaking your flow."
  }
]

  return (
    <section className="bg-black py-16 px-4 text-textColor">
      
      {/* Heading Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-inter font-semibold drop-shadow-[0_0_10px_rgba(0,0,255,0.8)] mb-4">
          Why Choose Our Platform
        </h2>
        <p className="text-gray-400 font-roboto font-normal text-sm md:text-base">
          Prepare smarter with pattern-based questions and instant AI doubt solving.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 
                       shadow-md hover:shadow-skyBlue/40 transition duration-300 
                       hover:-translate-y-2 cursor-pointer"
          >
            <h3 className="text-xl font-roboto font-semibold mb-3">
              {card.title}
            </h3>
            <p className="text-gray-400 font-roboto font-normal text-sm">
              {card.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Cards