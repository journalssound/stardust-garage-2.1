const benefits = [
  'Priority ticket access to all events',
  '20% discount on bar and merchandise',
  'Free entry to member-only showcase nights',
  'Studio rehearsal space discounts',
  'Voting rights on venue programming',
  'Access to member community forum',
  'Monthly newsletter with insider info',
  'Gear storage locker access',
];

const stats = [
  { number: '500+', label: 'ACTIVE MEMBERS' },
  { number: '12', label: 'YEARS RUNNING' },
  { number: '200+', label: 'EVENTS/YEAR' },
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function MembersPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 py-20">
      <h1 className="text-[52px] font-extrabold -tracking-[0.02em] mb-[18px] leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        MEMBERSHIP
      </h1>
      <p className="text-base leading-[1.55] max-w-[560px] mb-14" style={{ color: '#8a8a8a' }}>
        Join the Stardust Garage community and become part of the underground music scene.
      </p>

      <div
        className="rounded-[18px] p-12 mb-20 border"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-baseline gap-2 mb-10">
          <span className="text-[56px] font-bold -tracking-[0.02em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>$15</span>
          <span className="text-[15px]" style={{ color: '#8a8a8a' }}>/ month</span>
        </div>

        <h3 className="text-[14px] font-bold tracking-[0.14em] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          MEMBER BENEFITS
        </h3>
        <ul className="mb-10 list-none">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3.5 py-2.5 text-[15px]">
              <CheckIcon />
              {benefit}
            </li>
          ))}
        </ul>

        <button className="w-full py-5 rounded-full bg-white text-[#0a0a0a] text-[13px] font-semibold tracking-[0.16em] hover:bg-gray-200 transition-all hover:-translate-y-0.5">
          BECOME A MEMBER
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-[44px] font-bold -tracking-[0.02em] mb-2.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {stat.number}
            </div>
            <div className="text-[11px] font-semibold tracking-[0.18em]" style={{ color: '#8a8a8a' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
