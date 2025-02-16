"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Share2, MessageCircle, Bookmark, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoReel({ video, isMuted, index }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(video.likes)

   // Detect when video is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Mute/unmute video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-play/pause when visible
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video
        setIsPlaying(false);
      }
    }
  }, [isVisible]);

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div ref={containerRef} className="relative h-screen snap-start">
      <video
        ref={videoRef}
        loop
        playsInline
        className="w-full h-full object-cover"
        src={video.url}
        onClick={handlePlayPause}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-black/50 hover:bg-black/70"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12" />}
        </Button>
      </div>

      <div className="absolute right-4 bottom-20 sm:right-[-5rem] flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleLike}>
            <Heart className={`h-7 w-7 ${isLiked ? "fill-red-500 stroke-red-500" : ""}`} />
          </Button>
          <span className="text-white text-sm">{likes}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <MessageCircle className="h-7 w-7" />
          </Button>
          <span className="text-white text-sm">0</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Share2 className="h-7 w-7" />
          </Button>
          <span className="text-white text-sm">Share</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bookmark className="h-7 w-7" />
          </Button>
          <span className="text-white text-sm">Save</span>
        </div>
      </div>
    </div>
  )
}

