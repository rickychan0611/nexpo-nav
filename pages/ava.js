import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

export default function Ava() {

    const [counter, setCounter] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            setCounter(prev => prev + 1)
        }, 10)
    }, [counter])

    return (
        <>
            <h2>Hi Ava and Bella. We like chicken</h2>
            <h3>How many chicken do we eat?</h3>
            <h1>{counter}</h1>
            <img src="https://lh3.googleusercontent.com/mLVhSEklcfApuutc2U23oVZGzAKge3zdL-9FEejjzUJdAwj1Na0_cE2I2pQ6c0lzYOYDG73SVjWzTMurzuMNFHF_hi9DQBPd17YpIMUIJPnL4cAhR-BCo6iy2WBNdiw6N5IdmHjajcXC2BPC4mzICSU_viQtKMWZ6MeU9Jla2muaGZijW3BilLFv8RTOEiwjMMK6WEQXCb9PAX93Uiyxqbn0BkDjoGmJu0gA_e3F-CbTWuAFYOHLQ2sGKO7GPGbMgvMvVVT0jBuzpoVMdQrGZQC5IpPONrrCmsAZg6zTk2qfjeER3Gg8i376FNAKz7hSfUXVWhhwp7BETt-2hhlUtqAMHANkLIGIMaOORd6iHZvw5S31YjoyTWn2b2jrU4mQUKebFt70z0oAC3l2sZMRm6NY6iO8JHYVKa62UO0yAPsu-HrBHjFQfByY_KBKlMkY5T4IA2KOtJowAvkryGfMo-vnfVEo65aVlwCxHAD-wbVSGTNxWw-LOokHNhsGZZKJdT87elgy37rTl75jSGIEEG5JREFXtDHjCuXdUSU-VKIRXUgd263BQxze82h4oLVvH99EY3FZZBq6XPfm2sgPVzTy56Nd6wLUhlROZEJTasn33hTNTJOqI130wETsiU2wA9KWcnIz7WB9lmtEm7tkWDsEL81DbD4mFYqDYCBucJAD4hKPn6m4cTJBcFUsPw=w1210-h907-no?authuser=0" />
        </>
    )
};