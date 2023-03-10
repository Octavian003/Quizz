import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native';
import { Questions } from './Questions';
import Quizz from './Quizz';
import EventBus from 'react-native-event-bus'

export default function App() {
  const [selected, setSelected] = useState(false);
  const answers = [];
  const [score, setScore] = useState(0);
  const list = useRef(null);
  const [trySubmit, setTrySubmit] = useState(false);

  const reset = () => {
    if(selected == true){
      list.current.scrollToOffset({
        offset: 0,
        animated: true
      })

      setSelected(false);
      answers.splice(0, answers.length)
      setScore(0)
      setTrySubmit(false)
      
      EventBus.getInstance().fireEvent("clear-quiz")
    }
  }

  const sumbitQuizz = () => {
    let total = 0;
    answers.forEach(item => {
      if(item.answer == item.corectAnswer){
        total = total + 20;
      }
    })
    
    if(answers.length == Questions.length){
      list.current.scrollToOffset({
        offset: 0,
        animated: true
      })
      setSelected(true)
      setScore(total)
      setTrySubmit(true)
    }else{
      Alert.alert(
        "Warning!",
        "Trebuie selectat un raspuns la fiecare intrebare",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
  
      <Text style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 5}}>Quizz</Text>
      {trySubmit && <Text style={{fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginBottom: 5}}>Score: {score}</Text>}

      <FlatList 
        style={{flex: 1, }}
        data={Questions}
        ref={list}
        renderItem={({item}) => (
          <Quizz
            setSelected={setSelected}
            selected={selected}
            answers = {answers}
            // setAnswers={setAnswers}
            question={item.question}
            answer1={item.answer1}
            answer2={item.answer2}
            answer3={item.answer3}
            answer4={item.answer4}
            corectAnwser={item.corectAnswer}
            id={item.id}
          />
        )}
      />

      {!trySubmit &&
        <View
          style={{position: 'absolute', bottom: 0, right: 0, left: 0}} 
        >
          <Button 
            title="Submit" 
            onPress={sumbitQuizz} 
          />
        </View>
      }
      {trySubmit &&
        <View
         style={{position: 'absolute', bottom: 0, left: 0, right: 0}} 
        >
         <Button 
           title="Reset" 
           onPress={reset}  
         />
       </View>
      }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
