import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../global/accordion";

function Faq({ faq, index }) {
  return (
    <AccordionItem
      value={`item-${index}`}
      className="bg-white/20 backdrop-blur-md md:px-5 px-3 md:py-1 rounded-md cursor-pointer faq-bg border border-white/30"
    >
      <AccordionTrigger className="lg:text-xl text-xs text-white">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="lg:text-sm text-xs text-white">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
}

export default Faq;