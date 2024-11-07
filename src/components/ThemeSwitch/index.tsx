'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  MdOutlineDarkMode,
  MdOutlineDesktopWindows,
  MdOutlineLightMode,
} from 'react-icons/md'

function ThemeSwitch({
  lightColor = 'text-black',
  darkColor = 'dark:text-white',
  systemColor = 'text-primary',
  ...props
}) {
  const { theme, setTheme } = useTheme()
  const { className } = props

  const toolTip =
    theme === 'system' ? 'Sistema' : theme === 'dark' ? 'Escuro' : 'Claro'

  const switchTheme = () => {
    if (theme === 'system') return setTheme('light')
    if (theme === 'light') return setTheme('dark')
    if (theme === 'dark') return setTheme('system')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              'relative h-8 w-8 overflow-hidden rounded-full border-2 border-primary',
              className
            )}
            aria-label="Alternar tema"
            onClick={switchTheme}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: 0 }}
                animate={{
                  y: theme === 'system' ? 0 : 40,
                  opacity: theme === 'system' ? 1 : 0,
                }}
              >
                <MdOutlineDesktopWindows
                  className={systemColor}
                  height={24}
                  width={24}
                />
              </motion.div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: 0 }}
                animate={{
                  x: theme === 'light' ? 0 : -30,
                  y: theme === 'light' ? 0 : 40,
                  opacity: theme === 'light' ? 1 : 0,
                }}
              >
                <MdOutlineLightMode
                  className={lightColor}
                  height={24}
                  width={24}
                />
              </motion.div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: 0 }}
                animate={{
                  x: theme === 'dark' ? 0 : 30,
                  y: theme === 'dark' ? 0 : 40,
                  opacity: theme === 'dark' ? 1 : 0,
                }}
              >
                <MdOutlineDarkMode
                  className={darkColor}
                  height={24}
                  width={24}
                />
              </motion.div>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent className="border-border">
          <p>{toolTip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ThemeSwitch
