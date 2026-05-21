import { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon } from '@/components/icons/church-icons';

type ContentTab = 'sermons' | 'podcasts';

type MediaItem = {
  category: string;
  title: string;
  speaker: string;
  description: string;
  date: string;
  duration: string;
  image: ImageSourcePropType;
};

const continuingSermon: MediaItem = {
  category: 'Living by Faith',
  title: 'Walking in Faith',
  speaker: 'Pastor Michael Johnson',
  description: 'Learning to trust God fully when the path ahead is not yet clear.',
  date: 'April 6, 2026',
  duration: '25.00',
  image: require('@/assets/images/sermon-walking-in-faith.png'),
};

const latestSermons: MediaItem[] = [
  {
    category: 'Spiritual Discipline',
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Williams',
    description: 'A call to deeper intimacy with God through consistent, expectant prayer.',
    date: 'March 30, 2026',
    duration: '15.00',
    image: require('@/assets/images/sermon-power-of-prayer.png'),
  },
  {
    category: 'The Heart of the Gospel',
    title: 'Love One Another',
    speaker: 'Pastor Michael Johnson',
    description: 'How Christ-like love shapes the witness and unity of the church.',
    date: 'March 23, 2026',
    duration: '32.40',
    image: require('@/assets/images/sermon-love-one-another.png'),
  },
];

const featuredPodcast: MediaItem = {
  category: 'Latest Episode',
  title: 'Walking Daily with God',
  speaker: '',
  description: "Practical conversations on faith, life and God's word",
  date: 'May 18, 2026',
  duration: '28.15',
  image: require('@/assets/images/podcast-walking-daily.png'),
};

const allPodcasts: MediaItem[] = [
  {
    category: 'Love',
    title: 'Serving with a Heart of Love',
    speaker: '',
    description: "How we can serve others as an expression of God's love.",
    date: 'May 11, 2026',
    duration: '24.30',
    image: require('@/assets/images/podcast-heart-love.png'),
  },
  {
    category: 'Youth',
    title: 'Youth Talks',
    speaker: '',
    description: 'Real conversations, real faith, real impact.',
    date: 'May 9, 2026',
    duration: '32.10',
    image: require('@/assets/images/podcast-youth-talks.png'),
  },
];

function itemMatches(item: MediaItem, query: string, category: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const matchesCategory = category === 'All' || item.category === category;

  if (!matchesCategory) {
    return false;
  }

  if (!normalizedQuery) {
    return true;
  }

  return [item.category, item.title, item.speaker, item.description]
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery);
}

function PlayButton({ large = false }: { large?: boolean }) {
  const size = large ? 32 : 24;
  const iconSize = large ? 15 : 13;

  return (
    <View
      style={{ height: size, width: size }}
      className="items-center justify-center rounded-full border-2 border-[#FF6B00] bg-black/20">
      <ChurchIcon name="play" size={iconSize} color="#FF6B00" />
    </View>
  );
}

function SermonThumbnail({ image }: { image: ImageSourcePropType }) {
  return (
    <View className="relative h-[110px] w-[126px] overflow-hidden rounded-[12px]">
      <Image source={image} className="h-full w-full" resizeMode="cover" />
      <View className="absolute inset-0 items-center justify-center">
        <PlayButton />
      </View>
    </View>
  );
}

function SermonCard({ item }: { item: MediaItem }) {
  return (
    <View className="flex-row rounded-[12px] bg-white p-[10px]">
      <SermonThumbnail image={item.image} />

      <View className="ml-3 min-w-0 flex-1">
        <View className="flex-row items-start justify-between gap-2">
          <View className="min-w-0 flex-1">
            <Text className="text-[9px] font-bold text-[#FF6B00]">{item.category}</Text>
            <Text className="mt-1 text-[16px] font-extrabold leading-[20px] text-ihnbc-black">
              {item.title}
            </Text>
          </View>
          <ChurchIcon name="more-vertical" size={18} color="#777777" />
        </View>

        <Text className="mt-1 text-[12px] font-medium text-[#777777]">{item.speaker}</Text>
        <Text className="mt-2 text-[10px] leading-[13px] text-[#777777]">{item.description}</Text>

        <View className="mt-2 flex-row items-center gap-2">
          <ChurchIcon name="calendar" size={11} color="#777777" />
          <Text className="text-[10px] text-[#777777]">{item.date}</Text>
          <Text className="text-[10px] text-[#777777]">.</Text>
          <ChurchIcon name="eye" size={12} color="#777777" />
          <Text className="text-[10px] text-[#777777]">{item.duration}</Text>
        </View>
      </View>
    </View>
  );
}

