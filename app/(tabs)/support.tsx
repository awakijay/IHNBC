import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChurchIcon, type ChurchIconName } from '@/components/icons/church-icons';

type BankDetail = {
  label: string;
  value: string;
  icon: ChurchIconName | keyof typeof Feather.glyphMap;
  iconClassName: string;
  customIcon?: boolean;
  copyable?: boolean;
};

const presetAmounts = [500, 1000, 5000];

const bankDetails: BankDetail[] = [
  {
    label: 'Bank Name',
    value: 'Moniepoint MFB',
    icon: 'bank-name',
    iconClassName: 'bg-ihnbc-sky',
    customIcon: true,
    copyable: true,
  },
  {
    label: 'Account Number',
    value: '5545084785',
    icon: 'account-number',
    iconClassName: 'bg-ihnbc-mint',
    customIcon: true,
    copyable: true,
  },
  {
    label: 'Account Name',
    value: 'In His Name Bible Church1',
    icon: 'user',
    iconClassName: 'bg-ihnbc-lilac',
  },
];

function formatAmount(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export default function SupportScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [giftSubmitted, setGiftSubmitted] = useState(false);

  const customAmountNumber = Number(customAmount || 0);
  const giftAmount = selectedAmount ?? customAmountNumber;
  const canSubmit = giftAmount > 0;

  const giftLabel = useMemo(() => {
    if (!canSubmit) {
      return 'your gift';
    }

    return formatAmount(giftAmount);
  }, [canSubmit, giftAmount]);

  async function copyDetail(detail: BankDetail) {
    if (!detail.copyable) {
      return;
    }

    await Clipboard.setStringAsync(detail.value);
    setCopiedField(detail.label);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setCopiedField(null), 1800);
  }

  function selectPreset(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount('');
    setGiftSubmitted(false);
    Haptics.selectionAsync();
  }

  function selectCustom() {
    setSelectedAmount(null);
    setGiftSubmitted(false);
    Haptics.selectionAsync();
  }

  function updateCustomAmount(value: string) {
    setSelectedAmount(null);
    setGiftSubmitted(false);
    setCustomAmount(value.replace(/[^\d]/g, ''));
  }

  function submitGift() {
    if (!canSubmit) {
      Alert.alert('Choose an amount', 'Select an offering amount or enter a custom amount first.');
      return;
    }

    setGiftSubmitted(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Thank you', `Your ${giftLabel} offering has been recorded.`);
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ihnbc-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="px-6 pb-36 pt-[22px]">
            <View className="h-[64px] flex-row items-center rounded-[18px] bg-white px-[14px]">
              <View className="flex-1">
                <Text className="text-[20px] font-extrabold leading-[25px] text-ihnbc-black">
                  Support the Work
                </Text>
                <Text className="mt-1 text-[12px] text-[#777777]">
                  Your giving makes a difference.
                </Text>
              </View>

              <View className="h-11 w-12 items-center justify-center">
                <ChurchIcon name="support-header" size={40} />
              </View>
            </View>

            <View className="mt-5 min-h-[109px] flex-row items-center rounded-[18px] bg-[#FFF0E8] px-[18px]">
              <View className="h-[72px] w-[72px] items-center justify-center rounded-full bg-white">
                <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FF6B00]">
                  <MaterialCommunityIcons name="heart" size={22} color="#FFFFFF" />
                </View>
              </View>

              <View className="ml-4 min-w-0 flex-1">
                <Text className="text-[16px] font-extrabold leading-5 text-ihnbc-black">
                  Thank you for your generosity!
                </Text>
                <Text className="mt-3 text-[11px] leading-[14px] text-[#777777]">
                  {"Your generous giving, helps us reach more souls, and advance God's kingdom"}
                </Text>
              </View>
            </View>

            <Text className="mt-5 text-[16px] font-extrabold text-ihnbc-black">Bank Details</Text>

            <View className="mt-4 overflow-hidden rounded-[18px] bg-white px-[14px] py-3">
              {bankDetails.map((detail, index) => {
                const wasCopied = copiedField === detail.label;

                return (
                  <Pressable
                    key={detail.label}
                    className={`flex-row items-center py-[14px] ${
                      index < bankDetails.length - 1 ? 'border-b border-[#CFCFCF]' : ''
                    }`}
                    onPress={() => copyDetail(detail)}>
                    <View
                      className={`h-[43px] w-[43px] items-center justify-center rounded-full ${detail.iconClassName}`}>
                      {detail.customIcon ? (
                        <ChurchIcon name={detail.icon as ChurchIconName} size={19} />
                      ) : (
                        <Feather name={detail.icon as keyof typeof Feather.glyphMap} size={18} color="#9B4DA3" />
                      )}
                    </View>

                    <View className="ml-4 min-w-0 flex-1">
                      <Text className="text-[11px] text-[#777777]">{detail.label}</Text>
                      <Text className="mt-1 text-[15px] font-extrabold text-ihnbc-black">
                        {detail.value}
                      </Text>
                    </View>

                    {detail.copyable && (
                      <View className="flex-row items-center">
                        <Feather name="copy" size={17} color={wasCopied ? '#27AE60' : '#777777'} />
                        <Text
                          className={`ml-1 text-[11px] font-semibold ${
                            wasCopied ? 'text-[#27AE60]' : 'text-[#FF6B00]'
                          }`}>
                          {wasCopied ? 'Copied' : 'Copy'}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-5">
              <Text className="text-[16px] font-extrabold text-ihnbc-black">Give an Offering</Text>
              <Text className="mt-1 text-[11px] text-[#777777]">
                Choose an amount or enter a custom amount.
              </Text>

              <View className="mt-4 flex-row gap-3">
                {presetAmounts.map((amount) => {
                  const isActive = selectedAmount === amount;

                  return (
                    <Pressable
                      key={amount}
                      className={`h-[46px] flex-1 items-center justify-center rounded-[14px] ${
                        isActive ? 'border border-[#FF6B00] bg-[#FFF6F0]' : 'bg-white'
                      }`}
                      onPress={() => selectPreset(amount)}>
                      <Text
                        className={`text-[12px] font-semibold ${
                          isActive ? 'text-[#FF6B00]' : 'text-ihnbc-black'
                        }`}>
                        {formatAmount(amount)}
                      </Text>
                    </Pressable>
                  );
                })}

                <Pressable
                  className={`h-[46px] w-[76px] flex-row items-center justify-center rounded-[14px] border border-[#FF6B00] ${
                    selectedAmount === null ? 'bg-[#FFF6F0]' : 'bg-white'
                  }`}
                  onPress={selectCustom}>
                  <Text className="text-[11px] font-semibold text-[#FF6B00]">Other</Text>
                  <Feather name="edit-2" size={14} color="#FF6B00" className="ml-1" />
                </Pressable>
              </View>

              <View className="mt-4 h-[48px] flex-row items-center rounded-[14px] bg-white px-4">
                <Text className="text-[20px] font-extrabold text-ihnbc-black">₦</Text>
                <View className="mx-4 h-7 w-px bg-[#CFCFCF]" />
                <TextInput
                  value={customAmount}
                  onChangeText={updateCustomAmount}
                  onFocus={selectCustom}
                  keyboardType="number-pad"
                  placeholder="Enter custom amount."
                  placeholderTextColor="#777777"
                  className="min-w-0 flex-1 p-0 text-[12px] text-ihnbc-black"
                />
                <Text className="text-[20px] font-medium text-[#777777]">.00</Text>
              </View>
            </View>

            <View className="mt-5 min-h-[91px] flex-row items-center rounded-[15px] bg-[#FFF0E8] px-[18px]">
              <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-white">
                <View className="h-[28px] w-[28px] items-center justify-center rounded-full bg-[#FF6B00]">
                  <Feather name="users" size={15} color="#FFFFFF" />
                </View>
              </View>

              <View className="ml-4 min-w-0 flex-1">
                <Text className="text-[15px] font-extrabold text-ihnbc-black">Your impact</Text>
                <Text className="mt-3 text-[10px] leading-[14px] text-[#777777]">
                  {"You are helping to build lives strengthen families and advance God's kingdom"}
                </Text>
              </View>
            </View>

            <Pressable
              className={`mt-4 h-[49px] flex-row items-center justify-center rounded-[14px] ${
                canSubmit ? 'bg-[#FF6B00]' : 'bg-[#F2C39B]'
              }`}
              onPress={submitGift}>
              <MaterialCommunityIcons name="heart-outline" size={18} color="#FFFFFF" />
              <Text className="ml-1 text-[16px] font-extrabold text-white">
                {giftSubmitted ? `Given ${giftLabel}` : 'I Have Given'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
