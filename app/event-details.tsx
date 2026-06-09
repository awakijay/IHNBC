import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type EventInfoRow = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  detail: string;
};

const eventInfo: EventInfoRow[] = [
  {
    icon: 'calendar',
    label: 'Date',
    value: 'Apr 25 - Apr 27, 2026',
    detail: 'Friday - Sunday',
  },
  {
    icon: 'clock',
    label: 'Time',
    value: 'All Day Event',
    detail: 'Starts Friday 3:00 PM',
  },
  {
    icon: 'map-pin',
    label: 'Location',
    value: 'Mountain View Camp',
    detail: '2 Church Rd, Sunlight Estate Gate',
  },
  {
    icon: 'users',
    label: 'Group',
    value: 'Everyone',
    detail: 'Old and Young',
  },
];

export default function EventDetailsScreen() {
  const router = useRouter();

  function shareEvent() {
    Haptics.selectionAsync();
    Alert.alert('Share Event', 'Share Youth Spring Retreat with others.');
  }

  function registerEvent() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Registered', 'You have registered for Youth Spring Retreat.');
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[66px] flex-row items-center rounded-[24px] bg-white px-2">
            <Pressable
              className="h-[50px] w-[50px] items-center justify-center rounded-[15px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={22} color="#111111" />
            </Pressable>

            <Text className="ml-[84px] text-[20px] font-extrabold text-ihnbc-black">
              Event Details
            </Text>
          </View>

          <View className="mt-5 rounded-[14px] bg-white p-[10px]">
            <Image
              source={require('@/assets/images/event-detail-hero.jpg')}
              resizeMode="cover"
              className="h-[150px] w-full rounded-[12px]"
            />

            <Text className="mt-4 text-[11px] font-bold text-[#FF6B00]">Youth</Text>

            <View className="mt-4 flex-row items-start">
              <View className="min-w-0 flex-1 pr-4">
                <Text className="text-[22px] font-extrabold leading-[27px] text-ihnbc-black">
                  Youth Spring Retreat
                </Text>
                <Text className="mt-2 text-[12px] font-semibold leading-[16px] text-[#777777]">
                  A Weekend of fun, worship, and growing closer to God and each other.
                </Text>
              </View>

              <Pressable className="mt-1 h-9 w-9 items-center justify-center" onPress={shareEvent}>
                <Feather name="share-2" size={22} color="#FF6B00" />
              </Pressable>
            </View>

            <View className="mt-4 rounded-[14px] border border-dashed border-[#FF6B00] px-5 py-4">
              {eventInfo.map((item, index) => (
                <View key={item.label}>
                  <View className="flex-row items-center py-3">
                    <View className="w-[34px] items-start">
                      <Feather name={item.icon} size={18} color="#FF6B00" />
                    </View>
                    <Text className="w-[122px] text-[13px] font-semibold text-[#777777]">
                      {item.label}
                    </Text>
                    <View className="min-w-0 flex-1">
                      <Text className="text-[13px] font-semibold leading-[16px] text-ihnbc-black">
                        {item.value}
                      </Text>
                      <Text className="mt-2 text-[11px] leading-[13px] text-[#777777]">
                        {item.detail}
                      </Text>
                    </View>
                  </View>

                  {index < eventInfo.length - 1 && <View className="ml-[34px] h-px bg-[#777777]" />}
                </View>
              ))}
            </View>

            <Text className="mt-4 text-[16px] font-extrabold text-ihnbc-black">About This Event</Text>
            <Text className="mt-3 w-[290px] text-[12px] font-semibold leading-[14px] text-[#777777]">
              Join us for refreshing weekend getaway filled with worship, powerful messages, outdoor
              activities, and meaningful connections. Let&apos;s grow together in faith and build lasting
              friendships!
            </Text>

            <Pressable
              className="mt-4 h-[50px] items-center justify-center rounded-[14px] bg-[#FF6B00]"
              onPress={registerEvent}>
              <Text className="text-[16px] font-bold text-white">Register Now</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
