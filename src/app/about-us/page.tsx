"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, X } from "lucide-react";
import Navigation from "@/Landing/Navigation";
import Footer from "@/Landing/Footer";
import CTASection from "@/Landing/Contact";
import { Shield, Award, Factory, Leaf } from "lucide-react";
import JsonLd from "@/components/JsonLd";

interface TeamMember {
  name: string;
  position: string;
  experience?: string;
  image: string;
  description?: string;
}

// Add this new component before the TeamMemberCard component
interface TeamMemberCardSmallProps {
  member: TeamMember;
  index: number;
  onClick: (member: TeamMember) => void;
  imageHeight?: string;
}

const TeamMemberCardSmall: React.FC<TeamMemberCardSmallProps> = ({
  member,
  index,
  onClick,
  imageHeight = "h-40",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <div className="flex flex-col h-full">
      {/* Member Image - Clickable */}
      <div
        className="relative cursor-pointer group"
        onClick={() => onClick(member)}
      >
        <div className={`w-full ${imageHeight} overflow-hidden`}>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover rounded-2xl transition-all duration-600 scale-90 group-hover:scale-100 group-hover:brightness-75"
          />
        </div>

        {/* Overlay with click hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full w-fit">
            Click to read more
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="p-2 flex flex-col justify-center flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1 text-center line-clamp-2">
          {member.name}
        </h3>
        <p className="text-blue-600 font-semibold text-sm text-center line-clamp-2">
          {member.position}
        </p>
      </div>
    </div>
  </motion.div>
);

// Define props for the TeamMemberCard component
interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  onClick: (member: TeamMember) => void;
}

// Define props for the MemberModal component
interface MemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  index,
  onClick,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className=" rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <div className="flex flex-col h-full">
      {/* Member Image - Clickable */}
      <div
        className="relative cursor-pointer group"
        onClick={() => onClick(member)}
      >
        <div className="w-full md:h-64  overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover rounded-2xl transition-all duration-600  scale-90 group-hover:scale-100 group-hover:brightness-75"
          />
        </div>

        {/* Overlay with click hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="mt-2 text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full w-fit">
            Click to read more
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="p-3 flex flex-col justify-center flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">
          {member.name}
        </h3>
        <p className="text-blue-600 font-semibold text-sm text-center">
          {member.position}
        </p>
      </div>
    </div>
  </motion.div>
);

const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => (
  <AnimatePresence>
    {member && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200 shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Left side - Image */}
            <div className="lg:w-2/5 relative">
              <div className="h-64 lg:h-full bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Position Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <h3 className="text-white font-bold text-2xl mb-1">
                  {member.name}
                </h3>
                <p className="text-white/90 text-lg font-medium">
                  {member.position}
                </p>
              </div>
            </div>

            {/* Right side - Description */}
            <div className="lg:w-5/8 p-6">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  About {member.name.split(" ")[0]}
                </h4>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-xs">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                <h5 className="font-semibold text-gray-800 mb-2">
                  Key Expertise
                </h5>
                <p className="text-sm text-gray-600 italic">
                  {member.experience}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const AboutUsPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers1: TeamMember[] = [
    {
      name: "Sagar Shah",
      position: "Chief Executive Officer (CEO)",
      experience:
        "With over 31 years of experience, Sagar leads with a vision for innovative solutions.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1754928794/WhatsApp_Image_2025-07-28_at_15.43.58_rmkh15.jpg",
      description:
        "With over 31 years of diverse industry experience, Sagar Shah leads LifeFirst Concepts & Technologies Pvt. Ltd.with a clear vision for innovation, sustainability, and global impact. Throughout his career, he has been driven by a deep passion for solving complex water, wastewater, and sanitation challenges through cutting-edge technologies and practical, cost-effective solutions. Under his leadership, LifeFirst has grown from a promising start-up into a rapidly expanding company, delivering world-class water and wastewater treatment systems, bio-digesters, and hydration monitoring solutions across India, Africa, and the Middle East. His strategic foresight has paved the way for global collaborations, exports, and joint ventures, positioning the company as a trusted partner in achieving water security and environmental sustainability. Known for his hands-on approach and visionary mindset, Sagar emphasizes integrity, customer focus, and continuous innovation as the cornerstones of the organization. Beyond business growth, he strongly advocates for 'Make in India' technologies, promoting eco-friendly solutions that contribute to a greener planet while meeting international quality standards. Sagar Shah's journey reflects a rare blend of entrepreneurial drive, technical expertise, and ethical leadership, inspiring his team to push boundaries and create meaningful impact globally.",
    },
    {
      name: "Gajanan Ghule",
      position: "Chief Operation Officer (COO)",
      experience:
        "Gajanan, our Technical Head, transforms innovation into sustainable and cost-effective solutions.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1755361767/WhatsApp_Image_2025-07-28_at_15.41.57_sooibr_w9s67f.jpg",
      description:
        "As the Chief Operating Officer and Technical Head of LifeFirst Concepts & Technologies Pvt. Ltd., Gajanan Ghule brings a unique blend of technical expertise and strategic execution to the organization. With years of experience in water, wastewater, and environmental engineering, he has been instrumental in translating innovative concepts into practical, sustainable, and cost-effective solutions that address real-world challenges. Gajanan leads the company's technical design, project execution, and operational excellence initiatives, ensuring that every solution delivered meets the highest standards of quality, safety, and efficiency. His deep understanding of process engineering, plant design, automation, and energy optimization has helped LifeFirst develop cutting-edge technologies tailored for diverse sectors, including municipalities, industries, healthcare, mining, and infrastructure projects. Known for his hands-on leadership style and commitment to continuous innovation, Gajanan plays a pivotal role in driving research and development, nurturing cross-functional teams, and ensuring that every project aligns with the company's vision for sustainability and global impact. Through his technical acumen and dedication, Gajanan Ghule has become the backbone of LifeFirst's engineering excellence, helping the organization deliver future-ready, eco-friendly solutions across India and international markets.",
    },
  ];

  const teamMembers2: TeamMember[] = [
    {
      name: "Prince Sibanda",
      position: "Director (Zimbabwe)",
      experience:
        "Mr. Prince Sibanda specializes in leading complex digital transformation initiatives, aligning technology strategy with business growth, and delivering innovative enterprise solutions that drive operational excellence.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1778258770/Price_oodvho.jpg",
      description:
        "Mr. Prince Sibanda is a seasoned IT expert with over 20 years of experience leading multi-million-dollar digital transformation projects across diverse industries. With a strong background in technology strategy, systems integration, and innovation management, he has successfully driven large-scale initiatives that enhance operational efficiency, digital growth, and organizational performance."
    },
    {
      name: "Dattaram Rane",
      position: "VP Global Sales & Projects",
      experience: "12+ years of global experience in Water Treatment Industry.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1754928788/WhatsApp_Image_2025-07-28_at_12.08.47_r5kpst.jpg",
      description:
        "Dattaram Rane, Vice President – Global Projects at Life First Concepts & Technologies Pvt. Ltd., brings over 15 years of rich international experience in the Water and Wastewater Treatment Industry. Holding both a B.E. and Diploma in Chemical Engineering, along with DNV certification in Risk Assessment, Dattaram combines strong technical expertise with a sharp strategic outlook to lead global projects from concept to successful execution. With his in-depth knowledge of process engineering, risk management, and compliance standards, Dattaram has spearheaded numerous industrial, municipal, and commercial water treatment initiatives across India, the Middle East, and Africa. His ability to integrate cutting-edge technologies with practical, cost-effective designs ensures that Life First delivers world-class, sustainable solutions tailored to diverse client needs. Known for his meticulous planning and collaborative leadership style, Dattaram excels in coordinating multi-disciplinary teams, managing complex stakeholder requirements, and ensuring timely, quality-driven project deliveries. His expertise in risk assessment and safety compliance also strengthens the organization’s commitment to operational excellence and environmental responsibility. Through his global perspective and technical acumen, Dattaram plays a crucial role in advancing LifeFirst’s vision of sustainable growth and international expansion, making a meaningful impact on communities and industries worldwide.",
    },

    {
      name: "Supriya Sathe",
      position: "Global Business Head Marketing & Sales",
      experience:
        "Certified CSR Practitioner with 8+ years of experience in Marketing & Sales.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1754928788/WhatsApp_Image_2025-07-28_at_11.39.26_xcakld.jpg",
      description:
        "Supriya Sathe leads the Global Marketing & Sales initiatives at LifeFirst Concepts & Technologies Pvt. Ltd., bringing a powerful combination of technical expertise, strategic insight, and purpose-driven leadership. With a B.E. in Computer Science and an MBA in Human Resources, Supriya offers a multidisciplinary perspective that blends technology, people management, and business strategy seamlessly. As a Certified CSR Practitioner, she is deeply committed to aligning business growth with sustainability, social impact, and ethical practices. Supriya has played a pivotal role in positioning LifeFirst as a global brand, spearheading marketing campaigns, international collaborations, and customer engagement initiatives that have expanded the company’s footprint across India, the Middle East, and Africa. Her approach combines data-driven strategies with innovative storytelling, ensuring that the company’s mission of “Make in India for the World” resonates across diverse markets. Beyond driving revenue and partnerships, Supriya champions women leadership in technology and advocates for inclusive growth and responsible business practices. With her visionary outlook and collaborative leadership style, Supriya Sathe continues to shape LifeFirst’s journey toward becoming a global leader in sustainable water, wastewater, and sanitation solutions. ",
    },
    {
      name: "Shashank More",
      position: "Manager Projects",
      experience:
        "8+ years of experience in executing water and wastewater projects.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1754928789/WhatsApp_Image_2025-07-28_at_12.40.01_eg2zec.jpg",
      description:
        "Shashank More, Manager – Projects at LifeFirst Concepts & Technologies Pvt. Ltd., brings 10 years of specialized experience in executing water and wastewater treatment projects with precision and excellence. Holding a B.E. in Civil Engineering, Shashank has developed a strong foundation in project planning, structural design, and site execution, enabling him to deliver solutions that consistently meet client expectations. Throughout his career, Shashank has demonstrated a keen eye for quality, efficiency, and reliability, ensuring that every project adheres to the highest technical standards while maintaining strict timelines and budgets. His expertise spans municipal, industrial, and commercial installations, where he has successfully managed multidisciplinary teams and coordinated with clients, consultants, and vendors to ensure smooth project execution from start to finish. Known for his problem solving abilities and commitment to innovation, Shashank continuously adopts modern construction methodologies and digital tools to enhance project productivity and accuracy. His dedication to timely delivery and customer satisfaction has earned him recognition as a dependable leader within the LifeFirst project team. By combining technical expertise with a results driven approach, Shashank More plays a pivotal role in strengthening LifeFirst’s reputation as a trusted partner for sustainable water and wastewater infrastructure solutions.",
    },
    {
      name: "Shaun Brooker",
      position: "Managing Director (South Africa)",
      experience:
        "25+ years of experience in strategic partnerships & project structuring.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1781549955/Shaun_Brooker_cjvcgs.jpg",
      description:
        "Shaun Brooker is a business strategist and sustainability-driven entrepreneur focused on delivering innovative water, wastewater, sanitation, and environmental infrastructure solutions across Southern Africa. As the driving force behind LifeFirst’s growth in South Africa and the SADC region, Shaun is passionate about connecting world-class technologies with real-world industry challenges particularly within mining, municipalities, commercial developments, agriculture, and ESG-driven sectors. With a strong background in business development, project structuring, strategic partnerships, and infrastructure opportunities, Shaun specializes in identifying practical, scalable solutions that create measurable environmental and operational impact. His approach combines commercial thinking with a commitment to sustainability, helping organisations reduce environmental risk, improve compliance, and unlock long-term value through smarter water and sanitation systems. Shaun believes that sustainable infrastructure is not just about compliance it is about building resilient communities, enabling responsible industrial growth, and creating solutions that leave a lasting legacy.  At LifeFirst, Shaun is committed to expanding access to innovative decentralised water, wastewater, and sanitation technologies that transform challenges into opportunities for cleaner, more sustainable operations across Africa.",
    },
  ];

  const teamMembers3: TeamMember[] = [
    {
      name: "Chetan K. Bawane",
      position: "Water Infrastructure Project Specialist", // Add actual position
      experience: "Water Infrastructure Project Specialist with 8+ Years of Experience",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548404/Chetan_Bawane_foggrl.jpg", // Placeholder image
      description:
        "A highly adaptable professional with over 8 years of experience in executing and managing water supply schemes, water treatment plants (WTPs), sewage treatment plants (STPs), and lift irrigation projects. Known for strong project management and team leadership skills, ensuring timely delivery, quality execution, and operational efficiency across all phases of infrastructure projects.", // Add actual description
    },
    {
      name: "Atish Kamble",
      position: "Water Infrastructure Project Engineer", // Add actual position
      experience: "Water Infrastructure Project Engineer with 5+ Years of Experience",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548402/Atish_Kamble_yukqpg.jpg", // Placeholder image
      description:
        "A highly adaptable professional with over 5 years of experience in executing and managing water supply schemes, water treatment plants (WTPs), sewage treatment plants (STPs), and lift irrigation projects. Recognized for strong team leadership and project management skills, ensuring quality execution, timely delivery, and operational efficiency across all stages of infrastructure projects.", // Add actual description
    },
    {
      name: "Ravi Chavan",
      position: "Electrical Technician",
      experience: "Electrical Technician with 5+ Years of Experience.",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548403/Ravi_Chavan_lxfmjs.jpg", // Placeholder image
      description:
        "An experienced Electrical Technician with over 5 years of expertise in diagnosing, repairing, and maintaining complex electrical systems. Highly skilled in utilizing advanced diagnostic equipment and tools to ensure operational efficiency while maintaining strict quality and safety standards. Dedicated to delivering reliable solutions and minimizing downtime through precise troubleshooting and preventive maintenance practices.", // Add actual description
    },
    {
      name: "Amol Sanap",
      position: "Dedicated Civil Engineer", // Add actual position
      experience: "Dedicated Civil Engineer with 8+ Years of Expertise in Water & Waste Management",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548403/Amol_Sanap_rrdwne.jpg", // Placeholder image
      description:
        "A highly skilled civil engineer with over eight years of diverse experience in water and wastewater infrastructure projects. Specialized in Water Audits, GIS Mapping for water supply and sewerage networks, and the preparation of comprehensive Feasibility Reports. Proficient in Liquid Waste Management with hands-on expertise in preparing Detailed Project Reports (DPRs) for both LWMS  under the SBM 2.0 (G) initiative. Additionally, well-versed in Estimation and Tendering for sewage treatment plants and a wide range of civil infrastructure projects, ensuring technical precision and cost-effectiveness at every stage.", // Add actual description
    },
    {
      name: "Swaraj Sobale",
      position: "Specialist in Purchase & Supply Chain Management", // Add actual position
      experience: "Specialist in Purchase & Supply Chain Management",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548406/Swaraj_Sobale_2_onemqr.png", // Placeholder image
      description:
        "An accomplished professional with expertise in Purchase and Supply Chain Management, bringing strong capabilities in Data Analysis, Supplier Evaluation and Selection, Cost Management and Savings, Market Research, and End-to-End Supply Chain Optimization. Adept at driving process efficiency, strategic sourcing, and innovative solutions to ensure cost-effective and seamless operations across the procurement and supply chain lifecycle.", // Add actual description
    },
    
    {
      name: "Shubham Shivarkar",
      position: "CAD Engineer", // Add actual position
      experience: "CAD Engineer with 2+ Years of Experience",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548405/Shubham_Shivarkar_owxfzt.jpg", // Placeholder image
      description:
        "A highly motivated CAD Engineer with over 2 years of experience in developing innovative designs, leading projects from concept to completion, and contributing to successful team collaborations. Skilled in translating ideas into practical engineering solutions while ensuring precision, quality, and timely delivery.", // Add actual description
    },
    {
      name: "Sarika Thalkari",
      position: "Finance & Accounting Specialist", // Add actual position
      experience: "Finance & Accounting Specialist with 14+ Years of Expertise",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548404/Sarika_Thalkari_gztjb9.jpg", // Placeholder image
      description:
        "A detail-oriented and results-driven finance professional with over 14 years of hands-on experience in journal entries, account reconciliation, and financial reporting. Recognized for strong analytical skills, quick adaptability, and effective communication, with proven expertise in supporting month-end close processes, maintaining robust internal controls, and assisting with financial analysis and ad hoc reporting. Dedicated to delivering accuracy and efficiency in a structured, fast-paced environment while driving value for the finance and accounting function.", // Add actual description
    },
    {
      name: "Manisha Walde",
      position: "Project Proposal & Estimation Engineer", // Add actual position
      experience: "Project Proposal & Estimation Engineer with 2+ Years of Experience",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548403/Manisha_Walde_fifdf2.jpg", // Placeholder image
      description:
        "A results-driven professional with over 2 years of experience in preparing project proposals and cost estimations for water supply schemes, water treatment plants (WTPs), and sewage treatment plant (STP) projects. Skilled in delivering accurate, cost-effective, and technically sound solutions to support successful project execution.", // Add actual description
    },
    
    {
      name: "Rupesh Ingale",
      position: "Water Infrastructure Project Specialist", // Add actual position
      experience: "Water Infrastructure Project Specialist with 5+ Years of Experience",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548404/Rupesh_Ingle_xpbjs8.jpg", // Placeholder image
      description:
        "A highly adaptable professional with over 5 years of experience in managing water supply schemes, water treatment plants (WTPs), sewage treatment plants (STPs), and water supply projects. Known for strong project execution skills and effective team leadership, ensuring timely delivery, operational efficiency, and high-quality outcomes across all project phases.", // Add actual description
    },
    {
      name: "Ravindra Darade",
      position: "Manufacturing & Operations Professional", // Add actual position
      experience: "Manufacturing & Operations Professional with 2+ Years of Experience",
      image:
        "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1758548403/Ravindra_Darade_zteu2r.jpg", // Placeholder image
      description:
        "A highly adaptable professional with over 2 years of experience in manufacturing and operations, demonstrating the ability to deliver results under pressure while ensuring efficiency and quality standards. Skilled in leveraging advanced tools such as Computer-Aided Design (CAD) and CATIA to optimize processes and drive operational excellence.", // Add actual description
    },
  ];

  const firstRowMembers = teamMembers3.slice(0, 5);
  const secondRowMembers = teamMembers3.slice(5);

  const baseUrl = "https://life-first.in";
  const aboutUrl = `${baseUrl}/about-us`;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: aboutUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <div className="relative md:mt-26 mt-24 overflow-hidden"></div>

      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 md-px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Our Vision & Values
            </h2>
            <p className="md:text-base text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Driven by innovation, integrity, and sustainability to deliver
              world-class water and sanitation solutions
            </p>
          </motion.div>

          {/* Vision and Value Statements */}
          <motion.div
            initial={{}}
            whileInView={{
              transition: {
                staggerChildren: 0.1,
              },
            }}
            className="grid lg:grid-cols-2 gap-4 mb-10 max-w-6xl mx-auto"
          >
            {/* Vision Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white p-5 md:p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-2xl mr-6">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Vision Statement
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-md mb-6">
                To be a leader in innovative & sustainable decentralised
                wastewater treatment, transforming waste into a resource and
                ensuring clean water access for all.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-400">
                <p className="text-gray-700 italic leading-relaxed text-sm">
                  &quot;We envision a future where every drop is valued,
                  ecosystems are protected, and communities thrive through
                  smart, efficient, and eco-friendly treatment solutions.
                </p>
              </div>
            </motion.div>

            {/* Value Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white p-5 md:p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-2xl mr-6">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Value Statement
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-md mb-6">
                We are committed to delivering sustainable, reliable, and
                innovative wastewater treatment solutions that protect the
                environment, support public health, and empower communities.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-400">
                <p className="text-gray-700 italic leading-relaxed text-sm">
                  &quot;Through quality engineering and responsible practices,
                  we strive to conserve water, reduce pollution, and create a
                  cleaner, more resilient future.&quot;
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Commitment to Quality Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12 px-6 md:px-8"
          >
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
              Commitment to Quality
            </h3>
            <p className="md:text-base text-sm text-gray-600 text-center max-w-3xl mx-auto mb-3">
              Our unwavering dedication to excellence drives every aspect of our
              operations
            </p>
          </motion.div>

          {/* Quality Commitment Grid */}
          <motion.div
            initial={{}}
            whileInView={{
              transition: {
                staggerChildren: 0.1,
              },
            }}
            className="grid md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {/* Quality Assurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-200 group hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Quality Assurance
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                We adhere to stringent quality control measures at every stage
                of production, ensuring that our clients receive the best
                possible service and results.
              </p>
            </motion.div>

            {/* Safety Standards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-green-200 group hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Safety Standards
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Safety is our top priority. We conduct regular training and
                strictly adhere to all safety regulations on-site, ensuring a
                secure environment for our workers and clients.
              </p>
            </motion.div>

            {/* Production Facility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-cyan-200 group hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="bg-cyan-100 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                  <Factory className="w-6 h-6 text-cyan-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Production Facility
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Our state-of-the-art production facility spans 40,000 sq. feet
                and operates entirely on solar energy. Every drop of rainwater
                is harvested, stored in underground tanks, and recharged into
                the ground to ensure sustainable water management.
              </p>
            </motion.div>

            {/* Zero Liquid Discharge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-200 group hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 ">
                  Zero Liquid Discharge
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                With a strict Zero Liquid Discharge policy, all wastewater is
                treated and reused to nourish our lush green gardens, which are
                home to native fruit and flowering plants. We compost kitchen
                waste and green waste into high-quality organic manure.
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-green-100 px-6 md:py-3 py-1 rounded-full">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">
                Sustainable • Innovative • Reliable
              </span>
              <Leaf className="w-5 h-5 text-blue-600" />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-gray-50 py-0">
        <div className="max-w-[90rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="md:text-md text-sm text-gray-600 max-w-4xl mx-auto">
              Our team comprises seasoned engineers across Chemical, Mechanical,
              Civil, Electrical, and Instrumentation disciplines, supported by
              experienced project managers and skilled technicians all committed
              to delivering excellence in every project.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            {/* First Row - 2 members centered */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-4xl">
                {teamMembers1.slice(0, 2).map((member, index) => (
                  <TeamMemberCard
                    key={member.name}
                    member={member}
                    index={index}
                    onClick={setSelectedMember}
                  />
                ))}
              </div>
            </div>

            {/* Second Row - 4 members */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-7xl">
                {teamMembers2.slice(0, 5).map((member, index) => (
                  <TeamMemberCard
                    key={member.name}
                    member={member}
                    index={index + 2}
                    onClick={setSelectedMember}
                  />
                ))}
              </div>
            </div>

            {/* Third Row - 5 members */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
                {firstRowMembers.map((member, index) => (
                  <TeamMemberCardSmall
                    key={member.name}
                    member={member}
                    index={index + 6}
                    onClick={setSelectedMember}
                    imageHeight="h-60"
                  />
                ))}
              </div>
            </div>

            {/* Fourth Row - 4 members centered */}
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
                {secondRowMembers.map((member, index) => (
                  <TeamMemberCardSmall
                    key={member.name}
                    member={member}
                    index={index + 11}
                    onClick={setSelectedMember}
                    imageHeight="h-60"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team Member Modal */}
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
      <CTASection />
      <Footer />
    </>
  );
};

export default AboutUsPage;
