import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomeScreen() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.meunome}>Olá, Bryan</Text>

        <TouchableOpacity onPress={() => {
          setMostrar(!mostrar);
          console.log("Mostrar está agora:", !mostrar);
        }}>
          <Ionicons
            name={mostrar ? "eye-outline" : "eye-off-outline"}
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      { }
      <View style={styles.card}>
        <Text style={styles.saldo}>Conta</Text>
        <Text style={styles.valordosaldo}>
          {mostrar ? 'R$ 69.069' : '*****'}
        </Text>

      </View>

      {/* botoes de pix a recarga */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actions}>
        <TouchableOpacity style={styles.botoes}>
          <FontAwesome6 name="pix" size={24} color="#820ad1" />
          <Text style={styles.texto}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoes}>
          <Ionicons name="barcode-outline" size={24} color="#820ad1" />
          <Text style={styles.texto}>Pagar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoes}>
          <Ionicons name="swap-horizontal-outline" size={24} color="#820ad1" />
          <Text style={styles.texto}>Transferir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoes}>
        <MaterialIcons name="4g-mobiledata" size={24} color="#820ad1" />
          <Text style={styles.texto}>Recarga</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  meunome: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  saldo: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  valordosaldo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  actions: {
    marginLeft: 20,
    marginBottom: 20,
  },
  botoes: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 87,
    left: 0,
    marginHorizontal: -1,
  },
  texto: {
    marginTop: 8,
    color: '#820ad1',
    fontWeight: '600',
    fontSize: 14,
  },
  valor: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#000',
  },
  Limitedisponivel: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 4,
  },
});