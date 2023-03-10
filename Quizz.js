import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EventBus from 'react-native-event-bus'


export default function Quizz({ question, answer1, answer2, answer3, answer4, corectAnwser, setAnswers, id, answers, selected }){
    const [correct, setCorrect] = useState(false);
    const [select, setSelect] = useState([false, false, false, false]);
    const [correctAnswer, setCorrectAnswer] = useState({
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false,
    });

    useEffect(() => {
        setCorrectAnswer(prevAnswer => ({
            ...prevAnswer,
            [corectAnwser]: true,
        }))
    }, []);

    useEffect(() => {
        EventBus.getInstance().addListener("clear-quiz", () => {
            setCorrect(false)
            setSelect([false, false, false, false])
        })
    
      return () => {
        EventBus.getInstance().removeListener(this.listener);
      }
    }, [])

    const check = (answer, number) => {
        if(answer == corectAnwser){
            setCorrect(true);
        }else{
            setCorrect(false)
        }
        
        let newArray = []
        select.forEach((item, index)=> {
            if(index == number){  //&& item == false
                newArray.push(true)         
            }else{
                newArray.push(false)
            }
        })
        setSelect([...newArray])

        let data = {
            id: id,
            answer: answer,
            corectAnswer: corectAnwser
        }

        let k = 0;
        answers.forEach(item => {
            if(item.id == id){
                k++
            }
        })
        if(k == 0){
            answers.push(data)
        }

        answers.forEach(item => {
            if(item.id == id && item.answer != answer){
                item.answer = answer
            }
        })
    }

    return (
        <View style={{borderWidth: 1, borderColor: 'black', borderRadius: 20, padding: 15, marginTop: 10, marginBottom: 10}}>
            {!selected && 
                <View style={{width: '100%'}}>
                    <View>
                        <Text style={{fontSize: 20}}>{ question }</Text>
                    </View>
                    <View style={{flexDirection:"row", paddingTop: 40, justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            onPress={() => check('answer1', 0)}
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor:select[0]? '#9999' : 'white'}}
                        >
                            <Text>{ answer1 }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => check('answer2', 1)}
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor:select[1]? '#9999' : 'white'}}
                        >
                            <Text>{ answer2 }</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row", paddingTop: 20, justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            onPress={() => check('answer3', 2)}
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor:select[2]? '#9999' : 'white'}}
                        >
                            <Text>{ answer3 }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => check('answer4', 3)}
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor:select[3]? '#9999' : 'white'}}
                        >
                            <Text>{ answer4 }</Text>
                        </TouchableOpacity>
                    </View> 
                </View> 
            }

            {selected &&
                <View style={{width: '100%'}}>
                    <View>
                        <Text style={{fontSize: 20}}>{ question }</Text>
                    </View>
                    <View style={{flexDirection:"row", paddingTop: 40, justifyContent: 'space-between'}}>
                        <Text
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor: correctAnswer?.answer1? 'green' : '', color: select[0] && !correctAnswer.answer1 ? 'red': ''}}
                        >
                            { answer1 }                        
                        </Text>
                        <Text
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor: correctAnswer?.answer2? 'green' : '', color: select[1] && !correctAnswer.answer2 ? 'red': ''}}
                        >
                            { answer2 }                        
                        </Text>
                    </View>
                    <View style={{flexDirection:"row", paddingTop: 20, justifyContent: 'space-between'}}>
                        <Text
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor: correctAnswer?.answer3? 'green' : '', color: select[2] && !correctAnswer.answer3 ? 'red': ''}}
                        >
                            { answer3 }                        
                        </Text>
                        <Text
                            style={{borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 50, backgroundColor: correctAnswer?.answer4? 'green' : '', color: select[3] && !correctAnswer.answer4 ? 'red': ''}}
                        >
                            { answer4 }                        
                        </Text>
                    </View>
                    <View
                        style={{borderBottomWidth: 1, borderBottomColor: '#9999', marginTop: 10, marginBottom: 10}}
                    >
                    </View>
                    <Text 
                        style={{alignSelf: 'center', fontSize: 24, color: correct? 'green' : 'red'}}
                    > 
                        {correct ? 'Correct!' : 'Incorrect!'}
                    </Text>
                </View>
            }
            
        </View>
    )
}