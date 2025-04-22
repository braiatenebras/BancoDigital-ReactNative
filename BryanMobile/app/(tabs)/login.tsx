import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image,
  KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InicioScreen from './inicio'; // Importa a tela inicial para Bryan
import Inicio2Screen from './inicio2'; // Importa a tela inicial para Maidel

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true); // Estado para alternar entre tema claro e escuro
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Controla a exibição do modal
  const [modalMessage, setModalMessage] = useState(''); // Mensagem do modal
  const [logado, setLogado] = useState(false); // Controla se o usuário está logado
  const [userEmail, setUserEmail] = useState(''); // Armazena o e-mail do usuário logado

  // Tema dinâmico baseado no estado `darkMode`
  const theme = {
    background: darkMode ? '#121212' : '#fff',
    card: darkMode ? '#1e1e1e' : '#fff',
    textPrimary: darkMode ? '#fff' : '#000',
    textSecondary: darkMode ? '#aaa' : '#555',
    accent: '#820ad1',
    border: darkMode ? '#444' : '#ddd',
    inputBackground: darkMode ? '#2a2a2a' : '#f5f5f5',
  };

  // Função para alternar entre tema claro e escuro
  const toggleTheme = () => setDarkMode(!darkMode);

  const validateCpfOrEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de e-mail
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Valida formato de CPF
    return emailRegex.test(value) || cpfRegex.test(value);
  };

  const handleLogin = () => {
    if (!cpf || !senha) {
      setModalMessage('Por favor, preencha todos os campos antes de continuar.');
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1200);
      return;
    }

    if (!validateCpfOrEmail(cpf)) {
      setModalMessage('Por favor, insira um CPF ou email válido.');
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1200);
      return;
    }

    // Verifica se o e-mail é válido e define o estado do usuário logado
    if (cpf.toLowerCase() === 'bryan@escola.com' || cpf.toLowerCase() === 'maidel@escola.com') {
      setUserEmail(cpf.toLowerCase());
      setModalMessage('Login realizado com sucesso!');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setLogado(true);
      }, 1500);
    } else {
      setModalMessage('Usuário não encontrado.');
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1500);
    }
  };

  // Renderiza a tela correspondente com base no e-mail do usuário logado
  if (logado) {
    if (userEmail === 'bryan@escola.com') {
      return <InicioScreen />;
    } else if (userEmail === 'maidel@escola.com') {
      return <Inicio2Screen />;
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Modal para exibir mensagens */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalMessage, { color: theme.textPrimary }]}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>

      {/* Conteúdo centralizado */}
      <View style={styles.content}>
        {/* botao do tema */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={darkMode ? 'sunny-outline' : 'moon-outline'}
              size={30}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Logo e título */}
        <View style={[styles.logoContainer, { top: -65, }]}>
          <Image style={[styles.logo, { borderRadius: 50, }]} source={require('../../assets/images/bryan.jpg')} />
          <Text style={[styles.title, { color: theme.textPrimary }]}>Banco Digital</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Acesse sua conta</Text>
        </View>

        {/* Formulário de login */}
        <View style={[styles.formContainer, { backgroundColor: theme.card, top: -35 }]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>CPF ou E-mail</Text>
            <TextInput
              placeholder="Digite seu CPF ou E-mail"
              placeholderTextColor={theme.textSecondary}
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  color: theme.textPrimary,
                  borderColor: theme.border,
                },
              ]}
              keyboardType="default" // Permite entrada de texto e números
              value={cpf}
              onChangeText={(text) => setCpf(text)} // Atualiza o estado com o valor digitado
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  {
                    backgroundColor: theme.inputBackground,
                    color: theme.textPrimary,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Digite sua senha"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={(text) => setSenha(text)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <Ionicons
                  name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.accent }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 20,
    top: -100,
    left: -300,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 95,
    height: 95,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;