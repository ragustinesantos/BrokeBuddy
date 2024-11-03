import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  addEditTransaction,
  defaultTransactionEntry,
  getInitialData,
  TransactionEntry,
} from '../../utility';
import SingleTransaction from './SingleTransaction';

export default function Transactions({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const [transactions, setTransactions] = useState(getInitialData);

  const handleAddTransaction = (newTransaction: TransactionEntry) => {
    addEditTransaction(newTransaction);
    setTransactions([...getInitialData()]);
  };

  return (
    <View style={styles.transactions}>
      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SingleTransaction
              transaction={item}
              navigation={navigation}
              handleAddTransaction={handleAddTransaction}
            />
          )}
        />
      ) : (
        <View style={styles.emptyTransactionBox}>
          <Text style={styles.emptyTxt}>Add Transaction To See Entry Here</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('Add Transaction', {
            handleAddTransaction,
            transaction: defaultTransactionEntry,
          })
        }>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  transactions: {
    flex: 1,
  },
  emptyTransactionBox: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTxt: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    width: '80%',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#68BA5E',
    borderRadius: 50,
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 40,
  },
});
