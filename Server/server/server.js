const express = require('express');
const hbs = require('hbs');
let cors = require('cors')
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let lineReader = require('line-reader');
let index = require('../routes/index');

//MongoDB code
let modelMain = require("../models/modelMain");
let mongo = require('mongodb');
let monk = require('monk');
let db = monk('localhost:27017/eRecruitDB');
let app = express();


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const jobs = [
    { id: 1, type: "Software Engineer", location: "San Jose", desc: "Software Dev Engineer I\n" +
            "Expedia - San Jose, CA 95138 (Santa Teresa area). Expedia \n" +
            "\n" +
            "Leading luxury travel e-retailer looking for a talented developer to join our team of driven tech professionals! We're a supportive and skilled group looking for a hands-on individual ready to hit the ground running and make a big impact on exciting upcoming projects. Gain experience under some of the industry's most passionate developers. \n" +
            "\n" +
            "What you’ll do:\n" +
            "Drive technical implementation at the application/product level for small to mid-sized projects. \n" +
            "Provide quality implementation of a component or feature (typically 1-4 weeks in duration) with peer and manager support. \n" +
            "Provide improvements to solutions for a given problem. \n" +
            "Resolve problems and roadblocks as they occur with help from peers or managers. Follow through on details and drives issues to closure with help from peers or managers. \n" +
            "Support development of documentation and procedures for installation and maintenance. \n" +
            "Actively participate in group technology reviews to critique work of self and others. \n" +
            "Learn to contribute to requirement definition process. \n" +
            "\n" +
            "Who you are:\n" +
            "Degree in science (Computer Science / Information Technology, Computer Science, Computer Engineering) \n" +
            "Good knowledge of English \n" +
            "3-4 years experience in web-oriented environments or backend / services programming \n" +
            "Technical analysis and object oriented programming \n" +
            "XHTML, DHTML, Javascript, CSS, web, web 2.0, PHP, Java and SQL \n" +
            "OS: Unix, Linux \n" +
            "Database: Sybase, MySQL \n" +
            "\n" +
            "Why join us:\n" +
            "Expedia Group recognizes our success is dependent on the success of our people. We are the world's travel platform, made up of the most knowledgeable, passionate, and creative people in our business. Our brands recognize the power of travel to break down barriers and make people's lives better – that responsibility inspires us to be the place where exceptional people want to do their best work, and to provide them the tools to do so. \n" +
            "\n" } ,
    { id: 2, type: "Software Engineer", location: "San Jose", desc: "Software Engineer, Entry-Level (2019)\n" +
            "Coursera - Mountain View, CA 94041. Coursera is scaling a global platform to provide universal access to the world’s best education, and we’re motivated by the passion and mission to transform lives through learning. Our platform has reached over 30 million learners worldwide and we have partnered with 150+ elite universities around the globe with over 2,000 courses in our catalog. We offer Courses, Specializations, Certificates, and Degrees to meet the needs and goals of the diverse learners who to come Coursera.\n" +
            "In 2016, we began offering fully accredited online Masters degrees which provide a more convenient, lower-cost, “stackable” means of earning credentials identical to their traditional on-campus counterparts. We also launched Coursera for Business, partnering with enterprise companies around the world to provide access to curated skill development for their employees.\n" +
            "We are looking for software engineers who can have an immediate impact on our codebase and our mission. For this position, we are open to new graduates or professionals with less than one year of experience.\n" +
            "As an engineer at Coursera, you will be empowered to build well-engineered products that shape new platform features and advance our technical infrastructure. You will be encouraged to build reliable, scalable, testable, and efficient systems.\n" +
            "We innovate, productize, and iterate at start-up speed, deploying our code over 25 times a day. When you join our team, you will be given the opportunity to take ownership of significant parts of our codebase.\n" +
            "Some Cool Projects our Entry Level Software Engineers worked on:\n" +
            "\n" +
            "    VM-less Frontend Development, allowing frontend developers to develop JavaScript applications without installing the entire Coursera stack on our laptops\n" +
            "    Scaling Content Production, building better tooling and visualization to simplify and accelerate the content creation process for our instructors\n" +
            "    Rewriting the mobile download experience which boosted accessibility of downloads by creating a download widget on course outlines and wrote a downloads API to use throughout entire app\n" +
            "    Building UI for a message inbox within the course experience, helping learners keep up-to-date with communications from course instructors and Coursera as they go through the course\n" +
            "\n" +
            "Your Responsibilities\n" +
            "\n" +
            "    Rapidly innovate on products and scalable infrastructure with a fail fast mindset\n" +
            "    Implement features using cutting edge technologies (i.e. React.js, Scala, Swift, Kotlin)\n" +
            "    Work in a cross functional team of engineers, PMs, designers, and UX researchers\n" +
            "    Own projects and drive scoping and prioritization decisions\n" +
            "    Measure your work thoroughly, analyze results, and drive new product changes through A/B testing" },
    { id: 3, type: "Software Engineer", location: "San Jose", desc: "MTS 1, Software Engineer\n" +
            " eBay Inc. - San Jose, CA. Job Description\n" +
            "Looking for a company that inspires passion, courage and imagination, where you can be part of the team shaping the future of global commerce? Want to shape how millions of people buy, sell, connect, and share around the world? If youre interested in joining a purpose driven community that is dedicated to creating an ambitious and inclusive workplace, join eBay a company you can be proud to be a part of.\n" +
            "Primary Job Responsibilities: Do you want to make an impact on the worlds largest e-commerce website? Are you interested in building performance efficient, high-volume and highly scalable distributed systems? We have a place for you!\n" +
            "We are looking for a senior back-end software engineer to work in Trust product development team that builds applications for eBay marketplaces After Sales areas Cancel, Return, eBay Money Back guarantee, Member to Member Messaging, Feedback and Seller Standards. As a self-motivated and enthusiastic member of our team, you will work with extremely talented peers in a fun environment building world class risk products. You will work in an agile environment with a focus on problem solving and engineering excellence.\n" +
            "\n" +
            "\n" +
            "Job responsibilities:\n" +
            "Build solutions using your strong background in large scale web applications.\n" +
            "Lead product initiatives, recommend improvements, mentor and guide junior team members\n" +
            "Estimate engineering effort, plan implementation, and rollout system changes\n" +
            "Participate in all aspects of PDLC including requirement/design reviews as well as code reviews\n" +
            "Work with other engineers, Architecture, Product Management, QA, and Operations teams to develop innovative solutions that meet business needs with respect to functionality, performance, scalability, reliability, realistic implementation schedules and adherence to development principles and product goals.\n" +
            "Push the bar to solve complex technical challenges of scale and performance\n" +
            "\n" +
            "\n" +
            "Job Requirements:\n" +
            "10+ years of software design and development experience, solid foundation in computer science with strong competencies in data structures, algorithms, and software design\n" +
            "Excellent knowledge in practicing OOAD, architectural and design patterns, open source platforms, Web Technologies, frameworks, and software engineering methodologies.\n" +
            "Experience developing data-driven applications using an industry standard RDBMS\n" +
            "Experience in object-oriented design methodology and large scale application development in Java (or any other object oriented language)\n" +
            "Experience with big data solutions such as Hadoop, MapReduce, Hive, Pig, Kafka, Storm etc. is a plus.\n" +
            "Strong expertise in agile development.\n" +
            "Demonstrated ability to understand the business and ability to contribute to technology direction that contributes to measurable business improvements.\n" +
            "Ability to think out of the box in solving real world problems.\n" +
            "Excellent decision-making, communication and collaboration, analytical skills.\n" +
            "BSCS or other equivalent technical degree" },
    { id: 4, type: "Software Engineer", location: "San Jose", desc: "Backend Java Software Engineer\n" +
            " Jonajo Consulting - Palo Alto, CA. \n" +
            "Do you love algorithms, building services at scale, and optimizing performance? As a member of the Backend team, you will be responsible for designing and building the features and underlying systems that power our core product. You'll get to work with a variety of external and internally developed technologies. Our backend stack is constantly evolving, and you will directly contribute to improving the flexibility, scalability, and efficiency of our system.\n" +
            "\n" +
            "RESPONSIBILITIES\n" +
            "\n" +
            "    Develop reliable, scalable, and flexible systems\n" +
            "    Design, implement, test and maintain backend components: application, data, infrastructure, analytics and deployment\n" +
            "    Design and build systems with automated instrumentation and monitoring\n" +
            "    Design and Implement RESTful APIs\n" +
            "    Live and breathe system reliability and up-time\n" +
            "    Consistently improve maintainability and stability of the codebase\n" +
            "    Identify and resolve performance and Scalability issues\n" +
            "\n" +
            "REQUIREMENTS\n" +
            "\n" +
            "    4+ years industry experience\n" +
            "    Excited to use new technologies\n" +
            "    Strong foundation in programming, algorithms, and software application design\n" +
            "    Experience with Java and possibly Python\n" +
            "    Broad knowledge on databases, data structures, data modeling\n" +
            "    Strong coder who can easily pass algorithm coding tests\n" +
            "    Experience with MySql or any RDBMS\n" +
            "    Experience with Graph algorithms\n" +
            "    Experience with NoSQL - Hadoop, Cassandra, MongoDB\n" +
            "    Passionate about solving challenging problems and iterating quickly\n" +
            "    Passion for agile, test-driven development, continuous integration and automated testing\n" +
            "    Solid understanding of distributed systems and functional programming paradigms"},
    { id: 5, type: "Software Engineer", location: "San Jose", desc: "Backend Java Software Engineer\n" +
            " Blue Sages - Mountain View, CA \n" +
            "Blue Sages looking for a Software Engineer (Robotic Controls). This person needs to be able to work independently and contribute to a group. We are looking for someone who is excited about being part of a team that will be changing the quality of life for patients across the world.\n" +
            "\n" +
            "This person will drive exceptional product quality, safety, design and reliability through the R&D/Software Development and Quality teams and into the product. As a Software Engineer this position is responsible for testing the design and implementation of robotics and control algorithms. This important technical position will have direct influence on software and system product quality for R&D/production builds and release to market. This individual will work closely with software development engineers to define test strategies, write and execute test cases, and build automated test routines. They will actively participate in the software development lifecycle through review of requirements, risk management, software architecture designs and maintaining tractability in an agile SW development environment. This Software Engineer is part of the agile sprint team for their assigned software code base(s) and interfaces with software developers, engineers and other team members regarding SW test and quality to ensure compliance to external standards.\n" +
            "\n" +
            "Key Responsibilities:\n" +
            "\n" +
            "    Design and implement automated unit, integration and software verification tests for testing robotic controls using Python/C++/Matlab (in order of importance).\n" +
            "    Improve our automated test infrastructure.\n" +
            "    Review software requirements and software design specifications.\n" +
            "    Perform code reviews.\n" +
            "    Perform black box tests during V&V cycle.\n" +
            "    Defect Tracking and Control – Find, investigate and report product problems, representing the customer’s interest in R&D.\n" +
            "    Assist with Software Risk Management efforts in accordance with ISO 14971.\n" +
            "    Assist with Design Control efforts in line with IEC 62304, ISO 13485 and 21CFR 820.\n" +
            "\n" +
            "Experience and Qualifications:\n" +
            "\n" +
            "    2+ years of experience as a software engineer, creating and executing test cases for software.\n" +
            "    BS. or higher in Electrical Engineering or Computer Engineering (or similar degree) or equivalent relevant work experience.\n" +
            "    Working knowledge in one or more of the following software languages: C++, Python, Matlab.\n" +
            "    Working knowledge using Unit Test Frameworks.\n" +
            "    Working knowledge of Linux.\n" +
            "    Experience with testing robotic devices and complex systems strongly preferred.\n" +
            "    Experience with sensors and electromechanical systems.\n" +
            "    Experience with creating test automation frameworks.\n" +
            "    Experience with software configuration/version control tools.\n" +
            "    Experience with requirements management systems (JAMA, DOORS, Requisite Pro, etc.)\n" +
            "    Nice to have experience in a medical device environment.\n" +
            "    Nice to have working knowledge of Design Controls and understanding of IEC 62304, ISO 13485, AAMI TIR 32, AAMI TIR 45 and general principles of software validation."},
    { id: 6, type: "Data Scientist", location: "San Jose", desc: "Data Scientist\n" +
            " CloudCar - Santa Clara, CA\n" +
            "Responsibilities:\n" +
            "\n" +
            "As a member of the Data Team you will work on data analysis and predictive modeling of sensor data collected from the car and mobile phones. Looking for someone who will enjoy working as a “hands on” scientist with other data scientists and engineers on Data Mining and Predictive Modeling., You will work on productizing exciting new research from the industry or academia and extracting value from large amounts of data generated from consumers using our service. You will work on many different projects involving different parts of the code base. You’ll work both on improving existing software and creating entirely new components.\n" +
            "\n" +
            "Job Duties:\n" +
            "\n" +
            "    Code, test, deploy and maintain tools and applications for developing state of the art solutions.\n" +
            "    Automating large-scale data processing in distributed computing environment.\n" +
            "    Work closely with product management, user experience and engineering peers to determine feature requirements.\n" +
            "\n" +
            "Requirements:\n" +
            "\n" +
            "    A passion for developing and delivering great software, especially targeted towards consumer applications\n" +
            "    Masters in Mathematics, Statistics, or Computer Science.\n" +
            "    2 + years experience with Machine Learning\n" +
            "    Proficient in Java/Scala and Python A MUST\n" +
            "    Strong Algorithmic development skills\n" +
            "    Solid experience developing in a Linux/Unix environment including hands-on development experience with Big Data and modern analytics frameworks (Hadoop and Map Reduce, for example).\n" +
            "    Experienced in modern software development techniques (Test driven development, Agile)\n" +
            "    Self-starter who can work independently.\n" +
            "    Strong verbal and written communication skills, a team-player able to take initiative as well as follow a plan and work collaboratively in a small yet multidisciplinary team."},
    { id: 7, type: "Data Scientist", location: "San Jose", desc: "Data Scientist - iCloud\n" +
            "Apple - Santa Clara Valley, CA\n" +
            "Do you love solving complex challenges? Are you an inventive self-starter who takes pride in seeing ideas come to life on a global scale? As part of iCloud you’ll help design, develop, and deploy high-performance systems that handle billions of queries every single day. This enormous scale brings challenges that require extraordinarily creative problem solving. By focusing on and respecting the customer’s needs, you’ll be responsible for helping us build the technology that works for so many customers around the world. As member of the iCloud-Analytics team, you will play a significant role in crafting and developing new systems architecture from the ground up. You will also forge the future of existing system and services. We are looking for top-tier Engineers and Architects who are passionate about developing Big Data Products. You should love using efficient algorithms to process petabytes of data with extremely low latencies. This role requires deep understanding of developing products that are highly scalable, highly available and fully fault tolerant. In-depth understanding of various Big Data technology concepts such as Parallel Processing in MapReduce or Spark, indexing technology used in searching, query processing using NoSQL technologies is a requirement. This is a small and exclusive technology team focused on addressing all the Big Data processing needs for iCloud. We are developing a platform that can accomplish any task with an intuitive, simple to use UI, and easy deployment to production.\n" +
            "Key Qualifications\n" +
            "\n" +
            "    Experience in core Java or Scala\n" +
            "    Theoretical or practical experience in Hadoop/Spark systems\n" +
            "    Expertise in crafting, designing and developing large distributed systems\n" +
            "    Direct experience with highly available systems\n" +
            "    Experience with NoSQL Systems\n" +
            "    Familiarity with Relational Databases\n" +
            "    Has In-Depth knowledge of Streaming Architecture and Query Processing\n" +
            "    At least 4 years of experience developing products and frameworks in Big Data\n" +
            "    At least 2 years of experience deploying products in large-scale production environments\n" +
            "\n" +
            "Description\n" +
            "Consider joining a small team writing the software which forms the foundation for some of our most exciting products and services.\n" +
            "Architect, design and build a Big-Data Framework that can generate OLAP cubes on petabytes of streaming data in realtime\n" +
            "Develop a BigData infrastructure that is highly scalable, available with end to end monitoring capabilities\n" +
            "Write efficient and high quality code that can be deployed to production systems\n" +
            "Advise Data Engineers and Analysts on solving their BigData requirements\n" +
            "Develop innovative Algorithms to solve the BigData Problems\n" +
            "Has mastery over design patterns and their application"},
    { id: 8, type: "Data Scientist", location: "San Jose", desc: "Data Scientist\n" +
            "Bendaygo - San Jose, CA\n" +
            "Our client, based in San Jose CA, is an AI powered Talent Intelligence Platform. Company is backed by a top Silicon valley venture fund. Trained by top legal recruiting experts, Company’s innovative AI Talent Intelligence Platform curates and recommends the best matches for legal talent & their prospective employers. With unparalleled speed and accuracy, our AI is the ANTI-bias answer to the conventional recruiting problem. Our best-in-class technology not only aims at reducing the bias in hiring, but increasing the hiring among underrepresented groups.\n" +
            "\n" +
            "Position Summary:\n" +
            "As a Data Scientist you will be responsible for researching and building machine learning and natural language processing applications to extend Company’s personalization platform. You will work as part of our highly collaborative R&D team, and your solutions will directly and rapidly impact our business. This includes researching and developing models, algorithms, and applications; analyzing raw source data and derived data; presenting findings; and building tools.\n" +
            "\n" +
            "Key Responsibilities:\n" +
            "\n" +
            "    Develop an understanding of Company and proprietary datasets.\n" +
            "    Use your machine learning expertise to research and recommend the best approaches to solving our technology and business problems.\n" +
            "    Design, implement, and validate your solutions using Scala or Python on a large state-of-the-art cluster.\n" +
            "    Work with our Engineering teams to integrate your solutions into Company.\n" +
            "\n" +
            "About You:\n" +
            "\n" +
            "    A Ph.D., (or Master’s degree plus at least 8 years’ relevant experience), in Computer Science, Statistics, Linguistics, Mathematics, Economics, Physics, or a related scientific discipline.\n" +
            "    At least 5 years of experience working with large datasets for drawing business insights. Work experience at leading high tech companies such as Google, Amazon, and Facebook etc. is highly desirable.\n" +
            "    Research experience and coursework in Machine Learning.\n" +
            "    Fluency in Python programming.\n" +
            "    Experience with large data sets.\n" +
            "    Strong understanding of statistics and modeling techniques.\n" +
            "    Desire to work in a highly collaborative environment.\n" +
            "    Experience with Natural Language Processing, Information Retrieval, or Recommender Systems.\n" +
            "    Experience with distributed computing, such as Hadoop, Spark, or related technologies would also be an added advantage.\n" +
            "    Experience with mathematical optimization, control theory, time-series analysis would also be an added advantage.\n" +
            "\n" +
            "What you will have at Company:\n" +
            "\n" +
            "    Experience building a transformative product.\n" +
            "    Flexible work schedule.\n" +
            "    End-to-end ownership of your projects.\n" +
            "    Fun work environment in the heart of Silicon Valley.\n" +
            "    Access to building fitness center.\n" +
            "    Competitive salary, health benefits, early stage Stock Options.\n" +
            "    A great team who will fight beside you in the trenches to accomplish your goals."},
    { id: 9, type: "Data Scientist", location: "San Jose", desc: "Principal Data Scientist\n" +
            "Intuit - Mountain View, CA 94039\n" +
            "Overview\n" +
            "Intuit is hiring a Principal Data Scientist to focus on our Customer Success technology, reporting directly to the director of data science in customer success. We are looking for some exceptional talent to help improve the bottom line of our Customer-facing technology. We expect our Principal Data Scientist to be able to draw insights from data and apply them to all our products (TurboTax, QuickBooks, Mint, etc.) Also expected to lead engineers and data scientists to deliver new business value and personalized customer experience for our products. Responsibilities Conduct data analysis and build large-scale machine-learning models/pipelines\n" +
            "Work side-by-side with business unit partners on detailed requirements, technical designs, and implementation of end-to-end solutions from prototype to production\n" +
            "\n" +
            "Design experiments (such as A/B test), collect data, perform statistical analysis, and present solutions to senior management including executives\n" +
            "\n" +
            "Provide technical leadership and drive Intuit’s scientific innovation (publish papers, patents, etc.)\n" +
            "\n" +
            "Build scalable, efficient, automated processes for large-scale data analysis and machine-learning models (including development, validation, and serving)\n" +
            "\n" +
            "As a member of the Intuit data science community, present in internal and external conferences\n" +
            "Mentor and lead other data scientists and/or engineers\n" +
            "Work with business planners to identify the need for new data platforms and associated product/service \n" +
            "functionality and to propose innovative products and services that fully utilize the power of big data \n" +
            "Set self-initiated research objectives and exercise discretionary judgment when exploring advances in \n" +
            "artificial intelligence and applying innovative machine learning techniques to Intuit's data science \n" +
            "initiatives Collaborate with infrastructure architects in building more automated streamlined systems \n" +
            "and in setting up the necessary data governance for agile and responsive data processing \n" +
            "Apply industry-leading ideas, research, and insights to solve complex problems or to power\n " +
            "new business opportunities Act as an advisor to oversee and mentor team members in building a \n" +
            "ibrant community of practice Qualifications M.S. in Computer Science, Information Retrieval, \n" +
            "Machine Learning, or a related discipline At least 8 years’ experience in applying Machine Learning \n" +
            "techniques to solve business problems At least 5 years’ experience with major programming languages \n" +
            "such as in Java, Python, Scala At least 3 years' of experience with most of the following \n" +
            "Big Data technologies: AWS EMR or Hadoop, Spark, and Lucene/SOLR Track records of publishing \n" +
            "work in academic conferences or industry circles (presented at least once at a conference in \n" +
            "the last 24 months) Experience in statistical modeling tools, deep learning techniques, \n" +
            "and/or leading cross-org projects is a plus "},
    { id: 10, type: "Data Scientist", location: "San Jose", desc: "Principal Data Scientist\n" +
            "Arimo - Mountain View, CA\n" +
            "ndependently named by FastCompany as one of the world’s most innovative companies in data science, Arimo’s Behavioral AI software is aimed at delivering predictive insights in commercial IoT applications.\n" +
            "\n" +
            "Arimo's capabilities harness the behaviors of machines, devices, customers, and other entities to provide the most accurate predictions utilizing Deep Learning. With Arimo Behavioral AI™, leading companies are creating competitive advantage through new predictive insights, and delivering new services to their customers.\n" +
            "\n" +
            "Our strong team includes executives with deep product and engineering experience. They have held senior positions at Google, Yahoo, Amazon, SAP, Microsoft, and VMware. Team members hold advanced degrees in computer science and business from leading universities. Arimo was previously funded by Andreessen Horowitz, Lightspeed Ventures, and Bloomberg Beta. To learn more, visit us at https://arimo.com.\n" +
            "\n" +
            "Arimo is growing rapidly and now offering a position for Data Scientist. Passionate about digging into massive data sets and extracting data-driven insights to address complex business problems through analysis and visualization? Join us and be a part of this exciting journey!\n" +
            "\n" +
            "Responsibilities\n" +
            "\n" +
            "    Extract, analyze, and apply data-mining and machine learning techniques to large structured and unstructured datasets\n" +
            "    Design and analyze experiments to test new features & products\n" +
            "    Develop new algorithms and models for product improvement\n" +
            "    Work with product managers, designers, and engineers to build new features and products\n" +
            "\n" +
            "Required Skills and Qualifications\n" +
            "\n" +
            "    2+ years of experience working with large amounts of real data\n" +
            "    Expertise in at least one statistical software package, preferably R\n" +
            "    Experience with visualization tools such as d3, matplotlib, ggplot\n" +
            "    Experience with ETL & ML tools in R, Python, and Java such as scikit-learn, pandas, matplotlib, statsmodel, iPython, Weka\n" +
            "    Proficiency in SQL\n" +
            "    Advanced skills in a scripting language such as Python\n" +
            "    Experience in Hadoop/Spark and/or other MapReduce paradigms is a plus\n" +
            "    Experience in Deep Learning is a plus\n" +
            "    Ability to translate business objectives into actionable analyses\n" +
            "    Ability to communicate findings clearly to both technical and non-technical audiences\n" +
            "    Top-down thinker, excellent communicator, and excellent problem solver. Must be an active team player\n" +
            "    Open-minded and excited to learn new things. Have strong opinions but willing to change with new data\n" +
            "    Ms/Ph.D. in a CS or related discipline with domain expertise in Machine Learning, Statistics, Information Retrieval, or Graph Analysis\n" +
            "\n" +
            "Arimo offers competitive compensation packages commensurate with your experience. Offer includes full benefits, company stock options, continual career & compensation growth, and many other perks."},
    { id: 11, type: "Technical Program Manager", location: "San Jose", desc: "Technical Program Manager\n" +
            "Paypal - San Jose, CA\n" +
            "Job Description Summary:\n" +
            "At PayPal, we believe that now is the time to democratize financial services so that moving and managing money is a right for all citizens, not just the affluent. We are driven by this purpose, and we uphold our cultural values of collaboration, innovation, wellness and inclusion as our guide for making decisions and conducting business every day. It is our duty and privilege to be customer champions and put those we serve at the center of everything we do.\n" +
            "\n" +
            "Core Platform and Infrastructure (CPI) team is the technology engine that powers PayPal’s business. We deliver a seamlessly scalable, exceptionally efficient, highly reliable infrastructure and services platform in a hybrid cloud environment. Thousands of PayPal developers build and run hundreds of applications processing billions of calls daily with high availability and reliability on our Java middleware framework products. As a team, we are active in the open source community, are proud of our systems knowledge, technology breadth, and intellectual curiosity. We are driven to empower PayPal developers in the best way possible.\n" +
            "\n" +
            "Job Description:\n" +
            "\n" +
            "Are you a highly motivated, customer-oriented problem solver? Do you bring order to chaos and thrive in ambiguity? Do you create paths forward when others are stuck and adapt quickly to change? Then we want you on our Developer Experience team. Our customers are engineers across PayPal and our goal is to deliver products and services that make their experience seamless, their engineering efficient and the process involved lightning fast.\n" +
            "\n" +
            "This program manager will be responsible for leading the operations, planning and execution of strategic priorities in an organized, disciplined and predictable fashion. Demonstrable past experience doing the same at meaningful scale is required. This leader will be a critical partner to both the product and engineering leaders to define and manage priorities, drive planning and accountability, and constantly manage expectations and ensure forward progress. In other words, ensure multiple teams within the program do what they say they will do and when they say they will do it.\n" +
            "\n" +
            "This leader must be one who is both comfortable and capable in the weeds solving problems as they are hovering high and working strategically. The tool kit required for both is necessary: focus on problem solving, accountability and outcomes, strong ability to influence others at multiple levels, initiative, drive, and structured analytical thinking. Our work supports the whole of PayPal and thus, the millions of merchants and consumers—our customers—worldwide who rely on our platform every day.\n" +
            "\n" +
            "Our ideal candidate is an experienced program manager: operational, solution and customer-focused, and has a reputation for getting things done. Moreover, our candidate thrives in a fast-paced and demanding environment, thinks critically, acts quickly, and partners naturally across a variety of functions. Lastly, maturity, good judgment, negotiation skills, and analytical talent are essential to success in this role.\n" +
            "\n" +
            "Additional Job Description\n" +
            "\n" +
            "Requirements\n" +
            "\n" +
            "    5-7 years relevant experience in technology project management delivering technology initiatives in a high growth/high velocity environment at a leading consumer technology company or management consulting firm\n" +
            "\n" +
            "    Successful track record of managing complex development programs to deliver technical solutions\n" +
            "\n" +
            "    Proven expertise developing effective, matrixed, cross-organization relationships, collaborating and communicating across business and technology stakeholders and multiple geographies\n" +
            "\n" +
            "    Experience with different software development methodologies including the agile development methodology such as Scrum, and associated tools like Jira, Rally, etc.\n" +
            "\n" +
            "    Impeccable collaboration and problem-solving skills\n" +
            "\n" +
            "    Demonstrated ability to self-motivate, self-direct and follow-through with a high attention to detail\n" +
            "\n" +
            "    Ability to influence both peers and leaders, to build consensus while dealing with ambiguity, and make or delegate decisions when necessary\n" +
            "\n" +
            "    Demonstrated aptitude for risk identification and mitigation\n" +
            "\n" +
            "    Excellent oral, written communication skills including presentation skills\n" +
            "\n" +
            "    Capacity to manage multiple projects and stakeholders simultaneously "},
    { id: 12, type: "Technical Program Manager", location: "San Jose", desc: "Technical Program Manager\n" +
            "Blade - Mountain View, CA\n" +
            "COMPANY DESCRIPTION\n" +
            "\n" +
            "After raising a total of 60 million euros in 2 years, Blade is going international in 2018 with the expansion of Shadow in Europe and in the US.\n" +
            "\n" +
            "Shadow is a high-end Windows 10 PC accessible from anywhere at anytime. Thanks to our apps (Windows, Mac, Linux, Android and iOS) and to the Shadow Box, the service is available on any kind of device (laptop, smartphone, tablet, Android TV…). This way, any connected device with a screen becomes a powerful gaming or working station offering a unique experience.\n" +
            "Shadow’s software is frequently updated and the hardware components are improved in our highly secured data centers. No need to change your computer every few years, Shadow is the end of obsolescence!\n" +
            "\n" +
            "We truly believe that Shadow represents a whole new way of using computers. Much more than a PC, Shadow is THE answer to the increasing need of computing power, mobility and hardware replacement.\n" +
            "Help us make this incredible dream come true.\n" +
            "\n" +
            "JOB DESCRIPTION\n" +
            "\n" +
            "Blade is seeking a Technical Project Manager. Your creative problem-solving skills are stellar. You are able to work quickly and efficiently. You're super good at multitasking with a high-volume workload. You remain productive and positive in high-pressure situations. You have impeccable organizational, problem-solving and time-management skills. If this sounds like you, read on!\n" +
            "\n" +
            "Your main responsibilities will include:\n" +
            "\n" +
            "    As we try to move fast there are many concurrent projects competing for constrained resources. The technical project manager is a key component in making sure we maximize delivery while minimizing downsides.\n" +
            "    You have a thorough, deep understanding of our priorities, an ability to ‘see around corners’ to pre-empt those curveballs that always seem to be coming at us, and an ability to corral and coerce stakeholders (both internal and external, across multiple timezones) into doing the right thing.\n" +
            "\n" +
            "Qualifications\n" +
            "\n" +
            "Technical skills:\n" +
            "\n" +
            "    Experience with Agile, Scrum and waterfall methods\n" +
            "    Experience using JIRA and other project-management tools\n" +
            "\n" +
            "Soft skills:\n" +
            "\n" +
            "    An understanding of datacenter operations is a plus\n" +
            "    Flexible approach to project management methods"},
    { id: 13, type: "Technical Program Manager", location: "San Jose", desc: "Senior Technical Program Manager\n" +
            "Walmart -  Sunnyvale, CA 94086\n" +
            "Position Description\n" +
            "\n" +
            "    Demonstrates up-to-date expertise in Program or Project Management and applies this to the development, execution, and improvement of action plans\n" +
            "    Interacts with key Business Stakeholders, Engineering/Product Leaders, and Executive sponsors\n" +
            "    Develops Project Management best practices\n" +
            "    Builds roadmaps and leads the development of complex eCommerce projects and programs\n" +
            "    Manages geographically distributed teams, off-shore development teams and third-party vendors\n" +
            "    Models compliance with company policies and procedures and supports company mission, values, and standards of ethics and integrity\n" +
            "\n" +
            "Provides and supports the implementation of business solutions\n" +
            "\n" +
            "Minimum Qualifications\n" +
            "\n" +
            "    Bachelor's degree in Computer Science, Business, or related field and 3 years experience in project management, office management, or related field OR 5 years’ experience in project management, office management, or related field\n" +
            "    Ability to manage complex projects in an agile environment\n" +
            "    Excellent verbal and written communications skills\n" +
            "    Ability to constantly move or push towards a goal\n" +
            "    Comfortable in a fast paced, growing environment\n" +
            "    Comfortable with ambiguity\n" +
            "\n" +
            "Comfortable presenting to and persuading at the Director and Vice Presidential level\n" +
            "\n" +
            "Additional Preferred Qualifications\n" +
            "\n" +
            "    Certified Scrum Master (CSM)\n" +
            "\n" +
            "Project Management Professional (PMP) certification"},
    { id: 14, type: "Technical Program Manager", location: "San Jose", desc: "Snr Technical Program Manager\n" +
            "Akamai - Santa Clara, CA\n" +
            "Are you the a motivated, driven, results-oriented Program Manager? If so, we have an opening for you! Here is an opportunity to work with our Media team to plan, communicate, execute, and deliver our major projects, products, and solutions. In this role, you will work on products that will see deployment on Akamai's Global Network and on the sites of the top media and entertainment companies in the world.\n" +
            "Responsibilities:\n" +
            "• Lead cross functional Media Projects through efficient cross team collaboration with Product Architects, Program Managers, Engineering Managers, Engineering Teams and stakeholder management\n" +
            "\n" +
            "    Define, develop and track Project and Release Plans\n" +
            "\n" +
            "• Manage and Drive Engineering plans, execution and workflows\n" +
            "\n" +
            "    Creates transparency through Team and Management Reports\n" +
            "\n" +
            "• Create and maintain project dashboards using JIRA, Confluence and industry standard Tools\n" +
            "\n" +
            "    Manage and track internal team dependencies as well as external dependencies\n" +
            "\n" +
            "• Proactively manage impediments and use expertise and leadership to affect results\n" +
            "\n" +
            "    Proactively manage issues, risks and escalations\n" +
            "\n" +
            "• Initiate, lead and participate to continuous improvements\n" +
            "\n" +
            "    Process/Tools development and standardization\n" +
            "    Act as a Liaison for project information and dependencies\n" +
            "\n" +
            "• Provide process guidance and informal mentoring to team members\n" +
            "About the Team\n" +
            "Akamai is world’s largest and most trusted cloud delivery platform, delivering 95 exabytes of data a " +
            "year across billions of devices, Akamai makes it easier for you to provide the best and most secure digital " +
            "experiences on any device, anytime, anywhere."},
    { id: 15, type: "Technical Program Manager", location: "San Jose", desc: "Snr Technical Program Manager\n" +
            "Amazon - Sunnyvale, CA\n" +
            "ob Description\n" +
            "Amazon Lab126 is an inventive research and development company that designs and engineers high-profile consumer electronics. Lab126 began in 2004 as a subsidiary of Amazon.com, Inc., originally creating the best-selling Kindle family of products. Since then, we have produced groundbreaking devices like Fire tablets, Fire TV, and Amazon Echo. What will you help us create?\n" +
            "\n" +
            "Work hard. Have fun. Make history.\n" +
            "\n" +
            "The Role:\n" +
            "As an Senior Technical Program Manager, you will engage with an experienced inter-disciplinary staff to conceive and design innovative consumer products. You will work closely with an internal inter-disciplinary team to drive key aspects of product definition, execution, test and delivery. You must be responsive, flexible and able to succeed within an open collaborative peer environment.\n" +
            "\n" +
            "The Senior Technical Program Manager will lead internal inter-disciplinary teams through the product execution phase process. The candidate is responsible for creating the project plan, including the schedule. You will work with the Product Manager to derive the product requirements and obtain executive approval. The Senior Technical Program Manager will drive and motivate the cross-functional team to deliver the product(s) as per the agreed-to requirements and cross functionally manage other internal team members. The Senior Technical Program Manager will be responsible for the coordination and planning of all engineering builds at the supplier and drive the configuration management deliverables to ensure the timely release of all assemblies to production. In this role, you will:\n" +
            "\n" +
            "\n" +
            "    Drive execution of projects\n" +
            "\n" +
            "    Lead cross functional project meetings\n" +
            "\n" +
            "    Lead milestone reviews\n" +
            "\n" +
            "    Present project status to the executive team\n" +
            "\n" +
            "    Manage project builds globally\n" +
            "\n" +
            "Basic Qualifications\n" +
            "\n" +
            "    Bachelor’s degree in Electronic Engineering, Computer Science or related or equivalent work experience\n" +
            "\n" +
            "    7+ years experience managing complex technology projects with aggressive schedules\n" +
            "\n" +
            "Preferred Qualifications\n" +
            "\n" +
            "    Master's degree in relevant discipline\n" +
            "    Proficient at creating and tracking complex development schedules, managing issues and tracking bugs\n" +
            "    Experience managing the introduction of new technologies\n" +
            "    Solid understanding of product development lifecycles\n" +
            "    Strong understanding of technical requirements for technology integration\n" +
            "    Hands on experience at overseas manufacturing facilities\n" +
            "    Excellent leadership skills\n" +
            "    Excellent communication skills"},
    { id: 16, type: "Software Engineer", location: "San Francisco", desc: "Software Engineer II\n" +
            "Microsoft - San Francisco, CA \n" +
            "We, the Analysis and Experimentation Team, are aiming to build a world-class A/B experimentation platform that enables statistical testing new ideas quickly and reliably and then measuring the results of those experiments. Many of our success stories can be read here: http://exp-platform.com\n" +
            "\n" +
            "In addition to understanding some of Microsoft’s largest projects, we work to produce metrics to measure results of experiments. In a world which is constantly using more and more data to make decisions, it becomes increasingly more important to understand how to make decisions with the data. What factors affect the quality of the Bing user experience? What causes users to make a first payment with XBox? How do outlook.com users interact with email marked as spam? Keys to a successful online business is to innovate at fast pace using controlled experiments with live users and understanding how to make decisions with that data.\n" +
            "\n" +
            "We constantly push the limits of in-house, Azure, Cosmos (USQL) and open source technologies like Spark to help us be at the cutting edge of Big Data and meet the ever increasing and insatiable need of actionable data in near real time (NRT) manner. Based on success stories of big internal customers, we are embarking on a journey to take our products/tech stack to 3rd party, redefining some of our services, building a common metric infrastructure that can be used for calculating metrics across multiple big data systems, building big data clusters to process metrics/statistics. We are also working on taking some of our internal tech to open source.\n" +
            "\n" +
            "The list of needs and customers grows every day. We are hiring extremely talented, motivated and productive individuals to join us at the heart of Microsoft's innovation engine. Successful candidates will be hardcore software engineers in at least one of the areas: API design, scalable service development, and backend system to work with large datasets interactively.\n" +
            "\n" +
            "Responsibilities\n" +
            "\n" +
            "    Building a set of microservices with good APIs, decoupled architecture, scale, reliability and 3rd party external customers.\n" +
            "    Development of large scale and highly efficient metadata driven metrics related to metric management, A/B experimentation, query generation and job execution.\n" +
            "    Optimize data mining pipelines by designing caches, updating calculations in different big data compute clusters, such as USQL, Hadoop, Spark and internal offerings.\n" +
            "    Working closely with program management and data scientists for defining goals, understanding requirements.\n" +
            "\n" +
            "Qualifications\n" +
            "Required:\n" +
            "\n" +
            "    Strong design, problem solving and drive to success, with a strong bias for engineering excellence at scale with a track record of shipping multiple releases\n" +
            "    Expert coding skills in one of the following languages: C++, Java, C# (3+ years)\n" +
            "    Extensive experience in cloud – Azure, AWS, etc – services and architectures either as a user of the services or an implementer (3+ years)\n" +
            "\n" +
            "    Extensive knowledge of database design and programming\n" +
            "    Excellent written and verbal communication skills\n" +
            "    Bachelor's in computer science or a related field"},
    { id: 17, type: "Software Engineer", location: "San Francisco", desc: "Software Engineer - Data\n" +
            "Funding Circle US - San Francisco, CA\n" +
            "Job Duties: Write and test queries on the AWS infrastructure using S3/Athena and RedShift. Architect, develop, and maintain the financial infrastructure platform with bleeding-edge technologies and distributed systems architecture. Leverage test driven development to write Clojure code that performs ETL (extract/transform/load) against data housed in a DWH (data warehouse). Build customer-centric, mission-critical, and highly-scalable streaming applications. Write quality code using programming languages like Java, Python, Ruby, and Scala. Maintain database, work on ETL, and design and optimize data pipelines. Collaborate with other computer specialists to create optimum software.\n" +
            "\n" +
            "Minimum Requirements: Master’s degree, or foreign equivalent, in Computer Science, Engineering, or closely related quantitative discipline and three (3) years of experience in the job offered or three (3) years of experience in the field of software/data engineering or program analysis or Bachelor’s degree, or foreign equivalent, in Computer Science, Engineering or closely related quantitative discipline and five (5) years of experience in the job offered or five (5) years of progressively responsible experience in the field of software/data engineering or program analysis.\n" +
            "\n" +
            "Special Skill Requirements:\n" +
            "(1) AWS;\n" +
            "(2) Shell scripting;\n" +
            "(3) Kafka, Kinesis or JMS;\n" +
            "(4) NoSQL database;\n" +
            "(5) RedShift;\n" +
            "(6) ETL;\n" +
            "(7) Java;\n" +
            "(8) Python;\n" +
            "(9) Ruby;\n" +
            "(10) SQL;\n" +
            "(11) Performance Tuning;\n" +
            "(12) Relational databases.\n" +
            "Any suitable combination of education, training and experience is acceptable.\n"},
    { id: 18, type: "Software Engineer", location: "San Francisco", desc: "Principal Software Engineer |Opower\n" +
            "Oracle - San Francisco, CA 94109 (Nob Hill area) \n" +
            "Oracle’s Opower brand of services provides technology solutions to the leading utility companies around the world. Every day, customers check their usage, compare rate plans, and save electricity to make a cleaner energy future - and Opower makes it all possible.\n" +
            "\n" +
            "\n" +
            "We are a creative and passionate group of highly-driven individuals, committed to building out the platform that powers the rapidly-evolving needs of utility companies, while making the world a better, greener, place to live for us all. These are big goals, and we need talented folks with equally big ambitions. Join us!\n" +
            "\n" +
            "\n" +
            "The role:\n" +
            "We’re looking for a seasoned Principal Software Engineer who is passionate about designing, creating and delivering highly scalable distributed services to join our Data Services and APIs team. The team is part of Opower’s Data Platform group. We work with state-of-the-art tools such as Hadoop and Spark to do everything from ingesting data to running machine learning jobs that analyze energy usage from tens of millions of customers, and create services that feed that data back to the rest of the Opower ecosystem.\n" +
            "\n" +
            "\n" +
            "Responsibilities:\n" +
            "\n" +
            "    Design and develop high-availability, performant services, ingesting hundreds of millions of smart meter reads every day.\n" +
            "    Lead development and deployment of high-scale, low-latency systems\n" +
            "    Research and prototype new technologies to be introduced into our systems and infrastructure\n" +
            "    Collaborate with Product and Business Development to realize new products and features\n" +
            "\n" +
            "\n" +
            "About You:\n" +
            "\n" +
            "    BS, MS, or PhD in Computer Science or equivalent work experience (7+ years)\n" +
            "    Solid background in multiple programming languages, e.g. Scala, Python, Java.\n" +
            "    Experience with distributed systems, e.g., Hadoop, Cassandra\n" +
            "    Passionate for system architecture and building distributed systems at high scale\n" +
            "    Comfortable working collaboratively and cross-team\n" +
            "    Strong ability to grasp complex technical concepts\n" +
            "    Experience developing service-oriented systems, REST or GraphQL\n" +
            "    Able to thrive in a fast-paced environment with other highly skilled and driven peers\n" +
            "    Excellent written and verbal communication skills and the ability to write detailed technical plans"},
    { id: 19, type: "Software Engineer", location: "San Francisco", desc: "Software Engineer - Networking\n" +
            "Google - San Francisco, CA \n" +
            " Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Google’s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to tackle new problems across the full-stack as we continue to push technology forward.\n" +
            "\n" +
            "With your technical expertise you manage individual projects priorities, deadlines and deliverables. You design, develop, test, deploy, maintain, and enhance software solutions.\n" +
            "\n" +
            "As a software engineer working on networking systems, you will work on a specific project critical to Google’s needs. Current needs include high-impact projects in network telemetry, network monitoring, campus networking, wireless communications, as well as core data infrastructure work helping to expand our global data center presence.\n" +
            "\n" +
            "You are an engineer who can bring fresh ideas from areas of networking and distributed computing and has a passion for pushing technology forward.\n" +
            "\n" +
            "Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology's greatest challenges and make an impact on millions, if not billions, of users. At Google, engineers not only revolutionize search, they routinely work on massive scalability and storage solutions, large-scale applications and entirely new platforms for developers around the world. From Google Ads to Chrome, Android to YouTube, Social to Local, Google engineers are changing the world one technological achievement after another.\n" +
            "Responsibilities\n" +
            "\n" +
            "    Build our networking platforms, systems and infrastructure using your strong background in networked and distributed systems.\n" +
            "    Design, develop, test, deploy, maintain, and enhance networking software solutions.\n" +
            "    Manage individual projects priorities, deadlines and deliverables.\n" +
            "\n" +
            "Qualifications\n" +
            "Minimum qualifications:\n" +
            "\n" +
            "    BA/BS degree in Computer Science or a related technical field or equivalent practical experience.\n" +
            "    Experience with networking software (e.g., OSI Model, TCP/IP, IPTables, NAT, Deep Packet Inspection, IPV4, IPV6, routing protocols, etc.).\n" +
            "    Coding experience in C/C++, Java, Python or Go.\n" +
            "    Experience developing large scale distributed systems.\n" +
            "\n" +
            "\n" +
            "Preferred qualifications:\n" +
            "\n" +
            "    MS or PhD in Computer Science.\n" +
            "    Experience with Unix/Linux environments.\n" +
            "    Familiarity with Network Virtualization or Software Defined Networking (SDN).\n" +
            "    Experience with load balancing and Edge Computing concepts such as Content Delivery Networks (CDN).\n" +
            "    Understanding of 2 or more of the following Networking and Communications protocols: RCS, WebRTC, LTE, Wireless/WLAN, Evolved Packet Core (EPC), Fast Packet Processing, Traffic Analysis/Management, Caching, ForCES, OpenFlow, etc.\n"},
    { id: 20, type: "Software Engineer", location: "San Francisco", desc: "Software Engineer\n" +
            "Twitter - San Francisco, CA 94103 (South Of Market area) \n" +
            "Software Engineer - MoPub iOS SDK\n" +
            "\n" +
            "MoPub is the world’s largest mobile application advertising exchange and complete ad serving platform. Come join our team!\n" +
            "\n" +
            "Who We Are:\n" +
            "\n" +
            "From individual developers to the largest names in mobile apps and games, MoPub’s customers span the globe and generate tens of billions of ad requests a day. 48,000 apps (and counting) trust the MoPub SDK to seamlessly power their advertising needs and help keep their content free. We have a large, global footprint - our open-source library is installed on more than 1 billion devices each month.\n" +
            "\n" +
            "What You’ll Do:\n" +
            "\n" +
            "As a part of MoPub’s mobile team you will join a small and passionate engineering team working on our iOS SDK directly driving publisher revenue. You will work closely with product managers, designers, and other engineers to build and maintain a robust, reliable, and easy-to-use library. You will use the latest tech in iOS (alongside Android and Unity engineers) to build new ad formats with an eye towards performance and respect for app developers and end users. Like all engineers on the team, you will enjoy proactively looking for improvements to our product’s UX/UI and our codebase.\n" +
            "\n" +
            "Who You Are:\n" +
            "\n" +
            "    Disciplined approach to writing unit and integration tests.\n" +
            "    Ability to take on complex problems, learn quickly, and persist towards a good solution.\n" +
            "    Passion for making beautiful, performant, and delightful mobile experiences.\n" +
            "    Understanding of core CS concepts such as common data structures and algorithms.\n" +
            "\n" +
            "\n" +
            "Requirements:\n" +
            "\n" +
            "    BS/MS Computer Science or similar work experience.\n" +
            "    Broad knowledge of the iOS and mobile app ecosystem.\n" +
            "    Experience with software engineering practices (e.g., unit testing, code reviews, design documentation)."},
    { id: 21, type: "Data Scientist", location: "San Francisco", desc: "Data Scientist\n" +
            "Zaplabs - San Francisco \n" +
            "Join us as we build a next-generation analytics platform to serve our world-class agents. As a Data Scientist, you’ll help build a platform of robust analytics features that lay the foundation for optimizing agent and broker productivity that bring Realogy’s renowned real estate brands into the next era of data-driven excellence.\n" +
            "\n" +
            "What we’re looking for:\n" +
            "You’re a talented, creative, and motivated data scientist who loves data, who’s ready to work with a team of individuals who share your passion. With a related degree under your belt-and maybe even some experience-you’re ready to take your programming and database knowledge to the next level. You enjoy challenging projects involving large data pipelines, cleaning and transforming data, and algorithm development. With your strong analytical skills, unwavering commitment to quality, excellent technical skills, and collaborative work ethic, you’ll do great things here at ZapLabs.\n" +
            "\n" +
            "What you’ll do:\n" +
            "As a Data Scientist, you’ll be responsible for mastering our data and designing the systems which enable us to use it most effectively. You’ll be designing and implementing processes around machine learning, business intelligence, and predictive analytics that meet the needs of millions of agents, brokers, home buyers, and sellers. Your role will involve collaborating with a team of talented engineers, product managers and designers to investigate new data sources, perform data modeling, and deploy new features.\n" +
            "\n" +
            "Skills, accomplishments, & interests you should have:\n" +
            "\n" +
            "    BS in Computer Science, Engineering, Mathematics, or related technical discipline "},
    { id: 22, type: "Data Scientist", location: "San Francisco", desc: "Data Scientist\n" +
            "DropBox - San Francisco \n" +
            "Role\n" +
            "----\n" +
            "\n" +
            "    Work on high priority initiatives including (but not limited to) account prioritization, account prospecting, and opportunity scoring.\n" +
            "    Instrumentation of propensity modeling: query and process big data: integrate volumes of data from multiple internal and external sources and into Dropbox's systems of record\n" +
            "    Build production grade models on large-scale datasets to optimize marketing performance by utilizing advanced statistical modeling, machine learning, or data mining techniques\n" +
            "    Leverage models to address key growth challenges such as cross-channel spend allocation, response modeling, advertising partner quality measurement, customized content\n" +
            "    Partner closely with marketing analytics and digital marketing to develop internal and external data sources to be used in propensity modeling and predictive analytics.\n" +
            "\n" +
            "----------------\n" +
            "Responsibilities\n" +
            "----------------\n" +
            "\n" +
            "    Conceptualize, design and build data-fueled insights to help Dropbox improve analytics for prospects and customers.\n" +
            "    Benchmarking: Develop comparative indexes that measure how companies compare to industry peers in key performance and usage metrics.\n" +
            "    Recommendation engine: Use real-time analytics to recommend ways in which customers can maximize adoption and usage of Dropbox.\n" +
            "    Work closely with other team members and the business to further develop metrics, KPIs, and insight that provides performance improvement.\n" +
            "\n" +
            "------------\n" +
            "Requirements\n" +
            "------------\n" +
            "\n" +
            "    Master's degree or higher in computer science, applied statistics, economics, etc.\n" +
            "    3 - 6 years experience as strategic project/program lead in management consulting, B2B software (ideally SaaS) or a high-growth technology firm\n" +
            "    Experience working with very large semi-structured data sets and integrating them into systems of record\n" +
            "    Ability to solve complex analytical problems using quantitative approaches with a unique blend of analytical, mathematical and technical skills\n" +
            "    Highly detailed-oriented and exceptional organizational and follow-through skills a must\n" +
            "    Strong data-oriented scripting (e.g. SQL) and statistical programming (e.g., R or python)\n" +
            "    Excellent judgment and creative problem solving skills\n" +
            "    Excellent at planning and project management – ability to look ahead to meet regular deadlines and prevent last minute fire drills\n" +
            "    Strong desire to take initiative; thrive on change and comfortable with ambiguity\n" +
            "\n" +
            "------------------\n" +
            "Benefits and Perks\n" +
            "------------------\n" +
            "\n" +
            "    100% company paid individual medical, dental, & vision insurance coverage\n" +
            "    401k + company match\n" +
            "    Market competitive total compensation package\n" +
            "    Free Dropbox space for your friends and family\n" +
            "    Wellness Reimbursement\n" +
            "    Generous vacation policy\n" +
            "    10 company paid holidays\n" +
            "    Volunteer time off\n" +
            "    Company sponsored tech talks (technology and other relevant professional topics)\n" +
            "\n"},
    { id: 23, type: "Data Scientist", location: "San Francisco", desc: "Data Scientist\n" +
            "Quantcast - San Francisco, CA 94103 (South Of Market area) \n" +
            "Quantcast is a premier leader in artificial intelligence (AI) and addressable advertising. We are focused on real-time, targeted advertising services that are revolutionizing the display advertising industry. Essentially, we are using AI and big data to take the evil out of advertising on the web!\n" +
            "\n" +
            "We are looking for an exceptional marketing data scientist to join our diverse set of researchers, analysts and machine learning engineers. These are true product management roles that guide development of our products, shape the future of advertising and help marketers and agencies to connect with their audiences.\n" +
            "Responsibilities\n" +
            "\n" +
            "    Mine and analyze data from all available data sources to support product development efforts\n" +
            "    Track product usage, build churn models and present actionable insights to leadership teams\n" +
            "    Design, monitor and analyze controlled experiments (A/B, multivariate)\n" +
            "    Build predictive models to optimize the customer’s journey throughout Quantcast's product suite\n" +
            "    Collaborate with Product Managers and relevant functions to help evolve Quantcast’s product offerings\n" +
            "    Ensure excellence in process and workflow within the department as well as across other functions, such as Ad Ops, Client Strategy, Engineering, Modeling and Product Development\n" +
            "    Present findings in client-facing settings or to other external partners as needed\n" +
            "\n" +
            "Requirements\n" +
            "\n" +
            "    Bachelor’s degree in a quantitative field (computer science, mathematics, statistics, bioinformatics, etc.) or equivalent experience - Master’s degree is a plus\n" +
            "    Three to five years of experience in a digital or technology role with a focus on analytics and data science\n" +
            "    Proficiency with Postgres SQL (or any form of SQL) is required\n" +
            "    Expert at mentoring other team members in the use of data science tools such as R, Python, Julia,SQL, MapReduce, Hadoop, Hive and Big Data technologies\n" +
            "    Significant experience extracting, transforming and working with large sets of data\n" +
            "    Experience working with large amounts of structured and unstructured data\n" +
            "    Advanced knowledge of ad serving technologies (Atlas, Doubleclick,Sizmek etc.)\n" +
            "    Experience with one or more RTB ad management & DSP & SSP platforms\n" +
            "    Strong analytical, strategic and creative problem solver\n" +
            "    Ability to remain calm under pressure and strict deadlines\n" +
            "    Provide feedback for enhancements to current Product Suite\n" +
            "    Experience with designing,analyzing and troubleshooting controlled experiments (causal A/B tests, multivariate tests)\n" +
            "    Strong project management and communication skills to support internal operational teams\n" +
            "    Excellent communication skills; ability to convey complex analysis results clearly and concisely with conviction to all levels of partners\n" +
            "    Interest in D3, R shiny and other front end visualization platforms highly desirable\n" +
            "    Ability to manage AWS EC2 instances for custom research playground is a huge plus"},
    { id: 24, type: "Data Scientist", location: "San Francisco", desc: "Senior Data Scientist\n" +
            "Indeed - San Francisco, CA \n" +
            "Our mission:\n" +
            "As the world’s number 1 job site, our mission is to help people get jobs. We need talented, passionate people working together to make this happen. We are looking to grow our teams with people who share our energy and enthusiasm for creating the best experience for job seekers.\n" +
            "\n" +
            "The team:\n" +
            "We are a rapidly growing and highly capable engineering team building the most popular job site on the planet. Every month, over 200 million people count on us to help them find jobs, publish their resumes, process their job applications, and connect them to qualified candidates for their job openings. With engineering hubs in Seattle, San Francisco, Austin, Tokyo and Hyderabad, we are improving people's lives all around the world, one job at a time.\n" +
            "\n" +
            "Your job:\n" +
            "As a Data Scientist at Indeed your role is to follow the data. Analyze, visualize, and model job search related data. You will build and implement machine learning models to make timely decisions. You will have access to unparalleled resources within Indeed to grow and develop both personally and professionally. We are looking for a mixture between a statistician, scientist, machine learning expert and engineer: someone who has passion for building and improving Internet-scale products informed by data. The ideal candidate understands human behavior and knows what to look for in the data.\n" +
            "\n" +
            "About you:\n" +
            "Requirements\n" +
            "\n" +
            "*\n" +
            "\n" +
            "Ph.D. or M.S. in a quantitative field such as Computer Science, Operations Research, Statistics, Econometrics or Mathematics\n" +
            "*\n" +
            "Expertise in machine learning and statistical modeling\n" +
            "*\n" +
            "5+ years professional or research experience in data science\n" +
            "*\n" +
            "Passion to answer Product/Engineering questions with data\n" +
            "*\n" +
            "Demonstrated mentorship experience\n" +
            "\n" +
            "We get excited about candidates who\n" +
            "\n" +
            "Have full stack experience in data collection, aggregation, analysis, visualization, productionization, and monitoring of data science products\n" +
            "*\n" +
            "Can do small data modeling work: R, Python, Julia, Octave\n" +
            "*\n" +
            "Can do big data modeling work: Hadoop, Pig, Scala, Spark\n" +
            "*\n" +
            "Can fish for data: SQL, Pandas, MongoDB\n" +
            "*\n" +
            "Can deploy data science solutions: Java, Python, C++\n" +
            "\n" +
            "Indeed provides a variety of benefits that help us focus on our mission of helping people get jobs.\n"},
    { id: 25, type: "Data Scientist", location: "San Francisco", desc: "Data Scientist - Insurance\n" +
            "Blue Owl- San Francisco, CA\n" +
            "A million people a year die in car collisions around the world and we want that number to be zero. We invite you to help us build an InsurTech company that uses rich customer insights, advanced technology and data science to save lives by preventing car collisions before they happen. To this end, we recently helped launch our first product, hiroad.com, a cloud native insurance solution that rewards people for the act of driving well.\n" +
            "\n" +
            "With impressive funding, a compelling vision, and a world-class team, we're poised to re-engineer a trillion-dollar category from the ground up- and that's just where we're beginning. Longer term, we're out to change behavior and promote mindful living at a societal level.\n" +
            "\n" +
            "We're seeking someone to build and support critical backend systems and services that are core to our business. This includes the rewards system that will be used to increase driver safety, designing APIs, creating/managing databases, and writing automated test suites.\n" +
            "\n" +
            "General tools you build will be open sourced and will ideally be consumed by the greater community.\n" +
            "Job requirements\n" +
            "\n" +
            "    This role will require the candidate to be extremely hands on with building models and data driven tools. Past experience implementing complex data-driven solutions is required.\n" +
            "    Advanced Python skills. Should be familiar with Python’s scientific computing ecosystem.\n" +
            "    Advanced SAS skills. Should be familiar with SAS best practices.\n" +
            "    Deep experience with GLMs as well as modern machine learning methods.\n" +
            "    Actuarial science is a plus, but is not required.\n" +
            "\n" +
            "More details\n" +
            "\n" +
            "    Salary: We invest in first-rate people and pay top-of-market salaries for most positions, factoring in experience and talent. We are unable to offer equity.\n" +
            "    Benefits: Full medical, dental, vision coverage, 401k, daily catered lunch, wellness reimbursement & on-site shower, four weeks of vacation, six weeks of parental leave, panoramic views, and more.\n" +
            "    Location: Near Montgomery Street BART station, San Francisco, California. Locals preferred, but relocation within the US considered for outstanding candidates."},
    { id: 26, type: "Technical Program Manager", location: "San Francisco", desc: "Technical Program Manager\n" +
            "Indeed - San Francisco, CA\n" +
            "Our mission:\n" +
            "As the world’s number 1 job site, our mission is to help people get jobs. We need talented, passionate people working together to make this happen. We are looking to grow our teams with people who share our energy and enthusiasm for creating the best experience for job seekers.\n" +
            "\n" +
            "The team:\n" +
            "We are builders, we are integrators. Tech Services creates and optimizes solutions for a rapidly growing business on a global scale. We work with distributed infrastructure, petabytes of data, and billions of transactions with no limitations on your creativity. You don’t have to wait for some architect or manager to tell you what you can work on - you decide the priorities. With tech hubs in Seattle, San Francisco, Austin, Tokyo and Hyderabad, we are improving people's lives all around the world, one job at a time.\n" +
            "\n" +
            "Your job:\n" +
            "Indeed program managers are facilitators and motivators embedded across the company, sitting side by side with the teams they support. We work hard to ensure collaboration, communication, and visibility on projects as well as improve processes. We are curious about how and why things work and are problem solvers at heart.\n" +
            "\n" +
            "As a Program Manager, you'll work with various stakeholders at different levels of the organization to manage projects, monitor operations, and improve transparency. You’ll need to provide diplomatic and timely communication in an agile work environment with iterative planning and delivery cycles. Specifically, you will:\n" +
            "\n" +
            "    Maintain oversight of projects and the operational efficiency of your teams. Implement standards and set the correct expectations for planning and execution. Ensure team leadership has a clear understanding of goals and timelines of plans. Reinforce the concept of failing fast and moving forward.\n" +
            "    Analyze and solve problems across your business area (people, structures, and processes); identify the things that work together to improve operational health.\n" +
            "    Identify and implement process improvements for the functional areas where you are engaged. Ensure a consistent and shared understanding of best practices across teams and functions.\n" +
            "    Ensure standards for communications and reporting are being followed. Monitor and provide feedback on communications of your team. Maintain a cultural awareness in your communications.\n" +
            "    Influence across the team leadership level to solve problems affecting how the teams we work with get their work done.\n" +
            "    Engage with PMO leadership to understand and refer to the vision, goals, and initiatives for your business area.\n" +
            "\n" +
            "About you:Characteristics that set you apart:\n" +
            "\n" +
            "    Exceptional process and analytical capabilities.\n" +
            "    Strong client service attitude and leadership capabilities.\n" +
            "    Customer focused, aware of the importance of end user satisfaction.\n" +
            "\n" +
            "Requirements:\n" +
            "\n" +
            "    You have 5+ years experience working in a web technology company within an operational team, or in program/project management.\n" +
            "    You can identify and implement process design and re-engineering to achieve both incremental and transformational business impact.\n" +
            "    You are comfortable talking about technical matters with business people and business matters with technical people.\n" +
            "    You are successful at getting buy-in for your ideas with a demonstrated affinity for metrics.\n" +
            "    You are respectful and influential; you have the ability to push back when needed and can approach work rationally.\n" +
            "    You have a bias for action and work comfortably with ambiguity.\n" +
            "    You can analyze information to find trends or diagnose problem areas.\n" +
            "    You have experience defining and reporting on operational metrics and generating problem statements that are supported by data you have compiled.\n" +
            "    You love decomposing and defining workflows and processes.\n" +
            "    You are naturally compelled to utilize Lean principles of continuous improvement.\n" +
            "    You develop innovative solutions and collaborate with global counterparts and cross-functional teams to implement them.\n" +
            "    Your project management experience includes building operational programs that are scalable, defining roadmaps and translating strategic initiatives into tactical, objective programs.\n" +
            "    You know how to manage complex cross-functional projects. You strive to meet aggressive goals, and know when to reset expectations.\n" +
            "    You have a system to manage change. You influence decisions and change management through collaboration, leadership, and a customer-focused approach.\n" +
            "    You have significant agile/lean experience in organizations leveraging lean/agile methodologies and in-depth experience with specific agile methodologies such as Scrum, Kanban, or SAFE.\n" +
            "\n" +
            "Indeed provides a variety of benefits that help us focus on our mission of helping people get jobs.\n"},
    { id: 27, type: "Technical Program Manager", location: "San Francisco", desc: "Technical Program Manager - Program Lead\n" +
            "Cruise Automation - San Francisco, CA\n" +
            "We're the driverless car company.\n" +
            "\n" +
            "We believe in improving people's lives by making transportation safer, more accessible, and more convenient. We're building the world's most advanced software ( https://www.driverless.id/news/video-breakdown-gms-unicorn-cruise-shows-off-level-4-skills-sf-passing-uber-maybe-waymo-0176031/ ) to fuel the driverless cars that safely connect people to the places, things, and experiences they care about.\n" +
            "\n" +
            "We seek and embrace diversity in all of its forms. We continuously push ourselves to think differently and take ownership wherever it's needed. This is a place for dreamers and doers to succeed. If you share our passion for achieving what some say is impossible, join us.\n" +
            "\n" +
            "About the role:\n" +
            "Our Lead Technical Program Managers coordinate and deliver major business-critical programs, working cross-functionally across the company to translate business needs to actual deliverables.\n" +
            "\n" +
            "Responsibilities:\n" +
            "\n" +
            "    Assemble your cross-functional program leadership team; clarify roles & responsibilities, build trusted relationships with team members and all relevant stakeholders\n" +
            "    Guide team through refining requirements and setting program scope\n" +
            "    Working closely with company leaders and our Technical Program Managers, create and own master program milestones, cross-team integration points, overall schedule & execution plan; mentor and assist other program participants in creating plans for their respective areas\n" +
            "    Capture and track inter-team dependencies & hand-offs; monitor & help resolve issues\n" +
            "    Define program metrics & KPIs, set up mechanisms to track/report\n" +
            "    Communicate progress effectively across program team, including to GM and Cruise execs\n" +
            "    Proactively resolve issues and drive course corrections as needed - be directly involved in helping teams foresee and overcome barriers or blockers\n" +
            "    Negotiate any plan-of-record changes, escalating only when necessary - you *are* the escalation point for the program\n" +
            "    Align with other parallel programs - hand-offs, resource contention, etc\n" +
            "    Organize and/or create appropriate program documentation and communications\n" +
            "    Conduct periodic retrospectives; continuously assess & improve process & tools\n" +
            "\n" +
            "Requirements:\n" +
            "\n" +
            "    10+ years of industry experience in a fast-paced tech company, including direct management and delivery of large, technically complex product development programs\n" +
            "    Top-notch communications and presentation skills, from the team to executive level\n" +
            "    Proven ability to calmly and confidently bring clarity, order and organization to complex undertakings; ability to understand complex technical systems\n" +
            "    Interest and willingness to mentor more junior staff members, identify and act on opportunities to improve processes and increase efficiency\n" +
            "    Motivated self-starter with ability to adapt quickly and operate under ambiguity\n"},
    { id: 28, type: "Technical Program Manager", location: "San Francisco", desc: "Technical Program Manager\n" +
            "Amazon - San Francisco, CA\n" +
            "ob Description\n" +
            "We are looking for a talented Technical Program Manager who designs, drives, launches and owns delivery of experiments and new functionality at high velocity for the Amazon Shopping apps for TV platforms. The qualified candidate will own the coordination of release schedules, running sprint planning, resolving day to day technical roadblocks faced by the team, managing partner relations, and innovating on our mechanisms for rapid experimentation. If you are passionate about driving innovation, then we would like to speak with you about opportunities! This role requires working closely with the TV Shopping team and key software development teams across the company to define strategy and requirements, and then lead projects through operations design and delivery. This position involves regular communication with management on status, risks and product strategy. Excellent listening, writing skills and strong technical competency are essential.\n" +
            "\n" +
            "About you: The ideal candidate thrives in successfully delivering broadly adopted technology products/services in a high growth environment where priorities shift quickly. She or he is a strong leader who can prioritize well, communicate clearly and in a compelling manner, and who understands how to drive a high level of focus and excellence. From a business and technical perspective, this TPM will:\n" +
            "\n" +
            "    Have a strong track record of shaping strategy for technical products or services\n" +
            "    Understand how to design scalable software\n" +
            "    Collaborate effectively with internal partner teams\n" +
            "    Have an entrepreneurial spirit\n" +
            "    Possess a strong understanding of the software development lifecycle\n" +
            "    Professional traits which are not unique to this position, but necessary for Amazon leaders:\n" +
            "\n" +
            "    Exhibits excellent judgment\n" +
            "    Has relentlessly high standards (is never satisfied with the status quo)\n" +
            "    Is able to dive deep and is never out of touch with the details of the business\n" +
            "    Has passion and convictions and the innate ability to earn trust of others\n" +
            "    Strong results orientation\n" +
            "\n" +
            "If you're worried about technology and experience requirements- don't be. We're looking for smart, passionate and proven people; prior mobile experience is not required.\n" +
            "\n" +
            "About us together: Together we will create the shopping experience on TV. We will make it super easy for Amazon customers to shop for products that inspire them on TV, or simply lounge on their couch for a lean back shopping experience. We will make sure that our customers can buy relevant items without having to switch to another device. Above all, we will experiment, learn a lot and invent the most amazing shopping experience on TV that customers will love.\n" +
            "\n" +
            "Basic Qualifications\n" +
            "\n" +
            "    Bachelor's degree in Computer Science, Engineering or related field\n" +
            "    5+ years of relevant work experience in internet-related technical program management in a software environment\n" +
            "    Ability to multitask and manage multiple projects - work prioritization, planning and task delegation\n" +
            "    Proven track record of taking ownership and driving results\n" +
            "    Experience communicating (written and verbal) with technical and non-technical stakeholders across multiple business units\n" +
            "\n" +
            "Preferred Qualifications\n" +
            "\n" +
            "    Experience with agile or other program management methodologies\n" +
            "    Master's degree in Computer Science and/or Business Administration\n" +
            "    Prior experience as a software developer\n" +
            "    Ability to deliver initiatives from conception through completion\n" +
            "    Curiosity to dig several layers deep into technical solutions with an eye toward continuous improvement"},
    { id: 29, type: "Technical Program Manager", location: "San Francisco", desc: "Technical Program Manager - Product Inclusion\n" +
            "Google - San Francisco, CA\n" +
            "Google's projects, like our users, span the globe and require managers to keep the big picture in focus while being able to dive into the unique engineering challenges we face daily. As a Technical Program Manager at Google, you lead complex, multi-disciplinary engineering projects using your engineering expertise. You plan requirements with internal customers and usher projects through the entire project lifecycle. This includes managing project schedules, identifying risks and clearly communicating them to project stakeholders. You're equally at home explaining your team's analyses and recommendations to executives as you are discussing the technical trade-offs in product development with engineers.\n" +
            "\n" +
            "Using your extensive technical and leadership expertise, you manage projects of various size and scope, identifying future opportunities, improving processes and driving the technical directions of your programs.\n" +
            "\n" +
            "You are able to both program manage and build a database. You'll be responsible for scaling, maintaining, and adding new features for both the backend and frontend.\n" +
            "\n" +
            "The team is focused on getting real users to give product and feature feedback.\n" +
            "\n" +
            "Making the world's information universally accessible and useful doesn't stop at the desktop. The Mobile team builds tools to get you the information you need no matter where you are. Android has become the world's most popular mobile ecosystem, powering billions of devices, from smartphones to tablets, watches to TVs and everything in between. Whether adding to the core Android experience, forging new markets for digital content, creating immersive and portable versions of our products or managing relationships with a global community of developers, the Mobile team is giving you Google on the go.\n" +
            "Responsibilities\n" +
            "\n" +
            "    Build, maintain, and continue to improve the database\n" +
            "    Create tools to support the database program\n" +
            "    Create and maintain dashboards for the different projects\n" +
            "    Focus on Product Inclusion within the Communications organization via the program\n" +
            "\n" +
            "Qualifications\n" +
            "Minimum qualifications:\n" +
            "\n" +
            "    Bachelor's degree in Computer Science, Electrical Engineering, or a related technical field, or equivalent practical experience.\n" +
            "    5 years of experience managing multi-group, multi-disciplinary software development projects.\n" +
            "    2 years of software development experience (e.g. C++, Java or JavaScript coding).\n" +
            "    2 years of experience in program/project Management.\n" +
            "\n" +
            "\n" +
            "Preferred qualifications:\n" +
            "\n" +
            "    Experience in building/managing dashboards and other success tracking tools.\n" +
            "    Familiarity in one or more of the following areas: Coding (e.g. Python), Databases and querying (e.g., SQL, MySQL, MapReduce, Hadoop), Front end development (e.g., HTML, CSS), Statistical analysis (e.g., R, Stata, SPSS, SAS).\n" +
            "    Able to define and execute an ambiguous project: identify requirements, explore concepts, design, then implement solutions.\n"},
    { id: 30, type: "Technical Program Manager", location: "San Francisco", desc: "Senior Technical Program Manager\n" +
            "Ridecell - San Francisco, CA 94103 (South Of Market area)\n" +
            "Ridecell (www.ridecell.com ( http://www.ridecell.com/ )) is powering next generation of ridesharing, carsharing and autonomous new mobility services. As the world shifts to a mobility on-demand model and new companies rush to enter as service providers, Ridecell is ready to support these initiatives. Already 20 customers, including BMW, VW, Renault and AAA use our proven platform to launch, operate, and scale their new mobility services.\n" +
            "\n" +
            "We are looking for an experienced Senior Technical Program Manager, with strong technical skills and understanding of the development of web applications. You must have the technical depth to be able to manage complex engineering projects and collaborate knowledgeably with our development team. You will bring past engineering and/or project management experience to track cross-functional development projects in an iterative, agile process. We are looking for someone to bridge product management and engineering, continually monitor story progress and unblock issues as necessary, communicate real-time progress to the organization, and ensure efficiency.\n" +
            "\n" +
            "Requirements\n" +
            "------------\n" +
            "\n" +
            "    8+ years of experience as a Technical Program Manager at a Technology company\n" +
            "    Strong understanding of agile software development processes (XP, scrum, Kanban, etc)\n" +
            "    Strong understanding of how software projects are estimated, tracked, and measured\n" +
            "    Experience with story-management tools like Jira, etc.\n" +
            "    Experience providing project status reports to technical and non-technical managers\n" +
            "    Ability to track projects with dependencies that cross functions like application development, systems administration, database management, business operations\n" +
            "    Engineering Degree\n" +
            "\n"},

];


