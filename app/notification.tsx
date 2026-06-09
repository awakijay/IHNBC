import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: keyof typeof iconByType;
  iconColor: string;
  unread: boolean;
  actionable?: boolean;
  highlighted?: boolean;
};

const iconByType = {
  devotional: { family: 'feather', name: 'book-open' },
  event: { family: 'feather', name: 'calendar' },
  announcement: { family: 'ionicons', name: 'megaphone-outline' },
  birthday: { family: 'feather', name: 'gift' },
  sermon: { family: 'ionicons', name: 'play-circle-outline' },
} as const;

const todayNotifications: NotificationItem[] = [
  {
    id: 'devotional',
    title: 'New Devotional Available',
    body: 'Today\'s devotional "Walking in faith daily" is now available.',
    time: '2 mins ago',
    icon: 'devotional',
    iconColor: '#FF6B00',
    unread: true,
    actionable: true,
    highlighted: true,
  },
  {
    id: 'event',
    title: 'Event Reminder',
    body: "Don't forget! Youth prayer is tomorrow at 7:00 PM.",
    time: '15 mins ago',
    icon: 'event',
    iconColor: '#27AE60',
    unread: true,
  },
  {
    id: 'announcement',
    title: 'New Church Announcement',
    body: 'We have an important announcement for the Youth.',
    time: '1 hour ago',
    icon: 'announcement',
    iconColor: '#2D9CDB',
    unread: true,
    highlighted: true,
  },
  {
    id: 'birthday',
    title: 'Birthday Wishes Received',
    body: '5 members sent you birthday messages today',
    time: '2 hours ago',
    icon: 'birthday',
    iconColor: '#9B4DA3',
    unread: true,
    actionable: true,
    highlighted: true,
  },
  {
    id: 'sermon',
    title: 'New Sermon Uploaded',
    body: 'New sermon "Grace that Transforms" is now available.',
    time: '2 hours ago',
    icon: 'sermon',
    iconColor: '#FF6B00',
    unread: true,
    actionable: true,
    highlighted: true,
  },
];

const yesterdayNotifications: NotificationItem[] = [
  {
    id: 'birthday-yesterday',
    title: 'Happy Birthday!',
    body: "We're praying God's best for you on your special day!",
    time: 'Yesterday, 8:00 AM',
    icon: 'birthday',
    iconColor: '#9B4DA3',
    unread: false,
  },
];

function NotificationIcon({ item }: { item: NotificationItem }) {
  const icon = iconByType[item.icon];

  return (
    <View
      className="h-[46px] w-[46px] items-center justify-center rounded-[8px]"
      style={{ backgroundColor: item.iconColor }}>
      {icon.family === 'feather' ? (
        <Feather name={icon.name} size={21} color="#FFFFFF" />
      ) : (
        <Ionicons name={icon.name} size={22} color="#FFFFFF" />
      )}
    </View>
  );
}

function NotificationCard({ item }: { item: NotificationItem }) {
  const router = useRouter();

  function openNotification() {
    Haptics.selectionAsync();

    if (item.id === 'birthday') {
      router.push('/birthday-wish');
    }
  }

  return (
    <Pressable
      className="min-h-[82px] flex-row items-center rounded-[14px] px-[14px] py-[14px]"
      style={{ backgroundColor: item.highlighted ? '#FFF0E8' : '#FFFFFF' }}
      onPress={openNotification}>
      <NotificationIcon item={item} />

      <View className="ml-[14px] min-w-0 flex-1 pr-2">
        <Text className="text-[12px] font-extrabold leading-[16px] text-ihnbc-black">
          {item.title}
        </Text>
        <Text className="mt-1 text-[10px] font-semibold leading-[12px] text-ihnbc-black">
          {item.body}
        </Text>
        <Text className="mt-2 text-[10px] leading-[12px] text-[#777777]">{item.time}</Text>
      </View>

      <View className="w-[18px] items-center justify-center">
        {item.actionable && (
          <Feather name="chevron-right" size={22} color="#111111" />
        )}
      </View>
    </Pressable>
  );
}

export default function NotificationScreen() {
  const router = useRouter();
  const [readIds, setReadIds] = useState<string[]>([]);

  const todayItems = todayNotifications.map((item) => ({
    ...item,
    unread: item.unread && !readIds.includes(item.id),
  }));
  const yesterdayItems = yesterdayNotifications.map((item) => ({
    ...item,
    unread: item.unread && !readIds.includes(item.id),
  }));
  const unreadIds = [...todayNotifications, ...yesterdayNotifications]
    .filter((item) => item.unread)
    .map((item) => item.id);

  function markAllAsRead() {
    Haptics.selectionAsync();
    setReadIds(unreadIds);
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[60px] flex-row items-center rounded-[22px] bg-white px-2">
            <Pressable
              className="h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={18} color="#111111" />
            </Pressable>

            <Text className="ml-[74px] text-[18px] font-extrabold text-ihnbc-black">
              Notification
            </Text>
          </View>

          <View className="mb-[18px] mt-[22px] flex-row items-center justify-between">
            <Text className="text-[12px] font-extrabold text-ihnbc-black">Today</Text>
            <Pressable onPress={markAllAsRead}>
              <Text className="text-[10px] font-extrabold text-[#FF6B00]">Mark all as read</Text>
            </Pressable>
          </View>

          <View className="gap-5">
            {todayItems.map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </View>

          <Text className="mb-[14px] mt-[20px] text-[12px] font-extrabold text-ihnbc-black">
            Yesterday
          </Text>
          <View className="gap-5">
            {yesterdayItems.map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
