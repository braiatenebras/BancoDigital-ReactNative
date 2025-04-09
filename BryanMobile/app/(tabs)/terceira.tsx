import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      { }
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.username}>Olá, Bryan  </Text>
        <TouchableOpacity>
          <Ionicons name="eye-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      { }
      <View style={styles.card}>
        <Text style={styles.label}>Conta</Text>
        <Text style={styles.balance}>R$ 1.234,56</Text>
      </View>

      {/* botoes principais */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cash-outline" size={24} color="#820ad1" />
          <Text style={styles.actionText}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="barcode-outline" size={24} color="#820ad1" />
          <Text style={styles.actionText}>Pagar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="swap-horizontal-outline" size={24} color="#820ad1" />
          <Text style={styles.actionText}>Transferir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cellular-outline" size={24} color="#820ad1" />
          <Text style={styles.actionText}>Recarga</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.card}>
        <Text style={styles.label}>Cartão de crédito</Text>
        <Text style={styles.subtitle}>Fatura atual</Text>
        <Text style={styles.creditAmount}>R$ 567,89</Text>
        <Text style={styles.availableLimit}>Limite disponível: R$ 2.000,00</Text>
      </View>
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
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  actions: {
    marginLeft: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 90,
  },
  actionText: {
    marginTop: 8,
    color: '#820ad1',
    fontWeight: '600',
    fontSize: 14,
  },
  subtitle: {
    color: '#aaa',
    marginTop: 8,
    fontSize: 14,
  },
  creditAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#000',
  },
  availableLimit: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 4,
  },
});