function FeaturedPodcastCard({ item }: { item: MediaItem }) {
  return (
    <View className="flex-row rounded-[12px] bg-white p-[13px]">
      <Image source={item.image} className="h-[92px] w-[92px] rounded-[10px]" resizeMode="cover" />

      <View className="ml-3 min-w-0 flex-1">
        <View className="flex-row items-start justify-between">
          <View className="min-w-0 flex-1 pr-2">
            <Text className="text-[15px] font-extrabold leading-[19px] text-ihnbc-black">
              {item.title}
            </Text>
            <Text className="mt-2 text-[10px] leading-[13px] text-[#777777]">{item.description}</Text>
          </View>
          <ChurchIcon name="more-vertical" size={18} color="#777777" />
        </View>

        <View className="mt-3 flex-row items-center">
          <PlayButton />
          <Text className="ml-2 text-[10px] text-[#777777]">{item.category}</Text>
          <View className="ml-auto">
            <PlayButton large />
          </View>
        </View>

        <Text className="mt-2 text-[10px] font-semibold text-ihnbc-black">
          Trusting God in every season
        </Text>
        <View className="mt-3 flex-row items-center gap-2">
          <ChurchIcon name="calendar" size={11} color="#777777" />
          <Text className="text-[10px] text-[#777777]">{item.date}</Text>
          <Text className="text-[10px] text-[#777777]">.</Text>
          <ChurchIcon name="eye" size={12} color="#777777" />
          <Text className="text-[10px] text-[#777777]">{item.duration}</Text>
        </View>
      </View>
    </View>
  );
}

