import {Image, StyleSheet, Platform, View, Text, Button} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {SetStateAction, useState} from "react";
import {ifElse} from "ansi-fragments";
import is from "@sindresorhus/is";
import set = is.set;

export default function HomeScreen() {

    const [display, setDisplay] = useState('');

    const pressButton = (value: SetStateAction<string>) => {

        if (display.length !== 4) {
            setDisplay(display + value);
        }

        if (value == 'delete') {
            let newdisplay = display.slice(0, -1);
            setDisplay(newdisplay)
        }
        if(display==='0000'){
            setDisplay('adm')
        }


    };

    const Block = ({
                       children,
                       style,
                       flex = 1,
                       row, // <-- add this
                       ...props
                   }) => {
        const blockStyle = StyleSheet.flatten([
            flex !== undefined && { flex },
            row && { flexDirection: 'row',padding:10}, // <-- add this
            style,
        ])

        return (
            <View style={blockStyle} {...props}>
                {children}
            </View>
        )
    }



    // @ts-ignore
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/favicon.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: </ThemedText>
                <ThemedText>
                    Registra tu marcaje con tu código de usuario.

                </ThemedText>
            </ThemedView>

            <View>
                <View>
                    <Text style={styles.fondoRojo}>{display}</Text>
                </View>
                <View>
                    <Block row >
                        <Block>
                            <Button title="1" onPress={() => pressButton('1')}/>
                        </Block>
                        <Block>
                            <Button title="2" onPress={() => pressButton('2')}/>
                        </Block>
                        <Block>
                            <Button title="3" onPress={() => pressButton('3')}/>
                        </Block>
                    </Block>
                    <Block row >
                        <Block>
                            <Button  title="4" onPress={() => pressButton('4')}/>
                        </Block>
                        <Block>
                            <Button title="5" onPress={() => pressButton('5')}/>
                        </Block>
                        <Block>
                            <Button title="6" onPress={() => pressButton('6')}/>
                        </Block>
                    </Block>
                    <Block row>
                        <Block>
                            <Button title="7" onPress={() => pressButton('7')}/>
                        </Block>
                        <Block>
                            <Button title="8" onPress={() => pressButton('8')}/>
                        </Block>
                        <Block>
                            <Button title="9" onPress={() => pressButton('9')}/>
                        </Block>
                    </Block>

                    <Block row>
                        <Block>
                            <Button title="0" onPress={() => pressButton('0')}/>
                        </Block>
                        <Block>
                            <Button title="<-" onPress={() => pressButton('delete')}/>
                        </Block>
                    </Block>
                </View>
            </View>
        </ParallaxScrollView>
    );
}




const styles = StyleSheet.create({
    fondoRojo:{
        backgroundColor:'yellow',
        padding:10,
        fontWeight:'bold'
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },

});
