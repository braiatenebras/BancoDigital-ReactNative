import { Image, StyleSheet, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/images.png')} // Pocoyo
            style={styles.reactLogo}
          />
          <Image
            source={require('@/assets/images/images2.png')} //Maidel
            style={styles.secondImage}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Olá</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bem Vindo ao meu site! </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Meu nome é Bryan Kauan e atualmente estou cursando o 3° ano do Ensino
            Médio no Colégio Estadual Civíco Militar Professor Guido Arzua </ThemedText>
          {' '}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sobre mim 😂 </ThemedText>
        <ThemedText> Atualmente tenho 16 anos (15/09/08)  </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle"> aqui aqui </ThemedText>
        <ThemedText>
          teste teste {' '}
        </ThemedText>
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
  secondImage: {
    height: 350, 
    width: 300,
    position: 'absolute',
    right: -10, 
    top: -45,   
  },
});