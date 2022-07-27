import React, {useState} from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numero,setNumero] = useState(0);
  const [botao,setBotao] = useState('LIGAR');
  const [ultimo,setUltimo] = useState(null);

  function ligar(){
    if(timer != null){
      //timer parado
      clearInterval(timer);
      timer = null;
      setBotao('Ligar');
    }else{
      //começa a girar timer
      setBotao('PAUSAR')
      timer = setInterval(() => {
        ss++;
        if(ss == 60){
          ss = 0;
          mm++;
        }

        if(mm == 60){
          mm = 0;
          hh++;
        }

        let format = (hh<10 ? '0' + hh : hh) + ':' + (mm<10 ? 0 + mm : mm) + ':' + (ss<10 ? '0' + ss : ss);
        setNumero(format);
      }, 100);
    }
  }

  function limpar(){
    if(timer != null){
      clearInterval(timer);
      timer = null;

    }
    setUltimo(numero)
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('LIGAR')

  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cronometro</Text>
      <Image
      source={require('./src/cronometro.png')}
      style={styles.img}
      />
      <Text style={styles.timer}>{numero}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn}
        onPress={ligar}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
        onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaHistorico}>
        <Text style={styles.textoHistorico}>
          {ultimo ? 'Ultimo tempo ' + ultimo : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  titulo: {
    color: 'white',
    fontSize: 30,
    marginBottom: 50
  },
  img: {
    width: 300,
    height:300
  },
  timer: {
    marginTop: -110,
    fontSize: 40,
    fontWeight: 'bold'
  }, 
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto:{
    fontSize: 20,
    color: '#00aeef',
    fontWeight:'bold'
  },
  areaHistorico:{
    marginTop: 40,

  },
  textoHistorico:{
    color: '#FFF',
    fontSize: 20
  }
});
