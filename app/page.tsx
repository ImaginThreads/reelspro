"use client";

import { useEffect, useState } from "react";
import { apiclient } from "./lib/api-client";
import { IVideo } from "./models/vedio";
import { IKImage, IKVideo } from "imagekitio-react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiclient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id?.toString()} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-2">{video.title}</h2>
            <p className="text-gray-400 mb-4">{video.description}</p>

            {video.thumbnailUrl && (
              <IKImage
                path={video.thumbnailUrl}
                transformation={[{ width: "300", height: "200" }]}
                className="w-full rounded-lg mb-4"
                alt={video.title}
              />
            )}

            {video.videoUrl && (
              <IKVideo
                path={video.videoUrl}
                transformation={[{ quality: "80" }]}
                className="w-full rounded-lg"
                controls={true}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
