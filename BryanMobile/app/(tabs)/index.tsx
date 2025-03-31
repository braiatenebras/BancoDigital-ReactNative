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
            source={require('@/assets/images/images.png')} // foto do Pocoyo
            style={styles.reactLogo}
          />

          <View style={styles.headerTextContainer}>
            <ThemedText type="title" style={styles.headerTitle}>
              😉 Bryan Kauan
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.headerSubtitle}>
              Estudante & Dev Iniciante (e macho)
            </ThemedText>
          </View>
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Olá</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bem Vindo ao meu site! </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            Meu nome é Bryan Kauan e atualmente estou cursando o 3° ano do Ensino Médio no Colégio Estadual Cívico Militar Professor Guido Arzua
          </ThemedText>{' '}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sobre mim 😂 </ThemedText>
        <ThemedText>Atualmente tenho 16 anos (15/09/08) e busco me especializar na área de programação!  </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Uma foto do bonitão aqui 👇🔥 </ThemedText>
        <View style={isLargeScreen ? styles.imageContainerLarge : styles.imageContainerSmall}>
          <Image
            source={require('@/assets/images/eu.jpg')}
            style={styles.eu}
          />
        </View>
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
  reactLogo: {
    height: 400,
    width: 300,
    bottom: -100,
    left: 0,
    position: 'absolute',
  },

  headerTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    zIndex: 2,
    width: '100%',
  },
  headerTitle: { // texto de cima
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginBottom: 5,
    left: -850,
  },
  headerSubtitle: { // texto de baixo
    color: 'white',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    left: -835,
    top: 13,
  },

  imageContainerLarge: {
    alignItems: 'flex-start',
    marginLeft: -5,
  },
  imageContainerSmall: {
    alignItems: 'center',
  },
  eu: {
    width: '100%',
    maxWidth: 500,
    height: 400,
    resizeMode: 'contain',
    borderRadius: 8,
    marginVertical: 16,
  },
});