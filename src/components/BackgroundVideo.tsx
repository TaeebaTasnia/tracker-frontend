import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { isSlowConnection } from '../lib/network'

const POSTER = '/media/poster.jpg'
const CLIP_NAMES = ['ship-arriving', 'cranes-unloading', 'container-yard']
/** Under the blur and overlay, 360p is indistinguishable on small screens at ~1/4 the bytes. */
const clipUrl = (name: string, small: boolean) => `/media/${name}${small ? '-360' : ''}.mp4`
/** Seconds of overlap between consecutive clips. Matches the CSS opacity transition. */
const CROSSFADE_S = 1.6
/** Slightly slowed footage keeps the short stock clips calm and cinematic. */
const PLAYBACK_RATE = 0.8

type Slot = 0 | 1

/**
 * Full-screen, muted freight footage. Two stacked <video> elements play the
 * clip list in turn and crossfade at each boundary, so it reads as one slow,
 * continuous shot. Falls back to a still poster when motion is reduced, the
 * connection is slow, or autoplay is blocked.
 */
export function BackgroundVideo() {
  const reducedMotion = usePrefersReducedMotion()
  const [enabled] = useState(() => !isSlowConnection())
  const showVideo = enabled && !reducedMotion

  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)] as const
  const [activeSlot, setActiveSlot] = useState<Slot>(0)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!showVideo) return
    const videos = videoRefs.map((ref) => ref.current!) as [HTMLVideoElement, HTMLVideoElement]
    let active: Slot = 0
    let clip = 0
    let fading = false
    let cancelled = false
    const small = window.matchMedia('(max-width: 767px)').matches

    const load = (slot: Slot, clipIndex: number) => {
      const video = videos[slot]
      video.muted = true // set the property too: some mobile browsers ignore React's attribute for autoplay
      video.defaultPlaybackRate = PLAYBACK_RATE
      video.src = clipUrl(CLIP_NAMES[clipIndex % CLIP_NAMES.length], small)
      video.load()
    }

    const play = (video: HTMLVideoElement) =>
      video.play().catch(() => {
        if (!cancelled) setFailed(true)
      })

    const onTimeUpdate = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement
      if (fading || video !== videos[active] || !video.duration) return
      if (video.duration - video.currentTime > CROSSFADE_S) return

      fading = true
      const next: Slot = active === 0 ? 1 : 0
      void play(videos[next])
      active = next
      clip += 1
      setActiveSlot(next)

      window.setTimeout(() => {
        if (cancelled) return
        const previous = videos[next === 0 ? 1 : 0]
        previous.pause()
        load(next === 0 ? 1 : 0, clip + 1) // preload the following clip while this one plays
        fading = false
      }, CROSSFADE_S * 1000)
    }

    const onPlaying = () => setStarted(true)

    videos.forEach((video) => {
      video.addEventListener('timeupdate', onTimeUpdate)
      video.addEventListener('playing', onPlaying)
    })

    load(0, 0)
    load(1, 1)
    void play(videos[0])

    return () => {
      cancelled = true
      videos.forEach((video) => {
        video.removeEventListener('timeupdate', onTimeUpdate)
        video.removeEventListener('playing', onPlaying)
        video.pause()
        video.removeAttribute('src')
        video.load()
      })
    }
  }, [showVideo]) // refs are stable

  const videoVisible = showVideo && started && !failed

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-navy-900">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center blur-[2px]"
        style={{ backgroundImage: `url(${POSTER})` }}
      />

      {showVideo &&
        videoRefs.map((ref, slot) => (
          <video
            key={slot}
            ref={ref}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className={`absolute inset-0 h-full w-full scale-105 object-cover blur-[2px] transition-opacity ease-in-out ${
              videoVisible && activeSlot === slot ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: `${CROSSFADE_S * 1000}ms` }}
          />
        ))}

      {/* Readability: navy wash, darker toward the edges and the bottom footer. */}
      <div className="absolute inset-0 bg-navy-900/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,14,26,0.55)_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/80 to-transparent" />
    </div>
  )
}
