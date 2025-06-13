"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play } from "lucide-react"
import { supabase } from "@/components/config"

interface GalleryItem {
  id: number
  imgurl: string
  category: string
  type: 'image' | 'video'
  title: string
  created_at: string
}

type GalleryGridProps = {
  category: string
}

export function GalleryGrid({ category }: GalleryGridProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        let query = supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false })

        if (category !== 'all') {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) throw error
        setGalleryItems(data || [])
   
      } catch (error) {
        console.error('Error fetching gallery items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [category])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando elementos...</p>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay elementos en el portafolio</p>
          </div>
        ) : (
          galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-[3/4] relative">
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.imgurl}
                      className="absolute inset-0 w-full h-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.imgurl}
                    alt={`${item.category} ${item.type}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <p className="text-sm capitalize">{item.title}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-[4/3] w-full">
            {selectedItem?.type === 'video' ? (
              <video
                src={selectedItem.imgurl}
                controls
                className="w-full h-full"
                autoPlay
              />
            ) : (
              <Image
                src={selectedItem?.imgurl || ""}
                alt={selectedItem?.title || `${selectedItem?.category} image`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <div className="mt-2">
            {selectedItem?.title && (
              <h3 className="text-lg font-medium mb-1">{selectedItem.title}</h3>
            )}
            <p className="text-gray-500 capitalize">{selectedItem?.category}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}