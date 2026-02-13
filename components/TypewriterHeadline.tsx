"use client"

import React, { useState, useEffect } from "react"
import styles from "../styles/Typewriter.module.css"

const phrases = [
  "gifts for husband",
  "gifts for husband who loves sports",
  "gifts for new homeowners",
  "unique gifts for 12 year old girl",
  "best tech gifts under $50",
  "gifts for dad who has everything",
]

const TYPING_SPEED = 80
const ERASING_SPEED = 40
const PAUSE_DURATION = 1800

export default function TypewriterHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isErasing, setIsErasing] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    if (!isErasing && charIndex === currentPhrase.length) {
      // Pause at full phrase, then start erasing
      const timeout = setTimeout(() => setIsErasing(true), PAUSE_DURATION)
      return () => clearTimeout(timeout)
    }

    if (isErasing && charIndex === 0) {
      // Move to next phrase
      setIsErasing(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
      return
    }

    const timeout = setTimeout(
      () => setCharIndex((prev) => prev + (isErasing ? -1 : 1)),
      isErasing ? ERASING_SPEED : TYPING_SPEED
    )
    return () => clearTimeout(timeout)
  }, [charIndex, isErasing, phraseIndex])

  return (
    <span className={styles.typewriter}>
      {phrases[phraseIndex].slice(0, charIndex)}
      <span className={styles.cursor}>|</span>
    </span>
  )
}
