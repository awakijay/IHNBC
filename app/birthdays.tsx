import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
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

type Celebrant = {
  id: string;
  name: string;
  date: string;
  weekday: string;
  group: 'This Week' | 'Coming Up';
  groupMeta: string;
  accent: string;
  image: ImageSourcePropType;
};

const celebrants: Celebrant[] = [
  {
    id: 'david-simon',
    name: 'David Simon',
    date: 'May 21',
    weekday: 'Wednesday',
    group: 'This Week',
    groupMeta: 'May 20 - May 26',
    accent: '#FF6B00',
    image: require('@/assets/images/sermon-power-of-prayer.png'),
  },
  {
    id: 'mike-brown',
    name: 'Mike Brown',
    date: 'May 26',
    weekday: 'Sunday',
    group: 'This Week',
    groupMeta: 'May 20 - May 26',
    accent: '#FF6B00',
    image: require('@/assets/images/podcast-heart-love.png'),
  },
  {
    id: 'daniel-lee',
    name: 'Daniel Lee',
    date: 'May 28',
    weekday: 'Wednesday',
    group: 'Coming Up',
    groupMeta: 'Next 7 Days',
    accent: '#9B4DA3',
    image: require('@/assets/images/sermon-walking-in-faith.png'),
  },
  {
    id: 'grace-george',
    name: 'Grace George',
    date: 'June 2',
    weekday: 'Monday',
    group: 'Coming Up',
    groupMeta: 'Next 7 Days',
    accent: '#9B4DA3',
    image: require('@/assets/images/podcast-walking-daily.png'),
  },
];

function CelebrantCard({ item }: { item: Celebrant }) {
  function sendWish() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Birthday wish', `Send a birthday wish to ${item.name}.`);
  }

  return (
    <View className="min-h-[82px] flex-row items-center rounded-[18px] bg-white px-4 py-3">
      <Image source={item.image} resizeMode="cover" className="h-[45px] w-[45px] rounded-full" />

      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-[12px] font-extrabold leading-[16px] text-ihnbc-black">
          {item.name}
        </Text>
        <Text className="mt-1 text-[12px] font-extrabold leading-[15px]" style={{ color: item.accent }}>
          {item.date}
        </Text>
        <Text className="mt-1 text-[10px] leading-[13px] text-[#777777]">{item.weekday}</Text>
      </View>

      <Pressable
        className="ml-3 h-[46px] min-w-[84px] flex-row items-center justify-center rounded-[14px] border bg-white px-3"
        style={{ borderColor: item.accent }}
        onPress={sendWish}>
        <Feather name="gift" size={18} color="#FF6B00" />
        <Text className="ml-2 text-[10px] font-extrabold" style={{ color: item.accent }}>
          Send Wish
        </Text>
      </Pressable>
    </View>
  );
}

export default function BirthdaysScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const groupedCelebrants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = celebrants.filter((item) =>
      normalizedQuery ? item.name.toLowerCase().includes(normalizedQuery) : true
    );

    return filtered.reduce<Record<Celebrant['group'], Celebrant[]>>(
      (groups, item) => {
        groups[item.group] = [...groups[item.group], item];
        return groups;
      },
      { 'This Week': [], 'Coming Up': [] }
    );
  }, [query]);

  function openFilter() {
    Haptics.selectionAsync();
    Alert.alert('Filter', 'Birthday filters will appear here.');
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[60px] flex-row items-center rounded-[22px] bg-white px-2">
            <Pressable
              className="h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={18} color="#111111" />
            </Pressable>

            <Text className="ml-[77px] text-[18px] font-extrabold text-ihnbc-black">Birthdays</Text>
          </View>

          <Text className="mt-5 text-[20px] font-extrabold text-ihnbc-black">Let&apos;s Celebrate!</Text>
          <Text className="mt-1 w-[245px] text-[11px] leading-[14px] text-ihnbc-black">
            Join us in celebrating and blessing our church family on their special day.
          </Text>

          <View className="mt-6 flex-row gap-4">
            <View className="h-[46px] flex-1 flex-row items-center rounded-[14px] bg-white px-4">
              <ChurchIcon name="search" size={20} color="#FF6B00" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search Celebrant ..."
                placeholderTextColor="#777777"
                className="ml-3 min-w-0 flex-1 p-0 text-[12px] text-ihnbc-black"
              />
            </View>

            <Pressable
              className="h-[46px] w-[105px] flex-row items-center justify-center rounded-[14px] bg-white"
              onPress={openFilter}>
              <ChurchIcon name="filter" size={19} color="#777777" />
              <Text className="ml-3 text-[12px] text-[#777777]">Filter</Text>
            </Pressable>
          </View>

          {(['This Week', 'Coming Up'] as const).map((group) => {
            const items = groupedCelebrants[group];
            const meta = celebrants.find((item) => item.group === group)?.groupMeta;

            if (items.length === 0) {
              return null;
            }

            return (
              <View key={group} className="mt-5">
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-[15px] font-extrabold text-ihnbc-black">{group}</Text>
                  <Text className="text-[12px] font-bold text-[#777777]">{meta}</Text>
                </View>

                <View className="gap-4">
                  {items.map((item) => (
                    <CelebrantCard key={item.id} item={item} />
                  ))}
                </View>
              </View>
            );
          })}

          <View className="mt-5 min-h-[70px] flex-row items-center rounded-[17px] bg-[#FFF0E8] px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-[#FF6B00]">
              <Feather name="mail" size={21} color="#ffffff" />
            </View>
            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-[12px] font-extrabold leading-[16px] text-ihnbc-black">
                Make their day special!
              </Text>
              <Text className="mt-1 text-[10px] leading-[13px] text-ihnbc-black">
                A simple message can bring joy and encouragement to someone today.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