function PodcastCard({ item }: { item: MediaItem }) {
  return (
    <View className="flex-row rounded-[12px] bg-white p-[13px]">
      <Image source={item.image} className="h-[78px] w-[78px] rounded-[10px]" resizeMode="cover" />

      <View className="ml-3 min-w-0 flex-1">
        <View className="flex-row items-start justify-between">
          <View className="min-w-0 flex-1 pr-2">
            <Text className="text-[15px] font-extrabold leading-[19px] text-ihnbc-black">
              {item.title}
            </Text>
            <Text className="mt-2 text-[10px] leading-[13px] text-[#777777]">{item.description}</Text>
          </View>
          <ChurchIcon name="more-vertical" size={18} color="#777777" />
        </View>

        <View className="mt-4 flex-row items-center gap-2">
          <ChurchIcon name="play" size={11} color="#FF6B00" />
          <Text className="text-[10px] text-[#777777]">{item.date}</Text>
          <Text className="text-[10px] text-[#777777]">.</Text>
          <Text className="text-[10px] text-[#777777]">{item.duration}</Text>
          <View className="ml-auto h-[32px] w-[32px] items-center justify-center rounded-full border border-[#777777]">
            <ChurchIcon name="download" size={19} color="#777777" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default function TheWordScreen() {
  const [activeTab, setActiveTab] = useState<ContentTab>('sermons');
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const currentItems = useMemo(
    () =>
      activeTab === 'sermons'
        ? [continuingSermon, ...latestSermons]
        : [featuredPodcast, ...allPodcasts],
    [activeTab]
  );
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(currentItems.map((item) => item.category)))],
    [currentItems]
  );

  const filteredContinuing = itemMatches(continuingSermon, query, activeCategory);
  const filteredLatestSermons = latestSermons.filter((item) => itemMatches(item, query, activeCategory));
  const filteredFeaturedPodcast = itemMatches(featuredPodcast, query, activeCategory);
  const filteredPodcasts = allPodcasts.filter((item) => itemMatches(item, query, activeCategory));

  function selectTab(tab: ContentTab) {
    setActiveTab(tab);
    setActiveCategory('All');
    setFilterOpen(false);
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F8F8F8]">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-32 pt-[22px]">
          <View className="h-[48px] flex-row items-center rounded-[16px] bg-white px-[14px]">
            <View className="flex-1">
              <Text className="text-[18px] font-extrabold leading-[22px] text-ihnbc-black">
                The Word
              </Text>
              <Text className="mt-1 text-[11px] text-[#777777]">
                {"Grow in faith through God's word"}
              </Text>
            </View>
            <ChurchIcon name="book-open" size={32} color="#FF6B00" />
          </View>

          <View className="mt-4 h-[38px] flex-row rounded-[14px] bg-white">
            {(['sermons', 'podcasts'] as ContentTab[]).map((tab) => {
              const isActive = activeTab === tab;
              const title = tab === 'sermons' ? 'Sermons' : 'Podcasts';

              return (
                <Pressable key={tab} className="flex-1 items-center justify-center" onPress={() => selectTab(tab)}>
                  <Text className={`text-[12px] font-medium ${isActive ? 'text-[#FF6B00]' : 'text-[#777777]'}`}>
                    {title}
                  </Text>
                  {isActive && (
                    <View className="absolute bottom-0 h-[4px] w-[128px] rounded-t-full bg-[#FF6B00]" />
                  )}
                </Pressable>
              );
            })}
          </View>

          <View className="mt-3 flex-row gap-4">
            <View className="h-[38px] flex-1 flex-row items-center rounded-[12px] bg-white px-3">
              <ChurchIcon name="search" size={18} color="#777777" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={`Search ${activeTab === 'sermons' ? 'Sermons' : 'Podcasts'} ...`}
                placeholderTextColor="#777777"
                className="ml-3 flex-1 p-0 text-[11px] text-ihnbc-black"
              />
            </View>
            <Pressable
              className={`h-[38px] w-[97px] flex-row items-center justify-center rounded-[12px] bg-white ${
                filterOpen || activeCategory !== 'All' ? 'border border-[#FF6B00]' : ''
              }`}
              onPress={() => setFilterOpen((open) => !open)}>
              <ChurchIcon name="filter" size={18} color={filterOpen || activeCategory !== 'All' ? '#FF6B00' : '#777777'} />
              <Text className={`ml-2 text-[11px] ${filterOpen || activeCategory !== 'All' ? 'text-[#FF6B00]' : 'text-[#777777]'}`}>
                Filter
              </Text>
            </Pressable>
          </View>

          {filterOpen && (
            <View className="mt-3 flex-row flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <Pressable
                    key={category}
                    className={`rounded-full px-3 py-1.5 ${isActive ? 'bg-[#FF6B00]' : 'bg-white'}`}
                    onPress={() => setActiveCategory(category)}>
                    <Text className={`text-[10px] font-semibold ${isActive ? 'text-white' : 'text-[#777777]'}`}>
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {activeTab === 'sermons' ? (
            <>
              <Text className="mt-3 text-[14px] font-semibold text-ihnbc-black">
                Continue Watching
              </Text>
              {filteredContinuing && (
                <View className="mt-3">
                  <SermonCard item={continuingSermon} />
                </View>
              )}

              <View className="mb-3 mt-4 flex-row items-center justify-between">
                <Text className="text-[14px] font-semibold text-ihnbc-black">Latest Sermons</Text>
                <Text className="text-[9px] font-medium text-[#FF6B00]">View all</Text>
              </View>

              <View className="gap-4">
                {filteredLatestSermons.map((item) => (
                  <SermonCard key={item.title} item={item} />
                ))}
              </View>
            </>
          ) : (
            <>
              <Text className="mt-3 text-[14px] font-semibold text-ihnbc-black">
                Featured Podcast
              </Text>
              {filteredFeaturedPodcast && (
                <View className="mt-3">
                  <FeaturedPodcastCard item={featuredPodcast} />
                </View>
              )}

              <Text className="mb-3 mt-4 text-[14px] font-semibold text-ihnbc-black">
                All Podcast
              </Text>
              <View className="gap-4">
                {filteredPodcasts.map((item) => (
                  <PodcastCard key={item.title} item={item} />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
