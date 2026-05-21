import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon } from '@/components/icons/church-icons';

export default function AccountScreen() {
  return (
    <SafeAreaView className="flex-1 bg-ihnbc-background">
      <View className="flex-1 justify-center px-6">
        <View className="mb-[18px] h-[72px] w-[72px] items-center justify-center rounded-3xl bg-white">
          <ChurchIcon name="account" size={36} color="#111111" />
        </View>
        <Text className="text-[31px] font-extrabold leading-[39px] text-ihnbc-black">Account</Text>
        <Text className="max-w-[270px] text-base leading-6 text-ihnbc-muted">
          Member profile, notifications, and preferences will live here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
