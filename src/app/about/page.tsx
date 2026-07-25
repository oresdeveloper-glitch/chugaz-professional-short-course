"use client"

import { motion } from "framer-motion"
import { Target, Eye, Star, Lightbulb, Shield, Users, Heart, Zap, ChevronRight, Award, BookOpen, Clock, Users2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { galleryImages } from "@/data/gallery"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
}

const coreValues = [
  { icon: Star, title: "Excellence", description: "We strive for the highest standards in education and training delivery." },
  { icon: Lightbulb, title: "Innovation", description: "Embracing modern teaching methods and cutting-edge technologies." },
  { icon: Shield, title: "Integrity", description: "Operating with transparency, honesty, and ethical principles." },
  { icon: Users, title: "Collaboration", description: "Fostering partnerships between students, instructors, and industry." },
  { icon: Heart, title: "Accessibility", description: "Making quality education accessible to all aspiring learners." },
  { icon: Zap, title: "Impact", description: "Creating measurable positive change in our students' lives and careers." },
]

const objectives = [
  "Provide high-quality ICT and Engineering education that meets industry standards",
  "Equip students with practical, hands-on skills for the modern workforce",
  "Foster innovation and creative thinking among our learners",
  "Prepare students for internationally recognized certifications",
  "Bridge the gap between academic knowledge and industry requirements",
  "Contribute to the technological advancement of Tanzania",
]

const trainers = [
  {
    name: "Arch. ILLELA",
    title: "UI/UX Design Lead & CAD Specialist",
    image: "/images/Arch.ILLELA.jpg",
    bio: "Award-winning architect and designer with extensive experience in UI/UX design, AutoCAD, ArchiCAD, and programming. Passionate about bridging design and technology.",
  },
  {
    name: "Eng. ORRESY",
    title: "Senior ICT Instructor & Full-Stack Developer",
    image: "/images/Eng.ORRESY.png",
    bio: "Experienced ICT professional and full-stack developer with over a decade of teaching experience. Specializes in JavaScript, Python, Java, and web technologies.",
  },
  {
    name: "Eng. GODWIN",
    title: "Creative Design Director & Python Specialist",
    image: "/images/Eng.GODWIN.png",
    bio: "Creative design expert and Python specialist with deep knowledge in graphic design, web design, and data science. Dedicated to nurturing creative talent.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F4D] via-[#0B1F4D] to-[#1a3a7a] py-16 lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-gold/80 text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">About Us</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                CHUGAZ
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Discover the story behind CHUGAZ Stationery — a premier ICT and Engineering training center
              dedicated to empowering minds and building futures in Mbeya, Tanzania.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" variants={staggerContainer} initial="initial" whileInView="whileInView">
            <motion.div variants={fadeInUp}>
              <Card className="h-full p-6 md:p-8 group hover:shadow-xl transition-all duration-300 border-primary/10">
                <CardContent className="p-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-7 h-7 text-gold" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-heading">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To provide high-quality, accessible ICT and Engineering education that empowers individuals with
                    practical skills, fosters innovation, and prepares our students for successful careers in
                    the rapidly evolving technological landscape.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="h-full p-6 md:p-8 group hover:shadow-xl transition-all duration-300 border-primary/10">
                <CardContent className="p-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-heading">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To be the leading ICT and Engineering training center in Tanzania, recognized for excellence in
                    education, innovation in teaching methodologies, and producing highly skilled professionals who
                    drive technological advancement and economic growth.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 md:mb-12" variants={fadeInUp} initial="initial" whileInView="whileInView">
            <Badge variant="gold" className="mb-4 px-4 py-1.5 text-sm">Core Values</Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 font-heading">What We Stand For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from curriculum design to student interaction.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" variants={staggerContainer} initial="initial" whileInView="whileInView">
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full p-6 group hover:shadow-lg transition-all duration-300 hover:border-gold/30 border-primary/5">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <value.icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2 font-heading">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto" variants={staggerContainer} initial="initial" whileInView="whileInView">
            <motion.div variants={fadeInUp}>
              <Badge variant="gold" className="mb-4 px-4 py-1.5 text-sm">Our History</Badge>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 font-heading">The CHUGAZ Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  CHUGAZ Stationery was founded with a vision to bridge the skills gap in Tanzania&apos;s ICT and Engineering
                  sectors. What began as a small training initiative has grown into one of Mbeya&apos;s most respected
                  professional training centers.
                </p>
                <p>
                  Over the years, we have trained hundreds of students, many of whom have gone on to secure positions
                  at leading companies or launch their own successful ventures. Our commitment to practical,
                  hands-on education remains at the heart of everything we do.
                </p>
                <p>
                  Today, CHUGAZ Stationery offers 15+ professional courses spanning programming, engineering design,
                  creative skills, and computer applications, serving students from across the region.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative h-64 md:h-80 rounded-[20px] overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
                  alt="CHUGAZ Stationery"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-gold to-gold-light rounded-[20px] p-6 shadow-lg hidden md:block">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-primary/80 text-sm font-medium">Students Trained</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 md:mb-12" variants={fadeInUp} initial="initial" whileInView="whileInView">
            <Badge variant="gold" className="mb-4 px-4 py-1.5 text-sm">Our Objectives</Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 font-heading">What We Aim to Achieve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our objectives drive our commitment to excellence in education and student success.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" variants={staggerContainer} initial="initial" whileInView="whileInView">
            {objectives.map((objective, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full p-6 group hover:shadow-lg transition-all duration-300 border-primary/5">
                  <CardContent className="p-0 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center shrink-0 group-hover:bg-green transition-colors duration-300">
                      <Award className="w-5 h-5 text-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{objective}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 md:mb-12" variants={fadeInUp} initial="initial" whileInView="whileInView">
            <Badge variant="gold" className="mb-4 px-4 py-1.5 text-sm">Our Team</Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 font-heading">Meet Our Trainers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced instructors are industry professionals dedicated to your success.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" variants={staggerContainer} initial="initial" whileInView="whileInView">
            {trainers.map((trainer, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 overflow-hidden border-primary/5">
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-1 font-heading">{trainer.name}</h3>
                    <p className="text-sm text-gold font-medium mb-3">{trainer.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{trainer.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 md:mb-12" variants={fadeInUp} initial="initial" whileInView="whileInView">
            <Badge variant="gold" className="mb-4 px-4 py-1.5 text-sm">Gallery</Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 font-heading">Our Campus & Activities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a glimpse into life at CHUGAZ Stationery.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto" variants={staggerContainer} initial="initial" whileInView="whileInView">
            {galleryImages.map((item) => (
              <motion.div key={item.id} variants={fadeInUp} className="group relative h-48 md:h-64 rounded-[20px] overflow-hidden cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold text-sm">{item.caption}</p>
                    <p className="text-gold text-xs">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-primary-light">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-heading">Ready to Start Your Journey?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join hundreds of successful students who have transformed their careers at CHUGAZ Stationery.
            </p>
            <Link href="/register">
              <Button variant="gradient-gold" size="xl" className="shadow-lg shadow-gold/20">
                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
