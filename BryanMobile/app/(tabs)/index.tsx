import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const screenWidth = Dimensions.get('window').width;
const isLargeScreen = screenWidth > 768;

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/images.png')}
            style={styles.pocoyoImage}
          />
          <View style={styles.headerTextContainer}>
            <ThemedText type="title" style={styles.headerTitle}>
              😉 Bryan Kauan
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.headerSubtitle}>
              Estudante & Dev Iniciante!
            </ThemedText>
          </View>
        </View>
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Olá</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Bem-vindo ao meu site!</ThemedText>
        <ThemedText type="default">
          <ThemedText type="defaultSemiBold">
            Meu nome é Bryan Kauan e atualmente estou cursando o 3º ano do Ensino Médio no Colégio Estadual Cívico Militar Professor Guido Arzua.
          </ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Sobre mim 😂</ThemedText>
        <ThemedText type="default">
          Atualmente tenho 16 anos (15/09/08) e busco me especializar na área de programação!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Uma foto do bonitão aqui 👇🔥</ThemedText>
        <View style={isLargeScreen ? styles.imageLarge : styles.imageSmall}>
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
  headerContainer: {
    width: '100%',
    height: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pocoyoImage: {
    height: 580,
    width: 580,
    position: 'absolute',
    left: -150,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
    gap: 8,
  },
  imageLarge: {
    alignItems: 'flex-start',
  },
  imageSmall: {
    alignItems: 'center',
  },
  eu: {
    width: '100%',
    maxWidth: 500,
    height: 400,
    resizeMode: 'cover',
    borderRadius: 12,
    marginVertical: 16,
  },
});
