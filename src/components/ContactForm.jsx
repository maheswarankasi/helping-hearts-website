"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { PHONE_INPUT_PROPS, normalisePhone, phoneError } from "@/lib/phone";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [showErrors, setShowErrors] = useState(false);

  // Only surfaced once submit has been attempted, so the field doesn't go red
  // while it is still being typed.
  const phoneProblem = showErrors ? phoneError(formData.phone) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // `required` alone would accept any non-empty string here.
    if (phoneError(formData.phone)) {
      setShowErrors(true);
      return;
    }

    setStatus("submitting");

    try {
      // Firebase-la "inquiries" ngra collection-la save panrom
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        phone: normalisePhone(formData.phone),
        createdAt: serverTimestamp(),
        read: false, // Admin panel-la unread nu kaata udhavum
      });

      setStatus("success");
      setShowErrors(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // 5 seconds aprm success message-a hide panna
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // The mobile field discards non-digits as they are typed.
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? normalisePhone(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Phone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            name="phone"
            required
            {...PHONE_INPUT_PROPS}
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(phoneProblem)}
            className={`w-full px-5 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all outline-none ${
              phoneProblem
                ? 'border-brand-red focus:ring-red-200'
                : 'border-gray-200 focus:ring-brand-blue'
            }`}
          />
          {phoneProblem && (
            <p className="mt-2 text-sm font-medium text-brand-red flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {phoneProblem}
            </p>
          )}
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
          placeholder="john@example.com"
        />
      </div>

{/* Subject Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
          placeholder="Subject"
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Message *
        </label>
        <textarea
          name="message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none resize-none"
          placeholder="Tell us more about your inquiry..."
        ></textarea>
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-fade-in">
          <i className="fa-solid fa-circle-check text-xl"></i>
          <div>
            <h4 className="font-bold">Message Sent!</h4>
            <p className="text-sm">
              Thank you for reaching out. We will get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <i className="fa-solid fa-triangle-exclamation text-xl"></i>
          <p className="text-sm font-medium">
            Something went wrong. Please try again or call us directly.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full md:w-auto px-10 py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-[#07205c] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-brand-blue/30 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            {" "}
            <i className="fa-solid fa-spinner fa-spin"></i> Sending...{" "}
          </>
        ) : (
          <>
            {" "}
            Send Message <i className="fa-solid fa-paper-plane"></i>{" "}
          </>
        )}
      </button>
    </form>
  );
}
