export function slideInFromLeft(delay: number) {
  return {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
    invisible: {
      x: 100,
      opacity: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  }
}

export function slideInFromRight(delay: number) {
  return {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  }
}

export const slideInFromTop = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
}

export function fadeInFromLeft(index: number) {
  return {
    initial: {
      opacity: 0,
      x: -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 * index,
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  }
}

export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.4,
      ease: 'easeIn',
    },
  },
}

export const fadeInFromBottom = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      y: { duration: 0.8 },
      opacity: { duration: 0.8 },
      duration: 2,
      ease: 'easeIn',
      type: 'spring',
      bounce: 0.8,
      stiffness: 80,
      damping: 10,
    },
  },
}

export const fadeInFromBottom_2 = {
  initial: {
    opacity: 0,
    y: 150,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      y: { duration: 0.8 },
      opacity: { duration: 0.8 },
      duration: 3,
      ease: 'easeIn',
      type: 'spring',
      bounce: 0.5,
      stiffness: 80,
      damping: 10,
    },
  },
}

export const fadeInFromTop = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      y: { duration: 0.2 },
      opacity: { duration: 0.2 },
      duration: 2,
      ease: 'easeIn',
      type: 'spring',
      bounce: 0.8,
      stiffness: 80,
      damping: 10,
    },
  },
}

export const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: 'easeIn',
      type: 'spring',
      bounce: 0.5,
      stiffness: 80,
      damping: 10,
    },
  },
}

export const fadeInRight = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: 'easeIn',
      type: 'spring',
      bounce: 0.5,
      stiffness: 80,
      damping: 10,
    },
  },
}

export function fadeInFromBottom_3(index: number) {
  return {
    initial: {
      opacity: 0,
      y: 150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.5,
        ease: 'easeIn',
        type: 'spring',
        bounce: 0.5,
        stiffness: 80,
        damping: 10,
      },
    },
  }
}

export const scrollTopButtonAnimation = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.5,
      opacity: { delay: 0.025 },
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      type: 'spring',
      bounce: 0,
      opacity: { delay: 0.05 },
    },
  },
}

export const closeAnnouncementAnimation = {
  initial: {
    height: 0,
  },
  animate: {
    height: 40,
    transition: {
      type: 'spring',
      bounce: 0.5,
    },
  },
}

export const GenericModalAnimation = {
  initial: {
    backdropFilter: 'blur(0)',
    opacity: 0,
  },
  animate: {
    backdropFilter: 'blur(4px)',
    opacity: 1,
  },
}

export const DialogAnimation = {
  initial: { height: 0 },
  animate: { height: 'auto' },
}

export const commentFramerVariants = {
  start: {
    x: 50,
    marginTop: '0px',
    overflow: 'hidden',
  },
  animate: {
    x: 0,
    marginTop: '6px',
    overflow: 'visible',
  },
  exit: {
    height: 0,
    opacity: 0,
    marginTop: '0px',
    overflow: 'hidden',
  },
}

export const postFramerVariants = {
  start: {
    y: '-50',
    opacity: 0,
    marginTop: '0px',
    overflow: 'hidden',
  },
  animate: {
    y: 0,
    opacity: 1,
    marginTop: '16px',
    overflow: 'visible',
  },
  exit: {
    height: 0,
    opacity: 0,
    marginTop: '0px',
    overflow: 'hidden',
  },
}

export const menuAnimationVar = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.2,
      // ease: [0.12, 0, 0.39, 0],
      ease: [0.4, 0, 1, 1],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      duration: 0.2,
      // ease: [0.22, 1, 0.36, 1],
      ease: [0.4, 0, 1, 1],
    },
  },
}

export const slideContentFromBottom = {
  initial: {
    opacity: 0,
    y: 50,
    overflow: 'hidden',
  },
  animate: {
    opacity: 1,
    y: 0,
    overflow: 'visible',
    transition: {
      duration: 0.05,
      ease: 'easeIn',
      type: 'spring',
      bounce: 0.8,
      stiffness: 80,
      damping: 10,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    overflow: 'hidden',
  },
}

export function scaleContainer(shouldAnimate: boolean) {
  return {
    initial: shouldAnimate
      ? {
          scale: 0.8,
          opacity: 0.2,
        }
      : {
          scale: 1,
          x: 0,
          opacity: 1,
        },
    animate: {
      scale: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      scale: 0.8,
      opacity: 0,
    },
  }
}

export const bounceIn = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.05,
      ease: 'easeIn',
      type: 'spring',
      bounce: 0.8,
      stiffness: 80,
      damping: 10,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
}
