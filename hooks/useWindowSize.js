import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        vw: width,
        vh: height
    };
}

export default function useWindowSize() {
    const [windowDimensions, setWindowDimensions] = useState({
        vw: 0,
        vh: 0
    })

    useEffect(() => {
        if (Platform.OS === 'web') {
            setTimeout(() => {
                setWindowDimensions(getWindowDimensions())
                if (typeof window !== 'undefined') {

                    function handleResize() {
                        setWindowDimensions(getWindowDimensions());
                    }

                    window.addEventListener('resize', handleResize);
                    return () => window.removeEventListener('resize', handleResize);
                }
            }, 1000)
        }
    }, []);

    return windowDimensions;
}