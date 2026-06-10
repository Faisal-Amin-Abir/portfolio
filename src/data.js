const portfolioAsset = (fileName) =>
  `${import.meta.env.BASE_URL}portfolio/${fileName}`

export const portfolioData = {
  name: 'Faisal Amin Abir',
  initials: 'FAA',
  role: 'Software Engineering Aspirant',
  location: 'Bangladesh',
  availability: 'Seeking a software engineering role',
  email: 'faisalamin50106@gmail.com',
  profileImage: portfolioAsset('profile-portrait.jpeg'),
  intro:
    'I build software with the same mindset I bring to competitive programming: think clearly, move fast, and keep iterating until the result feels clean.',
  about:
    'I am a BSc in CSE student from American International University-Bangladesh. My focus is software engineering, competitive programming, and building practical systems that are fast, readable, and useful.',
  highlights: [
    { value: '35th', label: 'ICPC AWC 2025' },
    { value: '1850+', label: 'Problems solved' },
    { value: '230+', label: 'Contests joined' },
  ],
  featuredRecognition: {
    source: 'American International University-Bangladesh',
    label: 'Featured by AIUB',
    title:
      'AIUB Team Secures 3rd Position in Bangladesh at ICPC Asia West Continental Finals 2025',
    description:
      'AIUB recognized Team AIUB_Modularity for placing 3rd among Bangladeshi teams and 35th overall at the continental finals.',
    published: 'April 1, 2026',
    image: portfolioAsset('team-certificate.jpg'),
    url: 'https://www.aiub.edu/aiub-team-secures-3rd-position-in-bangladesh-at-icpc-asia-west-continental-finals-2025',
  },
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/faisal-amin-abir-09a31117b/' },
    { label: 'Facebook', url: 'https://web.facebook.com/3014.abir/' },
  ],
  education: [
    {
      period: 'Jan 2020 - Oct 2025',
      school: 'American International University-Bangladesh (AIUB)',
      degree: 'BSc in Computer Science and Engineering',
    },
  ],
  focus: [
    'Competitive Programming',
    'Software Engineering',
    'Backend Development',
    'Team Leadership',
  ],
  competitionGroups: [
    {
      label: 'ICPC',
      description:
        'Regional and continental results with AIUB_Modularity, competing against the strongest university teams in the region.',
      results: [
        {
          rank: '35th',
          title: 'ICPC Asia West Continental Finals',
          year: '2025',
          team: 'AIUB_Modularity',
          detail: '3rd among Bangladeshi teams',
          url: 'https://icpc.global/regionals/finder/AWCChampionshipContest-2026/standings',
        },
        {
          rank: '20th',
          title: 'ICPC Asia Dhaka Regional Contest',
          year: '2025',
          team: 'AIUB_Modularity',
          detail: 'High Honors',
          url: 'https://icpc.global/regionals/finder/Dhaka-2026/standings',
        },
      ],
    },
    {
      label: 'Inter-University',
      description:
        'Consistent finishes across Bangladesh IUPCs, solving algorithmic problems under contest pressure as part of multiple AIUB teams.',
      results: [
        {
          rank: '17th',
          title: 'MU-IUPC',
          year: '2025',
          team: 'AIUB_Modularity',
          detail: '17th of 91 teams',
          url: 'https://toph.co/c/inter-university-mu-cse-fest-2025/standings',
        },
        {
          rank: '33rd',
          title: 'UU-IUPC',
          year: '2025',
          team: 'AIUB_Defenders',
          detail: '33rd of 115 teams',
          url: 'https://toph.co/c/uttara-university-inter-university-2025/standings',
        },
        {
          rank: '35th',
          title: 'UIU-IUPC',
          year: '2025',
          team: 'AIUB_WrongAnswer',
          detail: '35th of 160 teams',
          url: 'https://bapsoj.org/contests/uiu-inter-university-programming-contest-2025/standings',
        },
        {
          rank: '38th',
          title: 'AUST-IUPC',
          year: '2025',
          team: 'AIUB_Hotasha',
          detail: '38th of 130 teams',
          url: 'https://toph.co/c/mtb-presents-aust-inter-university-2025/standings',
        },
        {
          rank: 'Top 50',
          title: 'RUET IUPC',
          year: '2022',
          team: 'AIUB',
          detail: 'National inter-university contest',
          url: '#',
        },
        {
          rank: 'Top 50',
          title: 'SUST IUPC',
          year: '2023',
          team: 'AIUB',
          detail: 'National inter-university contest',
          url: '#',
        },
      ],
    },
    {
      label: 'Individual',
      description:
        'Three intra-university championships across junior and senior divisions, alongside a national industry contest result.',
      results: [
        {
          rank: 'Champion',
          title: 'AIUB CS-Fest Programming Contest',
          year: '2024',
          team: 'Senior Division',
          detail: 'Intra-AIUB',
          url: 'https://toph.co/c/cs-fest-aiub-senior-division/standings',
        },
        {
          rank: 'Champion',
          title: 'Intra-AIUB Programming Contest',
          year: 'Spring 2024',
          team: 'Senior Division',
          detail: 'Intra-AIUB',
          url: 'https://toph.co/c/intra-aiub-2024-senior/standings',
        },
        {
          rank: 'Champion',
          title: 'Intra-AIUB Programming Contest',
          year: 'Fall 2021-22',
          team: 'Junior Division',
          detail: 'Intra-AIUB',
          url: 'https://oj.synapse0.com/standings.php?contest=1012',
        },
        {
          rank: '54th',
          title: 'SRBD Code Contest, Round 2',
          year: '2024',
          team: 'Individual',
          detail: 'Industry programming contest',
          url: 'https://www.hackerrank.com/contests/srbd-code-contest-2024-round-2/leaderboard',
        },
      ],
    },
  ],
  projects: [
    {
      number: '01',
      title: 'E-Commerce BackEnd',
      category: 'Web Application / ASP.NET Web API',
      description:
        'A structured REST backend for an e-commerce workflow, designed around separation of concerns and maintainable application layers.',
      architecture:
        'N-Tier architecture separates API, business logic, data access, and entity responsibilities.',
      features: [
        'User, product, order, order-detail, and cart management',
        'CRUD endpoints and relational data flows',
        'Layered code structure for easier testing and maintenance',
        'Database-backed application state',
      ],
      tags: ['ASP.NET Web API', 'C#', 'N-Tier', 'Database'],
      url: 'https://github.com/faisal-amin-abir/Advanced-Programming-with-.NET',
    },
    {
      number: '02',
      title: '2D Car Game',
      category: 'Java / Console Based',
      description:
        'A console-based driving game that applies object-oriented programming to game state, input, obstacles, scoring, and persistence.',
      architecture:
        'Java classes model the player, game loop, random events, input behavior, and file-based state.',
      features: [
        'Keyboard-controlled car movement',
        'Randomized gameplay events and obstacles',
        'Exception handling for resilient execution',
        'File handling for persistent game data',
      ],
      tags: ['Java', 'OOP', 'KeyEvent', 'File Handling'],
      url: 'https://github.com/Faisal-Amin-Abir/2D_Console_CarGame-Java',
    },
  ],
  experience: [
    {
      period: 'ACM trainee',
      role: 'American International University-Bangladesh',
      company:
        'Conducted ACM training sessions on graphs, data structures, number theory, and general problem solving.',
    },
    {
      period: 'Organizer',
      role: 'AIUB programming contests',
      company: 'Organized and managed online programming contests for AIUB students.',
    },
    {
      period: 'Setter and judge',
      role: 'AIUB CS FEST 2024',
      company: "Worked on the Juniors' and Girls' Division contest flow.",
    },
  ],
  judges: [
    {
      label: 'Codeforces',
      value: '1640',
      note: 'Expert',
      url: 'https://codeforces.com/profile/Xbir',
    },
    {
      label: 'CodeChef',
      value: '1766',
      note: '3 star',
      url: 'https://www.codechef.com/users/abir3014',
    },
  ],
  skills: [
    'C / C++',
    'PHP',
    'C#',
    'Java',
    'JavaScript',
    'ASP.NET Web API',
    'MVC Framework',
    'MySQL',
    'MS-SQL',
    'Git / GitHub',
  ],
  gallery: [
    {
      image: portfolioAsset('profile-portrait.jpeg'),
      title: 'At the AIUB campus',
      caption: 'A portrait from the university where my software engineering and competitive programming journey developed.',
    },
    {
      image: portfolioAsset('award-on-stage.png'),
      title: 'Champion, AIUB CS-Fest 2024',
      caption: 'Receiving the Senior Division championship certificate at the prize-giving ceremony.',
    },
    {
      image: portfolioAsset('after-intra-aiub-2024.jpg'),
      title: 'After Intra-AIUB Programming Contest 2024',
      caption:
        'A group moment after the Intra-AIUB Programming Contest 2024, celebrating another day of problem solving and competition.',
    },
    {
      image: portfolioAsset('after-icpc-bubt.jpg'),
      title: 'After ICPC 2023 Dhaka Regional',
      caption:
        'Together with fellow contestants after the ICPC 2023 Dhaka Regional Contest at BUBT.',
    },
    {
      image: portfolioAsset('team-certificate.jpg'),
      title: 'Team AIUB_Modularity',
      caption: 'A team moment with our contest certificate during the competitive programming season.',
    },
    {
      image: portfolioAsset('team-polo.jpg'),
      title: 'Team and coaches',
      caption: 'AIUB_Modularity together with the coaches who supported the team.',
    },
    {
      image: portfolioAsset('team-selfie.jpg'),
      title: 'After the contest',
      caption: 'A candid post-contest moment with the team after another long problem-solving session.',
    },
  ],
}
