export type JobSection = {
  heading: string;
  items: string[];
};

export type JobDescription = {
  positions?: string;
  experience?: string;
  employmentType?: string;
  sections: JobSection[];
};

export type Job = {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  pdf?: string;
  // Optional structured JD. When present, it's rendered directly on the
  // job page instead of the embedded PDF viewer. Add one per role as the
  // content becomes available; roles without it fall back to the PDF link.
  description?: JobDescription;
};

export const jobs: Job[] = [
  {
    id: 1,
    slug: "project-engineer",
    title: "Project Engineer",
    department: "Projects",
    location: "Wadki",
    pdf: "https://careers.life-first.in/JD%20FOR%20PROJECT%20ENGINEER%20(1).pdf",
    description: {
      positions: "3",
      experience: "3–4 Years",
      employmentType: "Full-Time",
      sections: [
        {
          heading: "Key Responsibilities",
          items: [
            "Assist in planning, execution, and monitoring of project activities as per approved drawings and schedules.",
            "Coordinate with site engineers, contractors, vendors, and consultants.",
            "Monitor project progress, timelines, quality, and safety standards.",
            "Prepare and maintain daily progress reports (DPR), weekly and monthly reports.",
            "Ensure material availability and coordinate procurement as per project requirements.",
            "Verify measurements, quantities, and contractor bills.",
            "Support project documentation including BOQs, drawings, and technical submittals.",
            "Identify project risks and escalate issues to senior management.",
            "Ensure compliance with statutory regulations and company policies.",
            "Attend project meetings and follow up on action items.",
          ],
        },
        {
          heading: "Skills & Competencies",
          items: [
            "Strong technical knowledge of engineering and construction practices.",
            "Ability to read and interpret drawings and specifications.",
            "Proficient in MS Office; AutoCAD knowledge is an advantage.",
            "Good coordination, communication, and problem-solving skills.",
            "Ability to manage multiple tasks and work under pressure.",
          ],
        },
        {
          heading: "Educational Qualification",
          items: [
            "B.E./B.Tech / Diploma in Civil / Mechanical / Electrical Engineering or related field.",
          ],
        },
        {
          heading: "Preferred Candidate Profile",
          items: [
            "3–4 years of experience in project execution and coordination.",
            "Experience in residential, commercial, or industrial projects.",
            "Willingness to work at site.",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    slug: "process-design-engineer",
    title: "Process Design Engineer",
    department: "Process Engineering",
    location: "Wadki",
    pdf: "https://careers.life-first.in/JD%20FOR%20PROCESS%20DESIGN%20ENGINEER.pdf",
    description: {
      positions: "1",
      experience: "5 Years",
      employmentType: "Full-Time",
      sections: [
        {
          heading: "Key Responsibilities",
          items: [
            "Develop and design process flow diagrams (PFDs) and piping & instrumentation diagrams (P&IDs).",
            "Perform process calculations including material and energy balances.",
            "Select and size process equipment such as pumps, heat exchangers, reactors, vessels, and columns.",
            "Prepare datasheets, technical specifications, and design documents.",
            "Conduct process simulations and optimization studies.",
            "Coordinate with multidisciplinary teams including mechanical, piping, electrical, and instrumentation.",
            "Participate in HAZOP, HAZID, and risk assessment studies.",
            "Review vendor drawings and technical documents for compliance with process requirements.",
            "Support commissioning, start-up, and troubleshooting activities.",
            "Ensure designs comply with industry standards, safety regulations, and client specifications.",
          ],
        },
        {
          heading: "Skills & Competencies",
          items: [
            "Strong knowledge of process engineering principles and design standards.",
            "Proficiency in process simulation software (Aspen HYSYS, Aspen Plus, or equivalent).",
            "Ability to interpret P&IDs, datasheets, and technical specifications.",
            "Good analytical, problem-solving, and communication skills.",
            "Knowledge of safety standards and statutory compliance.",
          ],
        },
        {
          heading: "Educational Qualification",
          items: ["B.E./B.Tech in Chemical Engineering or Process Engineering."],
        },
        {
          heading: "Preferred Candidate Profile",
          items: [
            "Minimum 5 years of experience in process design for chemical, petrochemical, oil & gas, or manufacturing industries.",
            "Experience in basic and detailed engineering.",
            "Exposure to EPC projects is an advantage.",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: "plumber",
    title: "Plumber",
    department: "Maintenance / Projects",
    location: "Wadki",
    pdf: "https://careers.life-first.in/JD%20FOR%20PLUMBER.pdf",
    description: {
      positions: "5",
      experience: "Minimum 5 Years",
      employmentType: "Full-Time",
      sections: [
        {
          heading: "Key Responsibilities",
          items: [
            "Install, repair, and maintain plumbing systems including water supply, drainage, and sanitary systems.",
            "Read and interpret plumbing drawings, layouts, and specifications.",
            "Perform installation of pipes, fittings, fixtures, valves, and sanitary ware.",
            "Identify and troubleshoot plumbing issues such as leakages, blockages, and pressure problems.",
            "Ensure plumbing work is executed as per quality standards and safety norms.",
            "Coordinate with site engineers and other trades for smooth execution of work.",
            "Conduct pressure testing and ensure proper functioning of systems.",
            "Maintain tools, equipment, and material usage records.",
            "Follow site safety procedures and statutory guidelines.",
          ],
        },
        {
          heading: "Skills & Competencies",
          items: [
            "Strong knowledge of plumbing tools, materials, and installation methods.",
            "Ability to read basic drawings and work independently.",
            "Good problem-solving skills.",
            "Knowledge of safety practices at site.",
            "Physically fit and willing to work at site.",
          ],
        },
        {
          heading: "Educational Qualification",
          items: ["ITI / Trade Certificate in Plumbing (preferred)."],
        },
        {
          heading: "Preferred Candidate Profile",
          items: [
            "Minimum 5 years of hands-on experience in residential, commercial, or industrial projects.",
            "Experience in water supply, drainage, and sanitary systems.",
            "Ability to handle work independently with minimal supervision.",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    slug: "electromechanical-engineer",
    title: "Electromechanical Engineer",
    department: "Engineering / Projects",
    location: "Project Site / Wadki",
    pdf: "https://careers.life-first.in/JD%20FOR%20ELECTROMACHANICAL%20ENGINEER.pdf",
    description: {
      positions: "2",
      experience: "5 Years",
      employmentType: "Full-Time",
      sections: [
        {
          heading: "Key Responsibilities",
          items: [
            "Plan, execute, and supervise electromechanical works including electrical, mechanical, HVAC, plumbing, and firefighting systems.",
            "Coordinate with civil, electrical, and mechanical teams for integrated project execution.",
            "Review and execute work as per approved drawings, specifications, and project schedules.",
            "Monitor installation, testing, commissioning, and handover of electromechanical systems.",
            "Prepare BOQs, material take-offs, and technical submittals.",
            "Coordinate with vendors, subcontractors, and consultants.",
            "Ensure quality standards, safety norms, and statutory compliance.",
            "Maintain daily progress reports (DPR) and technical documentation.",
            "Inspect site works, identify issues, and provide technical solutions.",
            "Verify measurements and certify contractor bills.",
            "Support maintenance and troubleshooting of installed systems as required.",
          ],
        },
        {
          heading: "Skills & Competencies",
          items: [
            "Strong knowledge of electromechanical systems and site execution.",
            "Ability to read and interpret MEP drawings and schematics.",
            "Proficient in AutoCAD, MS Office; knowledge of MS Project is an advantage.",
            "Good coordination, communication, and problem-solving skills.",
            "Knowledge of safety standards and statutory regulations.",
          ],
        },
        {
          heading: "Educational Qualification",
          items: [
            "B.E./B.Tech / Diploma in Mechanical / Electrical / Electromechanical Engineering.",
          ],
        },
        {
          heading: "Preferred Candidate Profile",
          items: [
            "Minimum 5 years of relevant experience in electromechanical or MEP projects.",
            "Experience in commercial, industrial, or residential projects.",
            "Willingness to work at site and handle multiple activities.",
          ],
        },
      ],
    },
  },
  {
    id: 5,
    slug: "electrician",
    title: "Electrician",
    department: "Electrical / Maintenance / Projects",
    location: "Project Site / Wadki",
    pdf: "https://careers.life-first.in/JD%20FOR%20ELECTRICIAN.pdf",
    description: {
      positions: "2",
      experience: "Minimum 5 Years",
      employmentType: "Full-Time",
      sections: [
        {
          heading: "Key Responsibilities",
          items: [
            "Install, maintain, and repair electrical wiring, panels, switches, sockets, and fixtures.",
            "Read and interpret electrical drawings, layouts, and schematics.",
            "Perform installation of LT panels, DBs, cable trays, conduits, and earthing systems.",
            "Identify and troubleshoot electrical faults and ensure quick resolution.",
            "Conduct testing, commissioning, and preventive maintenance of electrical systems.",
            "Ensure electrical work complies with safety standards and statutory regulations.",
            "Coordinate with site engineers and other trades for smooth execution of work.",
            "Maintain tools, equipment, and material usage records.",
            "Follow site safety procedures and company policies.",
          ],
        },
        {
          heading: "Skills & Competencies",
          items: [
            "Strong knowledge of electrical systems and safety practices.",
            "Ability to read drawings and work independently.",
            "Experience in industrial, commercial, or residential electrical work.",
            "Good problem-solving skills and attention to detail.",
            "Physically fit and willing to work at site.",
          ],
        },
        {
          heading: "Educational Qualification",
          items: ["ITI / Diploma in Electrical Trade (mandatory)."],
        },
        {
          heading: "Preferred Candidate Profile",
          items: [
            "Minimum 5 years of hands-on experience in electrical installation and maintenance.",
            "Knowledge of LT/HT systems (HT preferred but not mandatory).",
            "Valid electrical license (if applicable).",
          ],
        },
      ],
    },
  },
  {
    id: 6,
    slug: "civil-engineer",
    title: "Civil Engineer",
    department: "Engineering / Projects",
    location: "Project Site / Wadki",
    pdf: "https://careers.life-first.in/JD%20FOR%20CIVIL%20ENGINEER.pdf ",
    description: {
      positions: "2",
      experience: "3–4 Years",
      employmentType: "Full-Time",
      sections: [
        {
          heading: "Key Responsibilities",
          items: [
            "Supervise and execute civil construction works at site as per approved drawings and specifications.",
            "Coordinate with contractors, subcontractors, and vendors to ensure smooth project execution.",
            "Prepare and review BOQs, estimates, and material requirements.",
            "Monitor project schedules, quality standards, and safety compliance.",
            "Conduct site inspections and resolve technical and execution-related issues.",
            "Maintain daily progress reports (DPR) and site documentation.",
            "Verify measurements and certify contractor bills.",
            "Ensure compliance with statutory norms, safety standards, and company policies.",
            "Coordinate with architects, consultants, and clients for technical clarifications.",
            "Manage manpower and site resources effectively.",
          ],
        },
        {
          heading: "Skills & Competencies",
          items: [
            "Strong knowledge of civil construction practices and standards.",
            "Ability to read and interpret drawings, BOQs, and specifications.",
            "Proficiency in AutoCAD and MS Office.",
            "Good communication, coordination, and leadership skills.",
            "Problem-solving and time-management abilities.",
          ],
        },
        {
          heading: "Educational Qualification",
          items: [
            "B.E./B.Tech in Civil Engineering or Diploma in Civil Engineering.",
          ],
        },
        {
          heading: "Preferred Candidate Profile",
          items: [
            "3–4 years of hands-on experience in residential, commercial, or industrial projects.",
            "Experience in site execution, billing, and coordination.",
            "Willingness to work at project sites.",
          ],
        },
      ],
    },
  },
  {
    id: 7,
    slug: "hr-admin-executive",
    title: "HR & Admin Executive",
    department: "HR & Admin",
    location: "Wadki",
    pdf: "https://careers.life-first.in/JD%20FOR%20HR%20ADMIN.pdf",
    description: {
      positions: "2",
      experience: "3–4 Years",
      employmentType: "Full-Time",
      sections: [
        {
          heading: "HR Responsibilities",
          items: [
            "Manage end-to-end recruitment including sourcing, screening, scheduling interviews, and onboarding.",
            "Maintain employee records, personal files, and HR databases.",
            "Handle attendance, leave management, and payroll coordination.",
            "Ensure compliance with statutory requirements such as PF, ESIC, PT, and labor laws.",
            "Coordinate performance appraisal processes and employee engagement activities.",
            "Handle employee queries, grievances, and disciplinary procedures.",
            "Draft HR-related letters such as appointment, confirmation, warning, and relieving letters.",
          ],
        },
        {
          heading: "Administrative Responsibilities",
          items: [
            "Manage office administration including vendor coordination, facility management, and housekeeping.",
            "Maintain inventory of office supplies and assets.",
            "Coordinate with service providers for repairs, maintenance, and AMC.",
            "Handle travel arrangements, accommodation, and general admin support.",
            "Ensure smooth day-to-day office operations.",
            "Maintain records of contracts, agreements, and invoices.",
          ],
        },
        {
          heading: "Skills & Competencies",
          items: [
            "Strong knowledge of HR policies, labor laws, and compliance.",
            "Good communication and interpersonal skills.",
            "Proficient in MS Office (Excel, Word, PowerPoint).",
            "Ability to multitask and handle confidential information.",
            "Strong organizational and time management skills.",
          ],
        },
        {
          heading: "Educational Qualification",
          items: ["Graduate/Post Graduate in HR, Administration, or related field."],
        },
        {
          heading: "Preferred Candidate Profile",
          items: [
            "3–4 years of relevant experience in HR & Administration.",
            "Experience in payroll coordination and statutory compliance.",
            "Ability to work independently and handle pressure.",
          ],
        },
      ],
    },
  },
];
