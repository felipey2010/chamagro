'use client'
import { scrollTopButtonAnimation } from '@/lib/Animations'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const MINIMUM_SCROLL_POINT = 200
  const DELAY_TIME_MS = 350

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setVisible(scrollTop > MINIMUM_SCROLL_POINT)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, DELAY_TIME_MS)
    return () => clearTimeout(timer)
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            aria-label="Voltar para o topo"
            variants={scrollTopButtonAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-14 h-14 flex items-center justify-center cursor-pointer fixed bottom-[60px] md:bottom-[38px] right-8 z-10 text-white bg-primary hover:bg-primary/80 border-none transition-colors duration-150 ease-in rounded-full"
            onClick={scrollToTop}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default ScrollToTopButton
