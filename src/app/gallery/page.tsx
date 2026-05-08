"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye, Play, Image as ImageIcon } from "lucide-react";
import Navigation from "@/Landing/Navigation";
import Footer from "@/Landing/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";

const Gallery = () => {
  React.useEffect(() => {
    // Force scrollbar to always show
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        overflow-y: scroll !important;
      }
      body[data-scroll-locked] {
        overflow: scroll !important;
        padding-right: 0 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);











  const galleryData = {
    images: [
      {
        id: 1,
        title: "Effluent Treatment Plant",
        category: "image",
        subcategory: "Products & Services",
        description:
          "A snapshot of our state-of-the-art 75 KLD ETP",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269478/Screenshot_20250812_235526_Gallery_dmiay2.jpg",
      },
      {
        id: 2,
        title: "Sewage Treatment Plant",
        category: "image",
        subcategory: "Products & Services",
        description: "150 KLD Sewage Treatment Plant",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269466/Dist_Jail_150KLD_eqogap.jpg",
      },
      {
        id: 3,
        title: "50 KLD Sewage Treatment Plant",
        category: "image",
        subcategory: "Products & Services",
        description:
          "50 KLD Sewage Treatment Plant",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269465/20251216_194910_1_o7uipk.jpg",
      },
      {
        id: 4,
        title: "Lamella Clarifier and 75 KLD ETP",
        category: "image",
        subcategory: "Products & Services",
        description:
          "Lamella Clarifier and 75 KLD ETP",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269451/62440_xwgghp.jpg",
      },
      {
        id: 5,
        title: "Wastewater Treatment System",
        category: "image",
        subcategory: "Products & Services",
        description: "A large-scale wastewater treatment plant.",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269453/20250706_164037_n4wcja.jpg",
      },
      {
        id: 6,
        title: "Effluent Treatment System",
        category: "image",
        subcategory: "Products & Services",
        description: "An effluent treatment system for industrial use.",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269467/file_00000000b32461f491937f76ec1015e4_vtjqqa.jpg",
      },
      {
        id: 7,
        title: "Sustainable Products",
        category: "image",
        subcategory: "Products & Services",
        description:
          "Showcasing our range of sustainable and eco-friendly products.",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269465/20251104_173856_lnqvmc.jpg",
      },
      {
        id: 8,
        title: "Bio-Digester & Bio-Toilets",
        category: "image",
        subcategory: "Products & Services",
        description: "Our innovative bio-digester and bio-toilet solutions.",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269460/20251120_164212_vuembb.jpg",
      },
      {
        id: 9,
        title: "Hydration Monitoring System",
        category: "image",
        subcategory: "Products & Services",
        description:
          "A close-up of our advanced hydration monitoring technology.",
        url: "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269457/20250824_134527_phtwxh.jpg",
      },
    ],
    videos: [
      {
        id: 1,
        title: "3MLD",
        category: "video",
        subcategory: "Products & Services",
        description: "3MLD in action",
        url: "https://gallery.life-first.in/hls/3MLD_jftt8k/3MLD_jftt8k.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767039653/3mld_q8gtjo.png",
      },
      {
        id: 2,
        title: "Project - 2000x1800mm Pressure Vessels Filters",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Dispatch of our 2000x1800mm Pressure Vessels Filters",
        url: "https://gallery.life-first.in/hls/2000x1800mm_Filter_by_LFCT_h3og60/2000x1800mm_Filter_by_LFCT_h3og60.m3u8",
       thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767040075/2000x1800mm_filter_fatpre.png"
      },
      {
        id: 3,
        title: "Diwali Celebrations at LifeFirst",
        category: "video",
        subcategory: "Others",
        description: "Lighting up the world with one drop at a time",
        url: "https://gallery.life-first.in/hls/others/LFCT_DIWALI_isivai/LFCT_DIWALI_isivai.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767040876/lftct_diwal_yiyigr.png",
      },
      {
        id: 4,
        title: "Dussehra Celebrations at LifeFirst",
        category: "video",
        subcategory: "Others",
        description: "Celebrating Life's festivals with LifeFirst at our Factory",
        url: "https://gallery.life-first.in/hls/others/EVENT_d7xjeb/EVENT_d7xjeb.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767041097/dussehra_lifefirst_ihgrek.png",
      },
      {
        id: 5,
        title: "2MLD Water Treatment Plant Process Video",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing the process and flow of our 2 millions Water Treatment Plant",
        url: "https://gallery.life-first.in/hls/2MLD_WTP_1_1_vgk0lh/2MLD_WTP_1_1_vgk0lh.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767039654/2mld_water_treatment_plant_at_talegaon_dabhade_dnlbmk.png",
      },
      {
        id: 6,
        title: "120 KLD Sewage Treatment Plant Export Dispatch Activity - Kuwait",
        category: "video",
        subcategory: "Products & Services",
        description: "Export dispatch and logistics coordination for a 120 KLD sewage treatment plant supplied for a project in Kuwait.",
        url: "https://gallery.life-first.in/hls/Kuwait_1_epe0pj/Kuwait_1_epe0pj.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767040384/kuwait_international_dispatch_1_fio5un.png",
      },
      {
        id: 7,
        title: "6th Anniversary celebration of LifeFirst",
        category: "video",
        subcategory: "Others",
        description:
          "Commemorating six years of LifeFirst's growth, achievements, and continued commitment to excellence.",
        url: "https://gallery.life-first.in/hls/others/LFCT_6th_Anniversary_1_glokhn/LFCT_6th_Anniversary_1_glokhn.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767041874/6_years_celebrations_n3sdcv.png",
      },
      {
        id: 8,
        title: "Welcoming Mr. Albert Mnangagwa our Chairman at LifeFirst Factory",
        category: "video",
        subcategory: "Others",
        description:
          "LifeFirst Factory welcomes Chairman Mr. Albert Mnangagwa for a prestigious facility tour.",
        url: "https://gallery.life-first.in/hls/others/LFCT_Zimbabwe__pina8g/LFCT_Zimbabwe__pina8g.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767041564/albert_at_lifefirst_ofw2bg.png",
      },
      {
        id: 9,
        title: "Innovative Decentralized Liquid Waste Management System",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing our waste management system installed in Nanded",
        url: "https://gallery.life-first.in/hls/innovative_decentralized_liquid_waste_management_system/innovative_decentralized_liquid_waste_management_system.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767035135/innovative_decentralized_liquid_waste_management_system_ozgg69.png",
      },
      {
        id: 10,
        title: "City Liquid Waste Management System (150KLD)",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing our waste management system installed in Visava Garden, Nanded City to Shri. A. A. Shingare Member Secretary MPCB.",
        url: "https://gallery.life-first.in/hls/city_liquid_waste_management_system/city_liquid_waste_management_system.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767037127/city_liquid_waste_management_system_zli5vk.png",
      },
      {
        id: 11,
        title: "Decentralized City Waste Management System Nanded City",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing our waste management system installed in Nanded to Shri. Aadity Thackeray Hon. Minister of Tourism & Environment, Government of Maharashtra",
        url: "https://gallery.life-first.in/hls/decentralized_city_waste_management_system_nanded/decentralized_city_waste_management_system_nanded.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767037128/decentralized_city_waste_management_system_nanded_ud7cmp.png",
      },
      {
        id: 12,
        title: "Decentralized Prefabricated Hospital Liquid Management System",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Inauguration of our HLWMS installed at Dr. Shankarrao Chavan Government Medical College & Hospital, Nanded",
        url: "https://gallery.life-first.in/hls/decentralized_prefabricated_hospital_liquid_management_system/decentralized_prefabricated_hospital_liquid_management_system.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767037128/decentralized_prefabricated_hospital_liquid_management_system_wyxkkc.png",
      },
      {
        id: 13,
        title: "Packaged STP at Social Wellfare Department Office Nanded",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing our Packaged Sewage Treatment Plant installed at Social Wellfare Department Office, Nanded to Shri. Dhananjay Munde Hon. Minister of Social Justice and Special Assistance, Government of Maharashtra and Shri. Sanjay Bansode Hon. Minister of State Environment, Government of Maharashtra",
        url: "https://gallery.life-first.in/hls/packaged_sewage_treatment_plant_at_social_wellfare_department_office_nanded/packaged_sewage_treatment_plant_at_social_wellfare_department_office_nanded.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767037134/packaged_stp_social_welfare_department_office_nanded_vmalnq.png",
      },
      {
        id: 14,
        title: "Wastewater Treatment Plant 4MLD installed at Chh. Sambhajinagar",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Observations and Review by Shri G. Sreekanth, IAS, Municipal Commissioner and Administrator, Chhatrapathi Sambhajinagar City",
        url: "https://gallery.life-first.in/hls/wastewater_treatment_plants_sambhajinagar/wastewater_treatment_plants_sambhajinagar.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767037128/city_liquid_waste_management_system_sambhajinagar_tdxjxq.png",
      },
      {
        id: 15,
        title: "Decentralized Water Treatment Plant",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing our WTP process walkthrough by our CEO, Mr. Sagar Shah, at Chhatrapati Sambhajinagar, under the guidance of Shri G. Sreekanth, IAS, Municipal Commissioner and Administrator, Chhatrapati Sambhajinagar City.",
        url: "https://gallery.life-first.in/hls/Decentralized%20Wastewater%20Treatment%20Plant%20-Chhatrapati%20Sambhajinagar%20-%20Chhatrapati%20Sambhajinagar%20Mahapalika%20(1080p%2C%20h264)/Decentralized%20Wastewater%20Treatment%20Plant%20-Chhatrapati%20Sambhajinagar%20-%20Chhatrapati%20Sambhajinagar%20Mahapalika%20(1080p%2C%20h264).m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767095896/decentralized_wtp_g_sreekanth_fbeij5.png",
      },
      {
        id: 16,
        title: "Innovative Decentralized Liquid Waste Management System - Nanded",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing our innovative decentralized liquid waste management system installed in Nanded.",
        url: "https://gallery.life-first.in/hls/innovative_decentralized_liquid_waste_management_system_nanded/innovative_decentralized_liquid_waste_management_system_nanded.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1767035135/innovative_decentralized_liquid_waste_management_system_ozgg69.png",
      },
      {
        id: 17,
        title: "Life First Eco Module Advanced System",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Overview of the Life First Eco Module advanced system and its treatment workflow.",
        url: "https://gallery.life-first.in/hls/life_first_eco_module_advanced_system/life_first_eco_module_advanced_system.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1766269478/Screenshot_20250812_235526_Gallery_dmiay2.jpg",
      },
      {
        id: 18,
        title: "BIO-STP Export To Kenya",
        category: "video",
        subcategory: "Products & Services",
        description:
          "Showcasing BIO-STP export dispatch activity for Kenya.",
        url: "https://gallery.life-first.in/hls/BIO-STP%20Export%20To%20Kenya%20/BIO-STP%20Export%20To%20Kenya%20.m3u8",
        thumbnail:
          "https://res.cloudinary.com/dsvfcckqy/image/upload/f_auto,q_auto/v1778261149/video-capture-t0007.26seg-7004_jpshmv.png",
      },
    ],
  };

  return (
    <>
      <Navigation />
      <section className="py-8 md:mt-26 mt-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 p-2 mb-2">
              Snapshots of Sustainability in Action
            </h2>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              A visual story of LifeFirst projects transforming water
              infrastructure and building a better future, one installation at a
              time.
            </p>
          </div>

          {/* Photos Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ImageIcon className="w-6 h-6" aria-hidden="true" /> Photos
            </h3>
            
            {/* Photos (Products & Services) */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Photos (Products & Services)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                {galleryData.images
                  .filter((item) => item.subcategory === "Products & Services")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative cursor-pointer">
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-56 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="text-white w-8 h-8" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl p-0">
                          <DialogHeader className="p-4">
                            <DialogTitle>{item.title}</DialogTitle>
                            <DialogDescription>
                              {item.description}
                            </DialogDescription>
                          </DialogHeader>
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
              </div>
            </div>

            {/* Photos (Others) */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Photos (Others)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                {galleryData.images
                  .filter((item) => item.subcategory === "Others")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative cursor-pointer">
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-56 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="text-white w-8 h-8" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl p-0">
                          <DialogHeader className="p-4">
                            <DialogTitle>{item.title}</DialogTitle>
                            <DialogDescription>
                              {item.description}
                            </DialogDescription>
                          </DialogHeader>
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Videos Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Play className="w-6 h-6" /> Videos
            </h3>
            
            {/* Videos (Products & Services) */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Videos (Products & Services)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryData.videos
                  .filter((item) => item.subcategory === "Products & Services")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative cursor-pointer">
                            <img
                              src={item.thumbnail}
                              alt={`Thumbnail for ${item.title}`}
                              className="w-full h-56 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="text-white w-12 h-12" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh] p-0 overflow-hidden flex flex-col">
                          <DialogHeader className="p-4 pb-4 bg-white flex-shrink-0">
                            <DialogTitle className="text-xl">{item.title}</DialogTitle>
                            <DialogDescription className="text-sm">
                              {item.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="relative w-full bg-black flex items-center justify-center overflow-hidden video-wrapper" style={{ height: 'calc(85vh - 140px)', minHeight: '400px' }}>
                            <HLSVideoPlayer
                              src={item.url}
                              title={item.title}
                              autoplay={true}
                              controls={true}
                              className="w-full h-full"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <div className="p-3 bg-white">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Videos (Others) */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Videos (Others)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryData.videos
                  .filter((item) => item.subcategory === "Others")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative cursor-pointer">
                            <img
                              src={item.thumbnail}
                              alt={`Thumbnail for ${item.title}`}
                              className="w-full h-56 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="text-white w-12 h-12" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh] p-0 overflow-hidden flex flex-col">
                          <DialogHeader className="p-4 pb-4 bg-white flex-shrink-0">
                            <DialogTitle className="text-xl">{item.title}</DialogTitle>
                            <DialogDescription className="text-sm">
                              {item.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="relative w-full bg-black flex items-center justify-center overflow-hidden video-wrapper" style={{ height: 'calc(85vh - 140px)', minHeight: '400px' }}>
                            <HLSVideoPlayer
                              src={item.url}
                              title={item.title}
                              autoplay={true}
                              controls={true}
                              className="w-full h-full"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <div className="p-3 bg-white">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* CTA Section */}
          <div className="text-center mt-12">
            {/* Additional Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <h3 className="text-3xl font-bold text-blue-600 mb-4">
                Transform Your Water Management Today
              </h3>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed mb-6">
                Join hundreds of satisfied clients who have revolutionized their
                Water, Wastewater, and Sanitation Management with our
                cutting-edge solutions. Connect with us today to explore how we
                can transform your project.
              </p>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-md font-medium cursor-pointer transition-all duration-200 hover:from-blue-700 hover:to-cyan-700">
                  Get Expert Guidance
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;