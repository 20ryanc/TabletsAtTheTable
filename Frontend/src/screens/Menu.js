import React, { useState, useEffect } from 'react'
import { FlatList, Button, Modal, Pressable, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, Keyboard, ScrollView, SafeAreaView } from 'react-native'
import { menuStyles } from '../core/menuStyles'
import { getMenuItems, getRecommendation } from '../helpers/connector';

export default function Menu({ navigation }) {
    const [category, setCategory] = useState('main');
    const [foodMap, setFoodMap] = useState(new Map());
    const [currFeature, setCurrFeature] = useState("");
    const [insights, setInsights] = useState([]);
    const [isMenu, setIsMenu] = useState(true);

    React.useEffect(() => {
        getMenuItems().then((content) => {
            console.log(content.data);
            const categoryMap = new Map();
            content.data.forEach(element => {
                const {category, id, name, tastes} = element;
                if (!categoryMap.has(category)) {
                    categoryMap.set(category, [{ id, name, tastes }]);
                } else {
                    categoryMap.get(category).push({ id, name, tastes });
                }
            });
            console.log(categoryMap);
            setFoodMap(categoryMap);
        }).catch((error) => {
            console.log(error);
            console.log("Error getting menu items");
        });
    }, [setFoodMap]);

    const initCustomerFeatures = [
        { id: 'group_size', name: 'Group Size', count: 0 },
        { id: 'female', name: 'Female', count: 0 },
        { id: 'male', name: 'Male', count: 0 },
        { id: 'babies', name: 'Babies', count: 0 },
        { id: 'children', name: 'Children', count: 0 },
        { id: 'young_adults', name: 'Young Adult', count: 0 },
        { id: 'middle_age_adults', name: 'Middle-age', count: 0 },
        { id: 'old_adults', name: 'Old Adults', count: 0 },
    ];
    const [customerFeatures, setCustomerFeatres] = useState(initCustomerFeatures);
    const [cartItems, setCartItems] = useState([]);

    const setFeatureCount = React.useCallback((op) => {
        const newCustomerFeatures = customerFeatures.map((feature) => {
            if (feature.id === currFeature) {
                if (op === "+") {
                    return {...feature, count: feature.count + 1};
                } else {
                    return {...feature, count: Math.max(0, feature.count - 1)};
                }
            }
            return feature;
        });
        setCustomerFeatres(newCustomerFeatures)
    }, [customerFeatures, setCustomerFeatres, currFeature]);

    const addItem = React.useCallback((itemId, itemName) => {
        const existingItem = cartItems.find((item) => item.id === itemId);
        if (existingItem) {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems((prevItems) => [...prevItems, { id: itemId, name: itemName, quantity: 1 }]);
        }
    }, [cartItems, setCartItems]);

    const sendRecommendation = React.useCallback(() => {
        const totalCounts = customerFeatures.reduce((acc, feature) => {
            acc[feature.id] = feature.count.toString();
            return acc;
        }, {});
        let selectedItemsArray = [];
        cartItems.forEach((item) => {
            for (i=0; i<item.quantity; i++) {
                console.log(item.id);
                selectedItemsArray = [...selectedItemsArray, item.id];
            }
        })
        console.log(selectedItemsArray);
        const data = {
            ...totalCounts,
            items: selectedItemsArray.join(',')
        };
        console.log(data);
        getRecommendation(data).then((content) => {
            console.log(content.data);
            setInsights(content.data.map(item => ({id: item.id, name: item.name})));
        }).catch((error) => {
            console.log(error);
        });
    }, [customerFeatures, cartItems, setInsights]);
    
    const handleQuantityChange = (itemId, change) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) => {
              if (item.id === itemId) {
                const newQuantity = item.quantity + change;
                // If the new quantity is greater than 0, update the quantity
                // Otherwise, remove the item from the cart
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
              }
              return item;
            });
      
            // Filter out null values (items to be removed) from the updated items
            return updatedItems.filter((item) => item !== null);
          });
    };
    
    const renderItem = ({ item }) => (
        <View style={menuStyles.cartItem}>
          <Text>{item.name}</Text>
          <View style={menuStyles.quantityContainer}>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
              <Text style={menuStyles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={menuStyles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
              <Text style={menuStyles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
    );

    React.useEffect(() => {
        console.log(insights);
    }, [insights]);

    React.useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    return (
        <View style={menuStyles.container}>
            {isMenu && (<View style={menuStyles.menuContainer}>
                <View style={menuStyles.topBar}>
                    <TouchableOpacity onPress={() => setIsMenu(false)}>
                        <Text>Shopping Cart</Text>
                    </TouchableOpacity>
                    <Text>Menu</Text>
                </View>
                <View style={menuStyles.horizontalScrollView}>
                    <FlatList
                        data={Array.from(foodMap.keys())}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        // keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[menuStyles.foodCategoryItem, { backgroundColor: item === category ? 'green' : 'lightgreen' }]} onPress={() => setCategory(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={menuStyles.menuBody}>
                    <FlatList
                        data={foodMap.get(category)}
                        numColumns={3}
                        // keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={menuStyles.menuItem} onPress={() => addItem(item.id, item.name)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>)}

            {!isMenu && (
                <View style={menuStyles.menuContainer}>
                    <View style={menuStyles.topBar}>
                        <TouchableOpacity onPress={() => setIsMenu(true)}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                        <Text>Shopping Cart</Text>
                    </View>
                    <View style={menuStyles.cartContainer}>
                        <FlatList
                            data={cartItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            )}

            <View style={menuStyles.recContainer}>
                <View style={menuStyles.buttonContainer}>
                    <TouchableOpacity style={menuStyles.button} onPress={() => setCustomerFeatres(initCustomerFeatures)}>
                        <Text>Reset</Text>
                    </TouchableOpacity>
                    <View style={menuStyles.buttonGroup}>
                        <TouchableOpacity style={menuStyles.button} onPress={() => setFeatureCount("-")}>
                            <Text>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={menuStyles.button} onPress={() => setFeatureCount("+")}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={menuStyles.customerFeature}>
                    {customerFeatures.map((feature) => (
                        <View key={feature.id} style={menuStyles.featureItem}>
                            <TouchableOpacity style={[menuStyles.featureTouchable, {backgroundColor: feature.id === currFeature ? 'yellow' : 'lightyellow'}]} onPress={() => setCurrFeature(feature.id)}>
                                <Text>{feature.name}</Text>
                            </TouchableOpacity>
                            <Text>{feature.count}</Text>
                        </View>
                    ))}
                </View>
                <View style={menuStyles.emailContainer}>
                    <TouchableOpacity style={menuStyles.confirmButton} onPress={() => sendRecommendation()}>
                        <Text>Get Recommendation!</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={menuStyles.scrollView}>
                    <View style={menuStyles.insightContainer}>
                        {insights.map((insight) => (
                            <TouchableOpacity style={menuStyles.insightItem} onPress={() => addItem(insight.id, insight.name)}>
                                <Text>{insight.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}