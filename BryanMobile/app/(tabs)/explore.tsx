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
            source={require('@/assets/images/pocoyo.png')}
            style={styles.reactLogo}
          />

          {isLargeScreen && (
            <View style={styles.headerTextContainer}>
              <ThemedText type="title" style={styles.headerText}>
                👈😎 Eu
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.headerSubText}>
                Você 🤓👉
              </ThemedText>
            </View>
          )}

          <Image
            source={require('@/assets/images/images2.png')}
            style={styles.secondImage}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> Olá de novo!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Como eu to sem nada e sem ideias para adicionar aqui, lá vai uma receita de pudim!</ThemedText>
        <Image
          source={require('@/assets/images/pudim.webp')} //imgaem do pudim
          style={[
            styles.pudim,
            isLargeScreen ? styles.pudimLarge : styles.pudimSmall
          ]}
        />
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            * Pudim de Leite Condensado
          </ThemedText>
          <ThemedText>
            {"\n"}Ingredientes:{"\n\n"}
            1 xícara (chá) de açúcar (para a calda){"\n"}
            1 lata de leite condensado{"\n"}
            2 medidas (da lata) de leite integral{"\n"}
            3 ovos{"\n\n"}
            Modo de Preparo:{"\n\n"}
            Calda: Derreta o açúcar em fogo médio até ficar dourado. Despeje na forma de pudim e espalhe. Reserve.{"\n\n"}
            Pudim: Bata no liquidificador o leite condensado, o leite e os ovos até ficar homogêneo.{"\n\n"}
            Cozinhar: Despeje a mistura na forma com calda. Cubra com papel alumínio e leve ao forno em banho-maria (180°C) por cerca de 45 minutos.{"\n\n"}
            Finalizar: Espere esfriar e leve à geladeira por 4 horas. Desenforme e sirva!{"\n\n"}
            Dica: Use uma forma com furo central para assar mais uniformemente.{"\n\n"}
            🍮 Prontinho! Se quiser, enfeite com calda extra ou frutas.
          </ThemedText>
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
    paddingHorizontal: 16,
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: 245,
  },
  reactLogo: {
    height: 280,
    width: 300,
    bottom: -10,
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
  headerTextContainer: {
    position: 'absolute',
    top: '55%',
    left: '45%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    bottom: -15,
    left: -300,
  },
  headerSubText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    bottom: 15,
    left: 300,
  },
  pudim: {
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  pudimLarge: { // PC
    width: '100%',
    height: 350,
    maxWidth: 600,
    left: -450,
  },
  pudimSmall: { // Celular
    width: '100%',
    height: 220,
    maxWidth: 400,
  },
});