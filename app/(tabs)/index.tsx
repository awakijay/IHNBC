import { Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon, type ChurchIconName } from '@/components/icons/church-icons';

const actions: {
  title: string;
  caption: string;
  icon: ChurchIconName;
  iconClassName: string;
  color: string;
}[] = [
  {
    title: 'Devotional',
    caption: 'Daily inspo',
    icon: 'devotional',
    iconClassName: 'bg-ihnbc-peach',
    color: '#FF6B00',
  },
  {
    title: 'Events',
    caption: 'Coming up',
    icon: 'events',
    iconClassName: 'bg-ihnbc-mint',
    color: '#27AE60',
  },
  {
    title: 'Fellowship',
    caption: 'Connect',
    icon: 'fellowship',
    iconClassName: 'bg-[#F5EAF9]',
    color: '#9B4DA3',
  },
  {
    title: 'Ministries',
    caption: 'Serve & grow',
    icon: 'ministries',
    iconClassName: 'bg-ihnbc-sky',
    color: '#2D9CDB',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1 bg-ihnbc-background" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-32 pt-[22px]">
          <View className="min-h-[92px] flex-row items-center rounded-[34px] bg-white px-[18px] shadow-lg shadow-neutral-200">
            <View className="mr-[18px] h-[60px] w-[72px] items-center justify-center rounded-[20px] bg-[#FFF2EA]">
              <Image source={require('@/assets/images/ihnbc-logo.png')} className="h-10 w-10" />
            </View>

            <View className="flex-1">
              <Text className="text-[15px] font-bold leading-4 text-ihnbc-black">In His</Text>
              <Text className="text-[15px] font-bold leading-4 text-ihnbc-black">Name</Text>
              <Text className="mt-0.5 text-[13px] text-[#A1A1A1]">Bible Church</Text>
            </View>

            <Pressable className="h-[42px] w-[42px] items-center justify-center">
              <ChurchIcon name="bell" size={25} color="#111111" />
              <View className="absolute right-2 top-[7px] h-2 w-2 rounded-full bg-[#F2871F]" />
            </Pressable>
          </View>

          <View className="mt-[25px]">
            <Text className="text-xl leading-[26px] text-[#222222]">Good Morning,</Text>
            <Text className="text-[31px] font-extrabold leading-[39px] text-ihnbc-black">
              David Simons
            </Text>
            <Text className="text-base leading-6 text-ihnbc-muted">We are glad to have you here</Text>
          </View>

          <View className="mt-5 min-h-[148px] flex-row items-center justify-between rounded-3xl bg-white px-[18px] shadow-lg shadow-neutral-200">
            {actions.map((action) => (
              <Pressable key={action.title} className="w-[24%] items-center">
                <View
                  className={`mb-[17px] h-[58px] w-[58px] items-center justify-center rounded-[17px] ${action.iconClassName}`}>
                  <ChurchIcon name={action.icon} size={18} color={action.color} />
                </View>
                <Text className="text-center text-[13px] font-bold text-ihnbc-black">
                  {action.title}
                </Text>
                {/* <Text className="text-center text-[13px] leading-[22px] text-[#858585]">
                  {action.caption}
                </Text> */}
              </Pressable>
            ))}
          </View>

          <View className="mt-6 h-[155px] overflow-hidden rounded-[18px]">
            <ImageBackground
              source={require('@/assets/images/verse-card-background.jpg')}
              resizeMode="cover"
              className="h-full w-full flex-row px-[22px] pt-5">
              <View className="mr-[18px] h-16 w-16 items-center justify-center rounded-full bg-[#FFF1E9]">
                <ChurchIcon name="sun" size={23} color="#D6781E" />
              </View>
              <View className="z-10 flex-1 pt-0.5">
                <Text className="text-xs font-extrabold text-ihnbc-orange">VERSE OF THE DAY</Text>
                <Text className="mt-2 text-sm font-bold leading-[19px] text-white">
                  “This is the day the Lord has made; we will rejoice and be glad in it.“
                </Text>
                <Text className="mt-[9px] text-[13px] text-[#8F8580]">Psalm 118:24 (NIV)</Text>
              </View>
            </ImageBackground>
          </View>

          <View className="mb-2.5 mt-[21px] flex-row items-center justify-between">
            <Text className="text-[16px] font-extrabold text-ihnbc-black">This Week</Text>
            <Text className="text-[13px] font-bold text-ihnbc-orange">View all</Text>
          </View>

          <View className="mb-[21px] flex-row gap-[25px]">
            <View className="min-h-[156px] flex-1 rounded-[17px] bg-ihnbc-lilac p-[19px]">
              <View className="flex-row items-center gap-2">
                <ChurchIcon name="birthday" size={22} color="#9B4DA3" />
                <Text className="text-base font-extrabold text-[#9B4DA3]">Birthdays</Text>
              </View>
              <View className="mb-[21px] mt-[29px] flex-row">
                <View className="h-[31px] w-[31px] items-center justify-center rounded-full border-2 border-ihnbc-lilac bg-[#5D392B]">
                  <Text className="text-xs font-extrabold text-white">D</Text>
                </View>
                <View className="-ml-[7px] h-[31px] w-[31px] items-center justify-center rounded-full border-2 border-ihnbc-lilac bg-[#1C2226]">
                  <Text className="text-xs font-extrabold text-white">S</Text>
                </View>
              </View>
              <Text className="text-[13px] text-[#8E858A]">2 members celebrating his week!</Text>
            </View>

            <View className="min-h-[156px] flex-1 rounded-[17px] bg-ihnbc-mint p-[19px]">
              <View className="flex-row items-center gap-2">
                <ChurchIcon name="events" size={23} color="#48A97E" />
                <Text className="text-base font-extrabold text-[#48A97E]">Upcoming Event</Text>
              </View>
              <Text className="mb-[7px] mt-[27px] text-[15px] font-extrabold leading-5 text-ihnbc-black">
                Youth Spring Retreat
              </Text>
              <View className="mt-0.5 flex-row items-center gap-1.5">
                <ChurchIcon name="calendar" size={16} color="#48A97E" />
                <Text className="text-xs text-[#7D8580]">April 25-27, 2026</Text>
              </View>
              <View className="mt-0.5 flex-row items-center gap-1.5">
                <ChurchIcon name="clock" size={15} color="#7F8588" />
                <Text className="text-xs text-[#7D8580]">All Weekend</Text>
              </View>
            </View>
          </View>

          <Text className="text-[17px] font-extrabold text-ihnbc-black">From Last Service</Text>
          <View className="mt-[18px] flex-row gap-[25px]">
            <View className="h-[190px] flex-1 rounded-[17px] bg-[#D9D9D9]" />
            <View className="h-[190px] flex-1 rounded-[17px] bg-[#D9D9D9]" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
