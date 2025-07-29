import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function PersonalPortfolio() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "Figma"
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "#",
      live: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, file sharing, and team communication.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
      tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind"],
      github: "#",
      live: "#"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for analyzing sales data with charts, filters, and export functionality.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      github: "#",
      live: "#"
    }
  ];

  const experience = [
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      description: "Led development of customer-facing applications, mentored junior developers, and improved system performance by 40%."
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      duration: "2020 - 2022",
      description: "Built responsive web applications, collaborated with design team, and implemented modern development practices."
    },
    {
      company: "Digital Agency",
      position: "Web Developer",
      duration: "2018 - 2020",
      description: "Developed custom websites for clients, managed hosting infrastructure, and provided technical support."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Alex Johnson</h1>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
              <a href="#experience" className="text-gray-600 hover:text-gray-900 transition-colors">Experience</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
            
            <Button className="bg-gray-900 hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Full Stack Developer &
                <span className="text-blue-600"> Problem Solver</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                I create digital experiences that combine beautiful design with robust functionality. 
                Passionate about clean code, user experience, and innovative solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View My Work
                </Button>
                <Button size="lg" variant="outline">
                  Get In Touch
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 mt-8">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Alex Johnson"
                    className="w-64 h-64 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">About Me</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With over 5 years of experience in web development, I specialize in creating 
              scalable applications that deliver exceptional user experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-6">My Story</h4>
              <div className="space-y-4 text-gray-600">
                <p>
                  I started my journey in web development during college, fascinated by the ability 
                  to bring ideas to life through code. What began as a hobby quickly became my passion.
                </p>
                <p>
                  Over the years, I've worked with startups and established companies, helping them 
                  build digital products that solve real-world problems. I believe in writing clean, 
                  maintainable code and creating intuitive user interfaces.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or enjoying outdoor activities.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-6">Skills & Technologies</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-8">
                <h5 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">5+ years of experience</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">50+ projects completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h3>
            <p className="text-xl text-gray-600">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h4>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h3>
            <p className="text-xl text-gray-600">
              My professional journey and the companies I've had the pleasure to work with.
            </p>
          </div>
          
          <div className="space-y-8">
            {experience.map((job, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{job.position}</h4>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <span className="text-gray-500 mt-2 md:mt-0">{job.duration}</span>
                </div>
                <p className="text-gray-600">{job.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">Let's Work Together</h3>
          <p className="text-xl text-gray-600 mb-8">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can bring your ideas to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="h-5 w-5 mr-2" />
              Send Email
            </Button>
            <Button size="lg" variant="outline">
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Github className="h-8 w-8" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Linkedin className="h-8 w-8" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Mail className="h-8 w-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">Alex Johnson</h4>
            <p className="text-gray-400 mb-6">
              Full Stack Developer passionate about creating amazing digital experiences.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8">
              <p className="text-gray-400">&copy; 2025 Alex Johnson. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
