import { Image, StyleSheet, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';

const screenWidth = Dimensions.get('window').width;
const isLargeScreen = screenWidth > 768;

export default function HomeScreen() {
  const [joke, setJoke] = useState({ pergunta: '', resposta: '' });
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const backupJokes = [
    {
      pergunta: "Eu odeio",
      resposta: "React Native"
    },
    {
      pergunta: "Porque a jiane foi dormir triste hoje? ",
      resposta: "Porque a vanda é uma desgraçada!"
    },
    {
      pergunta: "Por que o React Native é otimista?",
      resposta: "Porque ele acredita que tudo vai dar certo no final!"
    },
    {
      pergunta: "O que o C disse para o Java?",
      resposta: "Você é complexo demais para mim!"
    },
    {
      pergunta: "Por que o desenvolvedor não consegue dormir?",
      resposta: "Porque ele tem muitos bugs na cabeça!"
    }
  ];

  const fetchJoke = async () => {
    setLoading(true);
    setShowAnswer(false);
    try {
      const response = await fetch('https://piadas-nerds.vercel.app/api/random');
      const data = await response.json();
      
      if (data.pergunta && data.resposta) {
        setJoke(data);
      } else {
        throw new Error("API não retornou piada válida");
      }
    } catch (error) {
      const randomIndex = Math.floor(Math.random() * backupJokes.length);
      setJoke(backupJokes[randomIndex]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/maidel.png')}
            style={styles.secondImage}
          />

          <View style={styles.headerTextContainer}>
            <ThemedText type="title" style={styles.headerTitle}>
              🤪 Olha quem tá aqui!
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.headerSubtitle}>
              O professor lá 👉 (e ele é gay)
            </ThemedText>
          </View>
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Oláááá (pela ultima vez, eu juro)</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Seção da Piada em Português */}
      <ThemedView style={styles.jokeContainer}>
        <ThemedText type="subtitle">Piadas</ThemedText>
        
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <>
            <ThemedText style={styles.jokeText}>"{joke.pergunta}"</ThemedText>
            
            {showAnswer ? (
              <ThemedText style={[styles.jokeText, styles.punchline]}>
                "{joke.resposta}"
              </ThemedText>
            ) : (
              <TouchableOpacity 
                onPress={() => setShowAnswer(true)}
                style={styles.showButton}
              >
                <ThemedText style={styles.buttonText}>Mostrar Resposta!</ThemedText>
              </TouchableOpacity>
            )}
          </>
        )}

        <TouchableOpacity 
          onPress={fetchJoke}
          style={styles.newJokeButton}
        >
          <ThemedText style={styles.buttonText}>Quero outra piada! 🤣</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Que??? </ThemedText>
        <ThemedText>Quem é o doido no cantinho?? Aaaaaaata </ThemedText>
        <ThemedText>
          O maluco no canto direito é o Mateus Maidel, é um professor que da aulas ai (e não só aulas rs...)
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText>(é porque ele é gay, entendeu???)</ThemedText>
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
  jokeContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  jokeText: {
    fontSize: 16,
    marginVertical: 8,
  },
  punchline: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  showButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 8,
  },
  newJokeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});