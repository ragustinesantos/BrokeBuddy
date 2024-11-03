import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {getNewID, TransactionEntry, TransactionType} from '../../utility';

export default function AddTransaction({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  //Destructure params
  const {transaction, handleAddTransaction} = route.params;

  // Assign id
  const id = transaction.id;

  // States. Set default as values from params.
  // Initial params = defaultTransactionEntry
  const [title, setTitle] = useState(transaction.title);
  const [description, setDescription] = useState(transaction.desc);
  const [amount, setAmount] = useState(
    parseFloat(transaction.amount) ? transaction.amount.toString() : '0',
  );
  const [type, setType] = useState(transaction.type);

  //Error States
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: id ? 'Update Transaction' : 'Add Transaction',
    });
  }, [navigation, id]);

  // Handle state change triggers
  const handleTitle = (text: string) => setTitle(text);
  const handleDescription = (text: string) => setDescription(text);
  const handleAmount = (text: string) => setAmount(text);

  // If in edit mode / existing id, resets fields to current values
  // else, if new item, reset all fields
  const resetFields = (tempId: string) => {
    if (tempId) {
      setTitle(transaction.title);
      setDescription(transaction.desc);
      setAmount(
        parseFloat(transaction.amount) ? transaction.amount.toString() : '',
      );
      setType(transaction.type);
    } else {
      title ? null : setTitle('');
      description ? null : setDescription('');
      amount ? null : setAmount('0');
      type !== TransactionType.Essential
        ? null
        : setType(TransactionType.Essential);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Reset error flags to reassess which ones are empty
    setTitleError(false);
    setDescriptionError(false);
    setAmountError(false);

    const tempId = id;

    if (title && description && amount > 0) {
      const newTransaction: TransactionEntry = {
        id: tempId ? id : getNewID(),
        title: title,
        desc: description,
        amount: parseFloat(amount),
        type: type,
      };
      handleAddTransaction(newTransaction);
      navigation.navigate('Transactions');
    } else {
      if (!title) {
        setTitleError(true);
      }

      if (!description) {
        setDescriptionError(true);
      }

      if (!parseFloat(amount) || parseFloat(amount) <= 0) {
        setAmountError(true);
      }
    }

    // Reset
    resetFields(tempId);
  };

  return (
    <View style={styles.addTransactionView}>
      <View style={styles.sectionView}>
        <TextInput
          style={styles.txtInput}
          placeholder="Title"
          value={title}
          onChangeText={handleTitle}
        />
        {titleError ? (
          <Text style={styles.errorTxt}>Title cannot be empty</Text>
        ) : null}
      </View>
      <View style={styles.sectionView}>
        <TextInput
          style={styles.descInput}
          placeholder="Add Some Description..."
          value={description}
          onChangeText={handleDescription}
        />
        {descriptionError ? (
          <Text style={styles.errorTxt}>Description cannot be empty</Text>
        ) : null}
      </View>
      <View style={styles.sectionView}>
        <TextInput
          inputMode="numeric"
          placeholder="Amount in CAD..."
          value={amount}
          onChangeText={handleAmount}
          style={styles.txtInput}
        />
        {amountError ? (
          <Text style={styles.errorTxt}>Amount cannot be empty</Text>
        ) : null}
      </View>
      <View style={styles.sectionView}>
        <View style={styles.radioBtnView}>
          <RadioButton
            value={TransactionType[TransactionType.Essential]}
            status={
              type === TransactionType.Essential ? 'checked' : 'unchecked'
            }
            onPress={() => setType(TransactionType.Essential)}
          />
          <Text style={styles.radioTxt}>Essential</Text>
        </View>
        <View style={styles.radioBtnView}>
          <RadioButton
            value={TransactionType[TransactionType.Leisure]}
            status={type === TransactionType.Leisure ? 'checked' : 'unchecked'}
            onPress={() => setType(TransactionType.Leisure)}
          />
          <Text style={styles.radioTxt}>Leisure</Text>
        </View>
        <View style={styles.radioBtnView}>
          <RadioButton
            value={TransactionType[TransactionType.Others]}
            status={type === TransactionType.Others ? 'checked' : 'unchecked'}
            onPress={() => setType(TransactionType.Others)}
          />
          <Text style={styles.radioTxt}>Others</Text>
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            handleSubmit();
          }}>
          <Text style={styles.btnTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addTransactionView: {
    padding: 20,
  },
  sectionView: {
    marginBottom: 20,
  },
  txtInput: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  descInput: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 35,
  },
  errorTxt: {
    fontSize: 12,
    color: 'red',
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  radioBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioTxt: {
    fontSize: 20,
  },
  btnView: {
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#21ABFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});
