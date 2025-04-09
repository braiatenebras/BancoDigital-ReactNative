import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [mostrar, setMostrar] = useState(true);
  const [screen, setScreen] = useState('Home');

  const navigateTo = (screenName) => {
    setScreen(screenName); // muda para a tela clicada
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Perfil')}>
          <Ionicons name="person-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.meunome}>Olá, Bryan</Text>

        <TouchableOpacity onPress={() => setMostrar(!mostrar)}>
          <Ionicons name={mostrar ? "eye-outline" : "eye-off-outline"} size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {screen === 'Home' && (
        <>
          <View style={styles.saldototal}>
            <Text style={styles.textsaldo}>Seu saldo</Text>
            <Text style={styles.valordosaldo}>
              {mostrar ? 'R$ 100.000' : '******'}
            </Text>
          </View>

          <View style={styles.actions}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actionsContainer}>
              <TouchableOpacity style={styles.botoes} onPress={() => navigateTo('Pix')}>
                <FontAwesome6 name="pix" size={24} color="#820ad1" />
                <Text style={styles.texto}>Pix</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botoes} onPress={() => navigateTo('Pagar')}>
                <Ionicons name="barcode-outline" size={24} color="#820ad1" />
                <Text style={styles.texto}>Pagar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botoes} onPress={() => navigateTo('Transferir')}>
                <Ionicons name="swap-horizontal-outline" size={24} color="#820ad1" />
                <Text style={styles.texto}>Transferir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botoes} onPress={() => navigateTo('Recarga')}>
                <MaterialIcons name="4g-mobiledata" size={24} color="#820ad1" />
                <Text style={styles.texto}>Recarga</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </>
      )}
         {screen === 'Perfil' && ( // tela de quando clicarem no perfil
        <View style={styles.screenContainer}>
          <Text style={styles.text}>Área do Perfil</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={styles.backButton}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'Pix' && ( // tela de quando clicarem no pix
        <View style={styles.screenContainer}>
          <Text style={styles.text}>Área Pix</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={styles.backButton}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'Pagar' && ( // tela de quando clicarem no pagar
        <View style={styles.screenContainer}>
          <Text style={styles.text}>Área de Pagamentos</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={styles.backButton}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'Transferir' && ( // tela de quando clicarem no transferir
        <View style={styles.screenContainer}>
          <Text style={styles.text}>Área de Transferências</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={styles.backButton}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'Recarga' && ( // tela de quando clicarem na recarga
        <View style={styles.screenContainer}>
          <Text style={styles.text}>Área de Recarga</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={styles.backButton}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#820ad1',
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
  botoes: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: width * 0.2,
    left: 5,
    marginHorizontal: -1,
  },
  texto: {
    marginTop: 8,
    color: '#820ad1',
    fontWeight: '600',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: '#820ad1',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#820ad1',
    textDecorationLine: 'underline',
  },
});