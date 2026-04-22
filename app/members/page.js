const plans = [
  {
    name: 'Cowork',
    price: '$155',
    period: '/ month',
    featured: false,
    benefits: [
      'Coworking hours access from 8am – 6pm, M-F',
      '3 guest passes per month',
      'Access to a curated community of artists, builders, and culturally aligned individuals',
    ],
  },
  {
    name: 'Cowork + Party',
    price: '$225',
    period: '/ month',
    featured: true,
    benefits: [
      'All benefits of Cowork membership',
      '60% off SDG Party tickets',
      'Access to Members Only Hours / Experiences',
    ],
  },
];

function CheckIcon({ dark = false }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={dark ? '#0a0a0a' : '#f5f5f5'}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 3 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function MembersPage() {
  return (
    <main className="max-w-[1100px] mx-auto px-6 py-20">
      <h1
        className="text-[52px] font-extrabold -tracking-[0.02em] mb-[18px] leading-[1.1]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        MEMBERSHIP
      </h1>
      <p className="text-base leading-[1.55] max-w-[620px] mb-14" style={{ color: '#8a8a8a' }}>
        Join the Stardust Garage community and become part of the underground music scene. Choose the plan that fits you best.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => {
          const isFeatured = plan.featured;
          return (
            <div
              key={plan.name}
              className="relative rounded-[18px] p-10 border flex flex-col"
              style={{
                background: isFeatured ? '#f5f5f5' : '#141414',
                borderColor: isFeatured ? '#f5f5f5' : 'rgba(255,255,255,0.05)',
                color: isFeatured ? '#0a0a0a' : '#f5f5f5',
              }}
            >
              <h3
                className="text-[24px] font-bold -tracking-[0.01em] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-9">
                <span
                  className="text-[48px] font-bold -tracking-[0.02em]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-[14px]"
                  style={{ color: isFeatured ? '#555' : '#8a8a8a' }}
                >
                  {plan.period}
                </span>
              </div>

              <h4
                className="text-[12px] font-bold tracking-[0.14em] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                INCLUDED
              </h4>

              <ul className="list-none mb-10 flex-1">
                {plan.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 py-2 text-[14.5px] leading-[1.5]"
                  >
                    <CheckIcon dark={isFeatured} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-4 rounded-full text-[12px] font-semibold tracking-[0.16em] transition-all hover:-translate-y-0.5"
                style={{
                  background: isFeatured ? '#0a0a0a' : '#f5f5f5',
                  color: isFeatured ? '#f5f5f5' : '#0a0a0a',
                }}
              >
                BECOME A MEMBER
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
