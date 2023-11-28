import { StyleSheet, StatusBar } from "react-native";

export const menuStyles = StyleSheet.create({
    container: {
        flex: 1, // This ensures the container takes up the entire available space
        flexDirection: 'row', // Arrange children components horizontally
    },
    menuContainer: {
        flex: 1, // Takes up 50% of the available space
    },
    recContainer: {
        flex: 1, // Takes up 50% of the available space
    },
    topBar: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'grey',
        justifyContent: 'space-between', // Center content vertically within the top bar
        alignItems: 'center', // Center content horizontally within the top bar
        padding: 10,
    },
    horizontalScrollView: {
        marginTop: 10,
        marginBottom: 10, 
        height: 50, // Set the height of the horizontal scroll view
      },
      foodCategoryItem: {
        width: 120, // Set the width of each food category item
        height: 50,
        // backgroundColor: 'lightgreen', // Set the background color of each food category item
        marginHorizontal: 5, // Add horizontal margin between food category items
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Optional: add border radius for rounded corners
    },
    menuBody: {
        flex: 1,
        padding: 10,
        backgroundColor: 'grey',
      },
      menuItem: {
        flex: 1,
        height: 100,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 10,
    },
    buttonContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10, // Add vertical margin between button container and additional content
    },
    buttonGroup: {
        flexDirection: 'row',
    },
      button: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
    },
    backButton: {
      padding: 10,
      marginHorizontal: 5,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    customerFeature: {
        padding: 10,
        flexDirection: 'col',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureContainer: {
      flexDirection: 'row',
      padding: 5,
    },
    featureItem: {
        width: 134, // Set the width to achieve 4 items in each row with some spacing
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
    },
    featureTouchable: {
        width: 134,
        height: 60,
        backgroundColor: 'lightyellow',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
    },
    emailContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
      emailInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 10, 
        paddingHorizontal: 10,
    },
      confirmButton: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    insightContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
      insightItem: {
        width: '30%', // Set the width to achieve 3 items in each row with some spacing
        height: 80,
        backgroundColor: 'lightpink',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
    },
    scrollView: {
        flex: 1, // Ensure the ScrollView takes the available space
        backgroundColor: 'lightgrey',
    },
    cartContainer: {
        flex: 1,
        padding: 20,
      },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      quantityText: {
        paddingHorizontal: 10,
      },
      quantityButton: {
        fontSize: 20,
        paddingHorizontal: 8,
        color: 'blue',
      },
      clearButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'white',
        borderColor: 'black',
      },
      submitButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        borderColor: 'black',
      },
})