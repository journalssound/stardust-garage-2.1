const venues = [
  {
    name: 'Main Stage',
    capacity: '300 people',
    price: '$800/night',
    icon: 'music',
    features: ['Professional sound system', 'Stage lighting', 'Green rooms', 'Full bar'],
  },
  {
    name: 'Basement',
    capacity: '150 people',
    price: '$400/night',
    icon: 'speaker',
    features: ['Intimate setting', 'DJ booth', 'Sound system', 'Bar service'],
  },
  {
    name: 'Warehouse Floor',
    capacity: '500 people',
    price: '$1,200/night',
    icon: 'users',
    features: ['Open layout', 'Industrial aesthetic', 'Full production support', 'Multiple bars'],
  },
];

function VenueIcon({ name }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { flexShrink: 0, marginTop: 2 },
  };
  if (name === 'music') {
    return (
      <svg {...common}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    );
  }
  if (name === 'speaker') {
    return (
      <svg {...common}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="9" r="2.5" />
        <circle cx="12" cy="16" r="3.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function VenueRentalPage() {
  return (
    <main className="max-w-[1000px] mx-auto px-6 py-20">
      <h1 className="text-[52px] font-extrabold -tracking-[0.02em] mb-[18px] leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        VENUE RENTAL
      </h1>
      <p className="text-base leading-[1.55] max-w-[620px] mb-14" style={{ color: '#8a8a8a' }}>
        Host your event, showcase, or private party in one of our unique underground spaces.
      </p>

      <div className="flex flex-col gap-5">
        {venues.map((venue) => (
          <div
            key={venue.name}
            className="rounded-[18px] p-10 border grid gap-6"
            style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)', gridTemplateColumns: '1fr auto' }}
          >
            <div>
              <div className="flex items-start gap-4 mb-[22px]">
                <VenueIcon name={venue.icon} />
                <div>
                  <div className="text-[22px] font-bold -tracking-[0.01em] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {venue.name}
                  </div>
                  <div className="text-sm" style={{ color: '#8a8a8a' }}>{venue.capacity}</div>
                </div>
              </div>
              <ul className="list-none">
                {venue.features.map((feature) => (
                  <li key={feature} className="pl-4 text-sm leading-[1.9] relative">
                    <span className="absolute left-0">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-end gap-4 text-right">
              <div className="text-[22px] font-bold -tracking-[0.01em] whitespace-nowrap" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {venue.price}
              </div>
              <button className="bg-white text-[#0a0a0a] px-[22px] py-2.5 rounded-full text-xs font-semibold tracking-[0.12em] hover:bg-gray-200 transition-all hover:-translate-y-0.5">
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-[18px] p-12 mt-14 mb-14 border"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <h2 className="text-[18px] font-bold tracking-[0.14em] mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          WHAT&apos;S INCLUDED
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-base font-bold mb-[18px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Equipment &amp; Staff
            </h3>
            <ul className="list-none text-sm leading-[2]" style={{ color: '#8a8a8a' }}>
              <li>Sound engineer on-site</li>
              <li>Lighting technician</li>
              <li>Security personnel</li>
              <li>Bar staff (if alcohol service)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold mb-[18px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Venue Services
            </h3>
            <ul className="list-none text-sm leading-[2]" style={{ color: '#8a8a8a' }}>
              <li>Setup and breakdown assistance</li>
              <li>Coat check service</li>
              <li>Ticket scanning system</li>
              <li>Social media promotion</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center py-10">
        <p className="text-[15px] mb-6" style={{ color: '#8a8a8a' }}>
          Interested in hosting an event? Get in touch for availability and custom packages.
        </p>
        <a href="/about" className="inline-block bg-white text-[#0a0a0a] px-11 py-4 rounded-full text-[13px] font-semibold tracking-[0.14em] hover:bg-gray-200 transition-all hover:-translate-y-0.5">
          CONTACT US
        </a>
      </div>
    </main>
  );
}
