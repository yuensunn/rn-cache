
import { useEffect, useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob'
import moment from 'moment'

export const STATUS = {
    EMPTY: "empty",
    DOWNLOADING: "downloading",
    COMPLETED: "completed",
    ERROR: "error"
}

export default ({ uri, expire = "never", timeout = 3000 }) => {
    const [targetUri, setTargetUri] = useState('');
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(STATUS.EMPTY);

    useEffect(() => {
        fetch()
    }, [uri, expire])

    return { targetUri, progress, status, fetch }

    async function fetch() {
        let cachePath = RNFetchBlob.fs.dirs.CacheDir + '/' + uri.split('/').pop()
        let exists = await RNFetchBlob.fs.exists(cachePath)
        if (!exists || (expire !== "never" && await isExpire(cachePath))) {
            try {
                setStatus(STATUS.DOWNLOADING)
                await fetchData(cachePath)
            } catch (error) {
                console.log(error)
                setProgress(0)
                setStatus(STATUS.ERROR)
                return;
            }
        }
        setTargetUri(cachePath)
        setProgress(1)
        setStatus(STATUS.COMPLETED)
    }
    async function fetchData(savePath) {
        let fetchConfig = {
            path: savePath,
            timeout
        }

        let res = await RNFetchBlob.config(fetchConfig).fetch('GET', uri).progress((received, total) => {
            setProgress(received / total)
        })
        if (res && res.respInfo && res.respInfo.headers && res.respInfo.headers["Content-Length"]) {
            const expectedContentLength = res.respInfo.headers["Content-Length"];
            const fileStats = await RNFetchBlob.fs.stat(res.path());
            if (!fileStats || !fileStats.size) {
                throw new Error("FileStatsNotFound");
            }
            console.log("stuff", { expectedContentLength, filesize: fileStats.size })
            if (expectedContentLength != fileStats.size && Math.abs(expectedContentLength - fileStats.size) / fileStats.size > 0.1) {
                RNFetchBlob.fs.unlink(res.path())
                throw new Error("DownloadFailed");
            }
        }
        return res;
    }
    async function isExpire(path) {
        let stat = await RNFetchBlob.fs.stat(path)
        if (stat.lastModified) {
            return moment.duration(moment().diff(moment(stat.lastModified))).asMinutes() >= expire
        }
        return true;
    }
}
