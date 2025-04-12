import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [mostrar, setMostrar] = useState(true); // Controle para mostrar/ocultar saldo
  const [screen, setScreen] = useState('Home'); // Controle da tela ativa
  const [darkMode, setDarkMode] = useState(true); // Controle do tema (escuro ou claro)

  // Função para alternar entre tema claro e escuro
  const toggleTheme = () => setDarkMode(!darkMode);

  // Definindo as cores para o tema baseado no estado do darkMode
  const theme = {
    background: darkMode ? '#121212' : '#fff', // Cor de fundo da tela
    card: darkMode ? '#1e1e1e' : '#fff', // Cor dos cards
    textPrimary: darkMode ? '#fff' : '#000', // Cor do texto principal
    textSecondary: darkMode ? '#aaa' : '#555', // Cor do texto secundário
    accent: '#820ad1', // Cor de destaque (botões e ícones)
  };

  // Função que renderiza o conteúdo baseado na tela ativa
  const renderScreen = () => {
    if (screen === 'Home') {
      return (
        <>
          {/* Card de saldo */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Seu saldo</Text>
            <Text style={[styles.saldo, { color: theme.textPrimary }]}>
              {mostrar ? 'R$ 100.000' : '******'}
            </Text>
          </View>

          {/* Botões de ação (Pix, Pagar, Transferir, Recarga) */}
          <View style={styles.actions}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.actionsContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: theme.card }]} onPress={() => setScreen('Pix')}>
                <FontAwesome6 name="pix" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Pix</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: theme.card }]} onPress={() => setScreen('Pagar')}>
                <Ionicons name="barcode-outline" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Pagar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: theme.card }]} onPress={() => setScreen('Transferir')}>
                <Ionicons name="swap-horizontal-outline" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Transferir</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: theme.card }]} onPress={() => setScreen('Recarga')}>
                <MaterialIcons name="4g-mobiledata" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Recarga</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Card de cartões */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => setScreen('Cartoes')} // Ao clicar, muda para a tela de Cartões
          >
            <Text style={[styles.cardText, { color: theme.textPrimary }]}>Meus cartões</Text>
            <Ionicons name="card" size={30} color={theme.accent} style={styles.iconcard} />
          </TouchableOpacity>
        </>
      );
    } else {
      // Renderiza outras telas (Pix, Pagar, etc.)
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.screenTitle, { color: theme.accent }]}>Área de {screen}</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={[styles.backButton, { color: theme.accent }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('Perfil')}>
          <Ionicons name="person-outline" size={28} color={theme.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.meunome, { color: theme.textPrimary }]}>Olá, Bryan</Text>

        <View style={styles.headerRight}>
          {/* Botão para alternar tema */}
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={darkMode ? 'sunny-outline' : 'moon-outline'} // Ícone do tema (sol ou lua)
              size={24}
              color={theme.textPrimary}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>

          {/* Botão para mostrar/ocultar saldo */}
          <TouchableOpacity onPress={() => setMostrar(!mostrar)}>
            <Ionicons name={mostrar ? 'eye-outline' : 'eye-off-outline'} size={28} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Renderiza a tela ativa */}
      {renderScreen()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.075,
    paddingHorizontal: width * 0.07,
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  meunome: {
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: width * 0.05,
    borderRadius: 8,
    padding: height * 0.03,
    marginBottom: height * 0.035,
  },
  label: {
    fontSize: width * 0.04,
    marginBottom: 5,
  },
  saldo: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  button: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: width * 0.2,
    marginHorizontal: -1,
  },
  buttonText: {
    marginTop: 8,
    fontWeight: '600',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    minHeight: height * 0.4,
  },
  screenTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  cardText: {
    fontSize: 20,
    left: 40,
    bottom: -16,
  },
  iconcard: {
    top: -10,
    left: -5,
  },
});
