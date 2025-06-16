"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Portfolio } from "@prisma/client";
import { onGetPortfolio } from "@/actions/portfolio";
import YouTubeVideo from "./YouTubeVideo";

type GalleryGridProps = {
  category: string;
};

export function GalleryGrid({ category }: GalleryGridProps) {
  const [galleryItems, setGalleryItems] = useState<Portfolio[]>([]);
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const response = await onGetPortfolio();
        if (response.status !== 200) {
          console.error("Error fetching portfolio items:", response.message);
          return;
        }
        const data = response.data as Portfolio[];
        console.log("portfolio-data: ", data);

        const filteredData = await data.filter(
          (item) => item.category === category || category === "all"
        );
        setGalleryItems(filteredData || []);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryItems();
  }, [category]);
  console.log(galleryItems);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando elementos...</p>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay elementos en el portafolio</p>
          </div>
        ) : (
          galleryItems.map((item) => {
            let videoSrc = item.url;
            const extractVideoId = (url: string): string | null => {
              let regex;
              if(url.includes("live")) {
                regex = /youtube\.com\/live\/([a-zA-Z0-9_-]+)/
              } else {
                regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
              }
              const match = url.match(regex);
              return match ? match[1] : null;
            };

            const videoId = extractVideoId(item.url);
            if (
              item.type === "video" &&
              item.url.includes("youtube.com/watch")
            ) {
              const videoId = item.url.split("v=")[1];
              if (videoId) {
                const ampersandPosition = videoId.indexOf("&");
                videoSrc = `https://www.youtube.com/embed/${videoId}`;
              }
            }

            return (
              <div key={item.id} className="rounded-lg overflow-hidden relative" onClick={() => setSelectedItem(item)}>
                <div className="aspect-video  md:aspect-[3/4] relative">
                  {item.type === "youtube" ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}${
                        false ? "?autoplay=1" : ""
                      }`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="absolute inset-0 w-full h-full object-cover"
                      allowFullScreen
                    />
                  ) : item.type === "video" ? (
                    <video
                      src={item.url}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={`${item.category} ${item.type}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                {item.title && (
                  <div className="p-4 bg-white">
                    <p className="text-sm font-medium ">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.category}
                    </p>
                  </div>
                )}

                <div className="absolute inset-0 w-full h-full object-cover cursor-pointer"></div>
              </div>
            );
          })
        )}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-[4/3] w-full">
            {selectedItem?.type === "youtube" && (
              <YouTubeVideo
                youtubeUrl={selectedItem.url}
                title={selectedItem.title || "YouTube Video"}
              />
            )}
            {selectedItem?.type === "video" && (
              <video
                src={selectedItem.url}
                controls
                className="w-full h-full"
                autoPlay
              />
            )}
            {selectedItem?.type === "image" && (
              <Image
                src={selectedItem.url}
                alt={selectedItem.title || "Gallery Image"}
                fill
                className="object-cover"
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
  );
}
