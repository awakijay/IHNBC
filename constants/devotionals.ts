import { ImageSourcePropType } from 'react-native';

export type Devotional = {
  id: string;
  day: string;
  dateLabel: string;
  title: string;
  summary: string;
  scripture: string;
  verse: string;
  body: string[];
  image: ImageSourcePropType;
};

export const devotionals: Devotional[] = [
  {
    id: '2026-06-04',
    day: 'THU',
    dateLabel: 'Thursday, June 4, 2026',
    title: 'Grace for Today',
    summary: 'God gives enough grace for the step in front of you.',
    scripture: '2 Corinthians 12:9 (NIV)',
    verse: '"My grace is sufficient for you, for my power is made perfect in weakness."',
    body: [
      'God does not ask you to carry the whole week at once. He meets you in today with grace that is enough.',
      'Weakness is not a place where God withdraws. It is often the place where His strength becomes most visible.',
      'Take today honestly, prayerfully, and with trust. His grace is already here.',
    ],
    image: require('@/assets/images/verse-of-day-card.png'),
  },
  {
    id: '2026-06-03',
    day: 'WED',
    dateLabel: 'Wednesday, June 3, 2026',
    title: 'Steady in Prayer',
    summary: 'A faithful prayer life keeps the heart anchored.',
    scripture: '1 Thessalonians 5:17 (NIV)',
    verse: '"Pray continually."',
    body: [
      'Prayer is not only a response to trouble. It is a daily rhythm of staying near to God.',
      'When your heart feels scattered, prayer gathers it again under His peace.',
      'Speak with Him throughout the day. Small prayers can carry deep faith.',
    ],
    image: require('@/assets/images/sermon-power-of-prayer.png'),
  },
  {
    id: '2026-06-02',
    day: 'TUE',
    dateLabel: 'Tuesday, June 2, 2026',
    title: 'Faith in the Ordinary',
    summary: 'God is present in the small, faithful choices of the day.',
    scripture: 'Colossians 3:23 (NIV)',
    verse: '"Whatever you do, work at it with all your heart, as working for the Lord."',
    body: [
      'Not every faithful day feels dramatic. Some days are made of ordinary obedience.',
      'God sees the quiet choices, the patience, the kindness, and the work done with love.',
      'Offer today to Him, even in the simple things.',
    ],
    image: require('@/assets/images/sermon-walking-in-faith.png'),
  },
  {
    id: '2026-06-01',
    day: 'MON',
    dateLabel: 'Monday, June 1, 2026',
    title: 'Begin with Hope',
    summary: 'The mercy of God gives every new day a fresh beginning.',
    scripture: 'Lamentations 3:22-23 (NIV)',
    verse: '"His compassions never fail. They are new every morning; great is your faithfulness."',
    body: [
      'A new day is not just another square on the calendar. It is another invitation to receive mercy.',
      'God is faithful before you have everything figured out.',
      'Begin with hope, because His compassion has already met you this morning.',
    ],
    image: require('@/assets/images/verse-of-day-card.png'),
  },
  {
    id: '2026-04-26',
    day: 'SUN',
    dateLabel: 'Sunday, April 26, 2026',
    title: "God's Plan is Perfect",
    summary: 'Trusting God in every way brings peace to our hearts.',
    scripture: 'Jeremiah 29:11 (NIV)',
    verse:
      '"For I know the plans I have for you," declares the Lord, "plans to give you hope and a future."',
    body: [
      'For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future',
      'This promise was spoken to people in exile - stuck in a place they did not choose, with no clear way out. And God still spoke hope into it.',
      "His plans are bigger than your current season. What feels like a detour or a delay isn't the end of the story. He sees the whole path, and He's working even when you can't see movement.",
      "Trusting this means you don't have to force the future open yourself. You can take the next right step today, knowing He's already ahead of you, arranging things for your good.",
      "Let that lift the pressure. You're not building your life alone. Hope and a future are already in His hands",
    ],
    image: require('@/assets/images/verse-of-day-card.png'),
  },
  {
    id: '2026-04-25',
    day: 'SAT',
    dateLabel: 'Saturday, April 25, 2026',
    title: 'Rest in His Presence',
    summary: 'In his presence, we find rest for our souls.',
    scripture: 'Matthew 11:28 (NIV)',
    verse: '"Come to me, all you who are weary and burdened, and I will give you rest."',
    body: [
      'God does not invite you to perform your way into peace. He invites you to come close and receive rest.',
      'The soul often grows tired from carrying tomorrow too early. His presence brings your heart back to today.',
      'Rest is not wasted time. It is trust made practical.',
    ],
    image: require('@/assets/images/sermon-power-of-prayer.png'),
  },
  {
    id: '2026-04-24',
    day: 'FRI',
    dateLabel: 'Friday, April 24, 2026',
    title: 'Walking in Faith',
    summary: 'Trusting God in every way brings peace to our hearts.',
    scripture: 'Psalm 118:24 (NIV)',
    verse: '"This is the day that the Lord has made; let us rejoice and be glad in it."',
    body: [
      'Faith is often found in the step you take before the whole road is visible.',
      'Today is still held by God. You can move with courage because He is already present in the day ahead.',
      'Choose the next faithful thing, and let grace meet you there.',
    ],
    image: require('@/assets/images/sermon-walking-in-faith.png'),
  },
];
