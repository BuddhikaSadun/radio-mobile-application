import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React from 'react';

import Typography from '../constants/Typography';
import programImages from '../constants/programImages';
import Footer from '../TabScreens/Footer';

const Programs = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text
        style={[styles.headerText, {color: isDarkMode ? 'white' : 'black'}]}>
        PROGRAMS
      </Text>

      <FlatList
        horizontal={false}
        style={{paddingVertical: 5}}
        data={programImages}
        numColumns={2}
        columnWrapperStyle={{
          gap: 10,
          paddingHorizontal: 12,
          alignItems: 'center',
        }}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 12,
          alignItems: 'center',
        }}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image
              source={item.imageUrl}
              style={styles.img}
              resizeMode="contain"
            />
          </View>
        )}
      />
      <Footer />
    </View>
  );
};

export default Programs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#FF7F50',
    backgroundColor: '#FFDAB9',
    elevation: 4,
  },

  headerText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },
  card: {
    width: 180,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  programText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 8,
  },
  timeText: {
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 25,
  },
});
