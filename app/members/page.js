import Link from 'next/link';

const plans = [
  {
    name: 'Cowork',
    slug: 'cowork',
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
    slug: 'cowork-party',
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
    <main className="max-w-[1100px] mx-auto px-4 md:px-6 py-14 md:py-20">
      <h1
        className="text-[36px] md:text-[52px] font-extrabold -tracking-[0.02em] mb-[14px] md:mb-[18px] leading-[1.1]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        MEMBERSHIP
      </h1>
      <p className="text-base leading-[1.55] max-w-[620px] mb-10 md:mb-14" style={{ color: '#8a8a8a' }}>
        This isn&apos;t open access. It&apos;s shared alignment. Membership is reserved for those who fit the space, respect it, and add to it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {plans.map((plan) => {
          const isFeatured = plan.featured;
          return (
            <div
              key={plan.slug}
              className="relative rounded-[18px] p-8 md:p-10 border flex flex-col"
              style={{
                background: isFeatured ? '#f5f5f5' : '#141414',
                borderColor: isFeatured ? '#f5f5f5' : 'rgba(255,255,255,0.05)',
                color: isFeatured ? '#0a0a0a' : '#f5f5f5',
              }}
            >
              <h3
                className="text-[22px] md:text-[24px] font-bold -tracking-[0.01em] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-7 md:mb-9">
                <span
                  className="text-[40px] md:text-[48px] font-bold -tracking-[0.02em]"
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
                className="text-[12px] font-bold tracking-[0.14em] mb-4 md:mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                INCLUDED
              </h4>

              <ul className="list-none mb-8 md:mb-10 flex-1">
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

              <Link
                href={`/members/apply/${plan.slug}`}
                className="w-full py-4 rounded-full text-[12px] font-semibold tracking-[0.16em] transition-all hover:-translate-y-0.5 text-center"
                style={{
                  background: isFeatured ? '#0a0a0a' : '#f5f5f5',
                  color: isFeatured ? '#f5f5f5' : '#0a0a0a',
                }}
              >
                BECOME A MEMBER
              </Link>
            </div>
          );
        })}
      </div>

      {/* Lockers Add-on */}
      <div
        className="mt-6 rounded-[18px] p-8 md:p-10 border flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="md:w-[280px] flex-shrink-0">
          <h3
            className="text-[22px] md:text-[24px] font-bold -tracking-[0.01em] mb-1.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Lockers
          </h3>
          <p className="text-[13px]" style={{ color: '#8a8a8a' }}>
            Requires membership
          </p>
        </div>

        <ul className="list-none flex-1">
          <li className="flex items-start gap-3 py-1.5 text-[14.5px] leading-[1.5]">
            <CheckIcon />
            <span>Two sizes available: Small and Large</span>
          </li>
          <li className="flex items-start gap-3 py-1.5 text-[14.5px] leading-[1.5]">
            <CheckIcon />
            <span>Each locker comes with a combination lock and fast charger inside</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
