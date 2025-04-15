import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, Picker, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function HomeScreen() {
  // Estados existentes
  const [mostrar, setMostrar] = useState(true);
  const [screen, setScreen] = useState('Home');
  const [darkMode, setDarkMode] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [saldo, setSaldo] = useState(25000);
  const [mostrarConversoes, setMostrarConversoes] = useState(false);
  const [pixKeyType, setPixKeyType] = useState('cpf');
  const [pixKey, setPixKey] = useState('');
  const [pixValue, setPixValue] = useState('');

  // Estados do Chatbot
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou seu assistente bancário virtual. Como posso ajudar?'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Sistema de temas
  const theme = {
    background: darkMode ? '#121212' : '#fff',
    card: darkMode ? '#1e1e1e' : '#fff',
    textPrimary: darkMode ? '#fff' : '#000',
    textSecondary: darkMode ? '#aaa' : '#555',
    accent: '#820ad1',
    border: darkMode ? '#444' : '#ddd',
    buttonText: darkMode ? '#fff' : '#fff',
  };

  // Busca taxas de câmbio
  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://v6.exchangerate-api.com/v6/5c91ee70a1644e990cc95d25/latest/BRL');
      const data = await response.json();
      setExchangeRates(data.conversion_rates);
    } catch (error) {
      console.error('Erro ao buscar taxas de câmbio:', error);
    }
  };

  // Conversão de moeda
  const convertCurrency = (currencyCode: string) => {
    if (!exchangeRates) return 0;
    const rate = exchangeRates[currencyCode];
    return saldo * rate;
  };

  // Transferência Pix
  const handlePixTransfer = () => {
    if (!pixKey) {
      Alert.alert('Erro', 'Por favor, insira uma chave Pix válida');
      return;
    }

    if (!pixValue || isNaN(parseFloat(pixValue))) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    const value = parseFloat(pixValue);
    if (value > saldo) {
      Alert.alert('Erro', 'Saldo insuficiente');
      return;
    }

    Alert.alert('Sucesso', `Transferência Pix de R$ ${value.toFixed(2)} realizada com sucesso!`);
    setSaldo(saldo - value);
    setPixKey('');
    setPixValue('');
    setScreen('Home');
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Fluxos de conversa

    if (/site|bryan|criação/.test(lowerMessage)) {
      return `Esse site em React Native foi criado e configurado por Bryan Kauan Fagundes! (3°D).`;
    }

    if (/oi|olá|ola|bom dia|boa tarde|boa noite/.test(lowerMessage)) {
      return 'Olá! Sou seu assistente bancário. Posso te ajudar com:\n\n• Saldo \n• Transferências Pix\n• Pagamentos\n• Cartões\n• Recargas';
    }

    if (/saldo|dinheiro|disponível/.test(lowerMessage)) {
      return `Seu saldo atual é R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`;
    }


    if (/pix|transferência|transferencia|enviar dinheiro/.test(lowerMessage)) {
      return 'Para fazer um Pix:\n1. Acesse a aba "Pix"\n2. Escolha o tipo de chave\n3. Digite o valor\n4. Confirme os dados\n\n';
    }

    if (/cartão|cartao|crédito|credito|débito|cartões| debito/.test(lowerMessage)) {
      return 'Na seção "Meus cartões" você pode:\n• Ver seus cartões\n• Bloquear cartões\n• Ajustar limites\n• Solicitar novos';
    }

    if (/pagar|conta|boleto|qr code/.test(lowerMessage)) {
      return 'Para pagamentos:\n1. Toque em "Pagar"\n2. Escaneie o código\n3. Confirme os dados\n4. Autorize o pagamento';
    }

    if (/recarga|celular|créditos/.test(lowerMessage)) {
      return 'Recarregue seu celular:\n1. Vá em "Recarga"\n2. Digite o número\n3. Escolha o valor\n4. Confirme';
    }

    if (/câmbio|cambio|moeda|dólar|dolar|euro/.test(lowerMessage)) {
      return `Seu saldo em outras moedas:\n\nDólar: $${convertCurrency('USD').toFixed(2)}\nEuro: €${convertCurrency('EUR').toFixed(2)}\nLibra: £${convertCurrency('GBP').toFixed(2)}`;
    }

    if (/ajuda|comandos|opções|o que você faz/.test(lowerMessage)) {
      return 'Posso ajudar com:\n\n• Consultas de saldo\n• Instruções sobre Pix\n• Informações de cartões\n• Pagamento de contas\n• Recarga de celular\n• Conversão de moedas';
    }

    if (/obrigado|obrigada|valeu|tchau/.test(lowerMessage)) {
      return 'Por nada! Estou aqui sempre que precisar. Tenha um ótimo dia!';
    }

    return 'Não entendi completamente. Posso te ajudar com:\n\n• Saldo\n• Pix\n• Cartões\n• Pagamentos\n• Recargas\n\nO que você precisa?';
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: userInput };
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(userInput);
      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  // Renderização das telas
  const renderScreen = () => {
    if (screen === 'Home') {
      return (
        <>
          {/* Cabeçalho */}
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

          {/* Card de Saldo */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Seu saldo</Text>
            <Text style={[styles.saldo, { color: theme.textPrimary }]}>
              {mostrar ? `R$ ${saldo.toLocaleString()}` : '******'}
            </Text>
          </View>

          {/* Ações Rápidas */}
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

              {/* Botão do Chatbot */}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.card }]}
                onPress={() => setScreen('Chatbot')}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color={theme.accent} />
                <Text style={[styles.buttonText, { color: theme.accent }]}>Ajuda</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Meus Cartões */}
          <TouchableOpacity
            style={[styles.card1, { backgroundColor: theme.card }]}
            onPress={() => setScreen('Cartões')}>
            <Text style={[styles.cardText, { color: theme.textPrimary }]}>Meus cartões</Text>
            <Ionicons name="card" size={35} color={theme.accent} style={styles.iconcard} />
          </TouchableOpacity>

          {/* Conversor de Moedas */}
          <Text style={[styles.conversor, { color: theme.textPrimary }]}>Conversor de moedas</Text>
          <Text style={[styles.conversor2, { color: theme.textPrimary }]}>Com o saldo atual</Text>

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={() => setMostrarConversoes(!mostrarConversoes)}>
              <Text style={{ color: theme.accent, fontSize: 16, fontWeight: 'bold' }}>
                {mostrarConversoes ? 'Ocultar conversões' : 'Mostrar conversões'}
              </Text>
            </TouchableOpacity>
          </View>

          {mostrarConversoes && exchangeRates && (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Saldo em outras moedas:</Text>
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                USD (Dólar Americano): ${convertCurrency('USD').toFixed(2)}
              </Text>
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                EUR (Euro): €${convertCurrency('EUR').toFixed(2)}
              </Text>
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                GBP (Libra Esterlina): £${convertCurrency('GBP').toFixed(2)}
              </Text>
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                JPY (Iene Japonês): ¥${convertCurrency('JPY').toFixed(2)}
              </Text>
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                CAD (Dólar Canadense): C$${convertCurrency('CAD').toFixed(2)}
              </Text>
              <Text style={[styles.saldo, { color: theme.textPrimary, marginBottom: 10 }]}>
                AUD (Dólar Australiano): A$${convertCurrency('AUD').toFixed(2)}
              </Text>
              <Text style={[styles.saldo, { color: theme.textPrimary }]}>
                CHF (Franco Suíço): Fr.${convertCurrency('CHF').toFixed(2)}
              </Text>
            </View>
          )}
        </>
      );
    } else if (screen === 'Pix') {
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.screenTitle, { color: theme.accent, marginTop: 30 }]}>Pix</Text>
          <Text style={{ color: theme.textPrimary, marginBottom: 20 }}>Transferência rápida e segura via Pix.</Text>

          <View style={[styles.pixInputContainer, { backgroundColor: theme.background }]}>
            <Picker style={{
              backgroundColor: theme.background,
              color: theme.textPrimary,
              height: 50,
              width: '100%'
            }}
              selectedValue={pixKeyType}
              onValueChange={(itemValue) => setPixKeyType(itemValue)}>
              <Picker.Item label="CPF" value="cpf" />
              <Picker.Item label="E-mail" value="email" />
              <Picker.Item label="Chave Aleatória" value="random" />
              <Picker.Item label="Telefone" value="phone" />
            </Picker>

            <TextInput
              style={[
                styles.pixInput,
                {
                  color: theme.textPrimary,
                  borderColor: theme.border,
                  backgroundColor: theme.background
                }
              ]}
              placeholder="Digite a chave Pix"
              placeholderTextColor={theme.textSecondary}
              keyboardType={
                pixKeyType === 'cpf' || pixKeyType === 'phone' ? 'numeric' :
                  pixKeyType === 'email' ? 'email-address' : 'default'
              }
              value={pixKey}
              onChangeText={(text) => setPixKey(text)}
            />

            <TextInput
              style={[
                styles.pixInput,
                {
                  color: theme.textPrimary,
                  borderColor: theme.border,
                  backgroundColor: theme.background,
                  marginTop: 15
                }
              ]}
              placeholder="Valor (R$)"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={pixValue}
              onChangeText={(text) => setPixValue(text)}
            />
          </View>

          <TouchableOpacity
            style={[styles.pixButton, { backgroundColor: theme.accent }]}
            onPress={handlePixTransfer}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pixBackButton]}
            onPress={() => setScreen('Home')}>
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
    } else if (screen === 'Cartões') {
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.card }]}>
          <Text style={[styles.screenTitle, { color: theme.accent }]}>Meus Cartões</Text>
          <Text style={{ color: theme.textPrimary }}>Gerencie seus cartões de crédito e débito.</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}>
            <Text style={[styles.backButton, { color: theme.accent }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (screen === 'Chatbot') {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: theme.background }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={[styles.chatHeader, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={() => setScreen('Home')}>
              <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.chatTitle, { color: theme.textPrimary }]}>Assistente Virtual</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            style={styles.chatContainer}
            contentContainerStyle={{ paddingBottom: 80 }}
            ref={ref => {
              if (ref) {
                setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
              }
            }}
          >
            {chatMessages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  {
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.role === 'user' ? theme.accent : theme.card,
                  }
                ]}
              >
                <Text style={{ color: msg.role === 'user' ? '#fff' : theme.textPrimary }}>
                  {msg.content}
                </Text>
              </View>
            ))}
            {loading && (
              <View style={[styles.messageBubble, { alignSelf: 'flex-start', backgroundColor: theme.card }]}>
                <Text style={{ color: theme.textPrimary }}>Digitando...</Text>
              </View>
            )}
          </ScrollView>

          <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
            <TextInput
              style={[
                styles.chatInput,
                {
                  color: theme.textPrimary,
                  backgroundColor: theme.background,
                  borderColor: theme.border
                }
              ]}
              placeholder="Digite sua mensagem..."
              placeholderTextColor={theme.textSecondary}
              value={userInput}
              onChangeText={setUserInput}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: theme.accent }]}
              onPress={handleSendMessage}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  pixInputContainer: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  pixInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  pixButton: {
    width: '90%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  pixBackButton: {
    marginTop: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  chatInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});