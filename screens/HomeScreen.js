import React from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={[styles.container, tw`bg-white h-full`]}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: "http://links.papareact.com/gzs"
                    }}
                />

                <GooglePlacesAutocomplete
                    placeholder='Search'
                    debounce={400}
                    minLength={2}
                    enablePoweredByContainer={false}
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        //console.log(data);
                        //console.log(details);
                        console.log(details.geometry)
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestination(null));
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'es',
                    }}
                    onFail={(error) => console.error(error)}
                />

                <NavOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 35 : 0
    }
})
