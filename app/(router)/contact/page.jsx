import React from 'react';

function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-6">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact us</h2>
        <p className="text-gray-600 mb-6 text-center">
          Sarana komunikasi untuk menghubungkan kami dengan Anda
        </p>
        
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Pesan</label>
          <textarea
            placeholder="Your message..."
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
