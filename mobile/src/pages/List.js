import React , { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, ScrollView, Text, AsyncStorage, Image, StyleSheet, Alert } from 'react-native';
import socketio from 'socket.io-client';


import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List ({navigation}) {
    const [techs, setTechs] =  useState([]);

    useEffect(()=> {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.15:3333', {
                query: { user_id }
            })
            
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`);
            });
        });
    },[]);

    useEffect(() => {
        async function loadTechs() {
            
            const response = await AsyncStorage.getItem('techs');
            
            const techsArray = response.split(',').map(techItem => techItem.trim())

            setTechs(techsArray);

        }
 
        loadTechs();
    }, []);

    async function handleLogout() {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('techs');

        navigation.navigate('Login');
        
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ }}>
                
                <TouchableOpacity onPress={handleLogout} style={{marginTop: 30}}>
                    <Text style={{color: '#f05a5b', fontWeight: 'bold', fontSize: 16, paddingLeft: 10}}> &lt; Sair </Text>
                </TouchableOpacity>

                <Image source={logo} style={styles.logo}/>

            </View>
            

            <ScrollView showsHorizontalScrollIndicator={false}>
                {techs.map(tech => <SpotList key={tech} tech={tech} />) }
            </ScrollView>

        </SafeAreaView>       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
    }
});