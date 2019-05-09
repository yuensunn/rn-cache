import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'

export default ({ progress, size = 50, viewProps, textProps, activityIndicatorProps }) => (
    <View {...viewProps}>
        <ActivityIndicator size={size} {...activityIndicatorProps} />
        <Text style={[styles.text, { width: size, height: size, fontSize: size * 0.3 }]} {...textProps}>{Math.round(progress * 100)}</Text>
    </View>
)


const styles = StyleSheet.create({
    text: {
        position: "absolute",
        textAlign: "center",
        textAlignVertical: "center"
    }
});