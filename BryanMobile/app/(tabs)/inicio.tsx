import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home'); // Controla a tela exibida

  // Funções para trocar de tela
  const mostrarHome = () => setTelaAtual('home');
  const mostrarConfiguracao = () => setTelaAtual('configuracao');
  const mostrarSaldo = () => setTelaAtual('saldo');

  return (
    <View style={styles.container}>
      {telaAtual === 'home' && (
        <HomeScreen
          mostrarConfiguracao={mostrarConfiguracao}
          mostrarSaldo={mostrarSaldo}
        />
      )}
      {telaAtual === 'configuracao' && (
        <ConfiguracaoScreen mostrarHome={mostrarHome} />
      )}
      {telaAtual === 'saldo' && (
        <SaldoScreen mostrarHome={mostrarHome} />
      )}
    </View>
  );
}

const HomeScreen = ({ mostrarConfiguracao, mostrarSaldo }: any) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.meunome}>Olá, Bryan</Text>
        <TouchableOpacity onPress={mostrarConfiguracao}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.saldototal}>
        <Text style={styles.textsaldo}>Seu saldo</Text>
        <Text style={styles.valordosaldo}>R$ 100.000</Text>
      </View>

      <TouchableOpacity onPress={mostrarSaldo} style={styles.button}>
        <Text style={styles.buttonText}>Ver detalhes do saldo</Text>
      </TouchableOpacity>
    </View>
  );
};

const ConfiguracaoScreen = ({ mostrarHome }: any) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Configurações</Text>
      <TouchableOpacity onPress={mostrarHome} style={styles.button}>
        <Text style={styles.buttonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const SaldoScreen = ({ mostrarHome }: any) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Detalhes do Saldo</Text>
      <Text style={styles.valordosaldo}>R$ 100.000</Text>
      <TouchableOpacity onPress={mostrarHome} style={styles.button}>
        <Text style={styles.buttonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#820ad1',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.075,
    paddingHorizontal: width * 0.07,
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  meunome: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  saldototal: {
    backgroundColor: '#fff',
    marginHorizontal: width * 0.05,
    borderRadius: 8,
    padding: height * 0.03,
    marginBottom: height * 0.035,
  },
  textsaldo: {
    color: '#aaa',
    fontSize: width * 0.04,
    marginBottom: 5,
  },
  valordosaldo: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    width: width * 0.7,
    alignItems: 'center',
  },
  buttonText: {
    color: '#820ad1',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#820ad1',
    marginBottom: 20,
  },
});
