import { Course } from "@/types";

export const courses: Course[] = [
  {
    id: "computer-basics",
    title: "Computer Basics",
    category: "Computer Skills",
    description: "Master the fundamentals of computer operation, file management, and essential software skills. Perfect for beginners looking to build a strong foundation in computing.",
    duration: "2 Months",
    fee: 100000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    modules: [
      "Introduction to Computers",
      "Operating Systems Basics",
      "File Management",
      "Internet Basics",
      "Email Communication",
      "Computer Security Fundamentals",
      "Typing Skills",
      "Basic Troubleshooting"
    ],
    requirements: ["No prior experience needed", "Basic literacy skills", "Access to a computer"],
    outcomes: [
      "Operate a computer with confidence",
      "Manage files and folders effectively",
      "Use the internet safely and productively",
      "Send professional emails",
      "Perform basic computer maintenance"
    ],
    instructor: {
      name: "Eng. Orresy",
      title: "Senior ICT Instructor",
      image: "/images/Eng.ORRESY.png",
      bio: "Experienced ICT professional with over 10 years of teaching experience."
    },
    featured: true
  },
  {
    id: "c-programming",
    title: "C Programming",
    category: "Programming Languages",
    description: "Learn C programming from scratch. Understand pointers, memory management, and build a strong foundation for systems programming.",
    duration: "2 Months",
    fee: 150000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    modules: [
      "Introduction to C",
      "Variables and Data Types",
      "Control Structures",
      "Functions",
      "Arrays and Strings",
      "Pointers",
      "Dynamic Memory Allocation",
      "File Handling"
    ],
    requirements: ["Basic computer skills", "Logical thinking"],
    outcomes: [
      "Write efficient C programs",
      "Understand memory management",
      "Develop problem-solving skills",
      "Build a foundation for embedded systems"
    ],
    instructor: {
      name: "Arch. Illela",
      title: "Programming Expert",
      image: "/images/Arch.ILLELA.jpg",
      bio: "Expert programmer with years of experience in C and embedded systems."
    },
    featured: true
  },
  {
    id: "cpp-programming",
    title: "C++",
    category: "Programming Languages",
    description: "Master object-oriented programming with C++. Learn classes, inheritance, polymorphism, and the STL library.",
    duration: "2 Months",
    fee: 150000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    modules: [
      "C++ Basics",
      "Object-Oriented Programming",
      "Classes and Objects",
      "Inheritance",
      "Polymorphism",
      "Templates",
      "STL Library",
      "File I/O"
    ],
    requirements: ["Basic programming knowledge", "Understanding of C is a plus"],
    outcomes: [
      "Build object-oriented applications",
      "Use STL containers and algorithms",
      "Design and implement class hierarchies",
      "Write efficient C++ code"
    ],
    instructor: {
      name: "Eng. Orresy",
      title: "Software Engineering Lead",
      image: "/images/Eng.ORRESY.png",
      bio: "Full-stack developer and software engineering instructor."
    },
    featured: false
  },
  {
    id: "python",
    title: "Python",
    category: "Programming Languages",
    description: "Learn Python programming from basics to advanced. Perfect for data science, automation, and web development.",
    duration: "2 Months",
    fee: 250000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
    modules: [
      "Python Fundamentals",
      "Data Structures",
      "Functions and Modules",
      "Object-Oriented Python",
      "File Handling",
      "Exception Handling",
      "Libraries and Frameworks",
      "Mini Projects"
    ],
    requirements: ["Basic computer skills", "Logical thinking"],
    outcomes: [
      "Write Python scripts confidently",
      "Work with data structures",
      "Build real-world applications",
      "Prepare for data science career path"
    ],
    instructor: {
      name: "Eng. Godwin",
      title: "Python Developer & Instructor",
      image: "/images/Eng.GODWIN.png",
      bio: "Python specialist with expertise in data science and automation."
    },
    featured: true
  },
  {
    id: "java",
    title: "Java",
    category: "Programming Languages",
    description: "Comprehensive Java programming course covering core concepts, OOP, and enterprise application development.",
    duration: "2 Months",
    fee: 200000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    modules: [
      "Java Fundamentals",
      "OOP in Java",
      "Collections Framework",
      "Exception Handling",
      "Multithreading",
      "JDBC",
      "GUI Development",
      "Java EE Basics"
    ],
    requirements: ["Basic programming knowledge"],
    outcomes: [
      "Build Java applications",
      "Understand enterprise Java",
      "Work with databases",
      "Develop multithreaded applications"
    ],
    instructor: {
      name: "Arch. Illela",
      title: "Java Architect",
      image: "/images/Arch.ILLELA.jpg",
      bio: "Enterprise Java developer with extensive experience."
    },
    featured: false
  },
  {
    id: "javascript",
    title: "JavaScript",
    category: "Programming Languages",
    description: "Master JavaScript from fundamentals to advanced concepts including ES6+, async programming, and modern frameworks.",
    duration: "2 Months",
    fee: 180000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80",
    modules: [
      "JavaScript Basics",
      "DOM Manipulation",
      "ES6+ Features",
      "Async JavaScript",
      "APIs and Fetch",
      "Node.js Basics",
      "React Fundamentals",
      "Project Development"
    ],
    requirements: ["Basic HTML & CSS knowledge", "Logical thinking"],
    outcomes: [
      "Build interactive web applications",
      "Understand asynchronous programming",
      "Work with modern JavaScript frameworks",
      "Create full-stack applications"
    ],
    instructor: {
      name: "Eng. Orresy",
      title: "Full-Stack Developer",
      image: "/images/Eng.ORRESY.png",
      bio: "Expert JavaScript developer and web technologies instructor."
    },
    featured: true
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    category: "Programming Languages",
    description: "Learn modern HTML5 and CSS3 from scratch. Build responsive, beautiful websites with flexbox, grid, and animations.",
    duration: "2 Months",
    fee: 100000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80",
    modules: [
      "HTML5 Structure",
      "CSS Fundamentals",
      "Flexbox Layout",
      "CSS Grid",
      "Responsive Design",
      "CSS Animations",
      "Forms and Validation",
      "Project: Build a Website"
    ],
    requirements: ["No prior experience needed", "Basic computer skills"],
    outcomes: [
      "Build responsive websites",
      "Master CSS layouts",
      "Create beautiful UI designs",
      "Deploy websites to production"
    ],
    instructor: {
      name: "Eng. Godwin",
      title: "Web Design Instructor",
      image: "/images/Eng.GODWIN.png",
      bio: "Creative web designer and frontend developer."
    },
    featured: true
  },
  {
    id: "website-design",
    title: "Website Design",
    category: "Creative Skills",
    description: "Complete website design course covering UI/UX principles, wireframing, prototyping, and modern design tools.",
    duration: "2 Months",
    fee: 300000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80",
    modules: [
      "Design Principles",
      "Color Theory",
      "Typography",
      "UI/UX Fundamentals",
      "Wireframing",
      "Prototyping",
      "Figma Mastery",
      "Portfolio Development"
    ],
    requirements: ["Basic computer skills", "Creative mindset"],
    outcomes: [
      "Design professional websites",
      "Create wireframes and prototypes",
      "Master Figma",
      "Build a design portfolio"
    ],
    instructor: {
      name: "Arch. Illela",
      title: "UI/UX Design Lead",
      image: "/images/Arch.ILLELA.jpg",
      bio: "Award-winning designer with expertise in user experience."
    },
    featured: true
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    category: "Creative Skills",
    description: "Learn professional graphic design with Photoshop, Illustrator, and Canva. Create stunning visuals for print and digital media.",
    duration: "2 Months",
    fee: 250000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    modules: [
      "Design Fundamentals",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva Mastery",
      "Brand Identity Design",
      "Social Media Graphics",
      "Print Design",
      "Portfolio Creation"
    ],
    requirements: ["Basic computer skills", "Creative flair"],
    outcomes: [
      "Create professional designs",
      "Master Photoshop and Illustrator",
      "Design brand identities",
      "Build a professional portfolio"
    ],
    instructor: {
      name: "Eng. Godwin",
      title: "Creative Design Director",
      image: "/images/Eng.GODWIN.png",
      bio: "Professional graphic designer with agency experience."
    },
    featured: true
  },
  {
    id: "autocad",
    title: "AutoCAD",
    category: "Engineering & Design",
    description: "Professional AutoCAD training for engineering drawings, 2D drafting, and 3D modeling. Industry-standard certification preparation.",
    duration: "2 Months",
    fee: 150000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    modules: [
      "AutoCAD Interface",
      "2D Drawing Tools",
      "Editing and Modifying",
      "Layers and Properties",
      "Annotations and Dimensions",
      "Blocks and References",
      "3D Modeling Basics",
      "Plotting and Publishing"
    ],
    requirements: ["Engineering background preferred", "Basic computer skills"],
    outcomes: [
      "Create professional 2D drawings",
      "Develop 3D models",
      "Prepare construction documents",
      "Use AutoCAD efficiently"
    ],
    instructor: {
      name: "Arch. Illela",
      title: "CAD Specialist & Architect",
      image: "/images/Arch.ILLELA.jpg",
      bio: "Professional architect and CAD expert with years of industry experience."
    },
    featured: true
  },
  {
    id: "archicad",
    title: "ArchiCAD",
    category: "Engineering & Design",
    description: "Learn BIM (Building Information Modeling) with ArchiCAD. Master architectural design, documentation, and visualization.",
    duration: "2 Months",
    fee: 150000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    modules: [
      "BIM Fundamentals",
      "ArchiCAD Interface",
      "Building Elements",
      "Documentation",
      "3D Visualization",
      "Rendering",
      "Project Collaboration",
      "Final Project"
    ],
    requirements: ["Architecture or engineering background", "Basic CAD knowledge"],
    outcomes: [
      "Master BIM workflows",
      "Create architectural documentation",
      "Produce photorealistic renderings",
      "Collaborate on building projects"
    ],
    instructor: {
      name: "Arch. Illela",
      title: "BIM Specialist",
      image: "/images/Arch.ILLELA.jpg",
      bio: "BIM expert and architectural designer."
    },
    featured: false
  },
  {
    id: "solidworks",
    title: "SolidWorks",
    category: "Engineering & Design",
    description: "Professional SolidWorks training for 3D mechanical design, simulation, and product development.",
    duration: "2 Months",
    fee: 200000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
    modules: [
      "SolidWorks Interface",
      "Sketching",
      "Part Modeling",
      "Assemblies",
      "Drawings",
      "Sheet Metal",
      "Simulation Basics",
      "Final Project"
    ],
    requirements: ["Engineering background", "Mechanical aptitude"],
    outcomes: [
      "Create 3D mechanical models",
      "Design assemblies",
      "Generate engineering drawings",
      "Perform basic simulations"
    ],
    instructor: {
      name: "Eng. Orresy",
      title: "Mechanical Design Engineer",
      image: "/images/Eng.ORRESY.png",
      bio: "Mechanical engineer with expertise in product design."
    },
    featured: true
  },
  {
    id: "microsoft-word",
    title: "Microsoft Word",
    category: "Computer Skills",
    description: "Master Microsoft Word for professional document creation, formatting, and advanced features.",
    duration: "2 Months",
    fee: 100000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
    modules: [
      "Getting Started with Word",
      "Text Formatting",
      "Paragraphs and Styles",
      "Tables and Lists",
      "Images and Graphics",
      "Mail Merge",
      "Review and Collaboration",
      "Advanced Features"
    ],
    requirements: ["Basic computer skills"],
    outcomes: [
      "Create professional documents",
      "Use advanced formatting",
      "Work with templates",
      "Collaborate on documents"
    ],
    instructor: {
      name: "Eng. Godwin",
      title: "Computer Skills Instructor",
      image: "/images/Eng.GODWIN.png",
      bio: "Expert in computer applications and productivity tools."
    },
    featured: false
  },
  {
    id: "microsoft-excel",
    title: "Microsoft Excel",
    category: "Computer Skills",
    description: "Comprehensive Excel training from basics to advanced formulas, pivot tables, and data analysis.",
    duration: "2 Months",
    fee: 100000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    modules: [
      "Excel Basics",
      "Formulas and Functions",
      "Data Management",
      "Charts and Graphs",
      "Pivot Tables",
      "Advanced Formulas",
      "Data Analysis",
      "Macros and VBA"
    ],
    requirements: ["Basic computer skills"],
    outcomes: [
      "Create professional spreadsheets",
      "Use advanced formulas",
      "Analyze data effectively",
      "Automate tasks with macros"
    ],
    instructor: {
      name: "Eng. Orresy",
      title: "Data Analysis Instructor",
      image: "/images/Eng.ORRESY.png",
      bio: "Data analytics expert and Excel specialist."
    },
    featured: false
  },
  {
    id: "microsoft-powerpoint",
    title: "Microsoft PowerPoint",
    category: "Computer Skills",
    description: "Create stunning presentations with Microsoft PowerPoint. Learn design principles, animations, and professional presentation skills.",
    duration: "2 Months",
    fee: 100000,
    currency: "TZS",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    modules: [
      "PowerPoint Basics",
      "Slide Design",
      "Text and Graphics",
      "Transitions and Animations",
      "Multimedia Integration",
      "Templates and Themes",
      "Presentation Skills",
      "Final Project"
    ],
    requirements: ["Basic computer skills"],
    outcomes: [
      "Create engaging presentations",
      "Use animations effectively",
      "Design professional slides",
      "Deliver confident presentations"
    ],
    instructor: {
      name: "Eng. Godwin",
      title: "Presentation Skills Coach",
      image: "/images/Eng.GODWIN.png",
      bio: "Expert in business communication and presentations."
    },
    featured: false
  }
];

export const categories = [
  { name: "Programming Languages", icon: "Code", count: 7 },
  { name: "Engineering & Design", icon: "HardHat", count: 3 },
  { name: "Creative Skills", icon: "Palette", count: 2 },
  { name: "Computer Skills", icon: "Monitor", count: 4 }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => course.category === category);
};

export const getFeaturedCourses = (): Course[] => {
  return courses.filter(course => course.featured);
};
