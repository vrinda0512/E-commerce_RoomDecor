import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageContainer from '../components/PageContainer'

function HomePage() {
  return (
    <PageContainer>
      <div className="glass-card overflow-hidden p-8 md:p-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.2em] text-brand-plum/70"
        >
          Curated room aesthetics
        </motion.p>
        <h1 className="mt-3 text-4xl font-bold md:text-6xl">
          Design cozy corners with decor that feels like home.
        </h1>
        <p className="mt-4 max-w-2xl text-brand-plum/70">
          Browse warm lights, calming candles, and wall stories with smooth
          shopping interactions from discovery to checkout.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            to="/products"
            className="rounded-full bg-brand-lavender px-6 py-3 font-semibold transition hover:scale-105"
          >
            Shop Collection
          </Link>
          <Link
            to="/orders"
            className="rounded-full border border-brand-plum/20 px-6 py-3 font-semibold hover:bg-white"
          >
            Track Orders
          </Link>
        </div>
      </div>
    </PageContainer>
  )
}

export default HomePage
