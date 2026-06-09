import { EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import { devotionals, type Devotional } from '@/constants/devotionals';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SortMode = 'newest' | 'oldest';

type DevotionalDate = {
  id: string;
  day: string;
  date: string;
  dateLabel: string;
  streakActive: boolean;
};

const todayId = '2026-06-04';

const devotionalDates: DevotionalDate[] = [
  { id: '2026-06-01', day: 'MON', date: '01', dateLabel: 'Monday, June 1, 2026', streakActive: true },
  { id: '2026-06-02', day: 'TUE', date: '02', dateLabel: 'Tuesday, June 2, 2026', streakActive: true },
  { id: '2026-06-03', day: 'WED', date: '03', dateLabel: 'Wednesday, June 3, 2026', streakActive: true },
  { id: '2026-06-04', day: 'THU', date: '04', dateLabel: 'Thursday, June 4, 2026', streakActive: true },
  { id: '2026-06-05', day: 'FRI', date: '05', dateLabel: 'Friday, June 5, 2026', streakActive: false },
  { id: '2026-06-06', day: 'SAT', date: '06', dateLabel: 'Saturday, June 6, 2026', streakActive: false },
  { id: '2026-06-07', day: 'SUN', date: '07', dateLabel: 'Sunday, June 7, 2026', streakActive: false },
];

const previousDevotionalDates: DevotionalDate[] = [
  { id: '2026-04-19', day: 'SUN', date: '19', dateLabel: 'Sunday, April 19, 2026', streakActive: false },
  { id: '2026-04-18', day: 'SAT', date: '18', dateLabel: 'Saturday, April 18, 2026', streakActive: true },
  { id: '2026-04-17', day: 'FRI', date: '17', dateLabel: 'Friday, April 17, 2026', streakActive: true },
  { id: '2026-04-16', day: 'THU', date: '16', dateLabel: 'Thursday, April 16, 2026', streakActive: false },
];

function formatLockedDateTitle(dateLabel: string) {
  return `${dateLabel} Devotional`;
}

function getDateStart(dateId: string) {
  return new Date(`${dateId}T00:00:00`);
}

function formatAvailableIn(dateId: string, now: Date) {
  const diffMs = Math.max(0, getDateStart(dateId).getTime() - now.getTime());
  const totalMinutes = Math.ceil(diffMs / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

function formatCheckBack(dateId: string) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (dateId === tomorrow.toISOString().slice(0, 10)) {
    return 'Check back tomorrow';
  }

  return `Check back on ${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(getDateStart(dateId))}`;
}

function devotionalMatches(item: Devotional, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [item.dateLabel, item.title, item.summary, item.scripture]
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery);
}

function DevotionalCard({
  item,
  bookmarked,
  featured,
  onBookmark,
  onOpen,
}: {
  item: Devotional;
  bookmarked: boolean;
  featured: boolean;
  onBookmark: () => void;
  onOpen: () => void;
}) {
  return (
    <Pressable
      className={`min-h-[112px] flex-row rounded-[17px] bg-white p-[9px] ${featured ? 'border border-dashed border-[#FF6B00]' : ''
        }`}
      onPress={onOpen}>
      <Image source={item.image} className="h-[95px] w-[95px] rounded-[12px]" resizeMode="cover" />

      <View className="ml-4 min-w-0 flex-1 pt-0.5">
        <View className="flex-row items-start">
          <View className="min-w-0 flex-1 pr-2">
            <Text className="text-[10px] font-medium text-[#FF6B00]">{item.dateLabel}</Text>
            <Text className="mt-1 text-[16px] font-extrabold leading-5 text-ihnbc-black">
              {item.title}
            </Text>
          </View>

          <Pressable className="h-8 w-8 items-center justify-center" onPress={onBookmark}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={17}
              color={bookmarked ? '#FF6B00' : '#777777'}
            />
          </Pressable>
        </View>

        <Text className="mt-1 text-[11px] leading-[14px] text-[#777777]">{item.summary}</Text>

        <View className="mt-2 flex-row items-center">
          <Text className="text-[11px] text-[#777777]">{item.scripture}</Text>
          <Feather name="chevron-right" size={17} color="#777777" className="ml-auto" />
        </View>
      </View>
    </Pressable>
  );
}

export default function DevotionalScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(todayId);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [lockedDate, setLockedDate] = useState<DevotionalDate | null>(null);
  const [countdownNow, setCountdownNow] = useState(() => new Date());

  const filteredDevotionals = useMemo(() => {
    const items = devotionals
      .filter((item) => item.id === selectedDate)
      .filter((item) => devotionalMatches(item, query))
      .filter((item) => (showBookmarkedOnly ? bookmarkedIds.includes(item.id) : true))
      .sort((a, b) => {
        if (sortMode === 'oldest') {
          return a.id.localeCompare(b.id);
        }

        return b.id.localeCompare(a.id);
      });

    return items;
  }, [bookmarkedIds, query, selectedDate, showBookmarkedOnly, sortMode]);

  const selectedDateLabel =
    [...devotionalDates, ...previousDevotionalDates].find((item) => item.id === selectedDate)?.dateLabel ??
    devotionals.find((item) => item.id === selectedDate)?.dateLabel ??
    selectedDate;
  const selectedMonthLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${selectedDate}T00:00:00Z`));
  const lockedCountdown = lockedDate ? formatAvailableIn(lockedDate.id, countdownNow) : '';
  const lockedCheckBackLabel = lockedDate ? formatCheckBack(lockedDate.id) : '';

  useEffect(() => {
    if (!lockedDate) {
      return;
    }

    setCountdownNow(new Date());
    const timer = setInterval(() => setCountdownNow(new Date()), 30000);

    return () => clearInterval(timer);
  }, [lockedDate]);

  function toggleBookmark(id: string) {
    Haptics.selectionAsync();
    setBookmarkedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  }

  function toggleFilter() {
    Haptics.selectionAsync();
    setShowBookmarkedOnly((current) => !current);
  }

  function toggleSort() {
    Haptics.selectionAsync();
    setSortMode((current) => (current === 'newest' ? 'oldest' : 'newest'));
  }

  function openCalendar() {
    Haptics.selectionAsync();
    setCalendarOpen(true);
  }

  function chooseDate(dateId: string) {
    Haptics.selectionAsync();
    setSelectedDate(dateId);
    setCalendarOpen(false);
  }

  function chooseVisibleDate(dateId: string) {
    const devotionalDate = devotionalDates.find((item) => item.id === dateId);

    if (devotionalDate && dateId > todayId) {
      Haptics.selectionAsync();
      setLockedDate(devotionalDate);
      return;
    }

    Haptics.selectionAsync();
    setSelectedDate(dateId);
  }

  function openDevotional(id: string) {
    Haptics.selectionAsync();
    router.push({
      pathname: '/devotional/[id]',
      params: { id },
    });
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[60px] flex-row items-center rounded-[22px] bg-white px-2">
            <Pressable
              className="h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={26} color="#111111" />
            </Pressable>

            <Text className="ml-[75px] text-[20px] font-extrabold text-ihnbc-black">
              Devotional
            </Text>
          </View>

          <Text className="mt-5 text-[20px] font-extrabold text-ihnbc-black">Daily Devotionals</Text>
          <Text className="mt-1 text-[11px] text-ihnbc-black">
            {"Grow your faith with God's word everyday"}
          </Text>

          <View className="mt-6 flex-row gap-4">
            <View className="h-[46px] flex-1 flex-row items-center rounded-[14px] bg-white px-4">
              <Feather name="search" size={21} color="#FF6B00" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search Sermons ..."
                placeholderTextColor="#777777"
                className="ml-3 min-w-0 flex-1 p-0 text-[12px] text-ihnbc-black"
              />
            </View>

            <Pressable
              className={`h-[46px] w-[118px] flex-row items-center justify-center rounded-[14px] bg-white ${showBookmarkedOnly ? 'border border-[#FF6B00]' : ''
                }`}
              onPress={toggleFilter}>
              <Ionicons name="options-outline" size={20} color={showBookmarkedOnly ? '#FF6B00' : '#777777'} />
              <Text className={`ml-3 text-[12px] ${showBookmarkedOnly ? 'text-[#FF6B00]' : 'text-[#777777]'}`}>
                Filter
              </Text>
            </Pressable>
          </View>

          <View className="mt-5 min-h-[67px] flex-row items-center rounded-[15px] bg-[#FFF0E8] px-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#FF6B00]">
              <Ionicons name="flame" size={20} color="#FFFFFF" />
            </View>
            <View className="ml-4">
              <Text className="text-[13px] font-extrabold text-ihnbc-black">7 days streak</Text>
              <Text className="mt-2 text-[11px] text-ihnbc-black">
                {"Keep it up you're doing great"}
              </Text>
            </View>
          </View>

          <View className="mt-4 rounded-[18px] bg-white px-2 py-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row items-center gap-[18px]">
                {devotionalDates.map((item) => {
                  const isActive = item.id === selectedDate;
                  const isFuture = item.id > todayId;
                  const dotColor = isFuture
                    ? 'bg-[#777777]'
                    : item.streakActive
                      ? 'bg-[#27AE60]'
                      : 'bg-[#EB3349]';

                  return (
                    <Pressable
                      key={item.id}
                      className={`w-[43px] items-center ${isFuture ? 'opacity-60' : ''}`}
                      onPress={() => chooseVisibleDate(item.id)}>
                      <View
                        className={`h-[50px] w-[37px] items-center justify-center ${isActive ? 'bg-[#FF6B00] rounded-[11px] ' : ''
                          }`}>
                        <Text className={`text-[10px] font-semibold ${isActive ? 'text-white' : isFuture ? 'text-[#777777]' : 'text-ihnbc-black'}`}>
                          {item.day}
                        </Text>
                        <Text className={`mt-1 text-[12px] font-semibold ${isActive ? 'text-white' : isFuture ? 'text-[#777777]' : 'text-ihnbc-black'}`}>
                          {item.date}
                        </Text>
                      </View>
                      <View className={`mt-2 h-[7px] w-[7px] rounded-full ${dotColor}`} />
                    </Pressable>
                  );
                })}

                <Pressable className="h-[46px] w-[39px] items-center justify-center self-center" onPress={openCalendar}>
                  <EvilIcons name="calendar" size={34} color="#777777" />
                </Pressable>
              </View>
            </ScrollView>
          </View>

          <View className="mb-4 mt-4 flex-row items-center justify-between">
            <Text className="text-[15px] font-medium uppercase tracking-[0px] text-ihnbc-black">
              {selectedMonthLabel}
            </Text>
            <Pressable className="flex-row items-center " onPress={toggleSort}>
              <Text className="text-[12px] font-semibold text-ihnbc-black">
                {sortMode === 'newest' ? 'Newest First' : 'Oldest First'}
              </Text>
              <Feather name="chevron-down" size={12} color="#111111" />
            </Pressable>
          </View>

          <View className="gap-4">
            {filteredDevotionals.map((item, index) => (
              <DevotionalCard
                key={item.id}
                item={item}
                bookmarked={bookmarkedIds.includes(item.id)}
                featured={index === 0 && item.id === todayId && !query && !showBookmarkedOnly}
                onBookmark={() => toggleBookmark(item.id)}
                onOpen={() => openDevotional(item.id)}
              />
            ))}
          </View>

          {filteredDevotionals.length === 0 && (
            <View className="mt-8 items-center rounded-[16px] bg-white p-6">
              <Text className="text-[15px] font-extrabold text-ihnbc-black">No devotionals found</Text>
              <Text className="mt-2 text-center text-[12px] text-[#777777]">
                No devotional content is available for {selectedDateLabel}.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={calendarOpen}
        onRequestClose={() => setCalendarOpen(false)}>
        <Pressable className="flex-1 justify-end bg-black/30" onPress={() => setCalendarOpen(false)}>
          <Pressable className="rounded-t-[24px] bg-white px-6 pb-8 pt-5" onPress={(event) => event.stopPropagation()}>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-[17px] font-extrabold text-ihnbc-black">Previous dates</Text>
              <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-[#F3F3F3]" onPress={() => setCalendarOpen(false)}>
                <Feather name="x" size={18} color="#111111" />
              </Pressable>
            </View>

            <View className="gap-3">
              {previousDevotionalDates.map((item) => {
                const isActive = item.id === selectedDate;
                const dotColor = item.streakActive ? 'bg-[#27AE60]' : 'bg-[#EB3349]';

                return (
                  <Pressable
                    key={item.id}
                    className={`min-h-[48px] flex-row items-center rounded-[14px] px-4 ${isActive ? 'bg-[#FFF0E8]' : 'bg-[#F8F8F8]'
                      }`}
                    onPress={() => chooseDate(item.id)}>
                    <View className={`h-[9px] w-[9px] rounded-full ${dotColor}`} />
                    <Text className="ml-3 flex-1 text-[13px] font-semibold text-ihnbc-black">{item.dateLabel}</Text>
                    {isActive && <Feather name="check" size={17} color="#FF6B00" />}
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={Boolean(lockedDate)}
        onRequestClose={() => setLockedDate(null)}>
        <View className="flex-1 items-center justify-center bg-black/55 px-8">
          <View className="w-full max-w-[320px] items-center rounded-[14px] bg-white px-5 pb-5 pt-10">
            <Pressable
              className="absolute right-4 top-4 h-8 w-8 items-center justify-center rounded-full bg-[#F3F3F3]"
              onPress={() => setLockedDate(null)}>
              <Feather name="x" size={18} color="#111111" />
            </Pressable>

            <View className="h-[49px] w-[49px] items-center justify-center rounded-full bg-[#FFF0E8]">
              <Ionicons name="lock-closed" size={20} color="#FF9A3D" />
            </View>

            <Text className="mt-5 text-center text-[13px] font-extrabold text-ihnbc-black">
              {lockedDate ? formatLockedDateTitle(lockedDate.dateLabel) : ''}
            </Text>
            <Text className="mt-4 text-center text-[12px] text-[#777777]">Available in</Text>
            <Text className="mt-3 text-center text-[31px] font-medium text-[#FF6B00]">
              {lockedCountdown}
            </Text>

            <View className="mt-2 h-px w-full bg-[#D8D8D8]" />
            <Ionicons name="sunny" size={18} color="#FF6B00" className="-mt-[9px] bg-white px-1" />
            <Text className="mt-2 text-center text-[12px] text-[#777777]">{lockedCheckBackLabel}</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
