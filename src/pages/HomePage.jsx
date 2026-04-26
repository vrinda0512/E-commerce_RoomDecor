import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageContainer from '../components/PageContainer'

const features = [
  { icon: '🏠', title: 'Curated Decor', desc: 'Handpicked home decor for every aesthetic.' },
  { icon: '🚀', title: 'Fast Delivery', desc: 'Pan-India shipping with real-time tracking.' },
  { icon: '💎', title: 'Premium Quality', desc: 'Every product curated for lasting beauty.' },
  { icon: '🔒', title: 'Secure Checkout', desc: 'Razorpay-powered safe payments.' },
]

const categories = [
  { name: 'Lighting', emoji: '💡', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { name: 'Candles', emoji: '🕯️', color: 'bg-orange-100 hover:bg-orange-200' },
  { name: 'Wall Art', emoji: '🖼️', color: 'bg-purple-100 hover:bg-purple-200' },
  { name: 'Plants', emoji: '🪴', color: 'bg-green-100 hover:bg-green-200' },
  { name: 'Furniture', emoji: '🛋️', color: 'bg-blue-100 hover:bg-blue-200' },
  { name: 'Textiles', emoji: '🧵', color: 'bg-pink-100 hover:bg-pink-200' },
]

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <PageContainer>
          <div className="glass-card overflow-hidden p-10 md:p-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm uppercase tracking-[0.25em] text-brand-plum/60"
            >
              ✨ Curated Home Aesthetics
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl"
            >
              Design cozy corners with decor that feels like{' '}
              <span className="bg-gradient-to-r from-brand-plum via-purple-500 to-pink-400 bg-clip-text text-transparent">
                home.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 max-w-2xl text-lg text-brand-plum/70"
            >
              Browse warm lights, calming candles, and wall stories with smooth
              shopping interactions — from discovery to checkout.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/products"
                className="rounded-full bg-brand-lavender px-8 py-3 font-semibold shadow-soft transition hover:scale-105 hover:shadow-lg"
              >
                Shop Collection →
              </Link>
              <Link
                to="/orders"
                className="rounded-full border border-brand-plum/20 bg-white/60 px-8 py-3 font-semibold transition hover:bg-white"
              >
                Track Orders
              </Link>
            </motion.div>
          </div>
        </PageContainer>
      </div>

      {/* Categories */}
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="mb-5 text-2xl font-bold">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className={`flex flex-col items-center gap-2 rounded-2xl p-5 text-center transition ${cat.color}`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-brand-plum">{cat.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </PageContainer>

      {/* Features */}
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-5 text-2xl font-bold">Why Luna Decor?</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-5">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-3 font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-brand-plum/65">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </PageContainer>
    </div>
  )
}

export default HomePage
