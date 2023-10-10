import React, { useState } from "react";

const downArrow: string = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
</svg>

`;

interface AccordionProps {
  title: string;
  content: string | JSX.Element;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded">
      <button
        className="w-full p-4 text-left focus:outline-none text-white flex justify-between items-center"
        onClick={toggleAccordion}
      >
        {title}
        <div dangerouslySetInnerHTML={{ __html: downArrow }} />
      </button>
      {isOpen && <div className="p-4 text-white">{content}</div>}
    </div>
  );
};

export default Accordion;
