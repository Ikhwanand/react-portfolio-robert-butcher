import { useState } from "react";
import emailjs from "@emailjs/browser";
import env from "react-dotenv";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const serviceId = env.ServiceId;
const templateId = env.TemplateId;
const publicKey = env.PublicKey;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  /**
   * Handles form submission event. Validates the form data, and if the form
   * is valid, sends the form data to the email service and displays a toast
   * message. If the form is invalid, sets the errors state to the validation
   * errors. If the email service call fails, displays an error toast message.
   * Finally, sets the isSending state to false.
   *
   * @param {Event} e The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSending(true);

      emailjs
        .send(`${serviceId}`, `${templateId}`, formData, `${publicKey}`)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        })
        .catch((error) => {
          console.log("FAILED...", error);
          toast.error("Message sending failed!. Please try again later.");
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };
  return (
    <div className="mx-auto max-w-3xl p-4" id="contact">
      <Toaster />
      <h2 className="my-8 text-center text-4xl font-semibold tracking-tighter">
        Let's connect
      </h2>
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            className="mb-8 w-full appearance-none rounded-lg border
                border-gray-900 bg-transparent px-3 py-2 text-sm focus:border-gray-400
                focus:outline-none"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              aria-live="polite"
              className="text-sm text-pink-700"
            >
              {errors.name}
            </motion.p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="mb-8 w-full appearance-none rounded-lg border
                border-gray-900 bg-transparent px-3 py-2 text-sm focus:border-gray-400
                focus:outline-none"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              aria-live="polite"
              className="text-sm text-pink-700"
            >
              {errors.email}
            </motion.p>
          )}
        </div>
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            placeholder="Message"
            onChange={handleChange}
            className="mb-8 w-full appearance-none rounded-lg border
                border-gray-900 bg-transparent px-3 py-2 text-sm focus:border-gray-400
                focus:outline-none"
            rows="4"
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              aria-live="polite"
              className="text-sm text-pink-700"
            >
              {errors.message}
            </motion.p>
          )}
        </div>
        <button
          type="submit"
          className={`mb-8 w-full rounded bg-yellow-400
                px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-yellow-500
                ${isSending ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </motion.form>
    </div>
  );
};

export default ContactForm;