app.use(cors());
hbs.registerPartials(__dirname + '../../views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '../../public'));

//MongoDB initialization code
app.use(function(req, res, next)
{
    req.db = db;
    next();
});

//View engine setup
//app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {secret: "String for encrypting cookies." } ));
app.use(cookieParser());

// app.get('/', (req,res) => {
//   res.render('home.hbs', {
//     pageTitle: 'Home Page',
//     welcomeMessage: "Welcome to my website",
//     currentYear: new Date().getFullYear()
//   })
// })

app.use('/',index);

app.post('/thankYou', (req, res) =>{

    console.log("request is ",  req);
    res.send('Thank you');


});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/help', (req,res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/jobs', (req, res) => {

    console.log("Fine")
    let loc = req.query.location;
    let searchType = req.query.type;

    console.log(req.query);

    if(loc!="" && searchType==="")
    {
        let matchedJobs = jobs.filter(val => {
            return val.location === loc;
        })
        res.send(matchedJobs);
    }

    else if(searchType!="" && loc==="")
    {
        let matchedJobs = jobs.filter(val => {
            return val.type === searchType;
        })
        res.send(matchedJobs);

    }

    else if(searchType !="" && loc!= ""){
        let matchedJobs = jobs.filter(val => {
            return ((val.location === loc) && (val.type === searchType));
        })
        res.send(matchedJobs);

    }
    res.send(jobs);


});

module.exports = app;

app.listen(5000, () => {
  console.log('Server is up on port 5000')
});
