import { motion } from 'framer-motion'

function PageContainer({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8"
    >
      {children}
    </motion.section>
  )
}

export default PageContainer
