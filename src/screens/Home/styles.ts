import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    dayButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },

    dayButton: {
        borderWidth: 1,
        borderColor: '#333',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    dayButtonText: {
        fontWeight: 500,
        textTransform: 'uppercase'
    },

    selectedDayText: {
        textTransform: 'capitalize',
        fontWeight: 500,
        fontSize: 18,
    },

   
});