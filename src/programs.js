import electricalEngineeringImage from "./assets/electricalEngineering.webp";
import electricalInstallationImage from "./assets/electricalInstallation.webp";
import solarInstallationImage from "./assets/solar-installation.webp";
import cctvImage from "./assets/CCTV.webp";

import basicCookingImage from "./assets/BasicCookingandFood.jpg";
import cakeDecorationImage from "./assets/cakeDecoration.jpg";

const programs = {
  electricalEngineering: {
    title: "Electrical Engineering",
    image: electricalEngineeringImage,

    description:
      "Training in electrical systems, installation, automation, and renewable energy technologies.",

    programs: [
      {
        course: "CCTV",
        image: cctvImage,
        description:
          "Installation, configuration, and maintenance of CCTV security systems.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
      {
        course: "Solar Installation",
        image: solarInstallationImage,
        description:
          "Design, installation, and maintenance of solar power systems.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
      {
        course: "Electrical Installation",
        image: electricalInstallationImage,
        description:
          "Domestic and industrial electrical wiring and installation skills.",
        feePerMonth: 5000,
        duration: "3 Months",
      },
    ],
  },

  hospitalityAndFoodProduction: {
    title: "Hospitality & Food Production",
    image: basicCookingImage,

    description:
      "Culinary arts, food preparation, beverage service, and hospitality operations.",

    programs: [
      {
        course: "Basic Cookery & F&B Operations",
        image: basicCookingImage,
        description:
          "Fundamentals of cooking, kitchen operations, and food safety.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Cake Decoration",
        image: cakeDecorationImage,
        description:
          "Techniques for baking and decorating cakes for commercial use.",
        feePerMonth: 4500,
        duration: "2 Months",
      },
      {
        course: "Milk Products",
        description:
          "Preparation of dairy-based food and beverage products.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Barista & Mixology",
        description:
          "Coffee preparation, beverage crafting, and cocktail mixing skills.",
        feePerMonth: 10000,
        duration: "3 Months",
      },
      {
        course: "Food & Beverage Service",
        description:
          "Restaurant service skills and customer hospitality training.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
    ],
  },

  hospitalityAccommodation: {
    title: "Hospitality & Accommodation",

    description:
      "Training in hotel operations, guest services, housekeeping, and front office management.",

    programs: [
      {
        course: "House Keeping Operations",
        description:
          "Cleaning, room preparation, and hotel housekeeping standards.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Front Office Operations",
        description:
          "Reception duties, booking systems, and guest relations.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Laundry & Dry Cleaning",
        description:
          "Fabric care, washing techniques, and dry-cleaning operations.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
    ],
  },

  buildingAndConstruction: {
    title: "Building & Construction",

    description:
      "Construction skills including masonry, plumbing, finishing, and building technologies.",

    programs: [
      {
        course: "Plumbing & Pipe Fitting",
        description:
          "Installation and repair of water and drainage systems.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Painting & Decoration",
        description:
          "Interior and exterior finishing, painting, and surface decoration.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Steel Fixing",
        description:
          "Reinforcement bar installation for concrete structures.",
        feePerMonth: 7500,
        duration: "2 Months",
      },
      {
        course: "Tile Fixing",
        description:
          "Floor and wall tiling techniques for construction finishing.",
        feePerMonth: 5000,
        duration: "3 Months",
      },
    ],
  },

  automotiveEngineering: {
    title: "Automotive Engineering",

    description:
      "Vehicle maintenance, repair, diagnostics, and automotive electrical systems.",

    programs: [
      {
        course: "Panel Beating",
        description:
          "Vehicle body repair, dent removal, and repainting.",
        feePerMonth: 6000,
        duration: "3 Months",
      },
      {
        course: "Motor Vehicle Mechanics",
        description:
          "Engine repair, servicing, and mechanical diagnostics.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Auto Electrical & Wiring",
        description:
          "Vehicle electrical systems and wiring diagnostics.",
        feePerMonth: 5000,
        duration: "3 Months",
      },
    ],
  },

  ictDepartment: {
    title: "ICT Department",

    description:
      "Computer literacy, software development, networking, and IT support skills.",

    programs: [
      {
        course: "Computer Repair & Maintenance",
        description:
          "Hardware troubleshooting and system maintenance.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Website Design",
        description:
          "Creating modern responsive websites and web applications.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
      {
        course: "Internet & Networking",
        description:
          "Computer networking, LAN setup, and internet systems.",
        feePerMonth: 1750,
        duration: "2 Months",
      },
      {
        course: "Computer Packages",
        description:
          "Basic computer skills including office applications.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
    ],
  },

  beautyAndCosmetology: {
    title: "Beauty & Cosmetology",

    description:
      "Beauty therapy, grooming, skincare, body treatment, and personal styling.",

    programs: [
      {
        course: "Weaving & Braiding",
        description:
          "Hair weaving and braiding styling techniques.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
      {
        course: "Barbering",
        description:
          "Hair cutting, styling, and grooming techniques.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
      {
        course: "Wig Making & Installation",
        description:
          "Wig design, styling, and installation techniques.",
        feePerMonth: 8000,
        duration: "2 Months",
      },
      {
        course: "Nail Technology",
        description:
          "Manicure, pedicure, and nail art design.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
      {
        course: "Massage (All Types)",
        description:
          "Massage techniques for relaxation and wellness.",
        feePerMonth: 5000,
        duration: "2 Months",
      },
      {
        course: "Waxing",
        description:
          "Hair removal techniques using waxing methods.",
        feePerMonth: 6000,
        duration: "3 Months",
      },
      {
        course: "Tattooing",
        description:
          "Body art design and tattoo application techniques.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Micro-blading",
        description:
          "Eyebrow semi-permanent makeup techniques.",
        feePerMonth: 5000,
        duration: "1 Month",
      },
      {
        course: "Eyelash Extension",
        description:
          "Application of artificial eyelash extensions.",
        feePerMonth: 6000,
        duration: "1 Month",
      },
      {
        course: "Skincare (Facial)",
        description:
          "Facial treatments and skincare routines.",
        feePerMonth: 6000,
        duration: "2 Months",
      },
      {
        course: "Make-Up",
        description:
          "Professional makeup artistry and application.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
    ],
  },

  fashionAndDesign: {
    title: "Fashion & Design",

    description:
      "Clothing design, tailoring, textile creation, and fashion production skills.",

    programs: [
      {
        course: "Pattern Drafting",
        description:
          "Creating clothing patterns for garment production.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Dress Making",
        description:
          "Designing and sewing dresses and garments.",
        feePerMonth: 6000,
        duration: "3 Months",
      },
      {
        course: "Tailoring",
        description:
          "General clothing construction and alteration skills.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Cloth Construction",
        description:
          "Fabric handling and garment assembly techniques.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Crochet / Knitting",
        description:
          "Handmade textile design using yarn and thread.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
      {
        course: "Embroidery / Decoration",
        description:
          "Fabric decoration using embroidery techniques.",
        feePerMonth: 4500,
        duration: "3 Months",
      },
    ],
  },

  mediaAndCreativeArts: {
    title: "Media & Creative Arts",

    description:
      "Creative media production including photography, video, design, and digital content creation.",

    programs: [
      {
        course: "Photography",
        description:
          "Professional photography and image composition techniques.",
        feePerMonth: 5000,
        duration: "3 Months",
      },
      {
        course: "Videography",
        description:
          "Video shooting, editing, and production skills.",
        feePerMonth: 5000,
        duration: "3 Months",
      },
      {
        course: "Graphic Design",
        description:
          "Visual design using digital tools and software.",
        feePerMonth: 10000,
        duration: "3 Months",
      },
      {
        course: "Drone Piloting",
        description:
          "Operating drones for aerial photography and videography.",
        feePerMonth: 10000,
        duration: "1 Month",
      },
      {
        course: "Deejaying",
        description:
          "DJ mixing, sound equipment operation, and event performance skills.",
        feePerMonth: 10000,
        duration: "1 Month",
      },
      {
        course: "Live Streaming",
        description:
          "Producing and managing live digital broadcasts.",
        feePerMonth: 10000,
        duration: "1 Month",
      },
    ],
  },
};

export default programs;