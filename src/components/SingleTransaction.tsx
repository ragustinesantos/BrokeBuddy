import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  TransactionEntry,
  TransactionType,
  TransactionType_bgColor,
} from '../../utility';

export default function SingleTransaction({
  transaction,
  navigation,
  handleAddTransaction,
}: {
  transaction: TransactionEntry;
  navigation: any;
  handleAddTransaction: (newTransaction: TransactionEntry) => void;
}): React.JSX.Element {
  const backgroundColor = (transactionType: TransactionType) => {
    switch (transactionType) {
      case TransactionType.Essential:
        return TransactionType_bgColor[TransactionType.Essential];
      case TransactionType.Leisure:
        return TransactionType_bgColor[TransactionType.Leisure];
      case TransactionType.Others:
        return TransactionType_bgColor[TransactionType.Others];
      default:
        return '#F9F9F9';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        {backgroundColor: backgroundColor(transaction.type)},
      ]}
      onPress={() =>
        navigation.navigate('Details', {
          transaction: transaction,
          handleAddTransaction,
          backgroundColor,
        })
      }>
      <Text style={styles.listText}>{transaction.title}</Text>
      <Text style={styles.listText}>{transaction.amount.toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
  listText: {
    fontSize: 25,
    fontWeight: '400',
  },
});
