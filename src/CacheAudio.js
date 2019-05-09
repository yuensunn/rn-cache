import React, { useEffect, useState,use } from 'react'
import { Text } from 'react-native'
import useCacheURI, { STATUS } from './CacheURI'
import Reload from './Reload'
import Loader from './Loader'
import Sound from 'react-native-sound'


const Audio = ({ uri }) => {

    useEffect(() => {
        console.log(uri)
        var whoosh = new Sound(uri,Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });

    }, [uri])

    return (
        <Text>fuck you</Text>
    )
}


export default ({ uri, expire, loadingProps, ...rest }) => {

    const { targetUri, progress, status, fetch } = useCacheURI({ uri, expire })

    return (
        status === STATUS.COMPLETED ?
            <Audio uri={targetUri}{...rest} /> :
            status === STATUS.DOWNLOADING ?
                <Loader progress={progress} /> : <Reload onReload={() => { fetch() }} />
    )
}
