import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ImageSourcePropType, Pressable, ScrollView, Share, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon } from '@/components/icons/church-icons';
import { YoutubeEmbed } from '@/components/youtube-embed';

type MediaType = 'sermon' | 'podcast';

type MediaDetail = {
  type: MediaType;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  image: ImageSourcePropType;
  description: string;
  keyPoints: string[];
  scriptures: string;
  youtubeVideoId?: string;
};

const mediaDetails: MediaDetail[] = [
  {
    type: 'sermon',
    title: 'Walking in Faith',
    speaker: 'Pastor Michael Johnson',
    date: 'April 6, 2026',
    duration: '25 min',
    image: require('@/assets/images/sermon-walking-in-faith.png'),
    description:
      "In this powerful message, Pastor Michael teaches us how to trust God's timing in every season of life. When we learn to wait on God, we align with His perfect plan and purpose for our lives.",
    keyPoints: [
      "God's timing is always perfect.",
      'Waiting on God builds our faith.',
      "Trust God even when you don't understand.",
    ],
    scriptures: 'Isaiah 40:31, Ecclesiastes 3:1-8',
    youtubeVideoId: 'FU0AACqGqlk',
  },
  {
    type: 'sermon',
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Williams',
    date: 'March 30, 2026',
    duration: '15 min',
    image: require('@/assets/images/sermon-power-of-prayer.png'),
    description:
      'This message calls us into deeper intimacy with God through consistent, expectant prayer that shapes the heart and strengthens faith.',
    keyPoints: [
      'Prayer keeps our hearts close to God.',
      'Consistent prayer builds spiritual strength.',
      'God invites us to pray with expectation.',
    ],
    scriptures: 'Matthew 6:9-13, 1 Thessalonians 5:17',
  },
  {
    type: 'sermon',
    title: 'Love One Another',
    speaker: 'Pastor Michael Johnson',
    date: 'March 23, 2026',
    duration: '32 min',
    image: require('@/assets/images/sermon-love-one-another.png'),
    description:
      'A message on how Christ-like love shapes the witness, unity, and daily life of the church community.',
    keyPoints: [
      'Love is the mark of discipleship.',
      'Unity grows where humility is practiced.',
      'Serving others reveals the heart of Christ.',
    ],
    scriptures: 'John 13:34-35, 1 Corinthians 13:4-7',
  },
  {
    type: 'podcast',
    title: 'Walking Daily with God',
    speaker: 'IHNBC Podcast',
    date: 'May 18, 2026',
    duration: '28 min',
    image: require('@/assets/images/podcast-walking-daily.png'),
    description:
      "A practical conversation on building daily rhythms that keep faith alive through God's word, prayer, obedience, and community.",
    keyPoints: [
      'Daily faith grows through simple rhythms.',
      "God's word gives direction for ordinary days.",
      'Community helps us keep walking faithfully.',
    ],
    scriptures: 'Psalm 119:105, Micah 6:8',
  },
  {
    type: 'podcast',
    title: 'Serving with a Heart of Love',
    speaker: 'IHNBC Podcast',
    date: 'May 11, 2026',
    duration: '24 min',
    image: require('@/assets/images/podcast-heart-love.png'),
    description:
      "A thoughtful discussion on serving others as a natural expression of God's love at work in us.",
    keyPoints: [
      'Service begins with love.',
      'Small acts of care can carry great impact.',
      'God is honored when we serve faithfully.',
    ],
    scriptures: 'Galatians 5:13, Mark 10:45',
  },
  {
    type: 'podcast',
    title: 'Youth Talks',
    speaker: 'IHNBC Podcast',
    date: 'May 9, 2026',
    duration: '32 min',
    image: require('@/assets/images/podcast-youth-talks.png'),
    description:
      'Real conversations about faith, identity, purpose, and living boldly for Christ as young believers.',
    keyPoints: [
      'Faith can be lived boldly at every age.',
      'Identity is secure in Christ.',
      'Purpose grows through obedience.',
    ],
    scriptures: '1 Timothy 4:12, Jeremiah 29:11',
  },
];

