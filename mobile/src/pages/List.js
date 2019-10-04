import React , { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, AsyncStorage, Image, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List () {
    const [techs, setTechs] =  useState([])

    useEffect(() => {
        async function loadTechs() {
            
            const response = await AsyncStorage.getItem('techs');
            
            const techsArray = response.split(',').map(techItem => techItem.trim())

            setTechs(techsArray);

        }
 
        loadTechs();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}/>

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
        marginTop: 10
    }
});