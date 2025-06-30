import Heading from "../Utilities/Heading"
import Footer1 from "../Utilities/Footer1"

const Aboutus = () => {
  return (
    <div>
      <Heading/>
      <div className="bg-white text-gray-800 py-12 px-6 mb-14 md:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-red-600">🩸 About Us</h2>
          
          <p className="mb-6 text-lg">
            <strong>Welcome to LifeLine</strong> — Your Digital Bridge Between Hope and Humanity.
            At LifeLine, we believe that saving lives shouldn&apos;t be complicated. That’s why we built a smart, seamless, and secure Blood Donation Management System — a one-stop platform that connects <span className="font-semibold">donors</span>, <span className="font-semibold">recipients</span>, and <span className="font-semibold">hospitals</span> in real-time.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-red-500">🚀 What We Do</h3>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>📍 Connect People – Instantly link donors and those in need.</li>
            <li>🧠 Smart Matchmaking – Based on location, blood type, and urgency.</li>
            <li>📢 Instant Alerts – Real-time notifications when blood is needed.</li>
            <li>📊 Track & Manage – Donation history and request statuses.</li>
            <li>📬 Email Notifications – Automatic updates using EmailJS.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-red-500">💡 Why We Built It</h3>
          <p className="mb-6 text-lg">
            Emergency blood needs shouldn’t be met with delays. So we used tech like <strong>React.js, Tailwind CSS, Node.js, Express.js,</strong> and <strong>MongoDB</strong> to create a platform that empowers people to help — instantly and impactfully.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-red-500">🫶 Our Vision</h3>
          <p className="text-lg mb-6">
            To create a world where <strong>no life is lost due to lack of blood.</strong>  
            With every click, every donation, and every heartbeat, we’re building a future where help is always within reach.
          </p>

          <div className="text-center mt-10">
            <p className="text-xl font-bold">Ready to be someone’s hero?</p>
            <p className="text-red-600 font-semibold">Join us. Donate. Save lives. ❤️</p>
          </div>
        </div>
      </div>
      <Footer1/>
    </div>
  )
}

export default Aboutus
