import React from 'react'
import { Image } from 'react-native'
import useCacheURI, { STATUS } from './CacheURI'
import Reload from './Reload'
import Loader from './Loader'

export default ({ uri, expire, loadingProps, ...rest }) => {

    const { targetUri, progress, status, fetch } = useCacheURI({ uri, expire })

    return (
        status === STATUS.COMPLETED ?
            <Image source={{ uri: "file://" + targetUri }} {...rest} /> :
            status === STATUS.DOWNLOADING ?
                <Loader progress={progress} /> : <Reload onReload={fetch} />
    )
}
