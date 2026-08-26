import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-bora-100 text-bora-800 rounded-full text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-earth-900 mb-6">
            Let&apos;s Build the Future of Farming
          </h2>
          <p className="text-lg text-earth-600">
            Whether you are a farmer, supplier, or partner — we would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8 animate-on-scroll">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bora-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-bora-600" />
              </div>
              <div>
                <h3 className="font-bold text-earth-900">Location</h3>
                <p className="text-earth-600">Tharaka Nithi County, Kenya</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bora-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-bora-600" />
              </div>
              <div>
                <h3 className="font-bold text-earth-900">Email</h3>
                <a href="mailto:davidmarii013@gmail.com" className="text-earth-600 hover:text-bora-700 transition-colors">
                  davidmarii013@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bora-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-bora-600" />
              </div>
              <div>
                <h3 className="font-bold text-earth-900">Phone</h3>
                <a href="tel:+254703709346" className="text-earth-600 hover:text-bora-700 transition-colors">
                  0703 709 346
                </a>
              </div>
            </div>
          </div>

          <div className="bg-earth-50 rounded-2xl p-8 animate-on-scroll">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-bora-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-bora-600" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">Message Sent!</h3>
                <p className="text-earth-600">We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:border-bora-500 focus:ring-2 focus:ring-bora-500/20 outline-none transition-all"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:border-bora-500 focus:ring-2 focus:ring-bora-500/20 outline-none transition-all"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:border-bora-500 focus:ring-2 focus:ring-bora-500/20 outline-none transition-all resize-none"
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-bora-600 text-white font-semibold rounded-full hover:bg-bora-700 transition-all shadow-lg shadow-bora-600/20"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
