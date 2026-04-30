"use client";

import { useState } from "react";
import Image from "next/image";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, subject, message } = formData;
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      alert("Please fill all fields before submitting.");
      return;
    }
    alert("Message sent successfully! We will contact you soon.");
  };

  return (
    <div className="flex justify-center items-start min-h-screen mb-8">
      {/* Glass Rectangle */}
      <div className="flex w-full max-w-6xl backdrop-blur-sm bg-white/50 border border-white/50 rounded-3xl shadow-4xl overflow-hidden expand-rect">

        {/* Left Image */}
        <div className="w-5/12 hidden md:flex justify-center items-center ml-16 py-16">
          <Image
            src="/contact/contactimg.png"
            alt="contact"
            width={500} // desired width
            height={500} // desired height
            className="w-[400px] h-auto md:w-[500px] object-contain"
          />
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-7/12 p-16 md:p-20 flex flex-col gap-12" // <-- Increased padding
        >
          {/* Row 1: First Name & Last Name */}
          <div className="flex flex-col md:flex-row gap-18">
            <div className="flex-1">
              <label className="block text-black mb-2 font-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:border-black outline-none pb-1 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-black mb-2 font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:border-black outline-none pb-1 transition"
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="flex flex-col md:flex-row gap-18">
            <div className="flex-1">
              <label className="block text-black mb-2 font-bold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email ID"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:border-black outline-none pb-1 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-black mb-2 font-bold">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:border-black outline-none pb-1 transition"
              />
            </div>
          </div>

          {/* Row 3: Dropdown */}
          <div>
            <label className="block text-black mb-2 font-bold">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[#2C2881] focus:border-black outline-none pb-1 transition"
            >
              <option value="">Select Subject</option>
              <option>General Inquiry</option>
              <option>About Plans</option>
              <option>Issue</option>
              <option>Bug Report</option>
              <option>Review</option>
              <option>Other</option>
            </select>
          </div>

          {/* Row 4: Message */}
          <div>
            <label className="block text-black mb-2 font-bold">Message</label>
<textarea
  name="message"
  placeholder="Your message"
  value={formData.message}
  onChange={handleChange}
  onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // reset height
    const maxHeight = 6 * 24; // 4 rows * 24px line-height (adjust if your line-height is different)
    target.style.height = Math.min(target.scrollHeight, maxHeight) + "px";
  }}
  className="w-full bg-transparent border-b border-gray-400 focus:border-black outline-none pb-2 transition overflow-y-auto resize-none"
  rows={1}
/>
          </div>

          {/* Submit Button */}
<button
  type="submit"
  className="
    text-white 
    py-2 
    rounded-lg 
    text-xl md:text-xl lg:text-2xl 
    transition-all duration-300 
    relative 
    overflow-hidden
    before:absolute before:inset-0 before:rounded-lg before:bg-white before:opacity-0 before:transition-opacity
    hover:scale-105
    hover:before:opacity-10
    "
  style={{
    background: "radial-gradient(circle at center, #7C5AEB 0%, #2C2881 100%)",
  }}
>
  Send Message
</button>

          {/* Small Space */}
          {/* <div className="h-12"></div> */}
        </form>
      </div>
    </div>
  );
}