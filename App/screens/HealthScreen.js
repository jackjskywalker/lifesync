//Chandler: New edited health screen
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const recipes = {
    'Muscle Gain': [
        { id: '1', title: 'Zucchini Noodles with Pesto', time: '45 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/zucchini noodles with pesto.jpg') },
        { id: '2', title: 'Overnight Oats', time: '5 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/Overnight Oats.png') },
        { id: '3', title: 'Grilled Chicken Breast', time: '30 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/grilled chicken breast.jpg') },
        { id: '4', title: 'Protein Pancakes', time: '15 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Protein-pancakes-b64bd40.jpg') },
        { id: '5', title: 'Turkey and Sweet Potato Hash', time: '35 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/TurkeyHash.jpg') },
        { id: '6', title: 'Cottage Cheese with Pineapple and Walnuts', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/cottage cheese.jpg') },
        { id: '7', title: 'Stuffed Bell Peppers', time: '45 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/stuffed peppers.jpg') },
        { id: '8', title: 'Protein Smoothie Bowl', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/smoothie bowl.jpg') }
    ],
    'Fat Loss': [
        { id: '9', title: 'Avocado Salad', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/avocadosalad.jpg') },
        { id: '10', title: 'Grilled Salmon with Asparagus', time: '25 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/salmon.jpg') },
        { id: '11', title: 'Kale & Quinoa Salad', time: '20 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/kale.jpg') },
        { id: '12', title: 'Cauliflower Rice Stir-Fry', time: '15 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/friedrice.jpg') },
        { id: '13', title: 'Shrimp Lettuce Wraps', time: '20 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/Shrimp-Lettuce-Wraps.jpg') },
        { id: '14', title: 'Cucumber Noodle Salad', time: '15 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/cucumber-noodle--salad.jpg') },
        { id: '15', title: 'Chicken and Vegetable Soup', time: '45 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Chicken-Vegetable-Soup.jpg') },
        { id: '16', title: 'Turkey Chili', time: '50 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Easy-Turkey-Chili.webp') }
    ],
    'Vegan': [
        { id: '17', title: 'Chickpea Curry', time: '40 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/chickpea.jpg') },
        { id: '18', title: 'Vegan Tacos', time: '20 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/vegantacos.jpg') },
        { id: '19', title: 'Lentil Soup', time: '35 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/lentilsoup.jpg') },
        { id: '20', title: 'Tofu Stir Fry', time: '25 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/tofu stirfry.jpg') },
        { id: '21', title: 'Stuffed Sweet Potatoes', time: '40 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/stuffed sweet potatoes.jpg') },
        { id: '22', title: 'Vegan Buddha Bowl', time: '30 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/buddha bowl.jpg') },
        { id: '23', title: 'Peanut Butter Energy Bites', time: '15 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/energy bites.jpg') },
        { id: '24', title: 'Vegan Mushroom Stroganoff', time: '25 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/mushroom stroganoff.jpg') }
    ],
    'Carnivore': [
        { id: '25', title: 'Bacon-wrapped Steak', time: '30 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/bacon steak.webp') },
        { id: '26', title: 'Beef Liver Stir Fry', time: '20 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/beef stirfry.jpg') },
        { id: '27', title: 'Roast Pork Belly', time: '60 Minutes', difficulty: 'Hard', price: '$$$', imageUri: require('../assets/Images/pork belly.avif') },
        { id: '28', title: 'Grilled Lamb Chops', time: '25 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/lamb chops.jpg') },
        { id: '29', title: 'Slow-Cooked Short Ribs', time: '7 Hours', difficulty: 'Hard', price: '$$$', imageUri: require('../assets/Images/slow cooked ribs.jpg') },
        { id: '30', title: 'Duck Breast with Orange Glaze', time: '60 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/duck breast orange.jpg') },
        { id: '31', title: 'Chicken Thighs in Creamy Garlic Sauce', time: '35 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/chicken thighs in garlic sauce.jpg') },
        { id: '32', title: 'Smoked Sausage and Cabbage Stir Fry', time: '25 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/sausage and cabbage stir fry.jpg') }
    ]
};

const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy':
            return '#4CAF50'; // Green
        case 'Medium':
            return '#FFC107'; // Yellow
        case 'Hard':
            return '#F44336'; // Red
        default:
            return '#000'; // Black
    }
};

export default function HealthScreen({ navigation }) {
    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recipeContainer}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
        >
            <Image source={item.imageUri} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <View style={styles.infoContainer}>
                <View style={styles.timerContainer}>
                    <Image source={require('../assets/Images/timer.jpg')} style={styles.timerIcon} />
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={styles.priceAndDifficultyContainer}>
                    <Text style={[styles.priceText, { color: '#4CAF50' }]}>{item.price}</Text>
                    <View style={[styles.difficultyBox, { borderColor: getDifficultyColor(item.difficulty) }]}>
                        <Text style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}>*</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderCategory = ({ item }) => (
        <View style={styles.categoryContainer}>
            <Text style={styles.sectionTitle}>{item}</Text>
            <FlatList
                data={recipes[item]}
                renderItem={renderRecipeItem}
                keyExtractor={recipe => recipe.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(recipes)}
                renderItem={renderCategory}
                keyExtractor={category => category}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    categoryContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recipeContainer: {
        alignItems: 'flex-start',
        marginRight: 10,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    recipeImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 5,
    },
    recipeTitle: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        width: 120,
        marginBottom: 5,
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 120,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    timerIcon: {
        width: 16,
        height: 16,
        marginRight: 5,
    },
    timeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#4285F4',
        padding: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    priceAndDifficultyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    difficultyBox: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 5,
    },
    difficultyText: {
        fontWeight: 'bold',
    },
});