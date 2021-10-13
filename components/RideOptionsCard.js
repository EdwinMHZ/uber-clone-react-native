import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'
import 'intl';
import 'intl/locale-data/jsonp/es-MX';

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"
    },
];


const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const timeTravelInformation = useSelector(selectTravelTimeInformation);


    return (
        <SafeAreaView style={tw`bg-white`}>
            <View style={tw`mb-0`}>
                <TouchableOpacity 
                    style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
                    onPress={() => navigation.navigate('NavigateCard')}
                >
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride - {timeTravelInformation?.distance?.text}
                </Text>
            </View>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        style={tw`flex-row items-center justify-between px-10 ${item.id === selected?.id && 'bg-gray-200'}`}
                        onPress={() => setSelected(item)}
                    >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: item.image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-bold`}>{item.title}</Text>
                            <Text>{timeTravelInformation?.duration?.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {
                                new Intl.NumberFormat('es-MX',{
                                    style: 'currency',
                                    currency: 'MXN'
                                })
                                .format(timeTravelInformation?.duration.value * SURGE_CHARGE_RATE*item.multiplier/100)
                            }
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`mt-auto border-t border-gray-900`}>
                <TouchableOpacity style={tw`bg-black py-3 ${!selected && 'bg-gray-300'}`} disabled={!selected}>
                    <Text style={tw`text-center text-white text-lg`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
