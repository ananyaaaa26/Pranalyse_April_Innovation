function Descrip3() {
  const cards = [
    {
      title: ["Our", "Mission"],
      content:
        "To make wellness smarter, safer, and accessible to everyone by turning real-time feedback and data into simple, actionable guidance people can trust every day.",
    },
    {
      title: ["Our", "Vision"],
      content:
        "A world where technology deeply understands the human body, guiding movement, habits, and lifestyle toward better health for all.",
    },
    {
      title: ["Our", "Impact"],
      content:
        "From preventing injuries to improving daily movement, we help people feel better in their bodies, recover faster, and unlock long-term wellbeing.",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 px-6 py-0 mb-24 -mt-18 max-w-7xl mx-auto">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="flex-1 bg-white/40 backdrop-blur-md rounded-xl p-8 transition-all duration-300 hover:bg-white/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-black">{card.title[0]} </span>
            <span className="text-violet-600">{card.title[1]}</span>
          </h2>
          <p className="text-black text-base leading-relaxed">{card.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Descrip3;