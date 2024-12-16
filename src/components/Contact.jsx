import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

function Contact() {
  const [result, setResult] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    setIsError(false);

    const formData = new FormData(event.target);
    formData.append("access_key", "8a74c978-b8a1-4936-b7fc-126aeef05ed1");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        setResult(data.message || "Submission failed. Try again later.");
        setIsError(true);
      }
    } catch (error) {
      setResult("An error occurred. Please try again later.");
      setIsError(true);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Contact Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Let&apos;s Connect!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you're looking for a developer, have a question, or want to
                discuss ideas, feel free to reach out. I&apos;m always open to
                connecting!
              </p>

              <div className="space-y-4">
                <ContactInfo
                  icon={
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  }
                  text="mhdkh444@gmail.com"
                />
                <ContactInfo
                  icon={
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  }
                  text="+91 6393588539"
                />
                <ContactInfo
                  icon={
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  }
                  text="Jaunpur, Uttar Pradesh, INDIA"
                />
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
              onSubmit={onSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Your message"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Send Message
              </motion.button>

              <span
                className={`block mt-4 text-center ${
                  isError ? "text-red-600" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {result}
              </span>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center space-x-4">
    <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    <span className="text-gray-600 dark:text-gray-300">{text}</span>
  </div>
);

export default Contact;
