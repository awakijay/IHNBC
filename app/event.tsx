import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
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

type EventItem = {
  id: string;
  month: string;
  day: string;
  weekday: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  time: string;
  location: string;
  featured?: boolean;
  monthGroup: string;
  image: ImageSourcePropType;
};

const events: EventItem[] = [
  {
    id: 'youth-spring-retreat',
    month: 'APR',
    day: '25',
    weekday: 'SAT',
    category: 'Youth',
    categoryColor: '#FF6B00',
    title: 'Youth Spring Retreat',
    description: 'Three days of fun, fellowship and spiritual\ngrowth for middle and high school student.',
    time: 'All Weekend',
    location: 'Mountain View Camp',
    featured: true,
    monthGroup: 'April 2026',
    image: require('@/assets/images/sermon-power-of-prayer.png'),
  },
  {
    id: 'community-prayer-night',
    month: 'APR',
    day: '15',
    weekday: 'WED',
    category: 'Prayer',
    categoryColor: '#27AE60',
    title: 'Community Prayer Night',
    description: 'Gather together for an evening of worship,\nprayer, and seeking God’s presence.',
    time: '7:00 PM',
    location: 'Prayer Room',
    monthGroup: 'April 2026',
    image: require('@/assets/images/sermon-walking-in-faith.png'),
  },
  {
    id: 'easter-celebration-service',
    month: 'APR',
    day: '20',
    weekday: 'MON',
    category: 'Easter',
    categoryColor: '#9B4DA3',
    title: 'Easter Celebration Service',
    description: 'Join us for a special easter service celebrating\nthe resurrection of christ.',
    time: '9:00 - 11:00 AM',
    location: 'Main Sanctuary',
    monthGroup: 'April 2026',
    image: require('@/assets/images/podcast-heart-love.png'),
  },
  {
    id: 'womens-bible-study',
    month: 'MAY',
    day: '27',
    weekday: 'WED',
    category: 'Bible Study',
    categoryColor: '#2D9CDB',
    title: 'Women’s Bible Study',
    description: 'Weekly study and fellowship for women of\nall ages.',
    time: 'Every Wednesday, 10:00 AM',
    location: 'Fellowship Hall',
    monthGroup: 'May 2026',
    image: require('@/assets/images/podcast-walking-daily.png'),
  },
];

function EventCard({ item }: { item: EventItem }) {
  const router = useRouter();

  function openEvent() {
    Haptics.selectionAsync();
    router.push('/event-details');
  }

  return (
    <Pressable
      className={`min-h-[132px] flex-row items-center rounded-[17px] p-[10px] ${item.featured ? 'bg-[#FFF0E8]' : 'bg-white'}`}
      onPress={openEvent}>
      <View className="relative h-[93px] w-[93px] shrink-0 overflow-hidden rounded-[14px]">
        <Image source={item.image} resizeMode="cover" style={{ height: 93, width: 93 }} />
        <View
          className="absolute left-2 top-2 min-h-[48px] w-[46px] items-center justify-center rounded-[15px] border border-dashed bg-white px-1"
          style={{ borderColor: item.categoryColor }}>
          <Text className="text-[10px] font-extrabold" style={{ color: item.categoryColor }}>
            {item.month}
          </Text>
          <Text className="text-[11px] font-extrabold leading-[18px]" style={{ color: item.categoryColor }}>
            {item.day}
          </Text>
          <Text className="text-[9px] font-extrabold" style={{ color: item.categoryColor }}>
            {item.weekday}
          </Text>
        </View>
      </View>

      <View className="ml-4 min-w-0 flex-1 justify-center py-1">
        <View className="flex-row items-start">
          <View className=" flex-1  ">
            <View className="flex-row items-center justify-between">
              <Text className="text-[11px] font-extrabold" style={{ color: item.categoryColor }}>
                {item.category}
              </Text>
              {item.featured && (
                <Text className="text-[11px] font-extrabold text-[#FF6B00]  ">Featured</Text>
              )}
            </View>
            <Text className="mt-1 text-[17px] font-extrabold leading-1 text-ihnbc-black">
              {item.title}
            </Text>
          </View>

          <Feather name="chevron-right" size={17} color="#777777" className="top-12" />
        </View>

        <Text className="mt-2 text-[11px] leading-[17px] text-ihnbc-black">{item.description}</Text>

        <View className="mt-3 flex-row items-center">
          <View className="flex-row items-center">
            <Feather name="clock" size={12} color="#777777" />
            <Text className="ml-1.5 text-[10px] text-[#777777]">{item.time}</Text>
          </View>
          <View className="ml-4 flex-1 flex-row items-center">
            <Feather name="map-pin" size={12} color="#777777" />
            <Text className="ml-1.5 flex-1 text-[10px] text-[#777777]">{item.location}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function EventScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(false);

  const groupedEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = events.filter((item) => {
      const matchesQuery = normalizedQuery
        ? [item.title, item.category, item.description, item.location].join(' ').toLowerCase().includes(normalizedQuery)
        : true;
      const matchesFilter = filterFeatured ? item.featured : true;

      return matchesQuery && matchesFilter;
    });

    return filtered.reduce<Record<string, EventItem[]>>((groups, item) => {
      groups[item.monthGroup] = [...(groups[item.monthGroup] ?? []), item];
      return groups;
    }, {});
  }, [filterFeatured, query]);

  const groupNames = Object.keys(groupedEvents);

  function toggleFilter() {
    Haptics.selectionAsync();
    setFilterFeatured((current) => !current);
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[60px] flex-row items-center rounded-[22px] bg-white px-2">
            <Pressable
              className="h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={17} color="#111111" />
            </Pressable>

            <Text className="ml-[88px] text-[20px] font-extrabold text-ihnbc-black">Event</Text>
          </View>

          <Text className="mt-5 text-[20px] font-extrabold text-ihnbc-black">Upcoming Events</Text>
          <Text className="mt-1 w-[240px] text-[11px] leading-[13px] text-[#777777]">
            Join us for these upcoming opportunities to connect, grow and serve together.
          </Text>

          <View className="mt-6 flex-row gap-4">
            <View className="h-[46px] flex-1 flex-row items-center rounded-[14px] bg-white px-4">
              <Feather name="search" size={21} color="#FF6B00" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search Events ..."
                placeholderTextColor="#777777"
                className="ml-3 min-w-0 flex-1 p-0 text-[12px] text-ihnbc-black"
              />
            </View>

            <Pressable
              className={`h-[46px] w-[118px] flex-row items-center justify-center rounded-[14px] bg-white ${filterFeatured ? 'border border-[#FF6B00]' : ''
                }`}
              onPress={toggleFilter}>
              <Ionicons
                name="options-outline"
                size={20}
                color={filterFeatured ? '#FF6B00' : '#777777'}
              />
              <Text className={`ml-3 text-[12px] ${filterFeatured ? 'text-[#FF6B00]' : 'text-[#777777]'}`}>
                Filter
              </Text>
            </Pressable>
          </View>

          {groupNames.map((group) => (
            <View key={group} className="mt-5">
              <Text className="mb-3 text-[11px] font-extrabold text-ihnbc-black">{group}</Text>
              <View className="gap-4">
                {groupedEvents[group].map((item) => (
                  <EventCard key={item.id} item={item} />
                ))}
              </View>
            </View>
          ))}

          {groupNames.length === 0 && (
            <View className="mt-8 items-center rounded-[16px] bg-white p-6">
              <Text className="text-[15px] font-extrabold text-ihnbc-black">No events found</Text>
              <Text className="mt-2 text-center text-[12px] text-[#777777]">
                Try another search or turn off the filter.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
