import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Alert, Image, ImageSourcePropType, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon } from '@/components/icons/church-icons';

type FellowshipGroup = {
  id: string;
  title: string;
  leader: string;
  address: string;
  time: string;
  image: ImageSourcePropType;
};

const fellowshipGroups: FellowshipGroup[] = [
  {
    id: 'umuebulu-1',
    title: 'Umuebulu 1 Fellowship',
    leader: 'Led by Pastor Wisdom',
    address: 'Umuebulu 1 Road, Rivers State',
    time: 'Tuesday  -  6:00 PM',
    image: require('@/assets/images/fellowship-umuebulu.jpg'),
  },
  {
    id: 'progress-estate',
    title: 'Progress Estate Fellowship',
    leader: 'Led by Pastor Florence Jomsen',
    address: '22 Harrison Street, Rivers State',
    time: 'Tuesday  -  6:00 PM',
    image: require('@/assets/images/fellowship-progress-estate.jpg'),
  },
  {
    id: 'eligbam',
    title: 'Eligbam Fellowship',
    leader: 'Led by Pastor Tonye',
    address: 'Eligbam, Rivers State',
    time: 'Tuesday  -  6:00 PM',
    image: require('@/assets/images/fellowship-eligbam.jpg'),
  },
];

function FellowshipCard({ item }: { item: FellowshipGroup }) {
  function joinGroup() {
    Haptics.selectionAsync();
    Alert.alert('Join Fellowship', `You selected ${item.title}.`);
  }

  return (
    <View className="min-h-[90px] flex-row items-center rounded-[17px] bg-white px-4 py-3">
      <Image source={item.image} className="h-[50px] w-[50px] rounded-[16px]" resizeMode="cover" />

      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-[11px] font-extrabold text-[#FF6B00]">{item.title}</Text>
        <Text className="mt-2 text-[10px] font-extrabold text-ihnbc-black">{item.leader}</Text>
        <Text className="mt-2 text-[10px] text-[#777777]">{item.address}</Text>
        <View className="mt-2 flex-row items-center">
          <Feather name="clock" size={11} color="#777777" />
          <Text className="ml-2 text-[10px] text-[#777777]">{item.time}</Text>
        </View>
      </View>

      <Pressable
        className="ml-3 h-[46px] w-[66px] items-center justify-center rounded-[14px] border border-[#FF6B00] bg-white"
        style={{ borderStyle: 'dashed' }}
        onPress={joinGroup}>
        <Text className="text-[13px] font-semibold text-[#FF6B00]">Join</Text>
      </Pressable>
    </View>
  );
}

export default function FellowshipScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[60px] flex-row items-center justify-center rounded-[22px] bg-white px-2">
            <Pressable
              className="absolute left-2 h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={22} color="#111111" />
            </Pressable>

            <Text className="text-[20px] font-extrabold text-ihnbc-black">Fellowship</Text>
          </View>

          <Text className="mt-5 text-[20px] font-extrabold text-ihnbc-black">
            {"We're Better Together"}
          </Text>
          <Text className="mt-1 max-w-[295px] text-[10px] leading-[13px] text-ihnbc-black">
            Fellowship is all about building authentic relationships that encourage, strengthen and
            helps us grow in this together.
          </Text>

          <Image
            source={require('@/assets/images/fellowship-hero.jpg')}
            className="mt-6 h-[150px] w-full rounded-[15px]"
            resizeMode="cover"
          />

          <View className="mt-4 min-h-[76px] flex-row items-center rounded-[16px] bg-[#FFF0E8] px-4 py-3">
            <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-[#FF6B00]">
              <ChurchIcon name="fellowship" size={20} color="#FFFFFF" />
            </View>
            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-[12px] font-extrabold text-ihnbc-black">What is Fellowship?</Text>
              <Text className="mt-2 text-[10px] leading-[13px] text-ihnbc-black">
                {
                  "Fellowship is more than just meeting together. it's sharing, supporting one another,praying together, and doing life as family in christ."
                }
              </Text>
            </View>
          </View>

          <Text className="mt-5 text-[15px] font-extrabold text-ihnbc-black">Fellowship Groups</Text>

          <View className="mt-4 gap-4">
            {fellowshipGroups.map((item) => (
              <FellowshipCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
