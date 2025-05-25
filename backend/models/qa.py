from transformers import pipeline

class QuestionAnswerModel:
    def __init__(self):
        self.qa_pipe = pipeline("question-answering",model="deepset/roberta-base-squad2")
    def answer(self,content:str,question:str) -> str:
        result = self.qa_pipe(question=question,context=content)
        # print("+++++++++++++++++++++")
        # print(result)
        # print("+++++++++++++++++++++")
        return result['answer']
        # return result