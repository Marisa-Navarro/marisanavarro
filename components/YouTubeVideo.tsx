import { Play } from "lucide-react";
import React from "react";
import YouTube from "react-youtube";
const YouTubeVideo = ({
  youtubeUrl,
  title,
}: {
  youtubeUrl: string;
  title: string;
}) => {
  const extractVideoId = (url: string): string | null => {
    let regex;
    if (url.includes("live")) {
      regex = /youtube\.com\/live\/([a-zA-Z0-9_-]+)/;
    } else {
      regex =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    }
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(youtubeUrl);
  console.log("videoId", videoId);
  if (!videoId) {
    return null;
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  console.log("thumbnail", thumbnail);

  return (
    // <div>
    //   <div className="relative aspect-video overflow-hidden rounded-t-lg">
    //     <img
    //       src={thumbnail || "/placeholder.svg"}
    //       alt={title}
    //       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
    //     />
    //     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
    //       <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
    //         <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="p-4">
    //     <h3 className="font-medium text-gray-900 truncate">{title}</h3>
    //     <p className="text-sm text-gray-500 mt-1">Click to play</p>
    //   </div>
    // </div>
    <div className="p-6 pt-4">
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}${
            false ? "?autoplay=1" : ""
          }`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default YouTubeVideo;
