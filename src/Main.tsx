import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Transactions from './components/Transactions';
import AddTransaction from './components/AddTransaction';
import Details from './components/Details';

const Stack = createNativeStackNavigator();

export default function Main(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Transactions"
        screenOptions={{headerTitleAlign: 'center', headerTintColor: 'white'}}>
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{
            title: 'Transactions',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#DF114F'},
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '600',
              color: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Add Transaction"
          component={AddTransaction}
          options={{
            title: 'Add Transaction',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#DF114F'},
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '600',
              color: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Details',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#DF114F'},
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '600',
              color: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
