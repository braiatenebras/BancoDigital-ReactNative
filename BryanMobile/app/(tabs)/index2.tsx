import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const screenWidth = Dimensions.get('window').width;
const isLargeScreen = screenWidth > 768; // para telas grandes

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/maidel.png')} // foto do Maidel
            style={styles.secondImage}
          />

          <View style={styles.headerTextContainer}>
            <ThemedText type="title" style={styles.headerTitle}>
              🤪 Olha quem tá aqui!
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.headerSubtitle}>
              O professor lá 👉 (ele é gay)
            </ThemedText>
          </View>
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Oláááá (pela ultima vez, eu juro)</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Que??? </ThemedText>
        <ThemedText>Quem é o doido no cantinho?? Aaaaaaata </ThemedText>
        <ThemedText>
          <ThemedText>
            O maluco no canto direito é o Mateus Maidel, é um professor que da aulas ai (e não só aulas rs...)
          </ThemedText>{' '}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText> (é porque ele é gay, entendeu???)  </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: 245,
  },
  secondImage: {
    height: 350,
    width: 300,
    position: 'absolute',
    right: -10,
    top: -45,
  },

  headerTextContainer: {
    position: 'absolute',
    top: '50%',
    left: 100,
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    zIndex: 2,
    width: '100%',
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});