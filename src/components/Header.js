import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Header = ({title}) => {
    return (
        <View style={styles.header} >
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 90,
        backgroundColor:'#f7287b',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20
    },
    headerTitle:{
        fontSize:21,
        fontWeight:'bold'
    }
})

export default Header
