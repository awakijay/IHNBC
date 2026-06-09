import { devotionals } from '@/constants/devotionals';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DevotionalDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [saved, setSaved] = useState(false);

  const devotionalIndex = useMemo(
    () => devotionals.findIndex((item) => item.id === id),
    [id]
  );
  const devotional = devotionalIndex >= 0 ? devotionals[devotionalIndex] : devotionals[0];
  const previousDevotional = devotionals[devotionalIndex + 1];
  const nextDevotional = devotionals[devotionalIndex - 1];
  const previousButtonColor = previousDevotional ? '#FF6B00' : '#777777';
  const nextButtonColor = nextDevotional ? '#FF6B00' : '#777777';

  function toggleSaved() {
    Haptics.selectionAsync();
    setSaved((current) => !current);
  }

  async function shareDevotional() {
    Haptics.selectionAsync();

    try {
      await Share.share({
        title: devotional.title,
        message: `${devotional.title}\n\n${devotional.verse}\n\n${devotional.scripture}`,
      });
    } catch {
      Alert.alert('Share unavailable', 'Unable to share this devotional right now.');
    }
  }

  function goToDevotional(devotionalId?: string) {
    if (!devotionalId) {
      return;
    }

    Haptics.selectionAsync();
    router.replace({
       pathname: '/devotional/[id]',
      params: { id: devotionalId },
    });
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-[22px]">
          <View className="h-[60px] flex-row items-center rounded-[22px] bg-white px-2">
            <Pressable
              className="h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#FFF0E8]"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={26} color="#111111" />
            </Pressable>

            <Text className="ml-[75px] text-[18px] font-extrabold text-ihnbc-black">
              Devotional
            </Text>
          </View>

          <View className="mt-8">
            <Text className="text-[10px] font-medium text-ihnbc-black">{devotional.dateLabel}</Text>
            <Text className="mt-1 text-[20px] font-extrabold text-ihnbc-black">
              {devotional.title}
            </Text>
          </View>

          <View className="mt-4 min-h-[75px] flex-row items-center rounded-[12px] bg-[#FFF0E8] px-4 py-3">
            <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-[#FF6B00]">
              <Ionicons name="sunny-outline" size={19} color="#FFFFFF" />
            </View>

            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-[11px] font-bold leading-[14px] text-ihnbc-black">
                {devotional.verse}
              </Text>
              <Text className="mt-2 text-[9px] text-[#777777]">{devotional.scripture}</Text>
            </View>
          </View>

          <View className="mt-4 rounded-[14px] border border-dashed border-[#FF6B00] bg-white px-5 py-5">
            {devotional.body.map((paragraph, index) => (
              <Text
                key={`${devotional.id}-${index}`}
                className={`text-[12px] leading-[16px] text-ihnbc-black ${index > 0 ? 'mt-4' : ''}`}>
                {paragraph}
              </Text>
            ))}
          </View>

          <View className="mt-4 h-[54px] flex-row rounded-[14px] bg-white">
            <Pressable className="flex-1 flex-row items-center justify-center" onPress={toggleSaved}>
              <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-[#FFF0E8]">
                <Ionicons
                  name={saved ? 'bookmark' : 'bookmark-outline'}
                  size={12}
                  color="#FF6B00"
                />
              </View>
              <Text className="ml-3 text-[11px] font-medium text-[#777777]">
                {saved ? 'Saved' : 'Save'}
              </Text>
            </Pressable>

            <View className="my-2 w-px bg-[#777777]" />

            <Pressable className="flex-1 flex-row items-center justify-center" onPress={shareDevotional}>
              <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-[#FFF0E8]">
                <Feather name="upload" size={11} color="#FF6B00" />
              </View>
              <Text className="ml-3 text-[11px] font-medium text-[#777777]">Share</Text>
            </Pressable>
          </View>

          <View className="mt-4 h-[54px] flex-row rounded-[14px] bg-white">
            <Pressable
              className="flex-1 flex-row items-center justify-start px-4"
              disabled={!previousDevotional}
              onPress={() => goToDevotional(previousDevotional?.id)}>
              <Feather name="chevron-left" size={24} color={previousButtonColor} />
              <Text
                className="ml-3 text-[11px] font-medium"
                style={{ color: previousButtonColor }}>
                Previous
              </Text>
            </Pressable>

            <View className="my-2 w-px bg-[#777777]" />

            <Pressable
              className="flex-1 flex-row items-center justify-end px-4"
              disabled={!nextDevotional}
              onPress={() => goToDevotional(nextDevotional?.id)}>
              <Text
                className="mr-3 text-[11px] font-medium"
                style={{ color: nextButtonColor }}>
                Next
              </Text>
              <Feather name="chevron-right" size={24} color={nextButtonColor} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
