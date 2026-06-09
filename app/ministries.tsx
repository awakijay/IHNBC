import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon } from '@/components/icons/church-icons';

type Ministry = {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
};

const ministries: Ministry[] = [
  {
    id: 'adult',
    title: 'Adult Ministry',
    description: 'Bible studies, small groups, and discipleship opportunities for spiritual growth.',
    featured: true,
  },
  {
    id: 'children',
    title: "Children's Ministry",
    description: "Engaging programs teaching children about God's love in age-appropriate ways.",
  },
  {
    id: 'youth',
    title: 'Youth Ministry',
    description: 'Dynamic gatherings helping teens build authentic faith and lasting friendships.',
    featured: true,
  },
  {
    id: 'worship',
    title: 'Worship Ministry',
    description: 'Leading the congregation in spirit-filled worship and musical excellence.',
  },
  {
    id: 'missions',
    title: 'Missions',
    description: 'Local and global outreach sharing the Gospel and serving those in need.',
    featured: true,
  },
  {
    id: 'care',
    title: 'Care Ministry',
    description: 'Supporting our church family through prayer, counselling, and practical help.',
  },
];

function MinistryIcon({ item }: { item: Ministry }) {
  const iconProps = { size: 22, color: '#FFFFFF' };

  return (
    <View className="h-[50px] w-[50px] items-center justify-center rounded-[15px] bg-[#FF6B00]">
      {item.id === 'adult' && <Feather name="users" {...iconProps} />}
      {item.id === 'children' && <MaterialIcons name="child-care"  {...iconProps} />}
      {item.id === 'youth' && <Feather name="star" {...iconProps} />}
      {item.id === 'worship' && <Feather name="music" {...iconProps} />}
      {item.id === 'missions' && <Feather name="globe" {...iconProps} />}
      {item.id === 'care' && <Feather name="heart" {...iconProps} />}
    </View>
  );
}

function MinistryCard({ item }: { item: Ministry }) {
  function openMinistry() {
    Haptics.selectionAsync();
    Alert.alert(item.title, item.description);
  }

  return (
    <Pressable className="min-h-[144px] flex-1 rounded-[16px] bg-white p-4" onPress={openMinistry}>
      <MinistryIcon item={item} />
      <Text className="mt-4 text-[13px] font-extrabold leading-5 text-ihnbc-black">{item.title}</Text>
      <Text className="mt-3 text-[10px] leading-[13px] text-[#777777]">{item.description}</Text>
    </Pressable>
  );
}

export default function MinistriesScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredMinistries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ministries.filter((item) => {
      const matchesQuery = normalizedQuery
        ? [item.title, item.description].join(' ').toLowerCase().includes(normalizedQuery)
        : true;
      const matchesFilter = showFeaturedOnly ? item.featured : true;

      return matchesQuery && matchesFilter;
    });
  }, [query, showFeaturedOnly]);

  function toggleFilter() {
    Haptics.selectionAsync();
    setShowFeaturedOnly((current) => !current);
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[60px] flex-row items-center justify-center rounded-[22px] bg-white px-2">
            <Pressable
              className="absolute left-2 h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={22} color="#111111" />
            </Pressable>

            <Text className="text-[20px] font-extrabold text-ihnbc-black">Ministries</Text>
          </View>

          <Text className="mt-5 w-[250px] text-[20px] font-extrabold leading-[22px] text-ihnbc-black">
            Using our Gifts to Serve God
          </Text>
          <Text className="mt-2 max-w-[285px] text-[10px] leading-[13px] text-[#777777]">
            {
              "Our ministries are the heartbeat of the church. Find your place to grow, serve, and make an impact for God's Kingdom."
            }
          </Text>

          <View className="mt-5 flex-row gap-4">
            <View className="h-[46px] flex-1 flex-row items-center rounded-[14px] bg-white px-4">
              <Feather name="search" size={21} color="#FF6B00" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search Ministry ..."
                placeholderTextColor="#777777"
                className="ml-4 min-w-0 flex-1 p-0 text-[12px] text-ihnbc-black"
              />
            </View>

            <Pressable
              className={`h-[46px] w-[118px] flex-row items-center justify-center rounded-[14px] bg-white ${
                showFeaturedOnly ? 'border border-[#FF6B00]' : ''
              }`}
              onPress={toggleFilter}>
              <Ionicons name="options-outline" size={20} color={showFeaturedOnly ? '#FF6B00' : '#777777'} />
              <Text className={`ml-3 text-[12px] ${showFeaturedOnly ? 'text-[#FF6B00]' : 'text-[#777777]'}`}>
                Filter
              </Text>
            </Pressable>
          </View>

          <View className="mt-4 min-h-[70px] flex-row items-center rounded-[16px] bg-[#FFF0E8] px-4 py-3">
            <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-[#FF6B00]">
              <ChurchIcon name="fellowship" size={20} color="#FFFFFF" />
            </View>
            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-[12px] font-extrabold text-ihnbc-black">
                {"There's a place for you"}
              </Text>
              <Text className="mt-2 text-[10px] leading-[13px] text-ihnbc-black">
                Discover a ministry where you can use your gifts and passion to bless others.
              </Text>
            </View>
          </View>

          <Text className="mt-6 text-[15px] font-extrabold text-ihnbc-black">Our Ministries</Text>

          <View className="mt-4 flex-row flex-wrap gap-4">
            {filteredMinistries.map((item) => (
              <View key={item.id} className="w-[47.3%]">
                <MinistryCard item={item} />
              </View>
            ))}
          </View>

          {filteredMinistries.length === 0 && (
            <View className="mt-8 items-center rounded-[16px] bg-white p-6">
              <Text className="text-[15px] font-extrabold text-ihnbc-black">No ministries found</Text>
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
