import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'

const MapScreen = () => {

    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity 
                style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full`}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Icon 
                    name="menu"
                />
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </View>
        </SafeAreaView>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 35 : 0
    }
})
