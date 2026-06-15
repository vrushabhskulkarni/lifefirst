"use client";

import React, { useState, useRef } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Send,
  Globe,
  CheckCircle,
} from "lucide-react";

import TurnstileWidget, { TurnstileWidgetRef } from "../app/TurnstileWidget";


type FormData = {
  name: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  message: string;
  service: string;
};

type OfficeLocation = {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  cities?: string[];
};

type Offices = {
  india: {
    title: string;
    locations: OfficeLocation[];
  };
  overseas: {
    title: string;
    locations: OfficeLocation[];
  };
};

const MessageModal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Message Sent!</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CTASection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    website: "",
    phone: "",
    message: "",
    service: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState<"india" | "overseas">(
    "india"
  );
  const turnstileRef = useRef<TurnstileWidgetRef>(null);

  

  const FORMFLOW_ENDPOINT =
    "https://formflowapi.thefortune.club/api/submit/74846bd6-89b6-4855-a70f-b91795fa0a71";

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const turnstileToken = turnstileRef.current?.getToken();
    
    if (!turnstileToken) {
      alert("Please complete the CAPTCHA verification");
      return;
    }
    setLoading(true);

   try {
      const response = await fetch(FORMFLOW_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken: turnstileToken, // Include the token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          website: "",
          phone: "",
          message: "",
          service: "",
        });
        // Reset Turnstile widget for next submission
        turnstileRef.current?.reset();
      } else {
        alert(data.error || "Something went wrong. Please try again later.");
        // Reset Turnstile on error
        turnstileRef.current?.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form. Please try again.");
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  const offices: Offices = {
    india: {
      title: "India Headquarters",
      locations: [
        {
          name: "Corporate Office & Factory",
          address:
            "Gat. No 1086, Next to Wadki Timber Market, Pune Saswad Road, Wadki, Pune - 412308, Maharashtra, India",
          phone: "+91 9011 677 277",
          email: "sales@life-first.in",
          website: "www.life-first.in",
        },
        {
          name: "Project Offices",
          cities: [
            "Mumbai",
            "Nagpur",
            "Aurangabad",
            "Chandrapur",
            "Panvel",
            "Nanded",
            "Latur",
            "Solapur",
          ],
        },
      ],
    },
    overseas: {
      title: "International Offices",
      locations: [
        {
          name: "LifeFirst Concepts & Technologies (Private) Limited",
          address: "29 College Road, New Alexandra Park, Harare, ZIMBABWE",
          phone: "+91 8806 977 277 ",
          email: "export@life-first.in",
        },
        {
          name: "LifeFirst Concepts & Technologies (Private) Limited",
          address: "282 Tryall Road, 282, Cape Town, Western Cape, 7441, South Africa.",
          phone: "+27 72 777 0653",
          email: "mdsa@life-first.in",
        },
        {
          name: "Nitin Srivastava — Business Head Europe",
          address:
            "Oosterlengte 57, 3454 RH, De Meern, Utrecht -Netherland",
          phone: "+31 6 44118794",
          email: "nitin@life-first.in",
        },
        {
          name: "Kipkoros Kandie — Managing Director (Kenya)",
          address: "Nairobi, Kenya",
          phone: "+254 721 796515",
          email: "mdken@life-first.in",
        },

      ],
    },
  };

  return (
    <>
      <section className="py-16 bg-gray-50" id="contact">
        <div className="max-w-6xl mx-auto md:px-8 px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-tl from-slate-800 via-slate-900 to-blue-900 text-white p-12 px-8 rounded-xl relative overflow-hidden max-w-6xl mx-auto">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-34 h-34 rounded-full bg-white transform -translate-x-12 -translate-y-12" />
                <div className="absolute bottom-0 right-0 w-34 h-34 rounded-full bg-white transform translate-x-12 translate-y-12" />
              </div>
              <div className="relative z-10">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-3">
                  Ready to Transform Water Management?
                </h2>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Connect with our experts to discuss sustainable water,
                  wastewater, and sanitation solutions
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Office Information */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-2 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900">
                    Corporate Office & Factory
                  </h4>
                </div>
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.865325515663!2d73.9685928!3d18.4444229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e9001b369bd9%3A0x60a43f20f76b73cd!2sLifeFirst%20Concepts%20%26%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1757395860700!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Office Selector */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveOffice("india")}
                    className={`flex-1 py-4 px-6 text-sm md:text-lg font-semibold transition-colors ${
                      activeOffice === "india"
                        ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    India Offices
                  </button>

                  <button
                    onClick={() => setActiveOffice("overseas")}
                    className={`flex-1 py-4 px-6 text-sm md:text-lg font-semibold transition-colors ${
                      activeOffice === "overseas"
                        ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    International
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    {offices[activeOffice].title}
                  </h3>

                  <div className="space-y-6">
                    {offices[activeOffice].locations.map(
                      (location, index: number) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-200 pl-4"
                        >
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {location.name}
                          </h4>

                          {location.address && (
                            <div className="flex items-start mb-2">
                              <MapPin className="w-4 h-4 mt-0.5 mr-2 text-gray-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600">
                                {location.address}
                              </span>
                            </div>
                          )}

                          {location.phone && (
                            <div className="flex items-center mb-2">
                              <Phone className="w-4 h-4 mr-2 text-gray-500" />
                              <a
                                href={`tel:${location.phone}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {location.phone}
                              </a>
                            </div>
                          )}

                          {location.email && (
                            <div className="flex items-center mb-2">
                              <Mail className="w-4 h-4 mr-2 text-gray-500" />
                              <a
                                href={`mailto:${location.email}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {location.email}
                              </a>
                            </div>
                          )}

                          {location.website && (
                            <div className="flex items-center mb-2">
                              <Globe className="w-4 h-4 mr-2 text-gray-500" />
                              <a
                                href={`http://${location.website}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {location.website}
                              </a>
                            </div>
                          )}

                          {location.cities && (
                            <div className="mt-3">
                              <div className="grid grid-cols-2 gap-2">
                                {location.cities.map((city, cityIndex) => (
                                  <div
                                    key={cityIndex}
                                    className="flex items-center"
                                  >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                    <span className="text-sm text-gray-600">
                                      {city}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                How Can We Help?
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 12345 67890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="www.yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Interested
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="water-treatment">Water Treatment</option>
                    <option value="wastewater-treatment">
                      Wastewater Treatment
                    </option>
                    <option value="sanitation-solutions">
                      Sanitation Solutions
                    </option>
                    <option value="monitoring-systems">
                      Hydration Monitoring Systems
                    </option>
                    <option value="maintenance">Operation & Maintenance</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Let us know your requirement"
                  />
                </div>

                  <TurnstileWidget ref={turnstileRef} />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-all duration-200 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-blue-700 hover:to-cyan-700"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <Send className="ml-2 w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <MessageModal
          message="Thank you for your inquiry! We'll get back to you within 24 hours."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CTASection;
