/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TransactionType} from '../../utility';

export default function Details({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const {transaction, handleAddTransaction, backgroundColor} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Add Transaction', {
              transaction,
              handleAddTransaction,
            })
          }>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, transaction, handleAddTransaction]);

  return (
    <View style={styles.cardScreen}>
      <View style={styles.cardView}>
        <View
          style={[
            styles.cardTitleView,
            {backgroundColor: backgroundColor(transaction.type)},
          ]}>
          <Text style={[styles.cardTextTitle, {color: '#7c7c7c'}]}>
            {transaction.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#7c7c7c',
              borderTopWidth: 0.5,
              borderColor: '#7c7c7c',
            }}>
            {TransactionType[transaction.type]}
          </Text>
        </View>
        <View style={styles.cardDescView}>
          <Text style={styles.cardText}>{transaction.desc}</Text>
        </View>
        <View style={[styles.cardAmountView, {backgroundColor: 'white'}]}>
          <Text style={[styles.cardText, styles.cardTextAmount]}>
            $ {transaction.amount.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editBtn: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  cardScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    borderRadius: 10,
    shadowOffset: {width: 100, height: 100},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 5,
    // background color must be set
    backgroundColor: '#0000', // invisible color
  },
  cardTitleView: {
    width: 350,
    alignItems: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    fontSize: 30,
    fontWeight: '400',
  },
  cardTextTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  cardTextAmount: {
    fontSize: 30,
    width: 300,
    borderTopWidth: 0.7,
    borderTopColor: 'gray',
    textAlign: 'center',
    paddingVertical: 10,
  },
  cardDescView: {
    width: 350,
    backgroundColor: 'white',
    height: 300,
    padding: 10,
  },
  cardAmountView: {
    width: 350,
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
