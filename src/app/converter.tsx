"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import debounce from 'lodash.debounce' 
import {split} from "sentence-splitter";
import { SentenceRow } from "./sentenceRow"
import { geMoveSubmove } from "@/server/actions/classifier"

interface Sentence{
    text:string;
    move?:number;
    subMove?:number;
}

export const Converter = ()=>{
    const [sentences,setSentences] = useState<Sentence[]>([])

    const updateSentences = debounce(async (text:string)=>{

        const sentencesStrings = split(text).map(s=>s.raw).filter(sentence=>sentence.length>5) ?? [];
        


        const sentences = sentencesStrings.map((sentence,index)=>{

            return{

                text:sentence,
                move:null,
                subMove:null


            }
        }) ;

        setSentences(sentences)

    })

    const handleTextAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        if(!e.target.value ) return;
        updateSentences(e.target.value)



    }
    const handlePredictions = async ()=>{

      alert("loading")
       const res = await geMoveSubmove({sentences:sentences.map(s=>s.text)});
       if(res?.serverError){
        alert(res?.serverError)
       }
       const predictions = res.data?.predictions ?? []
       console.log(predictions)
       setSentences(sentences =>{
        return sentences.map((s,index)=>{
          return {

          ...s,
          move:predictions[index].move,
          subMove:predictions[index].subMove

          }
        })

       })


    }

    return (
           <section className="container mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8">Try It Now</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <div className="grid gap-4">
              <Textarea
                onChange={handleTextAreaChange}
                placeholder="Paste your introduction text here..."
                rows={5}
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <Button onClick={()=>handlePredictions()}>Analyze</Button>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Introduction Analysis</h3>
              <div className="grid gap-4">

{
    sentences.map((sentence,index) =>{
        return (
            <SentenceRow text={sentence.text} sentenceNumber={index+1} move={sentence.move} subMove={sentence.subMove} key={index}/>
        )
    })
}

         
              </div>
            </div>
          </div>
        </section>
    )
}