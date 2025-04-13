import React, { useState, useEffect } from 'react';
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
  const [exchangeRates, setExchangeRates] = useState(null); // Estado para armazenar as taxas de câmbio
  const [saldo, setSaldo] = useState(15000); // Saldo inicial em reais (R$)
  const [mostrarConversoes, setMostrarConversoes] = useState(false);

  // Função para alternar entre tema claro e escuro
  const toggleTheme = () => setDarkMode(!darkMode);

  const theme = {
    background: darkMode ? '#121212' : '#fff',
    card: darkMode ? '#1e1e1e' : '#fff',
    textPrimary: darkMode ? '#fff' : '#000',
    textSecondary: darkMode ? '#aaa' : '#555',
    accent: '#820ad1',
    border: darkMode ? '#444' : '#fff',
  };

  // Função que busca as taxas de câmbio
  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://v6.exchangerate-api.com/v6/5c91ee70a1644e990cc95d25/latest/BRL');
      const data = await response.json();
      setExchangeRates(data.conversion_rates); // Armazena as taxas de câmbio no estado
    } catch (error) {
      console.error('Erro ao buscar taxas de câmbio:', error);
    }
  };

  // Função para converter o saldo para uma nova moeda
  const convertCurrency = (currencyCode: string) => {
    if (!exchangeRates) return 0;
    const rate = exchangeRates[currencyCode]; // Taxa de câmbio para a moeda selecionada
    return saldo * rate;
  };

  // Chama a função fetchExchangeRates quando o componente é montado
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  // Função que renderiza o conteúdo baseado na tela ativa
  const renderScreen = () => {
    if (screen === 'Home') {
      return (
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setScreen('Perfil')}>
              <Ionicons name="person-outline" size={28} color={theme.textPrimary} />
            </TouchableOpacity>

            <Text style={[styles.meunome, { color: theme.textPrimary }]}>Olá, Bryan</Text>

            <View style={styles.headerRight}>
              <TouchableOpacity onPress={toggleTheme}>
                <Ionicons
                  name={darkMode ? 'sunny-outline' : 'moon-outline'}
                  size={24}
                  color={theme.textPrimary}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setMostrar(!mostrar)}>
                <Ionicons name={mostrar ? 'eye-outline' : 'eye-off-outline'} size={28} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card de saldo */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Seu saldo</Text>
            <Text style={[styles.saldo, { color: theme.textPrimary }]}>
              {mostrar ? `R$ ${saldo.toLocaleString()}` : '******'}
            </Text>
          </View>

          {/* Botões de ações */}
          <View style={styles.actions}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.card }]}
                onPress={() => setScreen('Pix')}>
                <FontAwesome6 name="pix" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Pix</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.card }]}
                onPress={() => setScreen('Pagar')}>
                <Ionicons name="barcode-outline" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Pagar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.card }]}
                onPress={() => setScreen('Transferir')}>
                <Ionicons name="swap-horizontal-outline" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Transferir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.card }]}
                onPress={() => setScreen('Recarga')}>
                <MaterialIcons name="4g-mobiledata" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Recarga</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Tela de cartões */}
          <TouchableOpacity
            style={[styles.card1, { backgroundColor: theme.card }]}
            onPress={() => setScreen('Cartões')}>
            <Text style={[styles.cardText, { color: theme.textPrimary }]}>Meus cartões</Text>
            <Ionicons name="card" size={35} color={theme.accent} style={styles.iconcard} />
          </TouchableOpacity>

          <Text style={[styles.conversor, { color: theme.textPrimary }]}>Conversor de moedas</Text>
          <Text style={[styles.conversor2, { color: theme.textPrimary }]}>Com o saldo atual</Text>

          {/* Botão para mostrar/ocultar conversões */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={() => setMostrarConversoes(!mostrarConversoes)}>
              <Text style={{ color: theme.accent, fontSize: 16, fontWeight: 'bold' }}>
                {mostrarConversoes ? 'Ocultar conversões' : 'Mostrar conversões'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conversões de moeda */}
          {mostrarConversoes && exchangeRates && (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Saldo em outras moedas:</Text>

              {/* Dólar Americano */}
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                USD (Dólar Americano): ${convertCurrency('USD').toFixed(2)}
              </Text>

              {/* Euro */}
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                EUR (Euro): €{convertCurrency('EUR').toFixed(2)}
              </Text>

              {/* Libra Esterlina */}
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                GBP (Libra Esterlina): £{convertCurrency('GBP').toFixed(2)}
              </Text>

              {/* Iene Japonês */}
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                JPY (Iene Japonês): ¥{convertCurrency('JPY').toFixed(2)}
              </Text>

              {/* Dólar Canadense */}
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                CAD (Dólar Canadense): C${convertCurrency('CAD').toFixed(2)}
              </Text>

              {/* Dólar Australiano */}
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                AUD (Dólar Australiano): A${convertCurrency('AUD').toFixed(2)}
              </Text>

              {/* Franco Suíço */}
              <Text style={[styles.saldo, { color: theme.textPrimary }]}>
                CHF (Franco Suíço): Fr.{convertCurrency('CHF').toFixed(2)}
              </Text>
            </View>
          )}
        </>
      );
    } else if (screen === 'Pix') {
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.screenTitle, { color: theme.accent }]}>Pix</Text>
          <Text style={{ color: theme.textPrimary }}>Transferência rápida e segura via Pix.</Text>
          <Text style={{ color: theme.textPrimary }}>Digite a chave Pix do destinatário.</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={[styles.backButton, { color: theme.accent }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (screen === 'Recarga') {
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.screenTitle, { color: theme.accent }]}>Recarga</Text>
          <Text style={{ color: theme.textPrimary }}>Faça uma recarga no seu celular.</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={[styles.backButton, { color: theme.accent }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (screen === 'Pagar') {
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.screenTitle, { color: theme.accent }]}>Pagar</Text>
          <Text style={{ color: theme.textPrimary }}>Escaneie o código de barras para realizar o pagamento.</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={[styles.backButton, { color: theme.accent }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (screen === 'Transferir') {
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.screenTitle, { color: theme.accent }]}>Transferir</Text>
          <Text style={{ color: theme.textPrimary }}>Escolha a conta e o valor para transferir.</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={[styles.backButton, { color: theme.accent }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
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
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: width * 0.05,
    borderRadius: 15,
    padding: height * 0.020,
    marginBottom: height * 0.025,
    borderWidth: 0.1,
  },
  card1: {
    marginHorizontal: width * 0.05,
    borderRadius: 15,
    marginBottom: height * 0.025,
    borderWidth: 0.1,
  },
  label: {
    fontSize: width * 0.04,
    marginBottom: 5,
    textAlign: 'center',
  },
  saldo: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: width * 0.2,
    marginHorizontal: -1,
    borderWidth: 1,
    left: 3.8,
  },
  buttonText: {
    marginTop: 8,
    fontWeight: '600',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  screenTitle: {
    fontSize: width * 0.08,
    fontWeight: '700',
    marginBottom: height * 0.02,
  },
  backButton: {
    marginTop: height * 0.03,
    fontSize: width * 0.05,
    color: '#820ad1',
    fontWeight: 'bold',
  },
  iconcard: {
    top: -15,
    textAlign: 'center',
    left: -90,
  },
  cardText: {
    fontSize: 20,
    bottom: -16,
    textAlign: 'center',
  },
  conversor: {
    fontSize: width * 0.05,
    textAlign: 'center',
    fontWeight: '700',
  },
  conversor2: {
    textAlign: 'center',
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
    fontWeight: '500',
  },
});