const fallbackDetail = mediaDetails[0];

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable className="flex-1 items-center justify-center" onPress={onPress}>
      <Feather name={icon} size={18} color="#FF6B00" />
      <Text className="mt-2 text-[10px] font-semibold text-ihnbc-black">{label}</Text>
    </Pressable>
  );
}

export default function WordDetailScreen() {
  const router = useRouter();
  const { play, title, type } = useLocalSearchParams<{ play?: string; title?: string; type?: MediaType }>();
  const [isPlaying, setIsPlaying] = useState(play === '1');
  const [isSaved, setIsSaved] = useState(false);
  const [audioOnly, setAudioOnly] = useState(false);
  const detail =
    mediaDetails.find((item) => item.title === title && item.type === type) ??
    mediaDetails.find((item) => item.title === title) ??
    fallbackDetail;
  const thumbnailSource = detail.youtubeVideoId
    ? { uri: `https://img.youtube.com/vi/${detail.youtubeVideoId}/hqdefault.jpg` }
    : undefined;

  useEffect(() => {
    setIsPlaying(play === '1');
  }, [detail.title, play]);

  function playMedia() {
    if (!detail.youtubeVideoId) {
      Alert.alert('Playback unavailable', 'This message does not have media attached yet.');
      return;
    }

    setIsPlaying((current) => !current);
  }

  function toggleSaved() {
    setIsSaved((current) => !current);
  }

  function downloadMedia() {
    Alert.alert('Download started', `${detail.title} has been added to your downloads.`);
  }

  async function shareMedia() {
    const mediaUrl = detail.youtubeVideoId
      ? `https://www.youtube.com/watch?v=${detail.youtubeVideoId}`
      : undefined;

    try {
      await Share.share({
        title: detail.title,
        message: mediaUrl
          ? `${detail.title} by ${detail.speaker}\n${mediaUrl}`
          : `${detail.title} by ${detail.speaker}`,
      });
    } catch {
      Alert.alert('Share unavailable', 'Unable to share this message right now.');
    }
  }

  function toggleAudioOnly() {
    setAudioOnly((current) => !current);
    if (!isPlaying && detail.youtubeVideoId) {
      setIsPlaying(true);
    }
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-[#F8F8F8]" showsVerticalScrollIndicator={false}>
        <View className="relative h-[188px] overflow-hidden bg-ihnbc-black">
          {isPlaying && detail.youtubeVideoId ? (
            <YoutubeEmbed
              height={188}
              play
              title={detail.title}
              videoId={detail.youtubeVideoId}
            />
          ) : (
            <>
              <Image source={thumbnailSource ?? detail.image} className="h-full w-full" resizeMode="cover" />
              <View className="absolute inset-0 bg-black/20" />
            </>
          )}

          <View className="absolute left-4 right-4 top-6 flex-row items-center justify-between">
            <Pressable
              className="h-8 w-8 items-center justify-center rounded-full bg-black/35"
              onPress={() => router.back()}>
              <Feather name="chevron-left" size={24} color="#FFFFFF" />
            </Pressable>

            <View className="flex-row items-center gap-4">
              <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-black/35" onPress={toggleSaved}>
                <Feather name="bookmark" size={16} color={isSaved ? '#FF6B00' : '#FFFFFF'} />
              </Pressable>
              <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-black/35">
                <ChurchIcon name="more-vertical" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {!isPlaying && (
            <>
              <View className="absolute inset-0 items-center justify-center">
                <Pressable className="h-[54px] w-[54px] items-center justify-center rounded-full bg-white" onPress={playMedia}>
                  <ChurchIcon name="play" size={22} color="#111111" />
                </Pressable>
              </View>

              <View className="absolute bottom-5 left-4 right-4">
                <View className="flex-row items-center">
                  <Feather name="rotate-ccw" size={15} color="#FFFFFF" />
                  <View className="ml-2 h-[18px] w-[18px] items-center justify-center rounded-full border border-white">
                    <Text className="text-[8px] font-bold text-white">15</Text>
                  </View>
                  <Text className="ml-2 text-[10px] font-medium text-white">12:25</Text>
                  <View className="mx-3 h-[5px] flex-1 rounded-full bg-white">
                    <View className="h-full w-[55%] rounded-full bg-[#FF6B00]" />
                    <View className="absolute left-[54%] top-[-4px] h-[13px] w-[13px] rounded-full bg-[#FF6B00]" />
                  </View>
                  <Text className="mr-2 text-[10px] font-medium text-white">
                    {detail.duration.replace(' min', ':00')}
                  </Text>
                  <Feather name="maximize" size={15} color="#FFFFFF" />
                </View>
              </View>
            </>
          )}
        </View>

        <View className="px-4 pb-10 pt-4">
          <Text className="text-[17px] font-extrabold leading-[22px] text-ihnbc-black">
            {detail.title}
          </Text>

          <View className="mt-3 flex-row flex-wrap items-center gap-x-3 gap-y-2">
            <View className="flex-row items-center">
              <Feather name="user" size={13} color="#777777" />
              <Text className="ml-1 text-[10px] text-[#777777]">{detail.speaker}</Text>
            </View>
            <Text className="text-[10px] text-[#777777]">.</Text>
            <View className="flex-row items-center">
              <ChurchIcon name="calendar" size={11} color="#777777" />
              <Text className="ml-1 text-[10px] text-[#777777]">{detail.date}</Text>
            </View>
            <Text className="text-[10px] text-[#777777]">.</Text>
            <View className="flex-row items-center">
              <ChurchIcon name="clock" size={12} color="#777777" />
              <Text className="ml-1 text-[10px] text-[#777777]">{detail.duration}</Text>
            </View>
          </View>

          <View className="mt-5 h-[72px] flex-row items-center rounded-[14px] bg-white px-3">
            <ActionButton icon={isPlaying ? 'pause' : 'play'} label={isPlaying ? 'Pause' : 'Play'} onPress={playMedia} />
            <View className="h-[44px] w-px bg-[#D8D8D8]" />
            <ActionButton icon="download" label="Download" onPress={downloadMedia} />
            <View className="h-[44px] w-px bg-[#D8D8D8]" />
            <ActionButton icon="bookmark" label={isSaved ? 'Saved' : 'Save'} onPress={toggleSaved} />
            <View className="h-[44px] w-px bg-[#D8D8D8]" />
            <ActionButton icon="share-2" label="Share" onPress={shareMedia} />
          </View>

          <Pressable className="mt-5 min-h-[56px] flex-row items-center rounded-[12px] bg-[#FFF0E8] px-4" onPress={toggleAudioOnly}>
            <Feather name="headphones" size={18} color="#FF6B00" />
            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-[12px] font-semibold text-ihnbc-black">
                {audioOnly ? 'Audio mode on' : 'Listen only (Audio mode)'}
              </Text>
              <Text className="mt-1 text-[9px] text-[#777777]">
                {audioOnly ? 'Tap again to return to video mode.' : 'Save data and listen on the go.'}
              </Text>
            </View>
            <Feather name={audioOnly ? 'pause' : 'chevron-right'} size={24} color="#111111" />
          </Pressable>

          <Text className="mt-5 text-[12px] font-bold text-ihnbc-black">About this message</Text>
          <Text className="mt-4 text-[10px] leading-[13px] text-[#777777]">{detail.description}</Text>

          <View className="mt-5 rounded-[14px] bg-[#FFF0E8] px-4 py-5">
            <Text className="text-[12px] font-bold text-ihnbc-black">Key Points</Text>
            <View className="mt-4 gap-3">
              {detail.keyPoints.map((point) => (
                <View key={point} className="flex-row items-start">
                  <Ionicons name="checkmark-circle-outline" size={16} color="#FF6B00" />
                  <Text className="ml-2 min-w-0 flex-1 text-[10px] leading-[14px] text-[#777777]">
                    {point}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-5 flex-row rounded-[14px] border border-[#E5E5E5] bg-white px-4 py-5">
            <Feather name="book-open" size={18} color="#777777" />
            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-[12px] font-bold text-ihnbc-black">Scripture References</Text>
              <Text className="mt-3 text-[10px] leading-[14px] text-[#777777]">{detail.scriptures}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
