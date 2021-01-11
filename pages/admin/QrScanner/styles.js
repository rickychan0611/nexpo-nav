import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        alignItems: 'center'
    },
    description: {
        fontSize: width * 0.05,
        textAlign: 'center',
        width: '100%',
        color: 'white',
        marginTop: 10
    }
}

export default styles
