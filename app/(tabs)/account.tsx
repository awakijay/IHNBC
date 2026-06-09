import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AccountRow = {
  title: string;
  description?: string;
  icon: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  iconSet: 'feather' | 'ionicons' | 'material';
  action?: boolean;
};

const accountSections: { title: string; rows: AccountRow[] }[] = [
  {
    title: 'Bookmarks',
    rows: [
      {
        title: 'Saved Content',
        description: 'Access items you saved for later',
        icon: 'bookmark',
        iconSet: 'feather',
        action: true,
      },
    ],
  },
  {
    title: 'Preferences',
    rows: [
      {
        title: 'Notifications',
        description: 'Control updates you get',
        icon: 'bell',
        iconSet: 'feather',
        action: true,
      },
      {
        title: 'Appearance',
        description: 'Change how the app looks',
        icon: 'moon',
        iconSet: 'ionicons',
        action: true,
      },
    ],
  },
  {
    title: 'Support',
    rows: [
      {
        title: 'Help / FAQ',
        description: 'Find answers to common questions',
        icon: 'help-circle',
        iconSet: 'feather',
        action: true,
      },
      {
        title: 'Contact Us',
        description: 'Get in touch with us',
        icon: 'headphones',
        iconSet: 'feather',
        action: true,
      },
    ],
  },
  {
    title: 'About',
    rows: [
      {
        title: 'About Church',
        description: 'Learn information about church',
        icon: 'help-circle',
        iconSet: 'feather',
        action: true,
      },
      {
        title: 'App Version',
        description: 'v1.0',
        icon: 'info',
        iconSet: 'feather',
      },
    ],
  },
];

function RowIcon({ row }: { row: AccountRow }) {
  if (row.iconSet === 'ionicons') {
    return <Ionicons name={row.icon as keyof typeof Ionicons.glyphMap} size={20} color="#111111" />;
  }

  if (row.iconSet === 'material') {
    return (
      <MaterialCommunityIcons
        name={row.icon as keyof typeof MaterialCommunityIcons.glyphMap}
        size={20}
        color="#111111"
      />
    );
  }

  return <Feather name={row.icon as keyof typeof Feather.glyphMap} size={19} color="#111111" />;
}

function SettingsRow({ row, showDivider }: { row: AccountRow; showDivider: boolean }) {
  function handlePress() {
    if (!row.action) {
      return;
    }

    Haptics.selectionAsync();
    Alert.alert(row.title, `${row.title} settings will be available soon.`);
  }

  return (
    <Pressable
      className={`min-h-[72px] flex-row items-center px-[18px] ${showDivider ? 'border-b border-[#CFCFCF]' : ''}`}
      onPress={handlePress}>
      <View className="h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#FFF0E8]">
        <RowIcon row={row} />
      </View>

      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-[15px] font-extrabold leading-5 text-ihnbc-black">{row.title}</Text>
        {row.description && (
          <Text className="mt-1 text-[11px] leading-[14px] text-[#777777]">{row.description}</Text>
        )}
      </View>

      {row.action && <Feather name="chevron-right" size={27} color="#111111" />}
    </Pressable>
  );
}

export default function AccountScreen() {
  function handleManageAccount() {
    Haptics.selectionAsync();
    Alert.alert('Manage Account', 'Profile management will be available soon.');
  }

  function handleSettings() {
    Haptics.selectionAsync();
    Alert.alert('Settings', 'Account settings will be available soon.');
  }

  function handleLogout() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive' },
    ]);
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-36 pt-[22px]">
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-[22px] font-extrabold leading-[28px] text-ihnbc-black">
                Account
              </Text>
              <Text className="mt-1 text-[12px] leading-[16px] text-[#777777]">
                Manage your profile, activity and preferences.
              </Text>
            </View>

            <Pressable className="h-10 w-10 items-center justify-center" onPress={handleSettings}>
              <Feather name="settings" size={24} color="#111111" />
            </Pressable>
          </View>

          <View className="mt-7 min-h-[95px] flex-row items-center rounded-[16px] bg-[#FFF0E8] px-[18px]">
            <Image
              source={require('@/assets/images/account-tab-icon.jpg')}
              className="h-[50px] w-[50px] rounded-full"
              resizeMode="cover"
            />

            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-[15px] font-extrabold text-ihnbc-black">David Simons</Text>
              <Text className="mt-1 text-[11px] text-[#777777]">DavidSimons@gmail.com</Text>
              <Pressable className="mt-4 self-start" onPress={handleManageAccount}>
                <Text className="text-[12px] font-medium text-[#FF6B00]">Manage Account</Text>
              </Pressable>
            </View>
          </View>

          {accountSections.map((section) => (
            <View key={section.title} className="mt-4">
              <Text className="mb-2 text-[15px] font-extrabold text-[#777777]">{section.title}</Text>
              <View className="overflow-hidden rounded-[16px] bg-white">
                {section.rows.map((row, index) => (
                  <SettingsRow
                    key={row.title}
                    row={row}
                    showDivider={index < section.rows.length - 1}
                  />
                ))}
              </View>
            </View>
          ))}

          <Pressable
            className="mt-4 h-[49px] flex-row items-center justify-center rounded-[14px] bg-[#FFF0E8]"
            onPress={handleLogout}>
            <Feather name="log-out" size={18} color="#FF6B00" />
            <Text className="ml-1 text-[16px] font-extrabold text-[#FF6B00]">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
