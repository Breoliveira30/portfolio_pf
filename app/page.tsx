"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import {
  Linkedin,
  Instagram,
  Mail,
  Phone,
  ExternalLink,
  Code,
  User,
  Briefcase,
  MessageCircle,
  Globe,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  Monitor,
  Server,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Language Context
const translations = {
  pt: {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      title: "Desenvolvedor",
      subtitle: "Full Stack",
      description: "Criando soluções digitais elegantes com foco na experiência do usuário",
      cta: "Ver Projetos",
    },
    about: {
      title: "Sobre Mim",
      description:
        "Desenvolvedor com 1 ano e 3 meses de experiência na Defensoria Pública do Distrito Federal, atuando tanto no desenvolvimento quanto em testes de software. Apaixonado por criar soluções que fazem a diferença na vida das pessoas.",
      skills: "Minhas Habilidades",
      frontend: "Front-end",
      backend: "Front-end",
      database: "Dados",
      experience: "Experiência",
      experienceText:
        "1 ano e 3 meses na Defensoria Pública do DF, desenvolvendo sistemas e realizando testes de qualidade de software.",
    },
    projects: {
      title: "Meus Projetos",
      description: "Explore alguns dos trabalhos que desenvolvi, cada um com suas particularidades e desafios únicos",
    },
    contact: {
      title: "Vamos Conversar",
      description: "Interessado em trabalhar juntos? Entre em contato através dos canais abaixo",
      email: "Email",
      phone: "WhatsApp",
    },
    footer: "Feito por Brenno Oliveira",
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      title: "Full Stack",
      subtitle: "Developer",
      description: "Creating elegant digital solutions focused on user experience",
      cta: "View Projects",
    },
    about: {
      title: "About Me",
      description:
        "Developer with 1 year and 3 months of experience at the Public Defender's Office of the Federal District, working in both development and software testing. Passionate about creating solutions that make a difference in people's lives.",
      skills: "My Skills",
      frontend: "Front-end",
      backend: "Data",
      database: "Data",
      experience: "Experience",
      experienceText:
        "1 year and 3 months at the Public Defender's Office of DF, developing systems and performing software quality testing.",
    },
    projects: {
      title: "My Projects",
      description: "Explore some of the work I've developed, each with its own particularities and unique challenges",
    },
    contact: {
      title: "Let's Talk",
      description: "Interested in working together? Get in touch through the channels below",
      email: "Email",
      phone: "WhatsApp",
    },
    footer: "Made by Brenno Oliveira",
  },
}

// Matrix Rain Effect with Pastel Colors
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()

    const matrix = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>{}[]()".split("")
    const font_size = window.innerWidth < 768 ? 10 : 14
    const columns = canvas.width / font_size
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(248, 250, 252, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = font_size + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]

        // Use pastel blue colors
        const opacity = Math.random() * 0.95 + 0.5
        ctx.fillStyle = `rgba(70, 130, 200, ${opacity})`

        ctx.fillText(text, i * font_size, drops[i] * font_size)

        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30 z-0" />
}

