"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MeetTheTeam = () => {
  const teamMembers1 = [
    {
      name: "Sagar Shah",
      position: "Chief Executive Officer",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1754928794/WhatsApp_Image_2025-07-28_at_15.43.58_rmkh15.jpg",
      description:
        "A visionary leader with over 31 years of experience in the water technology industry.",
    },
    {
      name: "Gajanan Ghule",
      position: "Chief Operations Officer",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1755361767/WhatsApp_Image_2025-07-28_at_15.41.57_sooibr_w9s67f.jpg",
      description:
        "Our technical expert, he transforms innovative ideas into sustainable, practical solutions.",
    },
  ];

  const teamMembers2 = [
    {
      name: "Prince Sibanda",
      position: "Director (Zimbabwe)",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1778258770/Price_oodvho.jpg",
    },
    {
      name: "Ravikumar Dhul",
      position: "Head – Engineering Division",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/v1788357233/image_kyjbua.png",
    },
    {
      name: "Supriya Sathe",
      position: "Global Business Head Marketing & Sales",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1754928788/WhatsApp_Image_2025-07-28_at_11.39.26_xcakld.jpg",
    },
    {
      name: "Shashank More",
      position: "Manager Projects",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1754928789/WhatsApp_Image_2025-07-28_at_12.40.01_eg2zec.jpg",
    },
    {
      name: "Shaun Brooker",
      position: "Managing Director (South Africa)",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1781549955/Shaun_Brooker_cjvcgs.jpg",
    },
  ];

  const cardVariants: Variants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mb-10 md:mb-16 pb-2 md:pb-4 text-center mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 px-2">
            Leadership Team
          </h2>
          <p className="mt-3 text-gray-600 text-sm md:text-lg mx-auto leading-relaxed max-w-2xl px-2">
            Our experienced leaders are at the forefront of innovation,
            dedicated to shaping a sustainable future.
          </p>
        </motion.div>

        {/* Executive Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
          {teamMembers1.map((member, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col md:flex-row rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
              initial="offscreen"
              whileInView="onscreen"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="w-full md:w-56 h-80 md:h-56 flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-gray-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-fit rounded-t-lg md:rounded-l-xl md:rounded-tr-none"
                />
              </div>

              {/* Text content */}
              <div className="p-4 md:p-6 flex flex-col justify-center">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-900 text-center md:text-left">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mt-1 text-xs md:text-base text-center md:text-left">
                  {member.position}
                </p>
                <p className="mt-2 md:mt-4 text-gray-700 leading-relaxed text-sm md:text-base text-center md:text-left">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Grid */}
        <div className="max-w-6xl mx-auto mt-12 md:mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {teamMembers2.map((member, index) => (
              <motion.div
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                variants={cardVariants}
                viewport={{ once: true }}
                className="flex flex-col cursor-pointer shadow-md hover:shadow-md transition-shadow duration-300 rounded-lg md:rounded-xl"
              >
                <div className="w-full h-48 overflow-hidden rounded-t-lg md:rounded-t-xl bg-gray-100 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-2 md:p-3 flex flex-col flex-grow justify-center">
                  <h3 className="text-gray-900 font-semibold text-lg sm:text-md text-center line-clamp-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm leading-tight text-center line-clamp-2">
                    {member.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-10 max-w-5xl mx-auto"
        >
          <a
            href="/about-us"
            className="flex items-center justify-center gap-1 text-blue-600 font-semibold group hover:gap-2 transition-all text-sm md:text-base"
          >
            Learn more about our team
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5 transition-transform group-hover:translate-x-1 mt-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
