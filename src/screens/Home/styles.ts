import { StyleSheet } from "react-native";
import { colours } from "../../style/colours";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        borderWidth: 1
    },

    dayButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },

    dayButton: {
        backgroundColor: colours.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
    },

    dayButtonText: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colours.invertedText,
    },

    selectedDay: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 10,
    },

    selectedDayText: {
        textTransform: 'capitalize',
        fontWeight: 500,
        fontSize: 18,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        fontSize: 24,
    },
});