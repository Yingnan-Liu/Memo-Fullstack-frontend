import React,{useEffect , useState} from "react";
import { Tabs,Typography } from "antd";
// import {jinrishici} from 'jinrishici';
import Memo from '../memo';
const {TabPane} = Tabs
const jinrishici = require('jinrishici');

function Index() {
  const [content,setContent] = useState('') //诗句
  const [origin,setOrigin] = useState('') //来源
  useEffect(() => {
    jinrishici.load((result)=>{
      setContent(result?.data?.content)
      setOrigin(result?.data?.origin)
      console.log(result)
    })
  }, []);
  return(
    <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Tab 1" key="1">
            <div>
              {content}
            </div>
            <div>{origin.dynasty} {origin.author}</div>
            <div>{origin.title}</div>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
            <Memo />
        </TabPane>
  </Tabs>
    )
}

export default Index;
