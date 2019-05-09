import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

export default ({ size = 25, onReload }) => (
    <TouchableOpacity onPress={onReload}>
        <Image source={require("./img/load.png")} style={{ height: size, width: size }} />
    </TouchableOpacity>
)


