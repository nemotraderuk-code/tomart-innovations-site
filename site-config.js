/**
 * TOMART INNOVATIONS — SITE CONFIGURATION
 * Replace the placeholder values below before production use.
 * This is the only file to edit for WhatsApp, form delivery, legal links,
 * and the future AI chatbot connection.
 */
window.TOMART_CONFIG = {
  whatsapp: {
    // International format, digits only. Example UK number: 447700900123
    number: "447584337559",
    message: "Hi Tomart Innovations, I'd like to discuss a digital project.",
  },
  contactForm: {
    // Paste a Formspree, Web3Forms, Netlify Function, or custom API URL here.
    endpoint: "https://formspree.io/f/xpqvwokd",
  },
  legal: {
    privacy: "#privacy-placeholder",
    terms: "#terms-placeholder",
  },
  chatbot: {
    // Enable only after connecting a secure backend.
    enabled: false,
    apiEndpoint: "CHATBOT_API_ENDPOINT",
  },
};
