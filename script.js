(() => {
  "use strict";
  const config = window.TOMART_CONFIG || {};
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  const closeMenu = () => {
    navigation?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  menuButton?.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
  navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => event.key === "Escape" && closeMenu());

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px" });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  const visual = document.querySelector(".hero-visual");
  if (visual && window.matchMedia("(hover: hover) and (min-width: 981px)").matches && !reducedMotion.matches) {
    visual.addEventListener("pointermove", (event) => {
      const rect = visual.getBoundingClientRect();
      visual.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - .5) * -3}deg`);
      visual.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
    });
    visual.addEventListener("pointerleave", () => {
      visual.style.setProperty("--rx", "0deg");
      visual.style.setProperty("--ry", "0deg");
    });
  }

  document.querySelectorAll(".accordion details").forEach((item) => item.addEventListener("toggle", () => {
    if (item.open) document.querySelectorAll(".accordion details[open]").forEach((other) => other !== item && other.removeAttribute("open"));
  }));

  const whatsapp = document.querySelector(".whatsapp-button");
  const number = config.whatsapp?.number;
  if (whatsapp) {
    if (number && !number.includes("WHATSAPP")) {
      whatsapp.href = `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(config.whatsapp.message || "Hello Tomart Innovations")}`;
    } else {
      whatsapp.href = "#contact";
      whatsapp.title = "Add your WhatsApp number in site-config.js";
    }
  }
  document.querySelectorAll("[data-legal]").forEach((link) => {
    if (config.legal?.[link.dataset.legal]) link.href = config.legal[link.dataset.legal];
  });

  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) return form.reportValidity();
    const endpoint = config.contactForm?.endpoint;
    if (!endpoint || endpoint.includes("CONTACT_FORM_ENDPOINT")) {
      status.textContent = "Preview mode: add your secure form endpoint in site-config.js before launch.";
      status.dataset.state = "info";
      return;
    }
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.querySelector("span").textContent = "Sending…";
    status.textContent = "";
    try {
      const response = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error();
      form.reset();
      status.textContent = "Thanks — your enquiry has been sent. We'll be in touch shortly.";
      status.dataset.state = "success";
    } catch {
      status.textContent = "We couldn't send that just now. Please email hello@tomartinnovations.com.";
      status.dataset.state = "error";
    } finally {
      button.disabled = false;
      button.querySelector("span").textContent = "Request a free demo";
    }
  });

  const chatbotRoot = document.getElementById("tomart-chatbot-root");
  if (chatbotRoot) {
    chatbotRoot.dataset.enabled = String(Boolean(config.chatbot?.enabled));
    window.TomartChatbot = { mount(adapter) { if (typeof adapter === "function") adapter(chatbotRoot, config.chatbot); } };
  }
  document.getElementById("year").textContent = new Date().getFullYear();
})();