// Mobile Navigation Component
const MobileNav = ({
  language,
  setLanguage,
  t,
}: { language: "pt" | "en"; setLanguage: (lang: "pt" | "en") => void; t: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200/50 p-4"
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#about"
              className="text-slate-600 hover:text-blue-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.about}
            </a>
            <a
              href="#projects"
              className="text-slate-600 hover:text-blue-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.projects}
            </a>
            <a
              href="#contact"
              className="text-slate-600 hover:text-blue-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.contact}
            </a>
            <Button
              onClick={() => {
                setLanguage(language === "pt" ? "en" : "pt")
                setIsOpen(false)
              }}
              variant="outline"
              size="sm"
              className="bg-white/50 border-slate-200 text-slate-600 hover:bg-slate-50 w-fit"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "pt" ? "EN" : "PT"}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Skill Progress Bar Component
const SkillBar = ({ skill, percentage, delay = 0 }: { skill: string; percentage: number; delay?: number }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, delay)
    return () => clearTimeout(timer)
  }, [percentage, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-700 font-medium text-sm sm:text-base">{skill}</span>
        <span className="text-blue-400 font-bold text-sm sm:text-base">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${animatedPercentage}%` }}
          transition={{ duration: 1.5, delay: delay * 0.1 + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

// Enhanced Project Carousel
const ProjectCarousel = ({ language }: { language: "pt" | "en" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const projects = [
    {
      id: 1,
      title: language === "pt" ? "Lading Page Loja de Móveis" : "Lading Page Furniture Stor",
      description:
        language === "pt"
          ? "Landing page moderna e elegante para loja de móveis com catálogo interativo, visualizador 3D e sistema de orçamentos."
          : "Modern and elegant landing page for furniture store with interactive catalog, 3D viewer and quote system.",
      tech: ["TypeScript", "CSS", "JavaScript", "Supabase"],
      image: "/projetos/carvalho.png",
      link: "https://carvalho-moveis.vercel.app/",
      status: language === "pt" ? "Em Produção" : "In Production",
    },
    {
      id: 2,
      title:
        language === "pt"
          ? "WaterGuardian - Monitor de Consumo de Água IoT"
          : "WaterGuardian - IoT Water Consumption Monitor",
      description:
        language === "pt"
          ? "Sistema completo de monitoramento em tempo real do consumo de água com sensores IoT, dashboard interativo, alertas de vazamento e relatórios de economia desenvolvido com TypeScript, CSS e JavaScript."
          : "Complete real-time water consumption monitoring system with IoT sensors, interactive dashboard, leak alerts and savings reports developed with TypeScript, CSS and JavaScript.",
      tech: ["TypeScript", "JavaScript", "Python", "CSS", "Supabase"],
      image: "/projetos/waterguardian.png",
      link: "https://waterguardian.vercel.app/",
      status: language === "pt" ? "Concluído" : "Completed",
    },
    {
      id: 3,
      title:
        language === "pt"
          ? " Landing Page Desenolvimento de sites e Lading Page"
          : "Landing Page Website development and Lading Page",
      description:
        language === "pt"
          ? "O DevDuo é um site portfólio criado para apresentar os projetos e trabalhos desenvolvidos por dois profissionais da área de tecnologia. O objetivo é demonstrar suas habilidades como desenvolvedores, fortalecer sua presença no meio digital e atrair novos clientes interessados em soluções personalizadas de desenvolvimento."
          : "DevDuo is a portfolio website created to showcase the projects and work developed by two technology professionals. The goal is to showcase their skills as developers, strengthen their presence in the digital environment and attract new clients interested in customized development solutions.",
      tech: ["React", "TypeScript ", "Node.js", "Supabase"],
      image: "/projetos/devduo.jpeg",
      link: "https://devduom.vercel.app/",
      status: language === "pt" ? "Concluído" : "Completed",
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, projects.length])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative min-h-[600px] sm:min-h-[650px] md:h-[500px] overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Card className="w-full h-full bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
              <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                {/* Mobile Layout - Stacked */}
                <div className="flex flex-col md:hidden space-y-4 h-full">
                  <div className="w-full h-48 sm:h-56 flex-shrink-0">
                    <img
                      src={projects[currentIndex].image || "/placeholder.svg"}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-h-0">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex-1 leading-tight">
                          {projects[currentIndex].title}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium w-fit">
                          {projects[currentIndex].status}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                        {projects[currentIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                        {projects[currentIndex].tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <a href={projects[currentIndex].link} target="_blank" rel="noopener noreferrer" className="block">
                        <Button
                          variant="outline"
                          className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300 w-full"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {language === "pt" ? "Ver Projeto" : "View Project"}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Side by Side */}
                <div className="hidden md:flex h-full">
                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-slate-800">{projects[currentIndex].title}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full font-medium">
                        {projects[currentIndex].status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">{projects[currentIndex].description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[currentIndex].tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300"
                      onClick={() => window.open(projects[currentIndex].link, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {language === "pt" ? "Ver Projeto" : "View Project"}
                    </Button>
                  </div>
                  <div className="flex-1">
                    <img
                      src={projects[currentIndex].image || "/placeholder.svg"}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          onClick={prevProject}
          variant="outline"
          size="sm"
          className="bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 10000)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-400 scale-125" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextProject}
          variant="outline"
          size="sm"
          className="bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-slate-500">
          {isAutoPlaying
            ? language === "pt"
              ? "Rotação automática ativa"
              : "Auto-rotation active"
            : language === "pt"
              ? "Rotação pausada"
              : "Rotation paused"}
        </p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const { scrollYProgress } = useScroll()
  const t = translations[language]

  const skillCategories = {
    frontend: [
      { name: "JavaScript", percentage: 75 },
      { name: "TypeScript", percentage: 70 },
      { name: "React", percentage: 60 },
      { name: "Next.js", percentage: 50 },
    ],
    backend: [
      { name: "Node.js", percentage: 50 },
      { name: "Python", percentage: 70 },
      { name: "Django", percentage: 70 },
      { name: "Jest/Testing", percentage: 85 },
      { name: "Git", percentage: 90 },
    ],
    database: [
      { name: "PostgreSQL", percentage: 70 },
      { name: "Supabase", percentage: 65 },
    ],
  }

  // Contact messages
  const emailSubject =
    language === "pt" ? "Interesse em seu trabalho como desenvolvedor" : "Interest in your work as a developer"

  const emailBody =
    language === "pt"
      ? "Olá Brenno,\n\nEstou interessado em seu trabalho como desenvolvedor e gostaria de conversar sobre possíveis oportunidades de colaboração.\n\nAguardo seu retorno.\n\nAtenciosamente,"
      : "Hello Brenno,\n\nI am interested in your work as a developer and would like to discuss possible collaboration opportunities.\n\nI look forward to your response.\n\nBest regards,"

  const whatsappMessage =
    language === "pt"
      ? "Olá Brenno! Vi seu portfólio e estou interessado em seu trabalho como desenvolvedor. Gostaria de conversar sobre possíveis oportunidades."
      : "Hello Brenno! I saw your portfolio and I'm interested in your work as a developer. I would like to discuss possible opportunities."

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 overflow-x-hidden">
      <MatrixRain />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl font-bold text-slate-800"
            >
              Brenno Oliveira
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-slate-600 hover:text-blue-500 transition-colors">
                {t.nav.about}
              </a>
              <a href="#projects" className="text-slate-600 hover:text-blue-500 transition-colors">
                {t.nav.projects}
              </a>
              <a href="#contact" className="text-slate-600 hover:text-blue-500 transition-colors">
                {t.nav.contact}
              </a>
              <Button
                onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
                variant="outline"
                size="sm"
                className="bg-white/50 border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "pt" ? "EN" : "PT"}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav language={language} setLanguage={setLanguage} t={t} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-slate-800">
                {t.hero.title}
                <br />
                <span className="text-blue-400 font-medium">{t.hero.subtitle}</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t.hero.description}
              </p>
              <Button
                size="lg"
                className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("#projects", "_self")}
              >
                <Code className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                {t.hero.cta}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-gradient-to-br from-blue-200 to-slate-200 shadow-2xl overflow-hidden">
                  <img src="/brenno-profcie.jpeg" alt="Brenno Oliveira" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                  <Code className="w-8 sm:w-12 h-8 sm:h-12 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-slate-800">
              <User className="inline w-8 sm:w-12 h-8 sm:h-12 mr-4 text-blue-400" />
              {t.about.title}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              {t.about.description}
            </p>
          </motion.div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Photo Section - Portrait Style */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:order-1 lg:col-span-1 w-full"
            >
              <div className="relative">
                <div className="w-56 sm:w-64 h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-blue-200 to-slate-200 shadow-xl overflow-hidden">
                  <img
                    src="/profissional.jpeg"
                    alt="Brenno Oliveira - Foto Profissional"
                    className="w-full h-full object-cover object-center scale-110"
                    style={{
                      objectPosition: "center 20%",
                      filter: "contrast(1.1) brightness(1.05) saturate(1.1)",
                    }}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 sm:w-16 h-12 sm:h-16 bg-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Skills Section - Empilhadas Verticalmente */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:order-2 lg:col-span-1 w-full max-w-md mx-auto lg:mx-0 lg:max-w-none space-y-8"
            >
              {/* Frontend Skills */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Monitor className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl sm:text-2xl font-medium text-slate-800">{t.about.frontend}</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {skillCategories.frontend.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill.name} percentage={skill.percentage} delay={index} />
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Server className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl sm:text-2xl font-medium text-slate-800">{t.about.backend}</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {skillCategories.backend.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill.name} percentage={skill.percentage} delay={index + 4} />
                  ))}
                </div>
              </div>

              {/* Database Skills */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl sm:text-2xl font-medium text-slate-800">{t.about.database}</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {skillCategories.database.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill.name} percentage={skill.percentage} delay={index + 8} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience Card - Separada */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none flex justify-center lg:justify-start"

            >
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200 shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <h4 className="text-lg sm:text-xl font-medium text-blue-500 mb-4 sm:mb-6">{t.about.experience}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6 lg:mb-8">
                    {t.about.experienceText}
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium text-sm sm:text-base">
                        Desenvolvimento de Sistemas
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium text-sm sm:text-base">Testes de Software</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium text-sm sm:text-base">Controle de Qualidade</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-slate-800">
              <Briefcase className="inline w-8 sm:w-12 h-8 sm:h-12 mr-4 text-blue-400" />
              {t.projects.title}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              {t.projects.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <ProjectCarousel language={language} />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-slate-800">
              <MessageCircle className="inline w-8 sm:w-12 h-8 sm:h-12 mr-4 text-blue-400" />
              {t.contact.title}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              {t.contact.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <motion.a
              href={`mailto:BrennoOliveira@outlook.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:bg-white/80 hover:shadow-lg transition-all duration-300 group"
            >
              <Mail className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-2">{t.contact.email}</h3>
              <p className="text-slate-600 text-xs sm:text-sm break-all">BrennoOliveira@outlook.com</p>
            </motion.a>

            <motion.a
              href="https://wa.me/5561998590309"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:bg-white/80 hover:shadow-lg transition-all duration-300 group"
            >
              <Phone className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-2">{t.contact.phone}</h3>
              <p className="text-slate-600 text-xs sm:text-sm">(61) 99859-0309</p>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/brenno-oliveira-5264b9265/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:bg-white/80 hover:shadow-lg transition-all duration-300 group"
            >
              <Linkedin className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-2">LinkedIn</h3>
              <p className="text-slate-600 text-xs sm:text-sm">@brenno-oliveira</p>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/br_oliveira30/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:bg-white/80 hover:shadow-lg transition-all duration-300 group"
            >
              <Instagram className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-2">Instagram</h3>
              <p className="text-slate-600 text-xs sm:text-sm">@br_oliveira30</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-slate-200 relative z-10 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-500 text-sm sm:text-base">{t.footer}</p>
        </div>
      </footer>
    </div>
  )
}
