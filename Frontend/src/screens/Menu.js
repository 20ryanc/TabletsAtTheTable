import React, { useState, useEffect } from 'react'
import { FlatList, Button, Modal, Pressable, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, Keyboard, ScrollView, SafeAreaView } from 'react-native'
import { menuStyles } from '../core/menuStyles'

export default function Menu({ navigation }) {
    const foodMap = new Map([
        ['Main', ['Filet Steak', 'Pasta', 'Green Onion Fried Rice', 'Grilled salmon', 'Tikka Masala']],
        ['Sides', ['Takoyaki', 'Chicken Karage', 'Cheese balls']],
        ['Treats', ['Chocolate cookies', 'White Chocolate cookies']],
        ['Beverages', []],
        ['Desserts', ['Tiramisu']],
    ]);

    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('Main');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    React.useEffect(() => {
        console.log(category);
        console.log(foodMap);
        console.log(Array.from(foodMap.keys()))
    }, [category, setCategory]);

    const customerFeatures = [
        { id: '1', name: 'People', count: 0 },
        { id: '2', name: 'Female', count: 0 },
        { id: '3', name: 'Male', count: 0 },
        { id: '4', name: 'Babies', count: 0 },
        { id: '5', name: 'Children', count: 0 },
        { id: '6', name: 'Young Adult', count: 0 },
        { id: '7', name: 'Middle-age', count: 0 },
        { id: '8', name: 'Old Adult', count: 0 },
    ];

    const insights = [
        { id: '1', text: 'Insight 1' },
        { id: '2', text: 'Insight 2' },
        { id: '3', text: 'Insight 3' },
        // Add more insights as needed
    ];

    return (
        <View style={menuStyles.container}>
            <View style={menuStyles.menuContainer}>
                <View style={menuStyles.topBar}>
                    <Text>Top Bar</Text>
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
                            <TouchableOpacity style={menuStyles.menuItem}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            <View style={menuStyles.recContainer}>
                <View style={menuStyles.buttonContainer}>
                    <TouchableOpacity style={menuStyles.button}>
                        <Text>Reset</Text>
                    </TouchableOpacity>
                    <View style={menuStyles.buttonGroup}>
                        <TouchableOpacity style={menuStyles.button}>
                            <Text>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={menuStyles.button}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={menuStyles.customerFeature}>
                    {customerFeatures.map((feature) => (
                        <View key={feature.id} style={menuStyles.featureItem}>
                            <TouchableOpacity style={menuStyles.featureTouchable}>
                                <Text>{feature.name}</Text>
                            </TouchableOpacity>
                            <Text>{feature.count}</Text>
                        </View>
                    ))}
                </View>
                <View style={menuStyles.emailContainer}>
                    <Text>Email</Text>
                    <TextInput
                        style={menuStyles.emailInput}
                        placeholder="Enter customer email"
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                    <TouchableOpacity style={menuStyles.confirmButton}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={menuStyles.scrollView}>
                    <View style={menuStyles.insightContainer}>
                        {insights.map((insight) => (
                            <View key={insight.id} style={menuStyles.insightItem}>
                                <Text>{insight.text}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}