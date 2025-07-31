export const skillCategories = {
    fundamentals: {
      name: 'Fundamental Skills',
      icon: '📚',
      color: 'amber',
      skills: [
        // novice Tier (Row 0)
        { id: 'variables', name: 'Variables', icon: '📦', level: 100, unlocked: true, tier: 'novice', row: 0, col: 0, description: 'Basic variable declaration and assignment', prerequisites: [] },
        { id: 'loops', name: 'Loops', icon: '🔄', level: 100, unlocked: true, tier: 'novice', row: 0, col: 1, description: 'For loops, while loops, iteration fundamentals', prerequisites: [] },
        { id: 'functions', name: 'Functions', icon: '⚙️', level: 100, unlocked: true, tier: 'novice', row: 0, col: 2, description: 'Function definition, parameters, return values', prerequisites: [] },
        
        // apprentice Tier (Row 1)
        { id: 'data_structures', name: 'Data Structures', icon: '🏗️', level: 92, unlocked: true, tier: 'apprentice', row: 1, col: 0, description: 'Arrays, linked lists, stacks, queues', prerequisites: ['variables'] },
        { id: 'algorithms', name: 'Algorithms', icon: '🧮', level: 90, unlocked: true, tier: 'apprentice', row: 1, col: 1, description: 'Sorting, searching, basic algorithms', prerequisites: ['loops', 'functions'] },
        { id: 'oop', name: 'OOP', icon: '🏛️', level: 95, unlocked: true, tier: 'apprentice', row: 1, col: 2, description: 'Classes, objects, inheritance, polymorphism', prerequisites: ['functions'] },
        
        // adept Tier (Row 2)
        { id: 'advanced_algorithms', name: 'Advanced Algorithms', icon: '🎯', level: 85, unlocked: true, tier: 'adept', row: 2, col: 0, description: 'Dynamic programming, graph algorithms', prerequisites: ['data_structures', 'algorithms'] },
        { id: 'design_patterns', name: 'Design Patterns', icon: '🎨', level: 82, unlocked: true, tier: 'adept', row: 2, col: 1, description: 'Singleton, Factory, Observer patterns', prerequisites: ['oop'] },
        { id: 'complexity_analysis', name: 'Big O Analysis', icon: '📊', level: 87, unlocked: true, tier: 'adept', row: 2, col: 2, description: 'Time and space complexity analysis', prerequisites: ['algorithms'] },
        
        // master Tier (Row 3)
        { id: 'system_design', name: 'System Design', icon: '🏗️', level: 75, unlocked: true, tier: 'master', row: 3, col: 0, description: 'Large-scale distributed system architecture', prerequisites: ['advanced_algorithms', 'design_patterns'] },
        { id: 'architectural_patterns', name: 'Architecture', icon: '🏛️', level: 78, unlocked: true, tier: 'master', row: 3, col: 1, description: 'Microservices, event-driven architecture', prerequisites: ['design_patterns', 'complexity_analysis'] },
        { id: 'performance_optimization', name: 'Optimization', icon: '⚡', level: 77, unlocked: true, tier: 'master', row: 3, col: 2, description: 'Memory management, performance tuning', prerequisites: ['complexity_analysis'] }
      ]
    },
    softskills: {
      name: 'Soft Skills',
      icon: '🧠',
      color: 'pink',
      skills: [
        // novice Tier
        { id: 'active_listening', name: 'Active Listening', icon: '👂', level: 88, unlocked: true, tier: 'novice', row: 0, col: 0, description: 'Focused attention and understanding in conversations', prerequisites: [] },
        { id: 'written_communication', name: 'Written Communication', icon: '✍️', level: 90, unlocked: true, tier: 'novice', row: 0, col: 1, description: 'Clear documentation and email communication', prerequisites: [] },
        { id: 'time_management', name: 'Time Management', icon: '⏰', level: 90, unlocked: true, tier: 'novice', row: 0, col: 2, description: 'Prioritizing tasks and meeting deadlines', prerequisites: [] },
        
        // apprentice Tier
        { id: 'collaboration', name: 'Collaboration', icon: '🤝', level: 93, unlocked: true, tier: 'apprentice', row: 1, col: 0, description: 'Working effectively in team environments', prerequisites: ['active_listening'] },
        { id: 'problem_solving', name: 'Problem Solving', icon: '🧩', level: 99, unlocked: true, tier: 'apprentice', row: 1, col: 1, description: 'Breaking down complex problems systematically', prerequisites: ['written_communication'] },
        { id: 'adaptability', name: 'Adaptability', icon: '🌊', level: 91, unlocked: true, tier: 'apprentice', row: 1, col: 2, description: 'Flexibility with changing requirements and technologies', prerequisites: ['time_management'] },
        
        // adept Tier
        { id: 'mentoring', name: 'Mentoring', icon: '🎓', level: 81, unlocked: true, tier: 'adept', row: 2, col: 0, description: 'Guiding junior developers and knowledge sharing', prerequisites: ['collaboration', 'problem_solving'] },
        { id: 'conflict_resolution', name: 'Conflict Resolution', icon: '⚖️', level: 83, unlocked: true, tier: 'adept', row: 2, col: 1, description: 'Mediating disagreements and finding solutions', prerequisites: ['collaboration'] },
        { id: 'critical_thinking', name: 'Critical Thinking', icon: '🔍', level: 85, unlocked: true, tier: 'adept', row: 2, col: 2, description: 'Analytical reasoning and decision making', prerequisites: ['problem_solving', 'adaptability'] },
        
        // master Tier
        { id: 'technical_leadership', name: 'Tech Leadership', icon: '👑', level: 70, unlocked: true, tier: 'master', row: 3, col: 0, description: 'Leading technical teams and driving innovation', prerequisites: ['mentoring', 'conflict_resolution'] },
        { id: 'strategic_thinking', name: 'Strategic Thinking', icon: '🎯', level: 72, unlocked: false, tier: 'master', row: 3, col: 1, description: 'Long-term planning and business alignment', prerequisites: ['critical_thinking', 'conflict_resolution'] },
        { id: 'stakeholder_management', name: 'Stakeholder Management', icon: '🤵', level: 68, unlocked: false, tier: 'master', row: 3, col: 2, description: 'Managing expectations and cross-functional relationships', prerequisites: ['strategic_thinking'] }
      ]
    },
    backend: {
      name: 'Backend',
      icon: '⚙️',
      color: 'green',
      skills: [
        // novice Tier
        { id: 'http_basics', name: 'HTTP Basics', icon: '🌐', level: 95, unlocked: true, tier: 'novice', row: 0, col: 0, description: 'GET, POST, status codes, headers', prerequisites: [] },
        { id: 'json_xml', name: 'JSON/XML', icon: '📄', level: 98, unlocked: true, tier: 'novice', row: 0, col: 1, description: 'Data serialization formats', prerequisites: [] },
        { id: 'basic_crud', name: 'Basic CRUD', icon: '📝', level: 92, unlocked: true, tier: 'novice', row: 0, col: 2, description: 'Create, Read, Update, Delete operations', prerequisites: [] },
        
        // apprentice Tier
        { id: 'rest_apis', name: 'REST APIs', icon: '🔌', level: 90, unlocked: true, tier: 'apprentice', row: 1, col: 0, description: 'RESTful service design principles', prerequisites: ['http_basics'] },
        { id: 'databases', name: 'Databases', icon: '🗄️', level: 88, unlocked: true, tier: 'apprentice', row: 1, col: 1, description: 'SQL, NoSQL database fundamentals', prerequisites: ['json_xml', 'basic_crud'] },
        { id: 'authentication', name: 'Authentication', icon: '🔐', level: 85, unlocked: true, tier: 'apprentice', row: 1, col: 2, description: 'JWT, OAuth, session management', prerequisites: ['basic_crud'] },
        
        // adept Tier
        { id: 'microservices', name: 'Microservices', icon: '🏗️', level: 82, unlocked: true, tier: 'adept', row: 2, col: 0, description: 'Service decomposition, communication', prerequisites: ['rest_apis', 'databases'] },
        { id: 'caching', name: 'Caching', icon: '⚡', level: 80, unlocked: true, tier: 'adept', row: 2, col: 1, description: 'Redis, Memcached, cache strategies', prerequisites: ['databases'] },
        { id: 'message_queues', name: 'Message Queues', icon: '📮', level: 78, unlocked: true, tier: 'adept', row: 2, col: 2, description: 'RabbitMQ, Kafka, async processing', prerequisites: ['authentication', 'microservices'] },
        
        // master Tier
        { id: 'event_sourcing', name: 'Event Sourcing', icon: '📜', level: 70, unlocked: false, tier: 'master', row: 3, col: 0, description: 'Event-driven architecture patterns', prerequisites: ['microservices', 'message_queues'] },
        { id: 'distributed_systems', name: 'Distributed Systems', icon: '🌐', level: 72, unlocked: true, tier: 'master', row: 3, col: 1, description: 'CAP theorem, consensus algorithms', prerequisites: ['caching', 'message_queues'] },
        { id: 'high_availability', name: 'High Availability', icon: '🛡️', level: 75, unlocked: true, tier: 'master', row: 3, col: 2, description: 'Load balancing, failover, redundancy', prerequisites: ['distributed_systems'] }
      ]
    },
    frontend: {
      name: 'Frontend',
      icon: '🎨',
      color: 'blue',
      skills: [
        // novice Tier
        { id: 'html_css', name: 'HTML/CSS', icon: '🎭', level: 85, unlocked: true, tier: 'novice', row: 0, col: 0, description: 'Markup, styling, basic layouts', prerequisites: [] },
        { id: 'javascript_basics', name: 'JS Basics', icon: '🟨', level: 82, unlocked: true, tier: 'novice', row: 0, col: 1, description: 'DOM manipulation, events, functions', prerequisites: [] },
        { id: 'responsive_design', name: 'Responsive', icon: '📱', level: 80, unlocked: true, tier: 'novice', row: 0, col: 2, description: 'Mobile-first, media queries, flexbox', prerequisites: [] },
        
        // apprentice Tier
        { id: 'react_basics', name: 'React Basics', icon: '⚛️', level: 78, unlocked: true, tier: 'apprentice', row: 1, col: 0, description: 'Components, props, state management', prerequisites: ['javascript_basics'] },
        { id: 'css_frameworks', name: 'CSS Frameworks', icon: '🌊', level: 75, unlocked: true, tier: 'apprentice', row: 1, col: 1, description: 'Bootstrap, Tailwind, styled-components', prerequisites: ['html_css', 'responsive_design'] },
        { id: 'api_integration', name: 'API Integration', icon: '🔗', level: 72, unlocked: true, tier: 'apprentice', row: 1, col: 2, description: 'Fetch, Axios, REST API consumption', prerequisites: ['javascript_basics'] },
        
        // adept Tier
        { id: 'advanced_react', name: 'Advanced React', icon: '⚛️', level: 68, unlocked: false, tier: 'adept', row: 2, col: 0, description: 'Hooks, Context, performance optimization', prerequisites: ['react_basics', 'api_integration'] },
        { id: 'state_management', name: 'State Management', icon: '🔄', level: 65, unlocked: false, tier: 'adept', row: 2, col: 1, description: 'Redux, Zustand, global state patterns', prerequisites: ['react_basics'] },
        { id: 'build_tools', name: 'Build Tools', icon: '🔧', level: 70, unlocked: false, tier: 'adept', row: 2, col: 2, description: 'Webpack, Vite, bundling optimization', prerequisites: ['css_frameworks'] },
        
        // master Tier
        { id: 'micro_frontends', name: 'Micro Frontends', icon: '🧩', level: 55, unlocked: false, tier: 'master', row: 3, col: 0, description: 'Module federation, independent deployments', prerequisites: ['advanced_react', 'state_management'] },
        { id: 'performance_tuning', name: 'Performance', icon: '⚡', level: 60, unlocked: false, tier: 'master', row: 3, col: 1, description: 'Code splitting, lazy loading, optimization', prerequisites: ['build_tools', 'advanced_react'] },
        { id: 'pwa', name: 'PWA', icon: '📱', level: 58, unlocked: false, tier: 'master', row: 3, col: 2, description: 'Progressive Web Apps, service workers', prerequisites: ['performance_tuning'] }
      ]
    },
    devops: {
      name: 'DevOps',
      icon: '🔧',
      color: 'purple',
      skills: [
        // novice Tier
        { id: 'version_control', name: 'Git', icon: '🌿', level: 90, unlocked: true, tier: 'novice', row: 0, col: 0, description: 'Version control, branching, merging', prerequisites: [] },
        { id: 'command_line', name: 'Command Line', icon: '💻', level: 88, unlocked: true, tier: 'novice', row: 0, col: 1, description: 'Bash, shell scripting, file operations', prerequisites: [] },
        { id: 'basic_networking', name: 'Networking', icon: '🌐', level: 85, unlocked: true, tier: 'novice', row: 0, col: 2, description: 'TCP/IP, DNS, ports, protocols', prerequisites: [] },
        
        // apprentice Tier
        { id: 'docker', name: 'Docker', icon: '🐳', level: 82, unlocked: true, tier: 'apprentice', row: 1, col: 0, description: 'Containerization, images, volumes', prerequisites: ['command_line'] },
        { id: 'ci_cd', name: 'CI/CD', icon: '🔄', level: 80, unlocked: true, tier: 'apprentice', row: 1, col: 1, description: 'Jenkins, GitHub Actions, pipelines', prerequisites: ['version_control'] },
        { id: 'linux_admin', name: 'Linux Admin', icon: '🐧', level: 78, unlocked: true, tier: 'apprentice', row: 1, col: 2, description: 'System administration, services, logs', prerequisites: ['command_line', 'basic_networking'] },
        
        // adept Tier
        { id: 'kubernetes', name: 'Kubernetes', icon: '⚙️', level: 75, unlocked: true, tier: 'adept', row: 2, col: 0, description: 'Container orchestration, pods, services', prerequisites: ['docker', 'linux_admin'] },
        { id: 'infrastructure_code', name: 'IaC', icon: '🏗️', level: 72, unlocked: false, tier: 'adept', row: 2, col: 1, description: 'Terraform, CloudFormation, automation', prerequisites: ['ci_cd', 'linux_admin'] },
        { id: 'monitoring', name: 'Monitoring', icon: '📈', level: 70, unlocked: true, tier: 'adept', row: 2, col: 2, description: 'Prometheus, Grafana, observability', prerequisites: ['kubernetes'] },
        
        // master Tier
        { id: 'service_mesh', name: 'Service Mesh', icon: '🕸️', level: 65, unlocked: false, tier: 'master', row: 3, col: 0, description: 'Istio, traffic management, security', prerequisites: ['kubernetes', 'monitoring'] },
        { id: 'chaos_engineering', name: 'Chaos Engineering', icon: '🌪️', level: 62, unlocked: false, tier: 'master', row: 3, col: 1, description: 'Fault injection, resilience testing', prerequisites: ['infrastructure_code', 'monitoring'] },
        { id: 'platform_engineering', name: 'Platform Eng', icon: '🏗️', level: 68, unlocked: false, tier: 'master', row: 3, col: 2, description: 'Developer platforms, self-service infrastructure', prerequisites: ['service_mesh', 'chaos_engineering'] }
      ]
    },
    cloud: {
      name: 'Cloud',
      icon: '☁️',
      color: 'indigo',
      skills: [
        // novice Tier
        { id: 'cloud_basics', name: 'Cloud Basics', icon: '☁️', level: 85, unlocked: true, tier: 'novice', row: 0, col: 0, description: 'IaaS, PaaS, SaaS fundamentals', prerequisites: [] },
        { id: 'aws_basics', name: 'AWS Basics', icon: '🟠', level: 82, unlocked: true, tier: 'novice', row: 0, col: 1, description: 'EC2, S3, basic AWS services', prerequisites: [] },
        { id: 'cloud_storage', name: 'Cloud Storage', icon: '💾', level: 80, unlocked: true, tier: 'novice', row: 0, col: 2, description: 'Object storage, databases, backup', prerequisites: [] },
        
        // apprentice Tier
        { id: 'serverless', name: 'Serverless', icon: '⚡', level: 78, unlocked: true, tier: 'apprentice', row: 1, col: 0, description: 'Lambda, functions-as-a-service', prerequisites: ['aws_basics'] },
        { id: 'cloud_databases', name: 'Cloud DBs', icon: '🗃️', level: 75, unlocked: true, tier: 'apprentice', row: 1, col: 1, description: 'RDS, DynamoDB, managed databases', prerequisites: ['cloud_storage'] },
        { id: 'api_gateway', name: 'API Gateway', icon: '🚪', level: 72, unlocked: true, tier: 'apprentice', row: 1, col: 2, description: 'API management, routing, throttling', prerequisites: ['cloud_basics', 'serverless'] },
        
        // adept Tier
        { id: 'auto_scaling', name: 'Auto Scaling', icon: '📈', level: 70, unlocked: true, tier: 'adept', row: 2, col: 0, description: 'Dynamic resource allocation', prerequisites: ['serverless', 'cloud_databases'] },
        { id: 'multi_region', name: 'Multi-Region', icon: '🌍', level: 68, unlocked: false, tier: 'adept', row: 2, col: 1, description: 'Global distribution, latency optimization', prerequisites: ['api_gateway', 'cloud_databases'] },
        { id: 'cloud_security', name: 'Cloud Security', icon: '🛡️', level: 65, unlocked: false, tier: 'adept', row: 2, col: 2, description: 'IAM, encryption, compliance', prerequisites: ['auto_scaling'] },
        
        // master Tier
        { id: 'cloud_native', name: 'Cloud Native', icon: '🚀', level: 60, unlocked: false, tier: 'master', row: 3, col: 0, description: '12-factor apps, cloud-first architecture', prerequisites: ['multi_region', 'cloud_security'] },
        { id: 'edge_computing', name: 'Edge Computing', icon: '⚡', level: 58, unlocked: false, tier: 'master', row: 3, col: 1, description: 'CDN, edge functions, low latency', prerequisites: ['multi_region'] },
        { id: 'cloud_optimization', name: 'Cost Optimization', icon: '💰', level: 62, unlocked: false, tier: 'master', row: 3, col: 2, description: 'Resource optimization, cost management', prerequisites: ['cloud_native', 'edge_computing'] }
      ]
    }
  };