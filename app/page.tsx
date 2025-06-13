"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GalleryGrid } from "@/components/gallery-grid"
import { SocialLinks } from "@/components/social-links"
import { portfolioItems } from "@/lib/mock-data"

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  const categoryCounts = {
    "Formaciones y Seminarios": portfolioItems.filter(item => item.category === "Formaciones y Seminarios").length,
    "Directos": portfolioItems.filter(item => item.category === "Directos").length,
    "Material educativo": portfolioItems.filter(item => item.category === "Material educativo").length,
    "Eventos": portfolioItems.filter(item => item.category === "Eventos").length,
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749375940/IMG_7826_quy47i.jpg"
            alt="Hairstyling background"
            fill
            className="object-cover "
            priority
          />
        </div>
        <div className="relative z-10 flex h-full  flex-col items-center justify-center text-center px-4">
         
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-white">
       
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16" data-aos="fade-up">
            Sobre <span className="italic">mí</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" data-aos="fade-right">
             
              
              <p className="text-lg leading-relaxed text-gray-700">
                Soy Formadora Profesional de peluquería y, a través de la enseñanza, puedo aportar lo mejor de mí con experiencia e ilusión. En mi trayectoria, he tenido la oportunidad de especializarme y compartir conocimientos con profesionales del estilismo, algo que me ha enriquecido profundamente.</p>
                <p className="text-lg leading-relaxed text-gray-700">

Me motiva seguir aprendiendo y avanzando en este mundo de la enseñanza, donde cada día representa una nueva oportunidad para descubrir, enseñar e inspirar.


              </p>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              <Image
                src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749065644/IMG_7822_sphigr.png"
                alt="Hairdresser at work"
                width={400}
                height={600}
                className="rounded-lg object-cover h-full w-full"
              />
              <Image
                src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749065643/IMG_7824_j47mo9.jpg"
                alt="Hairstyle example"
                width={400}
                height={600}
                className="rounded-lg object-cover h-full w-full mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16" data-aos="fade-up">
            <span className="italic">Portfolio</span>
          </h2>
          <Tabs defaultValue="Formaciones y Seminarios" className="w-full">
            <div className="overflow-x-auto pb-4 mb-8">
              <TabsList className="grid grid-cols-4 min-w-[350px] md:min-w-[800px] mx-auto mb-[170px] bg-transparent gap-8 md:gap-32 md:min-w-0 md:max-w-md items-start" data-aos="fade-up" data-aos-delay="200">
                {categoryCounts["Formaciones y Seminarios"] > 0 && (
                  <TabsTrigger value="Formaciones y Seminarios" className="flex flex-col items-center data-[state=active]:bg-transparent">
                    <div className="w-12 h-12 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border-2 border-transparent transition-all duration-300 hover:scale-110 data-[state=active]:border-teal-600">
                      <Image
                        src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749404018/1_1_ycnu44.jpg"
                        alt="All services"
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs md:hidden md:text-sm font-medium text-center h-10 overflow-hidden flex items-center justify-center">Formaciones <br /> y <br /> Seminarios</span>
                    <span className="text-xs  md:text-sm font-medium text-center h-10 overflow-hidden  items-center justify-center hidden md:flex">Formaciones  y  Seminarios</span>
                  </TabsTrigger>
                )}

                {categoryCounts["Directos"] > 0 && (
                  <TabsTrigger value="Directos" className="flex flex-col items-center data-[state=active]:bg-transparent">
                    <div className="w-12 h-12 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border-2 border-transparent transition-all duration-300 hover:scale-110 data-[state=active]:border-teal-600">
                      <Image
                        src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749399190/2_t0noqf.jpg"
                        alt="Haircuts"
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-center h-10 overflow-hidden flex items-center justify-center">Directos</span>
                  </TabsTrigger>
                )}

                {categoryCounts["Material educativo"] > 0 && (
                  <TabsTrigger value="Material educativo" className="flex flex-col items-center data-[state=active]:bg-transparent">
                    <div className="w-12 h-12 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border-2 border-transparent transition-all duration-300 hover:scale-110 data-[state=active]:border-teal-600">
                      <Image
                        src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749399190/3_vmpyf2.jpg"
                        alt="Coloring"
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-center h-10 overflow-hidden flex items-center justify-center">Material educativo</span>
                  </TabsTrigger>
                )}

                {categoryCounts["Eventos"] > 0 && (
                  <TabsTrigger value="Eventos" className="flex flex-col items-center data-[state=active]:bg-transparent">
                    <div className="w-12 h-12 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border-2 border-transparent transition-all duration-300 hover:scale-110 data-[state=active]:border-teal-600">
                      <Image
                        src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749404021/4_1_o0pwxy.jpg"
                        alt="Styling"
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-center h-10 overflow-hidden flex items-center justify-center">Eventos</span>
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value="Formaciones y Seminarios" data-aos="fade-up" data-aos-delay="400">
              <GalleryGrid category="Formaciones y Seminarios" />
            </TabsContent>
            <TabsContent value="Directos">
              <GalleryGrid category="Directos" />
            </TabsContent>
            <TabsContent value="Material educativo">
              <GalleryGrid category="Material educativo" />
            </TabsContent>
            <TabsContent value="Eventos">
              <GalleryGrid category="Eventos" />
            </TabsContent>

            
          </Tabs>
        </div>
      </section>

      {/* Social & Contact Section */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16" data-aos="fade-up">
             <span className="italic">Contacto</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h3 className="font-serif text-2xl mb-6">Redes Sociales</h3>
              <p className="text-gray-700 mb-8">
                Sígueme en redes sociales para ver mis últimos trabajos, contenido entre bastidores y consejos de peluquería.
              </p>
              <SocialLinks />
            </div>
            <div data-aos="fade-left">
              <Image
                src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749455161/IMG_8330_sjohsk.jpg"
                alt="Hairdresser at work"
                width={600}
                height={400}
                className="rounded-lg object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto" data-aos="fade-up">
          <div className="grid md:grid-cols-3 gap-8">
            <div></div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="https://res.cloudinary.com/deq6qm96r/image/upload/v1749101918/Marisa_Navarro_Logo_white_lcxu0y.png"
                alt="Marisa Navarro Logo"
                width={150}
                height={60}
                className="mb-4"
              />
              <p className="text-gray-400 mt-4 max-w-md">
                Formadora Profesional y Educadora de Peluquería
              </p>
            </div>
            <div></div>
          </div>
          <div className="border-t border-teal-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Marisa Navarro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
