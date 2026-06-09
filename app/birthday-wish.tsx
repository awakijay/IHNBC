import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Image, ImageSourcePropType, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon } from '@/components/icons/church-icons';

type Wish = {
  id: string;
  name: string;
  message: string;
  time: string;
  image: ImageSourcePropType;
};

const wishes: Wish[] = [
  {
    id: 'mike-brown',
    name: 'Mike Brown',
    message:
      'Happy Birthday! May God bless your new year abundantly. You are a blessing to our church family!',
    time: '10:24 AM',
    image: require('@/assets/images/podcast-heart-love.png'),
  },
  {
    id: 'daniel-lee',
    name: 'Daniel Lee',
    message: "Wishing you a wonderful birthday! May God's grace and favor follow you always",
    time: '9:58 AM',
    image: require('@/assets/images/sermon-walking-in-faith.png'),
  },
  {
    id: 'grace-george',
    name: 'Grace George',
    message: "Happy Birthday! Praying this year brings you closer to God's purpose for your life.",
    time: '9:15 AM',
    image: require('@/assets/images/podcast-walking-daily.png'),
  },
  {
    id: 'david-simons',
    name: 'David Simons',
    message: 'Happy Birthday, brother! May the Lord continue to strengthen and guide you.',
    time: '8:47 AM',
    image: require('@/assets/images/sermon-power-of-prayer.png'),
  },
  {
    id: 'grace-peter',
    name: 'Grace Peter',
    message: "Wishing you joy, peace, and God's unending love today and always. Happy birthday!",
    time: '8:47 AM',
    image: require('@/assets/images/account-tab-icon.jpg'),
  },
];

function WishCard({ item }: { item: Wish }) {
  return (
    <View className="min-h-[86px] flex-row rounded-[14px] bg-[#FFF0E8] px-4 py-4">
      <Image source={item.image} resizeMode="cover" className="h-[45px] w-[45px] rounded-full" />

      <View className="ml-4 min-w-0 flex-1">
        <View className="flex-row items-start justify-between">
          <Text className="min-w-0 flex-1 text-[12px] font-extrabold leading-[15px] text-ihnbc-black">
            {item.name}
          </Text>
          <Text className="ml-2 text-[11px] leading-[14px] text-[#555555]">{item.time}</Text>
        </View>

        <View className="mt-2 flex-row items-center">
          <Text className="min-w-0 flex-1 text-[11px] font-semibold leading-[13px] text-[#777777]">
            {item.message}
          </Text>
          <View className="ml-3 h-[6px] w-[6px] rounded-full bg-[#9B4DA3]" />
        </View>
      </View>
    </View>
  );
}

export default function BirthdayWishScreen() {
  const router = useRouter();

  function markAllAsRead() {
    Haptics.selectionAsync();
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

            <Text className="ml-[69px] text-[18px] font-extrabold text-ihnbc-black">
              Birthday Wish
            </Text>
          </View>

          <View className="mt-5 items-center">
            <View className="h-[82px] w-[82px] items-center justify-center rounded-full bg-[#9B4DA3]">
              <ChurchIcon name="birthday" size={28} color="#ffffff" />
            </View>
            <Text className="mt-4 text-[15px] font-extrabold leading-[19px] text-ihnbc-black">
              Birthday Wishes Received
            </Text>
            <Text className="mt-1 w-[170px] text-center text-[11px] font-semibold leading-[13px] text-ihnbc-black">
              5 members sent you birthday messages today
            </Text>
            <Text className="mt-2 text-[10px] leading-[13px] text-[#777777]">2 hours ago</Text>
          </View>

          <View className="mt-5 rounded-[14px] border border-dashed border-[#9B4DA3] bg-white px-4 py-4">
            <Text className="text-[12px] font-extrabold text-ihnbc-black">
              People who sent wishes
            </Text>
            <View className="mt-4 flex-row items-center">
              {wishes.slice(0, 4).map((wish) => (
                <Image
                  key={wish.id}
                  source={wish.image}
                  resizeMode="cover"
                  className="mr-3 h-[38px] w-[38px] rounded-full"
                />
              ))}
              <Text className="text-[12px] font-bold text-[#9B4DA3]">+1 more</Text>
            </View>
          </View>

          <View className="mt-4 gap-4">
            {wishes.map((wish) => (
              <WishCard key={wish.id} item={wish} />
            ))}
          </View>

          <Pressable
            className="mt-4 h-[42px] items-center justify-center rounded-[13px] border border-[#111111] bg-white"
            onPress={markAllAsRead}>
            <Text className="text-[14px] font-semibold text-ihnbc-black">Mark all as read</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
