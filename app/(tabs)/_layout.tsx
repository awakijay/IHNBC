import { Tabs, type Href, usePathname, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ChurchIcon, type ChurchIconName } from '@/components/icons/church-icons';
import { HapticTabButton } from '@/components/navigation/haptic-tab-button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const tabOrder = ['index', 'the-word', 'support', 'account'] as const;

type TabRoute = (typeof tabOrder)[number];

const tabHrefs: Record<TabRoute, Href> = {
  index: '/',
  'the-word': '/the-word',
  support: '/support',
  account: '/account',
};

function getActiveTab(pathname: string): TabRoute {
  const segment = pathname.split('/').filter(Boolean)[0];

  if (segment === 'the-word' || segment === 'support' || segment === 'account') {
    return segment;
  }

  return 'index';
}

function TabLabel({ focused, title }: { focused: boolean; title: string }) {
  if (focused) {
    return null;
  }

  return (
    <Text className="mt-0.5 text-[10px] font-semibold text-[#111111]">
      {title}
    </Text>
  );
}

type TabIconName = ChurchIconName | 'tab-account';

function TabIcon({ focused, icon }: { focused: boolean; icon: TabIconName }) {
  const iconColor = focused ? '#FF6B00' : '#0F0F0F';
  const iconSize = 20;

  return (
    <View className="h-9 w-[58px] items-center justify-center">
      {icon === 'tab-account' ? (
        <Image
          source={require('@/assets/images/account-tab-icon.jpg')}
          className="h-[22px] w-[22px] rounded-full"
        />
      ) : (
        <ChurchIcon name={icon} size={iconSize} color={iconColor} />
      )}
      <View className="h-1.5 justify-center">
        <View
          className={`h-[6px] w-[6px] rounded-full bg-ihnbc-orange mt-7 ${
            focused ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </View>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  const navigateBySwipe = useCallback(
    (direction: 'next' | 'previous') => {
      const activeIndex = tabOrder.indexOf(activeTab);
      const nextIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
      const nextTab = tabOrder[nextIndex];

      if (!nextTab) {
        return;
      }

      Haptics.selectionAsync();
      router.replace(tabHrefs[nextTab]);
    },
    [activeTab, router]
  );

  const tabSwipeGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-28, 28])
        .failOffsetY([-18, 18])
        .onEnd((event) => {
          const isFastSwipe = Math.abs(event.velocityX) > 650;
          const isLongSwipe = Math.abs(event.translationX) > 70;

          if (!isFastSwipe && !isLongSwipe) {
            return;
          }

          if (event.translationX < 0) {
            runOnJS(navigateBySwipe)('next');
            return;
          }

          runOnJS(navigateBySwipe)('previous');
        }),
    [navigateBySwipe]
  );

  return (
    <GestureDetector gesture={tabSwipeGesture}>
      <View className="flex-1">
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            tabBarInactiveTintColor: '#111111',
            headerShown: false,
            tabBarButton: HapticTabButton,
            tabBarStyle: {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 87,
              paddingTop: 18,
              paddingBottom: 20,
              backgroundColor: '#FFFFFF',
              borderTopWidth: 0,
              borderTopLeftRadius: 34,
              borderTopRightRadius: 34,
              shadowColor: '#EDEDED',
              shadowOffset: { width: 0, height: -8 },
              shadowOpacity: 1,
              shadowRadius: 20,
              elevation: 18,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '600',
              marginTop: 1,
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} title="Home" />,
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="tab-home" />,
            }}
          />
          <Tabs.Screen
            name="the-word"
            options={{
              title: 'The Word',
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} title="The Word" />,
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="tab-word" />,
            }}
          />
          <Tabs.Screen
            name="support"
            options={{
              title: 'Support',
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} title="Support" />,
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="tab-support" />,
            }}
          />
          <Tabs.Screen
            name="account"
            options={{
              title: 'Account',
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} title="Account" />,
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="tab-account" />,
            }}
          />
        </Tabs>
      </View>
    </GestureDetector>
  );
}
