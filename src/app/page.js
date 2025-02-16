"use client"

import { useEffect, useState, useCallback } from "react"
import VideoReel from "@/components/video-reel"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

export default function ReelsPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isMuted, setIsMuted] = useState(true)

  const fetchVideos = useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await fetch(`https://api.pexels.com/videos/search?query=nature&per_page=5&page=${page}`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      })
      const data = await response.json()
      const newVideos = data.videos.map((video) => ({
        id: video.id,
        url: video.video_files.find((file) => file.quality === "sd").link,
        likes: Math.floor(Math.random() * 1000),
      }))
      setVideos((prev) => [...prev, ...newVideos])
      setPage((prev) => prev + 1)
    } catch (error) {
      console.error("Error fetching videos:", error)
    } finally {
      setLoading(false)
    }
  }, [page, loading]) 

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000 && !loading) {
        fetchVideos()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, fetchVideos])

  return (
    <main className="min-h-screen bg-black flex justify-center">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>
      </div>
      <div className="w-full max-w-md">
        {videos.map((video, index) => (
          <VideoReel key={video.id} video={video} isMuted={isMuted} index={index} />
        ))}
        {loading && <div className="text-white text-center py-4">Loading...</div>}
      </div>
    </main>
  )
}

