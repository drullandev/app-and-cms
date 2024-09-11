import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { IonContent } from '@ionic/react';
const Content = ({ row }) => {
    //console.log('setContent', row)
    const [content, setContent] = useState([]);
    const [image, setThisImage] = useState('');
    useEffect(() => {
        /*
        restGet('contents', { slug: row.slug })
        .then(res => {
          //console.log('contents', res)
          setThisImage(setImage(res.data[0].caret.url))
          setContent(res.data[0])
        }).catch(res=>{
          console.log('error', res)
        })
        */
    }, []);
    return _jsx(IonContent, {});
};
export default Content;
