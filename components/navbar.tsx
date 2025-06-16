"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Scissors } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed py-5 top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={
              isScrolled
                ? "https://res.cloudinary.com/deq6qm96r/image/upload/v1749064881/Marisa_Navarro_Logo_jpeg-removebg-preview_doktis.png" // Dark logo when scrolled
                : "https://res.cloudinary.com/deq6qm96r/image/upload/v1749101918/Marisa_Navarro_Logo_white_lcxu0y.png" // Original light logo
            }
            alt="Marisa Navarro Logo"
            width={50}
            height={50} // Adjusted for better aspect ratio
            className="w-[50px] lg:w-[100px] h-auto transition-all duration-300"
            priority
          />
        </Link>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-teal-950" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg lg:text-xl font-medium py-2" onClick={handleLinkClick}>
                  Inicio
                </Link>
                <Link href="#about" className="text-lg lg:text-xl font-medium py-2" onClick={handleLinkClick}>
                  Sobre mí
                </Link>
                <Link href="#portfolio" className="text-lg lg:text-xl font-medium py-2" onClick={handleLinkClick}>
                  Portfolio
                </Link>
                <Link href="#contact" className="text-lg lg:text-xl font-medium py-2" onClick={handleLinkClick}>
                  Contacto
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className={`font-medium text-lg lg:text-xl hover:underline underline-offset-4 ${
                isScrolled ? "text-teal-950" : "text-white"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="#about"
              className={`font-medium text-lg lg:text-xl hover:underline underline-offset-4 ${
                isScrolled ? "text-teal-950" : "text-white"
              }`}
            >
              Sobre mí
            </Link>
            <Link
              href="#portfolio"
              className={`font-medium text-lg lg:text-xl hover:underline underline-offset-4 ${
                isScrolled ? "text-teal-950" : "text-white"
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="#contact"
              className={`font-medium text-lg lg:text-xl hover:underline underline-offset-4 ${
                isScrolled ? "text-teal-950" : "text-white"
              }`}
            >
              Contacto
            </Link>
            {/* <Link href="/admin">
              <Button
                variant={isScrolled ? "default" : "outline"}
                className={!isScrolled ? "border-white text-white hover:bg-white hover:text-teal-950" : ""}
              >
                Admin
              </Button>
            </Link> */}
          </nav>
        )}
      </div>
    </header>
  )
}


